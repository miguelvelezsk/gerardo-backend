import e, { Request, Response } from "express";
import { createMealService } from "../services/meal/create-meal.service";
import { assignMealData } from "../services/meal/assign-meal.service";
import { deleteMealData } from "../services/meal/delete-meal.service";
import { getMealsService } from "../services/meal/get-meal.service";
import { updateMealService } from "../services/meal/update-meal.service";

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

export const deleteMeal = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const deletedMeal = await deleteMealData(id);
    res.status(200).json(deletedMeal);
  } catch (error) {
    console.error("Error al eliminar la comida:", error);
    res.status(500).json({ error: "Error al eliminar la comida" });
  }
};

export const getMeals = async (req: Request, res: Response) => {
  const { id, name, } = req.query;

  try {
    const meals = await getMealsService({
      id: id as string,
      name: name as string,
      dietId: req.query.dietId as string,
      type: req.query.type as string,
    });

    if (meals.length == 0) {
      res.status(404).json({ message: "No se encontraron comidas con los filtros seleccionados" });
      return;
    }

    res.status(200).json(meals);
  } catch (error) {
    console.error("Error al obtener las comidas:", error);
    res.status(500).json({ error: "Error al obtener las comidas" });
  }
};

export const updateMeal = async (req: Request, res: Response) => {
  try {
    const updatedMeal = await updateMealService(req.body);
    res.status(200).json(updatedMeal);
  } catch (error) {
    console.error("Error al actualizar la comida:", error);
    res.status(500).json({ error: "Error al actualizar la comida" });
  }
};


