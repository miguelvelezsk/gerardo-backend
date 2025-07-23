import { Router } from "express";
import { getPatients, assignDietToPatient, deletePatient, updatePatient, getPatientStats } from "../controllers/patient.controller";

const router = Router();

router.put("/assign", assignDietToPatient);
router.get("/", getPatients);
router.put("/", updatePatient);
router.delete("/:id", deletePatient);
router.get("/stats/:id", getPatientStats)

export default router;