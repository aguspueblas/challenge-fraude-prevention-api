const SwaggerRouting = require("./swagger");
const { ErrorHandler } = require("../middlewares");

exports.Routes = [SwaggerRouting, ErrorHandler.handler];
