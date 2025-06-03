/*
  Warnings:

  - The `type` column on the `PaymentMethod` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `type` column on the `Transaction` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- CreateEnum
CREATE TYPE "TransactionType" AS ENUM ('INCOME', 'EXPENSE');

-- CreateEnum
CREATE TYPE "PaymentMethodType" AS ENUM ('CREDIT_CARD', 'DEBIT_CARD', 'PIX', 'CASH');

-- CreateEnum
CREATE TYPE "TransactionFrequency" AS ENUM ('FIXED', 'RECORRENT', 'POSSIBLE');

-- AlterTable
ALTER TABLE "PaymentMethod" DROP COLUMN "type",
ADD COLUMN     "type" "PaymentMethodType" NOT NULL DEFAULT 'CREDIT_CARD';

-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "frenquecy" "TransactionFrequency" NOT NULL DEFAULT 'RECORRENT',
DROP COLUMN "type",
ADD COLUMN     "type" "TransactionType" NOT NULL DEFAULT 'EXPENSE';

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'USER';
