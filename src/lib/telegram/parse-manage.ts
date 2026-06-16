/**
 * Post-creation management for bookings created via the parse flow (and
 * reusable for any reservation/external job). Handles detail view + status
 * transitions (onayla/iptal/tamamla) + delete, for BOTH Reservation and
 * ExternalJob, all driven by session-independent callback data.
 *
 * Callback grammar (≤64 bytes):
 *   ps:mg:<r|e>:detail:<ref>      open management card
 *   ps:mg:<r|e>:confirm:<ref>     status → confirmed
 *   ps:mg:<r|e>:complete:<ref>    status → completed
 *   ps:mg:<r|e>:cancel:<ref>      ask, then status → cancelled
 *   ps:mg:<r|e>:cancelyes:<ref>   confirmed cancel
 *   ps:mg:<r|e>:del:<ref>         ask, then delete
 *   ps:mg:<r|e>:delyes:<ref>      confirmed delete
 */

import { format } from "date-fns";
import { prisma } from "@/lib/db";
import { sendMessage, editMessageText, answerCallbackQuery } from "./bot";
import type { TelegramCallbackQuery, InlineKeyboardMarkup } from "./types";

const SITE_BASE = "https://merrysails.com";

function esc(s: string | null | undefined): string {
  if (!s) return "—";
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function money(amount: number, currency: string): string {
  const sym =
    currency === "USD" ? "$" : currency === "TRY" ? "₺" : currency === "GBP" ? "£" : "€";
  return `${sym}${amount.toLocaleString("en-US", {
    minimumFractionDigits: amount % 1 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  })}`;
}

const STATUS_BADGE: Record<string, string> = {
  new: "🆕 New",
  confirmed: "✅ Confirmed",
  completed: "🏁 Completed",
  cancelled: "❌ Cancelled",
};

function manageKeyboard(
  kind: "r" | "e",
  ref: string,
  status: string,
  voucherUrl: string,
  invoiceUrl: string
): InlineKeyboardMarkup {
  const rows = [];
  rows.push([
    { text: "🎫 Voucher", url: voucherUrl },
    { text: "📄 Invoice", url: invoiceUrl },
  ]);
  rows.push([
    { text: "✉️ Mail Gönder", callback_data: `ps:m:${kind}:${ref}` },
  ]);
  // Status actions — show only the relevant transitions
  const statusRow = [];
  if (status !== "confirmed" && status !== "completed") {
    statusRow.push({ text: "✅ Onayla", callback_data: `ps:mg:${kind}:confirm:${ref}` });
  }
  if (status !== "completed" && status !== "cancelled") {
    statusRow.push({ text: "🏁 Tamamla", callback_data: `ps:mg:${kind}:complete:${ref}` });
  }
  if (status !== "cancelled") {
    statusRow.push({ text: "❌ İptal", callback_data: `ps:mg:${kind}:cancel:${ref}` });
  }
  if (statusRow.length) rows.push(statusRow);
  rows.push([{ text: "🗑 Sil", callback_data: `ps:mg:${kind}:del:${ref}` }]);
  return { inline_keyboard: rows };
}

async function loadRecord(kind: "r" | "e", ref: string) {
  if (kind === "r") {
    const r = await prisma.reservation.findUnique({ where: { reservationId: ref } });
    if (!r) return null;
    return {
      ref: r.reservationId,
      title: r.tourName,
      customer: r.customerName,
      email: r.customerEmail,
      phone: r.customerPhone,
      date: r.date,
      time: r.time,
      guests: r.guests,
      amount: Number(r.totalPrice),
      currency: r.currency,
      status: r.status,
      voucherUrl: `${SITE_BASE}/reservation/${r.reservationId}/voucher`,
      invoiceUrl: `${SITE_BASE}/reservation/${r.reservationId}/invoice`,
    };
  }
  const j = await prisma.externalJob.findUnique({ where: { jobId: ref } });
  if (!j) return null;
  return {
    ref: j.jobId,
    title: j.serviceTitle,
    customer: j.customerName,
    email: j.customerEmail,
    phone: j.customerPhone,
    date: j.jobDate,
    time: j.jobTime ?? "—",
    guests: j.guests,
    amount: Number(j.amount),
    currency: j.currency,
    status: j.status,
    voucherUrl: `${SITE_BASE}/external/${j.jobId}/voucher`,
    invoiceUrl: `${SITE_BASE}/external/${j.jobId}/invoice`,
  };
}

function detailText(rec: NonNullable<Awaited<ReturnType<typeof loadRecord>>>): string {
  return [
    `<b>${esc(rec.ref)}</b> · ${STATUS_BADGE[rec.status] ?? rec.status}`,
    "",
    `<b>${esc(rec.title)}</b>`,
    `👤 ${esc(rec.customer)}`,
    `   ${esc(rec.email)} · ${esc(rec.phone)}`,
    `📅 ${format(new Date(rec.date), "EEE, dd MMM yyyy")} · ${esc(rec.time)}`,
    `👥 ${rec.guests} pax · 💰 ${money(rec.amount, rec.currency)}`,
  ].join("\n");
}

async function setStatus(
  kind: "r" | "e",
  ref: string,
  status: "confirmed" | "completed" | "cancelled"
) {
  const now = new Date();
  if (kind === "r") {
    const data: Record<string, unknown> = { status };
    if (status === "confirmed") data.confirmedAt = now;
    if (status === "completed") data.completedAt = now;
    await prisma.reservation.update({ where: { reservationId: ref }, data });
  } else {
    const data: Record<string, unknown> = { status };
    if (status === "confirmed") data.confirmedAt = now;
    if (status === "completed") data.completedAt = now;
    if (status === "cancelled") data.cancelledAt = now;
    await prisma.externalJob.update({ where: { jobId: ref }, data });
  }
}

export async function handleManageCallback(
  callback: TelegramCallbackQuery
): Promise<boolean> {
  const data = callback.data;
  if (!data || !data.startsWith("ps:mg:")) return false;

  const chatId = String(callback.message?.chat.id ?? callback.from.id);
  const messageId = callback.message?.message_id;
  // ps:mg:<kind>:<action>:<ref…>
  const parts = data.split(":");
  const kind = parts[2] as "r" | "e";
  const action = parts[3];
  const ref = parts.slice(4).join(":");

  const rec = await loadRecord(kind, ref);
  if (!rec) {
    await answerCallbackQuery(callback.id, "Kayıt bulunamadı", true);
    return true;
  }

  // ── Detail card ──
  if (action === "detail") {
    await answerCallbackQuery(callback.id);
    const kb = manageKeyboard(kind, ref, rec.status, rec.voucherUrl, rec.invoiceUrl);
    if (messageId) await editMessageText(chatId, messageId, detailText(rec), kb);
    else await sendMessage({ chat_id: chatId, text: detailText(rec), reply_markup: kb });
    return true;
  }

  // ── Status transitions ──
  if (action === "confirm" || action === "complete") {
    const status = action === "confirm" ? "confirmed" : "completed";
    await setStatus(kind, ref, status);
    await answerCallbackQuery(
      callback.id,
      status === "confirmed" ? "✅ Onaylandı" : "🏁 Tamamlandı"
    );
    const updated = await loadRecord(kind, ref);
    if (updated && messageId) {
      await editMessageText(
        chatId,
        messageId,
        detailText(updated),
        manageKeyboard(kind, ref, updated.status, updated.voucherUrl, updated.invoiceUrl)
      );
    }
    return true;
  }

  // ── Cancel (ask → confirm) ──
  if (action === "cancel") {
    await answerCallbackQuery(callback.id);
    if (messageId)
      await editMessageText(chatId, messageId, `⚠️ <b>${esc(ref)}</b> iptal edilsin mi?`, {
        inline_keyboard: [
          [
            { text: "✅ Evet, iptal et", callback_data: `ps:mg:${kind}:cancelyes:${ref}` },
            { text: "↩️ Vazgeç", callback_data: `ps:mg:${kind}:detail:${ref}` },
          ],
        ],
      });
    return true;
  }
  if (action === "cancelyes") {
    await setStatus(kind, ref, "cancelled");
    await answerCallbackQuery(callback.id, "❌ İptal edildi");
    const updated = await loadRecord(kind, ref);
    if (updated && messageId) {
      await editMessageText(
        chatId,
        messageId,
        detailText(updated),
        manageKeyboard(kind, ref, updated.status, updated.voucherUrl, updated.invoiceUrl)
      );
    }
    return true;
  }

  // ── Delete (ask → confirm) ──
  if (action === "del") {
    await answerCallbackQuery(callback.id);
    if (messageId)
      await editMessageText(
        chatId,
        messageId,
        `🗑 <b>${esc(ref)}</b> kalıcı olarak silinsin mi? Bu geri alınamaz.`,
        {
          inline_keyboard: [
            [
              { text: "🗑 Evet, sil", callback_data: `ps:mg:${kind}:delyes:${ref}` },
              { text: "↩️ Vazgeç", callback_data: `ps:mg:${kind}:detail:${ref}` },
            ],
          ],
        }
      );
    return true;
  }
  if (action === "delyes") {
    if (kind === "r") {
      await prisma.reservation.delete({ where: { reservationId: ref } });
    } else {
      await prisma.externalJob.delete({ where: { jobId: ref } });
    }
    await answerCallbackQuery(callback.id, "🗑 Silindi");
    if (messageId)
      await editMessageText(chatId, messageId, `🗑 <b>${esc(ref)}</b> silindi.`);
    return true;
  }

  await answerCallbackQuery(callback.id);
  return true;
}
