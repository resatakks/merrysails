export interface BookingPrefill {
  packageName?: string;
  date?: string;
  guests?: number;
  time?: string;
}

type SearchValue = string | string[] | undefined;

function getFirstValue(value: SearchValue): string | undefined {
  if (Array.isArray(value)) {
    return value[0];
  }
  return value;
}

export function parseBookingPrefill(
  searchParams:
    | Record<string, SearchValue>
    | undefined
): BookingPrefill {
  const packageName = getFirstValue(searchParams?.package);
  const date = getFirstValue(searchParams?.date);
  const time = getFirstValue(searchParams?.time);
  const guestsValue = Number(getFirstValue(searchParams?.guests));
  const guests =
    Number.isFinite(guestsValue) && guestsValue >= 1
      ? Math.min(Math.trunc(guestsValue), 20)
      : undefined;

  return {
    packageName,
    date,
    guests,
    time,
  };
}
