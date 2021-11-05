/*
  Warnings:

  - You are about to drop the column `colorAlpha` on the `ColorToken` table. All the data in the column will be lost.
  - You are about to drop the column `colorBlue` on the `ColorToken` table. All the data in the column will be lost.
  - You are about to drop the column `colorGreen` on the `ColorToken` table. All the data in the column will be lost.
  - You are about to drop the column `colorRed` on the `ColorToken` table. All the data in the column will be lost.
  - Added the required column `value` to the `ColorToken` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ColorToken" DROP COLUMN "colorAlpha",
DROP COLUMN "colorBlue",
DROP COLUMN "colorGreen",
DROP COLUMN "colorRed",
ADD COLUMN     "value" JSONB NOT NULL;
