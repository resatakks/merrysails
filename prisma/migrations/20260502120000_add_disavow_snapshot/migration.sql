-- CreateTable
CREATE TABLE "DisavowSnapshot" (
    "id" TEXT NOT NULL,
    "domain" TEXT NOT NULL,
    "runAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "totalRefdoms" INTEGER NOT NULL,
    "toxicCount" INTEGER NOT NULL,
    "reviewCount" INTEGER NOT NULL,
    "toxic" JSONB NOT NULL,
    "review" JSONB,

    CONSTRAINT "DisavowSnapshot_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "DisavowSnapshot_domain_runAt_idx" ON "DisavowSnapshot"("domain", "runAt");
