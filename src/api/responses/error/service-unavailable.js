const { SERVICE_UNAVAILABLE_ERROR } = require("../../../helpers/constants");

class ServiceUnavailable {
  #statusCode;

  #message;

  #errorCode;

  constructor() {
    this.#statusCode = 503;
    this.#message = "The service is not available.";
    this.#errorCode = "service_unavailable";
  }

  setErrorCode(errorCode) {
    this.#errorCode = errorCode;
  }
  setMessage(message) {
    this.#message = message;
  }
  isServiceUnavailable(errorCode) {
    const error = SERVICE_UNAVAILABLE_ERROR.find((serviceUnavailableError) =>
      serviceUnavailableError.ERROR_CODES.some(
        (err) => err.toUpperCase() === errorCode.toUpperCase(),
      ),
    );

    return error ? error.BODY : false;
  }

  getIsServiceUnavailableError(errorCode, details) {
    let response = false;
    const foundError = this.isServiceUnavailable(errorCode);

    if (foundError) {
      this.setErrorCode(foundError.error_code);
      this.setMessage(foundError.message);
      response = this.getResponse();
    }
    return response;
  }

  getResponse() {
    return {
      statusCode: this.#statusCode,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: { message: this.#message, error_code: this.#errorCode },
    };
  }
}

exports.ServiceUnavailableResponse = ServiceUnavailable;
