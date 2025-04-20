/*
  Warnings:

  - You are about to drop the `_DietMeals` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_DietMeals" DROP CONSTRAINT "_DietMeals_A_fkey";

-- DropForeignKey
ALTER TABLE "_DietMeals" DROP CONSTRAINT "_DietMeals_B_fkey";

-- DropTable
DROP TABLE "_DietMeals";

-- CreateTable
CREATE TABLE "_DietToMeal" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_DietToMeal_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_DietToMeal_B_index" ON "_DietToMeal"("B");

-- AddForeignKey
ALTER TABLE "_DietToMeal" ADD CONSTRAINT "_DietToMeal_A_fkey" FOREIGN KEY ("A") REFERENCES "Diet"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DietToMeal" ADD CONSTRAINT "_DietToMeal_B_fkey" FOREIGN KEY ("B") REFERENCES "Meal"("id") ON DELETE CASCADE ON UPDATE CASCADE;
