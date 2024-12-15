const CONSTANTS = require("../../../helpers/constants");

const { PRECONDITION_FAILED_ERROR } = CONSTANTS;

class PreconditionFailed {
  #statusCode;

  #message;

  #details;

  #errorCode;

  constructor() {
    this.#statusCode = 412;
    this.#errorCode = "precondition_failed";
    this.#message = "The precondition for the request is failed";
    this.#details = null;
  }

  getResponse() {
    let body = {
      message: this.#message,
      error_code: this.#errorCode,
    };

    if (this.#details) body.details = this.#details;

    return {
      statusCode: this.#statusCode,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: body,
    };
  }

  isPreconditionFailed(errorCode) {
    const error = PRECONDITION_FAILED_ERROR.find((preconditionError) =>
      preconditionError.ERROR_CODES.some(
        (err) => err.toUpperCase() === errorCode.toUpperCase(),
      ),
    );

    return error ? error.BODY : false;
  }

  getIsPreconditionFailed(errorCode, details) {
    let response = false;
    const foundError = this.isPreconditionFailed(errorCode);

    if (details) {
      this.setPreconditionFailedResponse(details);
    }

    if (foundError) {
      this.setErrorCode(foundError.error_code);
      this.setMessage(foundError.message);
      response = this.getResponse();
    }
    return response;
  }

  setPreconditionFailedResponse(details) {
    this.#details = details;
  }

  setErrorCode(errorCode) {
    this.#errorCode = errorCode;
  }

  setMessage(message) {
    this.#message = message;
  }
}

exports.PreconditionFailedResponse = PreconditionFailed;
