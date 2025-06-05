import express from "express";
import cors from "cors";
import patientRoutes from "./routes/patient.routes"
import dietRoutes from "./routes/diet.routes";
import mealRoutes from "./routes/meal.routes"
import mealLogRoutes from "./routes/mealLog.routes"
import alarmRoutes from "./routes/alarm.routes"
import alarmLogRoutes from "./routes/alarmLog.routes";
import userRoutes from "./routes/user.routes";
import authRoutes from "./routes/auth.routes";

const app = express();
app.use(cors());
app.use(express.json());

// routes
app.use("/patients", patientRoutes);
app.use("/diets", dietRoutes);
app.use("/meals", mealRoutes);
app.use("/mealLogs", mealLogRoutes);
app.use("/alarms", alarmRoutes);
app.use("/alarmLogs", alarmLogRoutes);
app.use("/users", userRoutes);
app.use("/auth", authRoutes);


const PORT = 4000;
app.listen(PORT, () => {
  console.log("Servidor corriendo en el puerto:", PORT);
});


