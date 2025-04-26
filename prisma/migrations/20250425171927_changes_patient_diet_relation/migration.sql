/*
  Warnings:

  - You are about to drop the column `endDate` on the `Diet` table. All the data in the column will be lost.
  - You are about to drop the column `startDate` on the `Diet` table. All the data in the column will be lost.
  - You are about to drop the column `taken` on the `Meal` table. All the data in the column will be lost.
  - You are about to drop the `_DietToPatient` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `dietId` to the `Patient` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "MeatType" ADD VALUE 'MEDIAMAÑANA';
ALTER TYPE "MeatType" ADD VALUE 'MEDIATARDE';

-- DropForeignKey
ALTER TABLE "_DietToPatient" DROP CONSTRAINT "_DietToPatient_A_fkey";

-- DropForeignKey
ALTER TABLE "_DietToPatient" DROP CONSTRAINT "_DietToPatient_B_fkey";

-- AlterTable
ALTER TABLE "Diet" DROP COLUMN "endDate",
DROP COLUMN "startDate",
ADD COLUMN     "observations" TEXT NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE "Meal" DROP COLUMN "taken";

-- AlterTable
ALTER TABLE "Patient" ADD COLUMN     "dietId" TEXT NOT NULL;

-- DropTable
DROP TABLE "_DietToPatient";

-- CreateTable
CREATE TABLE "MealLog" (
    "patientId" TEXT NOT NULL,
    "mealId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MealLog_pkey" PRIMARY KEY ("patientId","mealId","date")
);

-- AddForeignKey
ALTER TABLE "Patient" ADD CONSTRAINT "Patient_dietId_fkey" FOREIGN KEY ("dietId") REFERENCES "Diet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MealLog" ADD CONSTRAINT "MealLog_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MealLog" ADD CONSTRAINT "MealLog_mealId_fkey" FOREIGN KEY ("mealId") REFERENCES "Meal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
