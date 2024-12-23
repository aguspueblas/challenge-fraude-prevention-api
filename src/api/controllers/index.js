const { ErrorHandler } = require("../middlewares");
const SwaggerController = require("./swagger/swagger-controller");
const V1FPIndividualsAnalyticsController = require("./v1-fraud-prevention-individuals-analytics.controller");

module.exports = {
  swaggerController: new SwaggerController(),
  V1FPIndividualsAnalyticsController: new V1FPIndividualsAnalyticsController(),
  ErrorHandler,
};
