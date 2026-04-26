const MIN_WHATSAPP_DIGITS = 7;
const MAX_WHATSAPP_DIGITS = 18;

export function getWhatsAppPhone(value?: string | null): string | null {
  const digits = (value ?? "").replace(/\D/g, "");

  if (
    digits.length < MIN_WHATSAPP_DIGITS ||
    digits.length > MAX_WHATSAPP_DIGITS
  ) {
    return null;
  }

  return digits;
}

export function getWhatsAppUrl(value?: string | null): string | null {
  const phone = getWhatsAppPhone(value);
  return phone ? `https://wa.me/${phone}` : null;
}
