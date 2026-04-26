// Telegram Bot API Wrapper — MerrySails
import type { SendMessageParams, InlineKeyboardMarkup } from "./types";

const DEFAULT_TELEGRAM_TIMEOUT_MS = 8000;

function getTelegramApiTimeoutMs(): number {
  const configuredTimeout = Number(process.env.TELEGRAM_API_TIMEOUT_MS);

  if (Number.isFinite(configuredTimeout) && configuredTimeout >= 1000) {
    return configuredTimeout;
  }

  return DEFAULT_TELEGRAM_TIMEOUT_MS;
}

function getTelegramApiBase(): string | null {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  return botToken ? `https://api.telegram.org/bot${botToken}` : null;
}

function isSupportedInlineKeyboardUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return ["http:", "https:", "tg:"].includes(parsed.protocol);
  } catch {
    return false;
  }
}

function sanitizeInlineKeyboard(
  replyMarkup?: InlineKeyboardMarkup
): InlineKeyboardMarkup | undefined {
  if (!replyMarkup) {
    return undefined;
  }

  const inlineKeyboard = replyMarkup.inline_keyboard
    .map((row) =>
      row.filter((button) => {
        if (!button.url || isSupportedInlineKeyboardUrl(button.url)) {
          return true;
        }

        console.warn(
          `[TELEGRAM] Dropping unsupported inline keyboard URL for button "${button.text}".`
        );
        return false;
      })
    )
    .filter((row) => row.length > 0);

  return inlineKeyboard.length > 0
    ? { inline_keyboard: inlineKeyboard }
    : undefined;
}

export interface TelegramApiResponse<T = unknown> {
  ok: boolean;
  error_code?: number;
  description?: string;
  result?: T;
}

export function isInactiveChatError(data: TelegramApiResponse): boolean {
  if (data.ok) {
    return false;
  }

  const description = (data.description ?? "").toLowerCase();

  return (
    [400, 403].includes(data.error_code ?? 0) &&
    (
      description.includes("chat not found") ||
      description.includes("bot was blocked by the user") ||
      description.includes("user is deactivated")
    )
  );
}

async function callApi(method: string, body: Record<string, unknown>) {
  const apiBase = getTelegramApiBase();

  if (!apiBase) {
    return {
      ok: false,
      error_code: 503,
      description: "TELEGRAM_BOT_TOKEN is not configured",
    } satisfies TelegramApiResponse;
  }

  const timeoutMs = getTelegramApiTimeoutMs();
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  let data: TelegramApiResponse;

  try {
    const res = await fetch(`${apiBase}/${method}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      signal: controller.signal,
    });

    data = await res.json() as TelegramApiResponse;
  } catch (error) {
    data = {
      ok: false,
      error_code: error instanceof DOMException && error.name === "AbortError" ? 408 : 502,
      description:
        error instanceof DOMException && error.name === "AbortError"
          ? `Telegram API ${method} timed out after ${timeoutMs}ms`
          : error instanceof Error
            ? error.message
            : "Telegram API request failed",
    };
  } finally {
    clearTimeout(timeoutId);
  }

  if (!data.ok && !isInactiveChatError(data)) {
    console.error(`[TELEGRAM] API error (${method}):`, data);
  }

  return data;
}

export async function sendMessage(params: SendMessageParams) {
  return callApi("sendMessage", {
    chat_id: params.chat_id,
    text: params.text,
    parse_mode: params.parse_mode || "HTML",
    reply_markup: sanitizeInlineKeyboard(params.reply_markup),
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
    reply_markup: sanitizeInlineKeyboard(replyMarkup),
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
  const apiBase = getTelegramApiBase();

  if (!apiBase) {
    return {
      ok: false,
      error_code: 503,
      description: "TELEGRAM_BOT_TOKEN is not configured",
    } satisfies TelegramApiResponse;
  }

  const res = await fetch(`${apiBase}/getWebhookInfo`);
  return res.json();
}

export async function deleteWebhook() {
  return callApi("deleteWebhook", {});
}
