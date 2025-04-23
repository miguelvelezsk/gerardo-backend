import { Router } from "express";
import { createMeal, assignMeal, deleteMeal, getMeals, updateMeal } from "../controllers/meal.controller";

const router = Router();

router.post("/", createMeal);
router.put("/assign", assignMeal);
router.delete("/:id", deleteMeal);
router.get("/", getMeals);
router.put("/", updateMeal)

export default router;