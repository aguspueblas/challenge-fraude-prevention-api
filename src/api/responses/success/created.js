class Created {
  #statusCode;

  #message;

  constructor() {
    this.#statusCode = 201;
    this.#message = "Created";
  }

  /**
   * It sets the response message to the data passed to the function.
   * @param [data=Created] - The data to be sent to the client.
   */
  setCustomResponse(data = "Created") {
    this.#message = data;
  }

  /**
   * It returns an object with a status code, headers, and a body
   * @returns A response object with a status code, headers, and a body.
   */
  getResponse() {
    return {
      statusCode: this.#statusCode,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: this.#message,
    };
  }
}
exports.CreatedResponse = Created;
