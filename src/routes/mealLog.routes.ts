import { Router } from "express";
import { createMealLog, deleteMealLog, getMealLogs } from "../controllers/mealLog.controller";

const router = Router()

router.post("/", createMealLog);
router.get("/", getMealLogs);
router.delete("/", deleteMealLog);

export default router;