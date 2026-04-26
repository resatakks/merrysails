ALTER TABLE "Reservation"
  ADD COLUMN IF NOT EXISTS "internalCostEur" DOUBLE PRECISION,
  ADD COLUMN IF NOT EXISTS "confirmedAt" TIMESTAMP(3),
  ADD COLUMN IF NOT EXISTS "completedAt" TIMESTAMP(3);

ALTER TABLE "Reservation"
  ALTER COLUMN "status" SET DEFAULT 'new';

UPDATE "Reservation"
SET "status" = 'new'
WHERE "status" = 'pending';

CREATE INDEX IF NOT EXISTS "Reservation_createdAt_idx" ON "Reservation"("createdAt");
