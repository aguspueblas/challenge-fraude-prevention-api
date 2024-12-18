class Forbidden {
  #statusCode;

  #message;

  #errorCode;

  constructor() {
    this.#statusCode = 401;
    this.#message = "";
    this.#errorCode = "";
  }

  getResponse() {
    return {
      statusCode: this.#statusCode,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: { message: this.#message, error_code: this.#errorCode },
    };
  }

  setInvalidCredentialsResponse() {
    this.#message = "Invalid or missing credentials";
    this.#errorCode = "invalid_credentials";
  }
}

exports.ForbiddenResponse = Forbidden;
