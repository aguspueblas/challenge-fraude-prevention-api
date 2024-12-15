class ServiceUnavailable {
  #statusCode;

  #message;

  #errorCode;

  constructor() {
    this.#statusCode = 503;
    this.#message = "The service is not available.";
    this.#errorCode = "service_unavailable";
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
