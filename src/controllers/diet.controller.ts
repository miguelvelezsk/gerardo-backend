import { Request, Response } from "express";
import { createDietService } from "../services/diet/create-diet.service";
import { assignDietData } from "../services/diet/assign-diet.service";

export const createDiet = async (req: Request, res: Response) => {
  try {
    const newDiet = await createDietService(req.body);
    res.status(201).json(newDiet);
  } catch (error) {
    console.error("Error al crear la dieta:", error);
    res.status(500).json({ error: "Error al crear la dieta" });
  }
};

export const assignDiet = async (req: Request, res: Response) => {
  try {
    const updatedDiet = await assignDietData(req.body);
    res.status(201).json(updatedDiet);
  } catch (error) {
    console.error("Error al asignar el paciente:", error);
    res.status(500).json({ error: "Error al asignar el paciente" });
  }
};