require("dotenv").config();

const express = require("express");
const cors = require("cors");
const app = express();
const { router } = require("./routes");

const allowedOrigins = [
  process.env.URL_FRONT_DESARROLLO,
  process.env.URL_FRONT_ORIGIN,
];
app.use(express.json());
app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST"],
  })
);

app.use("/api", router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server is running on port ", PORT));
