import { Router } from "express";
import { assignMeal } from "../controllers/meal.controller";

const router = Router();

router.post("/assign", assignMeal);

export default router;