const { validationResult } = require("express-validator");
const { BadRequestResponse } = require("../../responses");

const validateRequestResult = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorList = {};
    errors.array().forEach((err) => {
      errorList[err.path] = err.msg;
    });
    const badRequestResponse = new BadRequestResponse();
    badRequestResponse.setInvalidResponse(errorList);
    const response = badRequestResponse.getResponse();
    return res
      .status(response.statusCode)
      .set(response.headers)
      .json(response.body);
  }
  next();
};

module.exports = validateRequestResult;
