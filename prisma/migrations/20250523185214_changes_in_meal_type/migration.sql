/*
  Warnings:

  - Changed the column `type` on the `Meal` table from a scalar field to a list field. If there are non-null values in that column, this step will fail.

*/
-- AlterTable
ALTER TABLE "Meal" ALTER COLUMN "type" SET DATA TYPE "MeatType";
