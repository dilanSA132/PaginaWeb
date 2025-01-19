/*
  Warnings:

  - A unique constraint covering the columns `[userId,email]` on the table `Email` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Email_email_key";

-- CreateIndex
CREATE UNIQUE INDEX "Email_userId_email_key" ON "Email"("userId", "email");
