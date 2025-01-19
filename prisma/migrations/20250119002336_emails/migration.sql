/*
  Warnings:

  - You are about to drop the column `userId` on the `Email` table. All the data in the column will be lost.
  - Added the required column `userName` to the `Email` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Email" DROP CONSTRAINT "Email_userId_fkey";

-- DropIndex
DROP INDEX "Email_userId_email_key";

-- AlterTable
ALTER TABLE "Email" DROP COLUMN "userId",
ADD COLUMN     "userName" TEXT NOT NULL;
