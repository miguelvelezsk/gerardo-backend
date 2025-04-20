import { Router } from "express";
import { assignDiet } from "../controllers/diet.controller";

const router = Router();

router.post("/assign", assignDiet);

export default router;