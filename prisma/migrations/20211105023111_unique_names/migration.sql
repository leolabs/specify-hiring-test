/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `ColorToken` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ColorToken_name_key" ON "ColorToken"("name");
