import { Router } from "express";
import { createAlarm, listAlarmsByPatient, updateAlarm, deleteAlarm, deactivateAlarm, listAlarmsForPush, searchAlarmByPatient, getAlarm } from "../controllers/alarm.controller";

const router = Router();

router.post("/", createAlarm);
router.put("/", updateAlarm);
router.put("/deactivate", deactivateAlarm);
//@ts-ignore
router.get("/list", listAlarmsByPatient);
//@ts-ignore
router.get("/search", searchAlarmByPatient);
router.get("/push/:patientId", listAlarmsForPush);
router.get("/", getAlarm);
router.delete("/:id", deleteAlarm);


export default router;