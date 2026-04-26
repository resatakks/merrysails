CREATE TABLE "GoogleAdsLead" (
    "id" TEXT NOT NULL,
    "googleLeadId" TEXT,
    "formId" TEXT,
    "campaignId" TEXT,
    "campaignName" TEXT,
    "product" TEXT,
    "source" TEXT NOT NULL DEFAULT 'google_ads_lead_form',
    "name" TEXT,
    "phone" TEXT,
    "email" TEXT,
    "isTest" BOOLEAN NOT NULL DEFAULT false,
    "status" TEXT NOT NULL DEFAULT 'new',
    "rawPayload" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "GoogleAdsLead_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "GoogleAdsLead_googleLeadId_key" ON "GoogleAdsLead"("googleLeadId");
CREATE INDEX "GoogleAdsLead_createdAt_idx" ON "GoogleAdsLead"("createdAt");
CREATE INDEX "GoogleAdsLead_campaignName_idx" ON "GoogleAdsLead"("campaignName");
CREATE INDEX "GoogleAdsLead_phone_idx" ON "GoogleAdsLead"("phone");
CREATE INDEX "GoogleAdsLead_status_idx" ON "GoogleAdsLead"("status");
