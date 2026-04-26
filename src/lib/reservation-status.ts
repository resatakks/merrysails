export const ACTIVE_RESERVATION_STATUSES = [
  "new",
  "confirmed",
  "completed",
] as const;

export function normalizeReservationStatus(status?: string | null): string {
  if (!status) {
    return "new";
  }

  return status === "pending" ? "new" : status;
}

export function isReservationStatus(
  value: string
): value is "new" | "confirmed" | "completed" | "cancelled" {
  return ["new", "confirmed", "completed", "cancelled"].includes(value);
}

export function getReservationStatusLabel(status?: string | null): string {
  switch (normalizeReservationStatus(status)) {
    case "new":
      return "New";
    case "confirmed":
      return "Confirmed";
    case "completed":
      return "Completed";
    case "cancelled":
      return "Cancelled";
    default:
      return status || "New";
  }
}

export function getReservationStatusBadgeClass(status?: string | null): string {
  switch (normalizeReservationStatus(status)) {
    case "new":
      return "border-amber-200 bg-amber-50 text-amber-800";
    case "confirmed":
      return "border-emerald-200 bg-emerald-50 text-emerald-800";
    case "completed":
      return "border-sky-200 bg-sky-50 text-sky-800";
    case "cancelled":
      return "border-rose-200 bg-rose-50 text-rose-800";
    default:
      return "border-[var(--line)] bg-[var(--surface-alt)] text-[var(--heading)]";
  }
}

export function getReservationStatusIcon(status?: string | null): string {
  switch (normalizeReservationStatus(status)) {
    case "new":
      return "•••";
    case "confirmed":
      return "✓";
    case "completed":
      return "✓";
    case "cancelled":
      return "×";
    default:
      return "";
  }
}

export function getReservationStatusTone(status?: string | null): string {
  switch (normalizeReservationStatus(status)) {
    case "new":
      return "bg-amber-50 text-amber-900 border-amber-200";
    case "confirmed":
      return "bg-emerald-50 text-emerald-800 border-emerald-200";
    case "completed":
      return "bg-blue-50 text-blue-800 border-blue-200";
    case "cancelled":
      return "bg-red-50 text-red-800 border-red-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
}
