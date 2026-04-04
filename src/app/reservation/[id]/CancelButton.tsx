"use client";

import { useState } from "react";
import { X, Loader2 } from "lucide-react";
import { cancelReservation } from "@/app/actions/reservation";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/Toast";

export default function CancelButton({ reservationId }: { reservationId: string }) {
  const [confirming, setConfirming] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const toastNotify = useToast();

  const handleCancel = async () => {
    setLoading(true);
    const result = await cancelReservation(reservationId);
    setLoading(false);

    if (result.success) {
      toastNotify.success("Reservation cancelled successfully.");
      router.refresh();
    } else {
      toastNotify.error(result.error || "Failed to cancel reservation.");
      setConfirming(false);
    }
  };

  if (confirming) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-xl p-4 space-y-3">
        <p className="text-sm text-red-800 font-medium">
          Are you sure you want to cancel this reservation?
        </p>
        <div className="flex gap-2">
          <button
            onClick={handleCancel}
            disabled={loading}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-full bg-red-600 text-white font-semibold text-sm hover:bg-red-700 transition-all disabled:opacity-50"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <X className="w-4 h-4" />}
            {loading ? "Cancelling..." : "Yes, Cancel"}
          </button>
          <button
            onClick={() => setConfirming(false)}
            disabled={loading}
            className="flex-1 py-2.5 rounded-full border border-[var(--line)] text-[var(--body-text)] font-semibold text-sm hover:bg-gray-50 transition-all"
          >
            Keep Booking
          </button>
        </div>
      </div>
    );
  }

  return (
    <button
      onClick={() => setConfirming(true)}
      className="flex items-center justify-center gap-2 w-full py-3 rounded-full border-2 border-red-300 text-red-600 font-semibold hover:bg-red-50 transition-all text-sm"
    >
      <X className="w-4 h-4" />
      Cancel Reservation
    </button>
  );
}
