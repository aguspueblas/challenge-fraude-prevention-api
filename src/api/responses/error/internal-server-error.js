class InternalServerError {
  #statusCode;

  #message;

  #errorCode;

  constructor() {
    this.#statusCode = 500;
    this.#message = "Unexpected error. Please try again.";
    this.#errorCode = "internal_server_error";
  }

  getResponse() {
    return {
      statusCode: this.#statusCode,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: { message: this.#message, error_code: this.#errorCode },
    };
  }
}

exports.InternalServerErrorResponse = InternalServerError;
