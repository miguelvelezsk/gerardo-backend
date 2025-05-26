import { Router } from "express";
import { getPatients, assignDietToPatient, deletePatient, updatePatient } from "../controllers/patient.controller";

const router = Router();

router.put("/assign", assignDietToPatient);
router.get("/", getPatients);
router.put("/", updatePatient);
router.delete("/:id", deletePatient);

export default router;