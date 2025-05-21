-- CreateEnum
CREATE TYPE "AlarmType" AS ENUM ('MEDICAMENTO', 'SUPLEMENTO');

-- CreateTable
CREATE TABLE "Alarm" (
    "id" TEXT NOT NULL,
    "patientId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "AlarmType" NOT NULL,
    "time" TEXT NOT NULL,
    "daysOfWeek" INTEGER[],
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Alarm_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Alarm" ADD CONSTRAINT "Alarm_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
