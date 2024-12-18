const { header } = require("express-validator");

const validateHeaderApiKey = [
  header("api-key")
    .notEmpty()
    .withMessage("The header 'api-key' is required.")
    .bail()
    .isBase64()
    .withMessage("The header 'api-key' must be base64 format.")
    .bail(),
];

module.exports = validateHeaderApiKey;
