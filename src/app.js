require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const { router } = require("./routes");

// Configurar CORS y JSON parsing
const allowedOrigins = [
  process.env.URL_FRONT_DESARROLLO,
  process.env.URL_FRONT_ORIGIN,
];
app.use(cors({ origin: allowedOrigins, methods: ["GET", "POST"] }));
app.use(express.json());

// Rutas
app.use("/api", router);

// Puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server is running on port ", PORT));
