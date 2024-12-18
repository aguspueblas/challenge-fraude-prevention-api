const authenticationAPIKey = require("./input/auth");
const validateRequestResult = require("./input/validate-request-result");
const validateHeaderApiKey = require("./input/validator-api-key");
const { ErrorHandler } = require("./output/error");

module.exports = {
  ErrorHandler: new ErrorHandler(),
  AuthenticationApiKey: authenticationAPIKey,
  ValidateHeaderApiKey: [validateHeaderApiKey, validateRequestResult],
  //EJ:
  //CommonHeadersValidator: [commonHeadersValidator, validateBodyRequestResult],
};
