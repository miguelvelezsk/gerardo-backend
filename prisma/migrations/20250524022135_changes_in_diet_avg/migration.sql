/*
  Warnings:

  - You are about to drop the column `carbsPercentage` on the `Diet` table. All the data in the column will be lost.
  - You are about to drop the column `dailyCalories` on the `Diet` table. All the data in the column will be lost.
  - You are about to drop the column `fatPercentage` on the `Diet` table. All the data in the column will be lost.
  - You are about to drop the column `proteinPercentage` on the `Diet` table. All the data in the column will be lost.
  - You are about to drop the column `sodiumPercentage` on the `Diet` table. All the data in the column will be lost.
  - You are about to drop the column `sugarPercentage` on the `Diet` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Diet" DROP COLUMN "carbsPercentage",
DROP COLUMN "dailyCalories",
DROP COLUMN "fatPercentage",
DROP COLUMN "proteinPercentage",
DROP COLUMN "sodiumPercentage",
DROP COLUMN "sugarPercentage",
ADD COLUMN     "caloriesAvg" DOUBLE PRECISION,
ADD COLUMN     "carbsAvg" DOUBLE PRECISION,
ADD COLUMN     "fatAvg" DOUBLE PRECISION,
ADD COLUMN     "proteinAvg" DOUBLE PRECISION,
ADD COLUMN     "sodiumAvg" DOUBLE PRECISION,
ADD COLUMN     "sugarAvg" DOUBLE PRECISION;
