import { Router } from "express";
import { createPatient, getPatients, assignPatient, deletePatient, updatePatient } from "../controllers/patient.controller";

const router = Router();

router.post("/", createPatient);
router.put("/assign", assignPatient);
router.get("/", getPatients);
router.put("/", updatePatient);
router.delete("/:id", deletePatient);

export default router;