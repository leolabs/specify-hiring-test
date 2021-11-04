-- CreateTable
CREATE TABLE "ColorToken" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "colorRed" INTEGER NOT NULL,
    "colorGreen" INTEGER NOT NULL,
    "colorBlue" INTEGER NOT NULL,
    "colorAlpha" DECIMAL(65,30) NOT NULL,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ColorToken_pkey" PRIMARY KEY ("id")
);
