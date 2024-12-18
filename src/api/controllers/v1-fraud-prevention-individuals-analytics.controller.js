class V1FPIndividualsAnalyticsController {
  constructor() {
    console.info(
      "Controller for: v1/fraud/prevention/individuals/analytics started.",
    );
  }

  async handler(req, res, next) {
    try {
      // Lógica de negocio (por ahora solo devolvemos un 'ok')
      return res.status(200).json({ message: "ok" });
    } catch (error) {
      next(error); // Si hay un error, pasamos al middleware de manejo de errores
    }
  }
}

module.exports = V1FPIndividualsAnalyticsController; // Exportamos la instancia directamente
