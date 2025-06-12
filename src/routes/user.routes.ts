import { Router } from "express";
import { getUser, registerSpecialist, registerUser, updateUser } from "../controllers/user.controller";
import { uploadedAvatar } from "../utils/upload.utils";

const router = Router();

router.post("/register", uploadedAvatar, registerUser);
router.post("/register/specialist", uploadedAvatar, registerSpecialist);
router.get("/:id", getUser);
router.put("/", uploadedAvatar, updateUser)

export default router;