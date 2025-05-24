/*
  Warnings:

  - You are about to drop the column `caloriesAvg` on the `Diet` table. All the data in the column will be lost.
  - You are about to drop the column `carbsAvg` on the `Diet` table. All the data in the column will be lost.
  - You are about to drop the column `fatAvg` on the `Diet` table. All the data in the column will be lost.
  - You are about to drop the column `proteinAvg` on the `Diet` table. All the data in the column will be lost.
  - You are about to drop the column `sodiumAvg` on the `Diet` table. All the data in the column will be lost.
  - You are about to drop the column `sugarAvg` on the `Diet` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Diet" DROP COLUMN "caloriesAvg",
DROP COLUMN "carbsAvg",
DROP COLUMN "fatAvg",
DROP COLUMN "proteinAvg",
DROP COLUMN "sodiumAvg",
DROP COLUMN "sugarAvg",
ADD COLUMN     "tags" TEXT[] DEFAULT ARRAY[]::TEXT[];
