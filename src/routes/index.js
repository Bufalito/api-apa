const express = require("express");
const router = express.Router();
const fs = require("fs");

const PATH_ROUTER = __dirname;

const cleanFileName = (fileName) => {
  const clean = fileName.split(".").shift();
  return clean;
};

//TODO [index.js, aranceles.js]
fs.readdirSync(PATH_ROUTER).filter((fileName) => {
  const prefixeRoute = cleanFileName(fileName);
  if (prefixeRoute !== "index") {
    //TODO "/aranceles", require(....)
    console.log("Cargando ruta: ", `/${prefixeRoute}`);
    router.use(`/${prefixeRoute}`, require(`./${prefixeRoute}`));
  }
});

module.exports = { router };
