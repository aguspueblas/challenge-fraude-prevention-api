const CONSTANTS = require("../../../helpers/constants");

const { NOT_FOUND_ERROR } = CONSTANTS;

class NotFound {
  #statusCode;

  #message;

  #details;

  #errorCode;

  constructor() {
    this.#statusCode = 404;
    this.#message = "No endpoints were found";
    this.#errorCode = "not_found";
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

  getIfIsNotFoundError(errorCode, details) {
    let response = false;
    const foundError = this.#isNotFoundError(errorCode);

    if (details) {
      this.setNotFoundErrorDetails(details);
    }

    if (foundError) {
      this.setErrorCode(foundError.error_code);
      this.setMessage(foundError.message);
      response = this.getResponse();
    }

    return response;
  }

  #isNotFoundError(errorCode) {
    const error = NOT_FOUND_ERROR.find((notFoundError) =>
      notFoundError.ERROR_CODES.some(
        (err) => err.toUpperCase() === errorCode.toUpperCase(),
      ),
    );

    return error ? error.BODY : false;
  }

  setNotFoundErrorDetails(details) {
    this.#details = details;
  }

  setErrorCode(errorCode) {
    this.#errorCode = errorCode;
  }

  setMessage(message) {
    this.#message = message;
  }
}

exports.NotFoundResponse = NotFound;
