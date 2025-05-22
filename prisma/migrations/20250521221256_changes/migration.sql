/*
  Warnings:

  - Added the required column `carbs` to the `Meal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `energy` to the `Meal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `foodGroup` to the `Meal` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "FoodGroup" AS ENUM ('CEREALES', 'FRUTAS', 'VERDURAS', 'LACTEOS', 'PROTEINAS_ANIMALES', 'PROTEINAS_VEGETALES', 'GRASAS_SALUDABLES', 'AZUCARES');

-- AlterTable
ALTER TABLE "Diet" ADD COLUMN     "carbsPercentage" INTEGER,
ADD COLUMN     "dailyCalories" INTEGER,
ADD COLUMN     "fatPercentage" INTEGER,
ADD COLUMN     "proteinPercentage" INTEGER,
ADD COLUMN     "sodiumPercentage" INTEGER,
ADD COLUMN     "sugarPercentage" INTEGER;

-- AlterTable
ALTER TABLE "Meal" ADD COLUMN     "carbs" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "energy" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "fiber" DOUBLE PRECISION,
ADD COLUMN     "foodGroup" "FoodGroup" NOT NULL,
ADD COLUMN     "foodSubgroup" TEXT,
ADD COLUMN     "sodium" DOUBLE PRECISION;
