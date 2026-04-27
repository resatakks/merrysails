-- CreateTable
CREATE TABLE "BotVisit" (
    "id" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "agent" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "ip" TEXT,
    "country" TEXT,
    "userAgent" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BotVisit_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "BotVisit_createdAt_idx" ON "BotVisit"("createdAt");

-- CreateIndex
CREATE INDEX "BotVisit_provider_idx" ON "BotVisit"("provider");

-- CreateIndex
CREATE INDEX "BotVisit_path_idx" ON "BotVisit"("path");
