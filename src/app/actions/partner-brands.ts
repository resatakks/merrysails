"use server";

import { revalidatePath } from "next/cache";
import { requireAdminSession } from "@/lib/admin-auth";
import { updatePartnerReservationStatus } from "@/lib/partner-brands";

// Server action used by the Partner Brands admin tab to change a sister-brand
// reservation's status in that brand's OWN database. Additive — does not touch
// MerrySails' own reservation flow.
//
// Reminder surfaced in the UI: this does NOT send the partner brand's customer
// status email (that logic lives in the partner app).
export async function updatePartnerReservationStatusAction(input: {
  brandKey: string;
  reservationId: string;
  status: string;
}): Promise<void> {
  await requireAdminSession();

  const result = await updatePartnerReservationStatus(
    input.brandKey,
    input.reservationId,
    input.status
  );

  if (!result.ok) {
    throw new Error(result.error ?? "Failed to update partner reservation.");
  }

  revalidatePath("/admin/partner-brands");
}
