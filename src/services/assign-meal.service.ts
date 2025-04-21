import { PrismaClient } from '@prisma/client'
import {isValidTimeFormat} from '../helpers/validators'

const prisma = new PrismaClient()

interface assignMealData {
  dietId: string;
  time: string;
  protein: number;
  sugar: number;
  fat:number
  taken:boolean
}

export const assignMealService = async (data: assignMealData) => {

  const dietExists = await prisma.diet.findUnique({
    where: {id: data.dietId}
  })

  if (!dietExists) {
    throw new Error("La dieta no existe")
  }

  if (!isValidTimeFormat(data.time)) {
    throw new Error("Hora inválida")
  }

  const newMeal = await prisma.meal.create({
    data: {
      time: data.time,
      protein: data.protein,
      sugar: data.sugar,
      fat: data.fat,
      taken: false,
      diets: {
        connect: {
          id: data.dietId
        }
      }
    },
  })

  return newMeal
}