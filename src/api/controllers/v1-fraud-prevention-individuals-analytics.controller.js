const { OkResponse } = require("../responses");

class V1FPIndividualsAnalyticsController {
  constructor() {
    console.info(
      "Controller for: v1/fraud/prevention/individuals/analytics started.",
    );
  }

  async handler(req, res, next) {
    try {
      // Lógica de negocio (por ahora solo devolvemos un 'ok')
      const okResponse = new OkResponse();
      okResponse.setCustomResponse('ok');
      const response = okResponse.getResponse();
      return res.status(response.statusCode).json(response.body);
    } catch (error) {
      console.log(error);
      next(error); // Si hay un error, pasamos al middleware de manejo de errores
    }
  }
}

module.exports = V1FPIndividualsAnalyticsController; // Exportamos la instancia directamente
