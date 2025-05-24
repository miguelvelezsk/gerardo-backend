/*
  Warnings:

  - The `tags` column on the `Meal` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Made the column `fat` on table `Meal` required. This step will fail if there are existing NULL values in that column.
  - Made the column `protein` on table `Meal` required. This step will fail if there are existing NULL values in that column.
  - Made the column `sugar` on table `Meal` required. This step will fail if there are existing NULL values in that column.
  - Made the column `carbs` on table `Meal` required. This step will fail if there are existing NULL values in that column.
  - Made the column `energy` on table `Meal` required. This step will fail if there are existing NULL values in that column.
  - Made the column `fiber` on table `Meal` required. This step will fail if there are existing NULL values in that column.
  - Made the column `foodGroup` on table `Meal` required. This step will fail if there are existing NULL values in that column.
  - Made the column `sodium` on table `Meal` required. This step will fail if there are existing NULL values in that column.
  - Made the column `calories` on table `Meal` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Meal" ALTER COLUMN "fat" SET NOT NULL,
ALTER COLUMN "protein" SET NOT NULL,
ALTER COLUMN "sugar" SET NOT NULL,
ALTER COLUMN "carbs" SET NOT NULL,
ALTER COLUMN "energy" SET NOT NULL,
ALTER COLUMN "fiber" SET NOT NULL,
ALTER COLUMN "foodGroup" SET NOT NULL,
ALTER COLUMN "sodium" SET NOT NULL,
DROP COLUMN "tags",
ADD COLUMN     "tags" TEXT[],
ALTER COLUMN "calories" SET NOT NULL;
