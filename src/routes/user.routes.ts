import { Router } from "express";
import { getUser, registerUser } from "../controllers/user.controller";

const router = Router();

router.post("/register", registerUser);
router.get("/:id", getUser);

export default router;