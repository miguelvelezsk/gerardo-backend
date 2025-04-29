import { Router } from "express";
import { createMeal, assignMeal, deleteMeal, getMeals, updateMeal, unAssignMeal } from "../controllers/meal.controller";

const router = Router();

router.post("/", createMeal);
router.put("/assign", assignMeal);
router.put("/unassign", unAssignMeal);
router.delete("/:id", deleteMeal);
router.get("/", getMeals);
router.put("/", updateMeal)

export default router;