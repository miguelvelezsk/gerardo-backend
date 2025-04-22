import { Router } from "express";
import { createDiet, assignDiet } from "../controllers/diet.controller";

const router = Router();

router.post("/", createDiet);
router.put("/assign", assignDiet);

export default router;