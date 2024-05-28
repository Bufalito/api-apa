require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const { router } = require("./routes");

// Configurar CORS y JSON parsing
const allowedOrigins = [
  process.env.URL_FRONT_DESARROLLO,
  process.env.URL_FRONT_ORIGIN,
];
app.use(cors());
app.use(express.json());

//mongodb connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Conectado a MongoDB"))
  .catch((err) => console.log("Error al conectar a MongoDB", err));

// Rutas
app.use("/api", router);

// Puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server is running on port ", PORT));
