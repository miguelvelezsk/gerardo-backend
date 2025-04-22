/*
  Warnings:

  - You are about to drop the column `patientId` on the `Diet` table. All the data in the column will be lost.
  - You are about to drop the column `time` on the `Meal` table. All the data in the column will be lost.
  - Added the required column `description` to the `Diet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Diet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Meal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Meal` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "MeatType" AS ENUM ('DESAYUNO', 'ALMUERZO', 'CENA', 'MERIENDA');

-- DropForeignKey
ALTER TABLE "Diet" DROP CONSTRAINT "Diet_patientId_fkey";

-- AlterTable
ALTER TABLE "Diet" DROP COLUMN "patientId",
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Meal" DROP COLUMN "time",
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "type" "MeatType" NOT NULL;

-- CreateTable
CREATE TABLE "_DietToPatient" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_DietToPatient_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_DietToPatient_B_index" ON "_DietToPatient"("B");

-- AddForeignKey
ALTER TABLE "_DietToPatient" ADD CONSTRAINT "_DietToPatient_A_fkey" FOREIGN KEY ("A") REFERENCES "Diet"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DietToPatient" ADD CONSTRAINT "_DietToPatient_B_fkey" FOREIGN KEY ("B") REFERENCES "Patient"("id") ON DELETE CASCADE ON UPDATE CASCADE;
