const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const { NotFoundResponse } = require("./api/responses");
const { Routes } = require("./api/routes");
const { overWriteLogs } = require("./helpers/logger"); //Wraps console log
const { Sequelize } = require("sequelize");
const config = require("./database/config/config");
overWriteLogs();

const getExpressPort = () => {
  if (process.env.NODE_ENV && process.env.NODE_ENV === "test") {
    return 0;
  }
  return 3000;
};
const morganMiddleware = morgan("combined", {
  stream: {
    write: (message) => console.info(message),
  },
});
const PORT = getExpressPort();
const app = express();

const middlewares = [
  cors({ origin: "*", methods: "POST" }),
  helmet(),
  morganMiddleware,
  express.json(),
  express.urlencoded({ extended: true }),
];

//Conexion con sequelize.
const sequelize = new Sequelize(config.development);
(async () => {
  try {
    await sequelize.authenticate(); // Intenta hacer la conexión
    console.log('Conexión a la base de datos establecida con éxito.');
  } catch (error) {
    console.error('No se pudo conectar a la base de datos:', error);
  }
})();
app.use(middlewares);
app.use("/", Routes);
app.use("*", (req, res) => {
  const notFoundResponse = new NotFoundResponse().getResponse();
  res.status(notFoundResponse.statusCode).json(notFoundResponse.body);
});

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

exports.Server = server;
