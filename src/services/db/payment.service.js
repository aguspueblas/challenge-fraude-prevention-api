const { Op } = require("sequelize");
const { Payment } = require("../../database/models");
const { PAYMENT_STATUS } = require("../../helpers/constants");
const moment = require("moment-timezone");
class PaymentService {
  #paymentModel;
  constructor() {
    this.#paymentModel = Payment;
  }
  /**
   * Metodo para obtener pagos por usuario en un rango de fechas.
   * @param {*} userId usuario.
   * @param {*} fromDate fecha desde
   * @param {*} toDate  fecha hasta
   * @returns
   */
  async getPaymentsFromData(userId, fromDate, toDate) {
    try {
      const countPayments = await this.#paymentModel.findAll({
        where: {
          user_id: userId, // Filtro por ID de usuario
          createdAt: {
            [Op.gte]: fromDate.toDate(), //Mayor que
            [Op.lt]: toDate.toDate(), // Menor que
          },
          state: PAYMENT_STATUS.REFUSED,
        },
      });
      return countPayments;
    } catch (error) {
      console.error("Error in PAYMENT_SERVICE.getPaymentLastDayByUser:", error);
      throw error;
    }
  }
}

module.exports = PaymentService;
