const {
  InternalServerErrorResponse,
  ConflictResponse,
  PreconditionFailedResponse,
  NotFoundResponse,
  ServiceUnavailableResponse,
} = require("../../responses");
class ErrorHandler {
  constructor() {
    console.log("Building the error handler");
  }
  // eslint-disable-next-line no-unused-vars
  handler(err, req, res, next) {
    let response = false;
    try {
      console.debug(
        "Exception captured inside Output Middleware Error: ",
        err.message,
      );
      const conflictResponse = new ConflictResponse();
      const preconditionFailedResponse = new PreconditionFailedResponse();
      const notFoundResponse = new NotFoundResponse();
      const serviceUnavailableResponse = new ServiceUnavailableResponse();
      const errorFinders = [
        conflictResponse.getIfIsConflictError.bind(conflictResponse),
        preconditionFailedResponse.getIsPreconditionFailed.bind(
          preconditionFailedResponse,
        ),
        notFoundResponse.getIfIsNotFoundError.bind(notFoundResponse),
        serviceUnavailableResponse.getIsServiceUnavailableError.bind(
          serviceUnavailableResponse,
        ),
      ];
      for (const errorFunction of errorFinders) {
        const errorDetails = errorFunction(err.code, err.dextails);
        if (errorDetails) {
          return res
            .status(errorDetails.statusCode)
            .set(errorDetails.headers)
            .json(errorDetails.body);
        }
      }
      console.log("No se pudo encontrar un error valido ...");
      throw new Error("Defaulting to 500 error");
    } catch (error) {
      console.error("ERROR in handle error", error);
      const internalServerErrorResponse = new InternalServerErrorResponse();
      response = internalServerErrorResponse.getResponse();
      return res
        .status(response.statusCode)
        .set(response.headers)
        .json(response.body);
    }
  }
}
exports.ErrorHandler = ErrorHandler;
