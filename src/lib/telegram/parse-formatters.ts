/**
 * HTML-formatted preview cards for the LLM-parse flow. Telegram messages are
 * limited to 4096 chars; we keep these well under that.
 */

import type { ParsedExternalJob } from "@/lib/external-parser/schema";

function esc(s: string | null | undefined): string {
  if (!s) return "—";
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function money(amount: number, currency: string): string {
  const symbol =
    currency === "EUR"
      ? "€"
      : currency === "USD"
        ? "$"
        : currency === "TRY"
          ? "₺"
          : currency === "GBP"
            ? "£"
            : `${currency} `;
  return `${symbol}${amount.toLocaleString("en-US", {
    minimumFractionDigits: amount % 1 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  })}`;
}

function intentBadge(intent: "reservation" | "external" | "update"): string {
  switch (intent) {
    case "reservation":
      return "🟢 RESERVATION";
    case "external":
      return "🟡 EXTERNAL";
    case "update":
      return "🔄 UPDATE";
  }
}

function confidenceBadge(c: number): string {
  if (c >= 0.85) return `<b>✅ ${(c * 100).toFixed(0)}%</b> confidence`;
  if (c >= 0.7) return `<b>⚠️ ${(c * 100).toFixed(0)}%</b> confidence`;
  return `<b>❌ ${(c * 100).toFixed(0)}%</b> confidence`;
}

function paymentLabel(method: string): string {
  switch (method) {
    case "cash_on_board":
      return "Cash on board";
    case "card_on_board":
      return "Card on board";
    case "card_paid":
      return "Card paid";
    case "bank_transfer":
      return "Bank transfer";
    default:
      return method.replace(/_/g, " ");
  }
}

/** Renders ONE item's full detail block — shared by the single-item preview
 * and each entry of the multi-item preview. */
function formatItemDetail(
  parsed: ParsedExternalJob,
  intent: "reservation" | "external" | "update"
): string {
  const lines: string[] = [];

  // Identity block
  lines.push(`<b>${esc(parsed.serviceTitle)}</b>`);
  if (parsed.packageName) {
    lines.push(`📦 ${esc(parsed.packageName)}`);
  }
  lines.push(
    `👤 ${esc(parsed.customerName)}${
      parsed.customerCountry ? `  ·  ${esc(parsed.customerCountry)}` : ""
    }`
  );
  if (parsed.customerEmail || parsed.customerPhone) {
    lines.push(
      `   ${esc(parsed.customerEmail) ?? "—"}  ·  ${esc(parsed.customerPhone) ?? "—"}`
    );
  }
  lines.push("");

  // Schedule
  const dateLine = parsed.jobDate
    ? `📅 ${parsed.jobDate}`
    : `📅 <b>Tarih belirsiz</b>`;
  const timeBits: string[] = [];
  if (parsed.jobTime) timeBits.push(parsed.jobTime);
  if (parsed.durationHours) timeBits.push(`${parsed.durationHours}h`);
  const timeLine = timeBits.length ? `🕐 ${esc(timeBits.join(" · "))}` : null;

  lines.push(dateLine + (timeLine ? `   ${timeLine}` : ""));

  // Pickup / dropoff
  if (parsed.pickupPoint || parsed.dropoffPoint) {
    const pickup = parsed.pickupPoint ?? "TBC";
    const drop = parsed.dropoffPoint ? `  →  ${esc(parsed.dropoffPoint)}` : "";
    lines.push(`📍 ${esc(pickup)}${drop}`);
  }
  lines.push(`👥 ${parsed.guests} pax`);
  lines.push("");

  // Money
  lines.push(
    `💰 <b>${money(parsed.amount, parsed.currency)}</b>  ·  ${paymentLabel(parsed.paymentMethod)}`
  );
  if (parsed.paymentNotes) {
    lines.push(`   <i>${esc(parsed.paymentNotes)}</i>`);
  }

  // Inclusions
  if (parsed.inclusions.length > 0) {
    lines.push("");
    lines.push(`<b>Inclusions:</b>`);
    for (const item of parsed.inclusions) {
      lines.push(`  ✓ ${esc(item)}`);
    }
  }

  // Update reference
  if (intent === "update" && parsed.referenceId) {
    lines.push("");
    lines.push(`<b>Ref:</b> ${esc(parsed.referenceId)}`);
  }

  // Uncertainties
  if (parsed.uncertainties.length > 0) {
    lines.push("");
    lines.push(`<b>⚠ Model belirsizlikleri:</b>`);
    for (const u of parsed.uncertainties) {
      lines.push(`  • ${esc(u)}`);
    }
  }

  // Internal note (operator-only)
  if (parsed.internalNote) {
    lines.push("");
    lines.push(`<b>📝 Internal:</b> <i>${esc(parsed.internalNote)}</i>`);
  }

  return lines.join("\n");
}

/**
 * Renders the full preview card. `items` is always an array — 1 element for
 * a normal booking (identical layout to before multi-item support), 2+ for
 * a round-trip / multi-day / bundled message. `sessionIntent` is the
 * operator-overridable intent and only applies when there's exactly one
 * item; each item beyond that keeps its own parsed intent (mixing a
 * reservation leg with an external leg in one message is valid).
 */
export function formatParsePreview(
  items: ParsedExternalJob[],
  sessionIntent: "reservation" | "external" | "update",
  warnings: string[],
  reused: boolean
): string {
  const lines: string[] = [];

  if (items.length === 1) {
    lines.push(
      `${intentBadge(sessionIntent)}  ·  ${confidenceBadge(items[0].confidence)}`
    );
    if (reused) {
      lines.push(`<i>↪ Bu mesajı az önce parse ettim — aynı oturum.</i>`);
    }
    lines.push("");
    lines.push(formatItemDetail(items[0], sessionIntent));
  } else {
    lines.push(
      `<b>🧩 ${items.length} ayrı iş tespit edildi</b> (round-trip / çok günlü / bundle)`
    );
    if (reused) {
      lines.push(`<i>↪ Bu mesajı az önce parse ettim — aynı oturum.</i>`);
    }
    items.forEach((item, idx) => {
      lines.push("");
      lines.push(`━━━━━ <b>İş ${idx + 1}/${items.length}</b> ━━━━━`);
      lines.push(
        `${intentBadge(item.intent)}  ·  ${confidenceBadge(item.confidence)}`
      );
      lines.push(formatItemDetail(item, item.intent));
    });
    lines.push("");
    lines.push(
      `<b>💰 Toplam:</b> ${items
        .map((i) => money(i.amount, i.currency))
        .join(" + ")}`
    );
  }

  // Warnings (message-level, applies across all items)
  if (warnings.length > 0) {
    lines.push("");
    lines.push(`<b>🔍 Güvenlik kontrolleri:</b>`);
    for (const w of warnings) {
      lines.push(`  • ${esc(w)}`);
    }
  }

  return lines.join("\n");
}

const FIELD_LABELS: Record<string, string> = {
  customerName: "Müşteri adı",
  customerEmail: "Müşteri email",
  customerPhone: "Müşteri telefon",
  customerCountry: "Ülke",
  jobDate: "Tarih (YYYY-MM-DD)",
  jobTime: "Saat",
  durationHours: "Süre (saat)",
  guests: "Misafir sayısı",
  pickupPoint: "Pickup noktası",
  dropoffPoint: "Dropoff noktası",
  amount: "Tutar (sayı)",
  serviceTitle: "Hizmet adı",
  paymentMethod: "Ödeme yöntemi",
  paymentNotes: "Ödeme notu",
};

export function formatFieldEditPrompt(
  field: string,
  currentValue: unknown,
  itemContext?: { index: number; total: number }
): string {
  const label = FIELD_LABELS[field] ?? field;
  const current =
    currentValue === null || currentValue === undefined
      ? "(boş)"
      : String(currentValue);
  return [
    itemContext && itemContext.total > 1
      ? `<b>Düzenle (İş ${itemContext.index + 1}/${itemContext.total}):</b> ${esc(label)}`
      : `<b>Düzenle:</b> ${esc(label)}`,
    `<b>Mevcut:</b> <code>${esc(current)}</code>`,
    "",
    `Yeni değeri yaz ve gönder. Boş bırakmak için <code>-</code> yaz.`,
  ].join("\n");
}

export interface SuccessRecord {
  type: "reservation" | "external";
  recordRef: string;
  voucherUrl: string;
  invoiceUrl: string;
}

/** Renders the success card. Handles both a single confirm (1 record) and
 * a multi-item confirm (N records, e.g. round-trip legs / tour days). */
export function formatSuccess(records: SuccessRecord[]): string {
  if (records.length === 1) {
    const r = records[0];
    const tag = r.type === "reservation" ? "🟢 Reservation" : "🟡 External Job";
    return [
      `<b>✅ ${tag} oluşturuldu</b>`,
      `<code>${esc(r.recordRef)}</code>`,
      "",
      `🎫 ${r.voucherUrl}`,
      `📄 ${r.invoiceUrl}`,
    ].join("\n");
  }

  const lines = [`<b>✅ ${records.length} kayıt oluşturuldu</b>`, ""];
  records.forEach((r, idx) => {
    const tag = r.type === "reservation" ? "🟢" : "🟡";
    lines.push(`${tag} <b>${idx + 1}.</b> <code>${esc(r.recordRef)}</code>`);
    lines.push(`   🎫 ${r.voucherUrl}`);
    lines.push(`   📄 ${r.invoiceUrl}`);
  });
  return lines.join("\n");
}

export function formatParseError(error: string): string {
  return [
    `<b>❌ Parse başarısız</b>`,
    "",
    `<code>${esc(error.slice(0, 300))}</code>`,
    "",
    `Mesajı tekrar gönder veya admin panelden manuel oluştur:`,
    `https://merrysails.com/admin/external`,
  ].join("\n");
}

export function formatSessionExpired(): string {
  return [
    `<b>⏱ Oturum süresi dolmuş</b>`,
    "",
    `Bu parse 24 saatten eski. Lütfen orijinal mesajı tekrar forward et.`,
  ].join("\n");
}

export function formatUpdateDiff(
  reference: string,
  beforeMap: Record<string, unknown>,
  afterMap: Record<string, unknown>
): string {
  const lines = [
    `<b>🔄 Güncelleme — ${esc(reference)}</b>`,
    "",
  ];
  const keys = new Set([...Object.keys(beforeMap), ...Object.keys(afterMap)]);
  let changeCount = 0;
  for (const k of keys) {
    const b = beforeMap[k];
    const a = afterMap[k];
    if (String(b) === String(a)) continue;
    changeCount++;
    lines.push(`<b>${esc(k)}</b>`);
    lines.push(`  <s>${esc(String(b ?? "—"))}</s>`);
    lines.push(`  → ${esc(String(a ?? "—"))}`);
  }
  if (changeCount === 0) {
    lines.push(`<i>Mevcutla aynı — değişiklik yok.</i>`);
  }
  return lines.join("\n");
}
