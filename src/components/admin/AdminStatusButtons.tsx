import { updateReservationStatusAdminAction } from "@/app/actions/admin";

const statusActions = [
  { status: "pending", label: "Pending" },
  { status: "confirmed", label: "Confirm" },
  { status: "completed", label: "Complete" },
  { status: "cancelled", label: "Cancel" },
] as const;

export function AdminStatusButtons({
  reservationId,
  currentStatus,
}: {
  reservationId: string;
  currentStatus: string;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {statusActions.map((action) => (
        <form key={action.status} action={updateReservationStatusAdminAction}>
          <input type="hidden" name="reservationId" value={reservationId} />
          <input type="hidden" name="status" value={action.status} />
          <button
            type="submit"
            disabled={currentStatus === action.status}
            className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-all ${
              currentStatus === action.status
                ? "cursor-not-allowed bg-[var(--heading)] text-white opacity-85"
                : "border border-[var(--line)] bg-white text-[var(--heading)] hover:border-[var(--brand-primary)] hover:text-[var(--brand-primary)]"
            }`}
          >
            {action.label}
          </button>
        </form>
      ))}
    </div>
  );
}
