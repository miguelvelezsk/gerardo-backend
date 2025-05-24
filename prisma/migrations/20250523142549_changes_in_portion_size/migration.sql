/*
  Warnings:

  - Added the required column `size` to the `Meal` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PortionSize" AS ENUM ('PEQUEÑA', 'MEDIANA', 'GRANDE');

-- AlterTable
ALTER TABLE "Meal" ADD COLUMN     "size" "PortionSize" NOT NULL;
