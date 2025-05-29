import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function analyzeDietTags(dietId: string): Promise<string[]> {
  const diet = await prisma.diet.findUnique({
    where: { id: dietId },
    include: {
      meals: true
    }
  });

  if (!diet || diet.meals.length === 0) return [];

  const totalMeals = diet.meals.length;

  const total = diet.meals.reduce(
    (acc, meal) => {
      acc.protein += meal.protein;
      acc.carbs += meal.carbs;
      acc.fat += meal.fat;
      acc.calories += meal.calories;
      acc.sugar += meal.sugar;
      acc.sodium += meal.sodium;
      acc.fiber += meal.fiber;
      return acc;
    },
    {
      protein: 0,
      carbs: 0,
      fat: 0,
      calories: 0,
      sugar: 0,
      sodium: 0,
      fiber: 0,
    }
  );

  const avg = {
    protein: total.protein / totalMeals,
    carbs: total.carbs / totalMeals,
    fat: total.fat / totalMeals,
    calories: total.calories / totalMeals,
    sugar: total.sugar / totalMeals,
    sodium: total.sodium / totalMeals,
    fiber: total.fiber / totalMeals,
  };

  const tags: string[] = [];

  if (avg.protein > 20) tags.push("Alta en proteína");
  if (avg.carbs < 30) tags.push("Baja en carbohidratos");
  if (avg.fat < 10) tags.push("Baja en grasa");
  if (avg.sugar < 5) tags.push("Baja en azúcar");
  if (avg.sodium < 300) tags.push("Baja en sodio");
  if (avg.fiber > 8) tags.push("Rica en fibra");

  const macroTotal = avg.protein + avg.carbs + avg.fat;
  const proteinRatio = avg.protein / macroTotal;
  const carbRatio = avg.carbs / macroTotal;
  const fatRatio = avg.fat / macroTotal;

  if (
    proteinRatio > 0.25 &&
    proteinRatio < 0.35 &&
    carbRatio > 0.4 &&
    carbRatio < 0.55 &&
    fatRatio > 0.15 &&
    fatRatio < 0.25
  ) {
    tags.push("Balanceada");
  }
  
  return tags;
}
