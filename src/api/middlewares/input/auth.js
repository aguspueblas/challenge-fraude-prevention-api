const { ForbiddenResponse } = require("../../responses");
const config = require("../../../../config/env");
var base64 = require("uuid-base64");

const authenticationAPIKey = (req, res, next) => {
  const apiKey = req.headers["api-key"];
  const decodeApiKey = base64.decode(apiKey);
  const clientApiKeyBase64 = config.AUTH.API_KEY;
  const decodeInternalApiKey = base64.decode(clientApiKeyBase64);

  if (decodeApiKey !== decodeInternalApiKey) {
    const response = new ForbiddenResponse();
    response.setInvalidCredentialsResponse();
    return res
      .status(response.getResponse().statusCode)
      .json(response.getResponse().body);
  }
  next();
};

module.exports = authenticationAPIKey;
