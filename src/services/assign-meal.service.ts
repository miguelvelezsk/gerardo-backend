import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const assignMealService = async (data: {
  dietId: string
  time: Date
  components: string[]
}) => {
  const newMeal = await prisma.meal.create({
    data: {
      dietId: data.dietId,
      time: data.time,
      components: data.components,
      taken: false,
    },
  })

  return newMeal
}