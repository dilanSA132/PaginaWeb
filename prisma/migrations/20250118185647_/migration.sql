/*
  Warnings:

  - Added the required column `amountToPay` to the `CreditPayment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CreditPayment" ADD COLUMN     "amountToPay" DOUBLE PRECISION NOT NULL;
