const SwaggerRouting = require("./swagger");
const V1FraudPreventionRouting = require("./fraud-prevention/v1-fraude-prevention.routes");
const { ErrorHandler } = require("../middlewares");

exports.Routes = [
  V1FraudPreventionRouting,
  SwaggerRouting,
  ErrorHandler.handler,
];
