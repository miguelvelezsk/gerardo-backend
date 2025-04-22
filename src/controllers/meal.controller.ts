import { Request, Response } from "express";
import { createMealService } from "../services/meal/create-meal.service";
import { assignMealData } from "../services/meal/assign-meal.service";

export const createMeal = async (req: Request, res: Response) => {
  try {
    const newMeal = await createMealService(req.body);
    res.status(201).json(newMeal);
  } catch (error) {
    console.error("Error al crear la comida:", error);
    res.status(500).json({ error: "Error al crear la comida" });
  }
};

export const assignMeal = async (req: Request, res: Response) => {
  try {
    const updatedMeal = await assignMealData(req.body);
    res.status(200).json(updatedMeal);
  } catch (error) {
    console.error("Error al asignar la comida:", error);
    res.status(500).json({ error: "Error al asignar la comida" });
  }
};
