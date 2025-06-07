import { Router } from 'express';
import { loginUser, refreshAccessToken } from '../controllers/auth.controller';

const router = Router();

router.post("/login", loginUser);
//@ts-ignore
router.post("/refresh-token", refreshAccessToken)

export default router;