const express = require("express");
const router = express.Router();
const path = require("path");
const { swaggerController } = require("../../controllers");
const pathSwagger = path.join(__dirname, "../../../swagger");
router.use("/doc", swaggerController.serveSwagger());
router.use("/doc/files", express.static(pathSwagger));
router.get("/doc", swaggerController.swaggerUIPage());
router.get(
  "/doc/swagger.json",
  swaggerController.swaggerJSON.bind(swaggerController),
);
module.exports = router;
