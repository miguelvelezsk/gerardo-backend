import { Router } from "express";
import { createDiet, getDiets, updateDiet, assignDiet, deleteDiet} from "../controllers/diet.controller";

const router = Router();

router.post("/", createDiet);
router.put("/assign", assignDiet);
router.delete("/:id", deleteDiet);
router.get("/", getDiets);
router.put("/", updateDiet)

export default router;