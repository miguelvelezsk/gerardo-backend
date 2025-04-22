import { Router } from "express";
import { createMeal, assignMeal } from "../controllers/meal.controller";

const router = Router();

router.post("/", createMeal);
router.put("/assign", assignMeal)

export default router;