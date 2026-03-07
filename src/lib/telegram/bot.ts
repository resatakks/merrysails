// Telegram Bot API Wrapper — MerrySails
import type { SendMessageParams, InlineKeyboardMarkup } from "./types";

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN!;
const API_BASE = `https://api.telegram.org/bot${BOT_TOKEN}`;

async function callApi(method: string, body: Record<string, unknown>) {
  const res = await fetch(`${API_BASE}/${method}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  if (!data.ok) console.error(`[TELEGRAM] API error (${method}):`, data);
  return data;
}

export async function sendMessage(params: SendMessageParams) {
  return callApi("sendMessage", {
    chat_id: params.chat_id,
    text: params.text,
    parse_mode: params.parse_mode || "HTML",
    reply_markup: params.reply_markup,
    disable_web_page_preview: params.disable_web_page_preview ?? true,
  });
}

export async function editMessageText(
  chatId: string | number,
  messageId: number,
  text: string,
  replyMarkup?: InlineKeyboardMarkup
) {
  return callApi("editMessageText", {
    chat_id: chatId,
    message_id: messageId,
    text,
    parse_mode: "HTML",
    reply_markup: replyMarkup,
    disable_web_page_preview: true,
  });
}

export async function answerCallbackQuery(callbackQueryId: string, text?: string, showAlert?: boolean) {
  return callApi("answerCallbackQuery", {
    callback_query_id: callbackQueryId,
    text,
    show_alert: showAlert,
  });
}

export async function setWebhook(url: string, secret?: string) {
  const body: Record<string, unknown> = { url };
  if (secret) body.secret_token = secret;
  return callApi("setWebhook", body);
}

export async function getWebhookInfo() {
  const res = await fetch(`${API_BASE}/getWebhookInfo`);
  return res.json();
}

export async function deleteWebhook() {
  return callApi("deleteWebhook", {});
}
