// Telegram Bot Types — MerrySails

export interface TelegramUpdate {
  update_id: number;
  message?: TelegramMessage;
  callback_query?: TelegramCallbackQuery;
}

export interface TelegramMessage {
  message_id: number;
  from?: TelegramUser;
  chat: TelegramChat;
  date: number;
  text?: string;
}

export interface TelegramUser {
  id: number;
  is_bot: boolean;
  first_name: string;
  last_name?: string;
  username?: string;
}

export interface TelegramChat {
  id: number;
  type: string;
  first_name?: string;
}

export interface TelegramCallbackQuery {
  id: string;
  from: TelegramUser;
  message?: TelegramMessage;
  chat_instance: string;
  data?: string;
}

export interface InlineKeyboardButton {
  text: string;
  callback_data?: string;
  url?: string;
}

export interface InlineKeyboardMarkup {
  inline_keyboard: InlineKeyboardButton[][];
}

export interface SendMessageParams {
  chat_id: string | number;
  text: string;
  parse_mode?: "HTML" | "MarkdownV2";
  reply_markup?: InlineKeyboardMarkup;
  disable_web_page_preview?: boolean;
}

// MerrySails reservation data (matches Prisma schema)
export interface SailsReservation {
  id: string;
  reservationId: string;
  tourSlug: string;
  tourName: string;
  date: string | Date;
  time: string;
  guests: number;
  totalPrice: number;
  currency: string;
  status: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerCountry?: string | null;
  notes?: string | null;
  createdAt?: string | Date;
  internalCostEur?: number | null;
  confirmedAt?: string | Date | null;
  completedAt?: string | Date | null;
  // Traffic attribution (so Telegram + admin can answer "where did this come from?")
  gclid?: string | null;
  gbraid?: string | null;
  wbraid?: string | null;
  gadSource?: string | null;
  utmSource?: string | null;
  utmMedium?: string | null;
  utmCampaign?: string | null;
  utmContent?: string | null;
  utmTerm?: string | null;
  referrerHost?: string | null;
  landingPath?: string | null;
  trafficChannel?: string | null;
}

export interface BookingAbandonmentAlert {
  source: string;
  trigger: string;
  occurredAt: string;
  pagePath?: string;
  pageUrl?: string;
  tourSlug: string;
  tourName: string;
  date: string;
  time?: string;
  guests: number;
  totalPrice: number;
  currency: string;
  priceMode?: "perPerson" | "perGroup" | "custom";
  packageName?: string;
  addOns: string[];
  departurePoint?: string;
  customerName?: string;
  customerEmail?: string;
  customerPhone?: string;
  customerMessage?: string;
  privateTransferRequested?: boolean;
  additionalGuests: string[];
  fieldsCompleted: string[];
}
