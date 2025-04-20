import { Request, Response } from "express";
import { assignDietService } from "../services/assign-diet.service";

export const assignDiet = async (req: Request, res: Response) => {
  try {
    const newDiet = await assignDietService(req.body);
    res.status(201).json(newDiet);
  } catch (error) {
    console.error("Error al asignar la dieta:", error);
    res.status(500).json({ error: "Error al asignar la dieta" });
  }
};