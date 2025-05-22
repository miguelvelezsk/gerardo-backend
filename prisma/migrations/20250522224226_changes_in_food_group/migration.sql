/*
  Warnings:

  - The values [CEREALES] on the enum `FoodGroup` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `foodSubgroup` on the `Meal` table. All the data in the column will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "FoodGroup_new" AS ENUM ('CARBOHIDRATOS', 'FRUTAS', 'VERDURAS', 'LACTEOS', 'PROTEINAS_ANIMALES', 'PROTEINAS_VEGETALES', 'GRASAS_SALUDABLES', 'AZUCARES');
ALTER TABLE "Meal" ALTER COLUMN "foodGroup" TYPE "FoodGroup_new" USING ("foodGroup"::text::"FoodGroup_new");
ALTER TYPE "FoodGroup" RENAME TO "FoodGroup_old";
ALTER TYPE "FoodGroup_new" RENAME TO "FoodGroup";
DROP TYPE "FoodGroup_old";
COMMIT;

-- AlterTable
ALTER TABLE "Meal" DROP COLUMN "foodSubgroup",
ADD COLUMN     "ingredients" JSONB,
ADD COLUMN     "tags" TEXT;
