import express from "express";
import cors from "cors";
import patientRoutes from "./routes/patient.routes"
import dietRoutes from "./routes/diet.routes";
import mealRoutes from "./routes/meal.routes"
import mealLogRouter from "./routes/mealLog.routes"

const app = express();
app.use(cors());
app.use(express.json());

// routes
app.use("/patients", patientRoutes);
app.use("/diets", dietRoutes);
app.use("/meals", mealRoutes);
app.use("/mealLogs", mealLogRouter);


const PORT = 4000;
app.listen(PORT, () => {
  console.log("Servidor corriendo en el puerto:", PORT);
});


