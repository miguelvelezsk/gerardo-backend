import { Router } from "express";
import { createAlarm, listAlarmsByPatient, updateAlarm, deleteAlarm, deactivateAlarm, listAlarmsForPush } from "../controllers/alarm.controller";

const router = Router();

router.post("/", createAlarm);
router.put("/", updateAlarm);
router.put("/deactivate", deactivateAlarm);
//@ts-ignore
router.get("/", listAlarmsByPatient);
router.get("/push/:patientId", listAlarmsForPush);
router.delete("/:id", deleteAlarm);

export default router;