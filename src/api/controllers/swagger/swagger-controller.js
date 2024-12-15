const { SwaggerService } = require("../../../services");
const { OkResponse } = require("../../responses");
class SwaggerController {
  #swaggerService;
  constructor() {
    this.#swaggerService = new SwaggerService();
  }
  get swaggerService() {
    return this.#swaggerService;
  }
  swaggerUIPage() {
    return this.#swaggerService.getSwaggerUIPage();
  }
  serveSwagger() {
    return this.#swaggerService.getSwaggerServe();
  }
  /**
   * It returns the swagger.json file
   * @param req - The request object.
   * @param res - The response object.
   * @param next - The next middleware function in the stack.
   * @returns The swagger.json file
   */
  swaggerJSON(req, res, next) {
    try {
      const swaggerJSON = this.#swaggerService.getSwaggerJSON();
      console.log(swaggerJSON);
      const successResponse = new OkResponse();
      successResponse.setCustomResponse(swaggerJSON);
      const response = successResponse.getResponse();
      return res
        .status(response.statusCode)
        .set(response.headers)
        .json(response.body);
    } catch (error) {
      console.error("Error en request a /doc/swagger.json", error);
      next(error);
    }
  }
}
module.exports = SwaggerController;
