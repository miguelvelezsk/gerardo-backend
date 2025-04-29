import { Request, Response } from "express";
import { createDietService } from "../services/diet/create-diet.service";
import { deleteDietData } from "../services/diet/delete-diet.service";
import { getDietsService } from "../services/diet/get-diet.service";
import { updateDietData } from "../services/diet/updated-diet.service";

export const createDiet = async (req: Request, res: Response) => {
  try {
    const newDiet = await createDietService(req.body);
    res.status(201).json(newDiet);
  } catch (error) {
    console.error("Error al crear la dieta:", error);
    res.status(500).json({ error: "Error al crear la dieta" });
  }
};

export const deleteDiet = async (req: Request, res: Response) => {
  const {id} = req.params;

  try {
    const deletedDiet = await deleteDietData(id);
    res.status(200).json(deletedDiet);
  } catch (error) {
    console.error("Error al eliminar la dieta:", error);
    res.status(500).json({ error: "Error al eliminar la dieta" });
  }
};

export const getDiets = async (req: Request, res: Response) => {
  const{id, name, patientId} = req.query;

  try {
    const diets = await getDietsService({
      id: id as string,
      name: name as string,
      patientId: patientId as string,
    });

    if(diets.length == 0){
      res.status(404).json({ message: "No se encontraron dietas con los filtros seleccionados" });
      return
    }

    res.status(200).json(diets);
  } catch(error) {
    console.error("Error al obtener las dieta:", error);
    res.status(500).json({ error: "Error al obtener las dietas" });
  }
};

export const updateDiet = async (req: Request, res: Response) => {
  try {
    const updatedDiet = await updateDietData(req.body);
    res.status(200).json(updatedDiet);
  } catch (error) {
    console.error("Error al modificar la dieta:", error);
    res.status(500).json({ error: "Error al modificar la dieta" });
  }
};
