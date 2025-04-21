import { Request, Response } from "express";
import { assignMealService } from "../services/assign-meal.service";

export const assignMeal = async (req: Request, res: Response) => {
  try {
    const newMeal = await assignMealService(req.body);
    res.status(201).json(newMeal);
  } catch (error) {
    console.error("Error al asignar la comida:", error);
    res.status(500).json({ error: "Error al asignar la comida" });
  }
};