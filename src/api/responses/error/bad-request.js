class BadRequest {
  #statusCode;

  #message;

  #details;

  #errorCode;

  constructor() {
    this.#statusCode = 400;
    this.#message = "The request performed is not supported.";
    this.#details = "";
    this.#errorCode = "invalid_request";
  }

  getResponse() {
    return {
      statusCode: this.#statusCode,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: {
        message: this.#message,
        error_code: this.#errorCode,
        details: this.#details,
      },
    };
  }

  setInvalidResponse(details) {
    this.#details = details;
  }
}

exports.BadRequestResponse = BadRequest;
