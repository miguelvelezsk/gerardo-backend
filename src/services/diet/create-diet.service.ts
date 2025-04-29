import { prisma } from '../../prisma/client';

interface createDietData {
	name: string;
	description: string;
  observations?: string;
}

export const createDietService = async (data: createDietData) => {

  const newDiet = await prisma.diet.create({
    data: {
      name: data.name,
      description: data.description,
      observations: data.observations || "",
    },
  });

  return newDiet;
};