const CONSTANTS = require("../../../helpers/constants");

const { CONFLICT_ERROR } = CONSTANTS;

class Conflict {
  #statusCode;

  #message;

  #details;

  #errorCode;

  constructor() {
    this.#statusCode = 409;
    this.#errorCode = "conflict";
    this.#message = "The request performed fail";
    this.#details = null;
  }

  getIfIsConflictError(errorCode, details) {
    let response = false;
    const foundError = this.#isConflictError(errorCode);

    if (details) {
      this.setConflictErrorDetails(details);
    }

    if (foundError) {
      this.setErrorCode(foundError.error_code);
      this.setMessage(foundError.message);
      response = this.getResponse();
    }

    return response;
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

  #isConflictError(errorCode) {
    const error = CONFLICT_ERROR.find((conflictError) =>
      conflictError.ERROR_CODES.some(
        (err) => err.toUpperCase() === errorCode.toUpperCase(),
      ),
    );

    return error ? error.BODY : false;
  }

  setConflictErrorDetails(details) {
    this.#details = details;
  }

  setErrorCode(errorCode) {
    this.#errorCode = errorCode;
  }

  setMessage(message) {
    this.#message = message;
  }
}

exports.ConflictResponse = Conflict;
