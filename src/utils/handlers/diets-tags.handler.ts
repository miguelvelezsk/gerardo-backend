import { PrismaClient } from "@prisma/client";
import { analyzeDietTags } from "../analize-diet-tags";

export async function handleDietUpdate(mealId: string, prisma: PrismaClient) {
    const diets = await prisma.diet.findMany({
            where: { meals: { some: { id: mealId } } },
            select: { id: true }
    });

    await Promise.all(
        diets.map(async (diet) => {
            const tags = await analyzeDietTags(diet.id);
            await prisma.diet.update({
                where: { id: diet.id },
                data: { tags }
            });
        }) 
    );
};

export async function handleDietAssignUnassign(dietId: string, prisma: PrismaClient) {

  const tags = await analyzeDietTags(dietId);
  await prisma.diet.update({
    where: { id: dietId },
    data: { tags },
  });

};