import { Router } from "express";
import { logAlarmTaken, getAlarmLogs } from "../controllers/alarmLog.controller";

const router = Router();

router.post("/", logAlarmTaken);
router.get("/", getAlarmLogs);

export default router;