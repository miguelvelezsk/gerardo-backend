import { Router } from "express";
import { getUser, registerUser, updateUser } from "../controllers/user.controller";
import { uploadedAvatar } from "../utils/upload.utils";

const router = Router();

router.post("/register", uploadedAvatar, registerUser);
router.get("/:id", getUser);
router.put("/", uploadedAvatar, updateUser)

export default router;