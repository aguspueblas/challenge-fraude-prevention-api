const express = require("express");
const {
  AuthenticationApiKey,
  ValidateHeaderApiKey,
} = require("../../middlewares");
const { V1FPIndividualsAnalyticsController } = require("../../controllers");

const router = express.Router();

router.get(
  "/v1/fraud/prevention/individuals/analytics",
  ValidateHeaderApiKey,
  AuthenticationApiKey,
  V1FPIndividualsAnalyticsController.handler.bind(
    V1FPIndividualsAnalyticsController,
  ),
);

module.exports = router;
