/*
  Warnings:

  - You are about to drop the column `nutrientsSummary` on the `Diet` table. All the data in the column will be lost.
  - You are about to drop the column `components` on the `Meal` table. All the data in the column will be lost.
  - You are about to drop the column `dietId` on the `Meal` table. All the data in the column will be lost.
  - Added the required column `fat` to the `Meal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `protein` to the `Meal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sugar` to the `Meal` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Meal" DROP CONSTRAINT "Meal_dietId_fkey";

-- AlterTable
ALTER TABLE "Diet" DROP COLUMN "nutrientsSummary";

-- AlterTable
ALTER TABLE "Meal" DROP COLUMN "components",
DROP COLUMN "dietId",
ADD COLUMN     "fat" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "protein" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "sugar" DOUBLE PRECISION NOT NULL;

-- CreateTable
CREATE TABLE "_DietMeals" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_DietMeals_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_DietMeals_B_index" ON "_DietMeals"("B");

-- AddForeignKey
ALTER TABLE "_DietMeals" ADD CONSTRAINT "_DietMeals_A_fkey" FOREIGN KEY ("A") REFERENCES "Diet"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DietMeals" ADD CONSTRAINT "_DietMeals_B_fkey" FOREIGN KEY ("B") REFERENCES "Meal"("id") ON DELETE CASCADE ON UPDATE CASCADE;
