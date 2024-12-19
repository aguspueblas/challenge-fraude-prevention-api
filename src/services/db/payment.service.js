const { Op } = require("sequelize");
const { Payment } = require("../../database/models");
const { PAYMENT_STATUS } = require("../../helpers/constants");
const moment = require("moment-timezone");
class PaymentService {
  #paymentModel;
  constructor() {
    this.#paymentModel = Payment;
  }

  async getPaymentLastDayByUser(userId) {
    try {
      const countPayments = await this.#paymentModel.count({
        where: {
          user_id: userId, // Filtro por ID de usuario
          createdAt: {
            [Op.gte]: moment().subtract(1, "d"), // Mayor o igual que ayer
            [Op.lt]: moment(), // Menor que hoy
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
