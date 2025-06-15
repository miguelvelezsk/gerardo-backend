import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { authorizeRole } from "../middlewares/auth-role.middleware";
import { acceptCaregiver, cancelRequest, getRequest, sendCaregiver, unlinkCaregiver } from "../controllers/request.controller";

const router = Router();

router.post("/send", authMiddleware, authorizeRole("CUIDADOR"), sendCaregiver);
router.get("/", authMiddleware, getRequest);
router.patch("/accept", authMiddleware, authorizeRole("PACIENTE"), acceptCaregiver);
router.patch("/cancel/:id", authMiddleware, cancelRequest);
router.patch("/unlike/:patientId", authMiddleware, unlinkCaregiver);

export default router;