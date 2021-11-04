-- CreateTable
CREATE TABLE "ColorToken" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "colorRed" DECIMAL(65,30) NOT NULL,
    "colorGreen" DECIMAL(65,30) NOT NULL,
    "colorBlue" DECIMAL(65,30) NOT NULL,
    "colorAlpha" DECIMAL(65,30) NOT NULL,
    "metadata" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ColorToken_pkey" PRIMARY KEY ("id")
);
