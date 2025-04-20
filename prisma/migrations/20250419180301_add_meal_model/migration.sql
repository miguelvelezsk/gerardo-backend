-- CreateTable
CREATE TABLE "Meal" (
    "id" TEXT NOT NULL,
    "dietId" TEXT NOT NULL,
    "time" TIMESTAMP(3) NOT NULL,
    "components" TEXT[],
    "taken" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Meal_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Meal" ADD CONSTRAINT "Meal_dietId_fkey" FOREIGN KEY ("dietId") REFERENCES "Diet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
