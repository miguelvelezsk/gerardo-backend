import express from "express";
import cors from "cors";
import dietRoutes from "./routes/diet.routes";

const app = express();
app.use(cors());
app.use(express.json());

// routes
app.use("/diets", dietRoutes);

const PORT = 4000;
app.listen(PORT, () => {
  console.log("Servidor corriendo en el puerto:", PORT);
});


