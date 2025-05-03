import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Crear Dieta
  const diet = await prisma.diet.create({
    data: {
      name: "Dieta balanceada",
      description: "Incluye alimentos de todos los grupos nutricionales",
    },
  });

  // Crear Comidas
  const desayuno = await prisma.meal.create({
    data: {
      name: "Huevos con tostadas",
      type: "DESAYUNO",
      protein: 20,
      sugar: 2,
      fat: 10,
      diets: { connect: { id: diet.id } },
    },
  });

  const almuerzo = await prisma.meal.create({
    data: {
      name: "Pollo con arroz",
      type: "ALMUERZO",
      protein: 35,
      sugar: 5,
      fat: 15,
      diets: { connect: { id: diet.id } },
    },
  });

  // Crear Paciente
  const patient = await prisma.patient.create({
    data: {
      id: "patient-1",
      name: "Juan Pérez",
      age: 30,
      eatingHabits: "Come 3 veces al día",
      diet: { connect: { id: diet.id } },
    },
  });

  // Registrar comidas consumidas (MealLog)
  await prisma.mealLog.create({
    data: {
      patientId: patient.id,
      mealId: desayuno.id,
    },
  });

  await prisma.mealLog.create({
    data: {
      patientId: patient.id,
      mealId: almuerzo.id,
    },
  });

  console.log("Datos de ejemplo insertados correctamente.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
