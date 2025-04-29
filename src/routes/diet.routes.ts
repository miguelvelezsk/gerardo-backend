import { Router } from "express";
import { createDiet, getDiets, updateDiet, deleteDiet} from "../controllers/diet.controller";

const router = Router();

router.post("/", createDiet);
router.delete("/:id", deleteDiet);
router.get("/", getDiets);
router.put("/", updateDiet)

export default router;