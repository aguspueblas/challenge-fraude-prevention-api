"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const process = require("process");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development"; // Obtenemos el entorno
const config = require(__dirname + "/../config/config.js")[env]; // Requerimos el archivo JS
const db = {};

let sequelize;

// Creamos una nueva instancia de Sequelize usando la configuración
sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config,
);

// Leemos todos los modelos en la carpeta 'models' y los cargamos
fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 &&
      file !== basename &&
      file.slice(-3) === ".js" &&
      file.indexOf(".test.js") === -1
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes,
    );
    db[model.name] = model;
  });

// Si los modelos tienen asociaciones, las configuramos aquí
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
