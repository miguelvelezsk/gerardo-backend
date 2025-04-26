import { Router } from "express";
import { createMealLog } from "../controllers/mealLog.controller";

const router = Router()

router.post("/", createMealLog);
