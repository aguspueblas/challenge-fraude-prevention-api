class Ok {
  #statusCode;

  #message;

  constructor() {
    this.#statusCode = 200;
    this.#message = "Ok";
  }

  /**
   * It sets the response message to the data passed to the function.
   * @param [data=Action successfull] - The data to be sent to the client.
   */
  setCustomResponse(data = "Action successfull") {
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
exports.OkResponse = Ok;
