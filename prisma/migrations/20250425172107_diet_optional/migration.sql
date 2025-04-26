-- DropForeignKey
ALTER TABLE "Patient" DROP CONSTRAINT "Patient_dietId_fkey";

-- AlterTable
ALTER TABLE "Patient" ALTER COLUMN "dietId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Patient" ADD CONSTRAINT "Patient_dietId_fkey" FOREIGN KEY ("dietId") REFERENCES "Diet"("id") ON DELETE SET NULL ON UPDATE CASCADE;
