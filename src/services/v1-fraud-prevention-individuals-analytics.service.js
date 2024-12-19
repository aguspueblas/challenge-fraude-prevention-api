const PaymentService = require("./db/payment.service");
const UserService = require("./db/user.service");
const moment = require("moment-timezone");
class V1FraudPreventionIndividualsAnalyticsService {
  #userService;
  #paymentService;
  constructor() {
    this.#userService = new UserService();
    this.#paymentService = new PaymentService();
  }

  async execute(req, res, next) {
    const { page = 1, limit = 10 } = req.query;
    //1.Obtener lista de usuarios con paginacion
    const usersWithPagination = await this.#userService.getUsersWithPagination(
      page,
      limit,
    );
    const data = await this.#buildDataResponse(usersWithPagination.users);
    return this.#buildResponse(usersWithPagination.pagination, data);
    //2.Trabajar sobre esa lista
    //3. RESPONSE
  }

  async #buildDataResponse(users) {
    const currentDate = moment();
    const data = await Promise.all(
      users.map(async (user) => {
        const data = user.dataValues;
        return {
          user_id: data.user_id,
          is_new_user: this.#isNewUser(data.createdAt),
          qty_rejected_1d: await this.#getRejectedPaymentLasDay(data.user_id), //Cantidad de pagos rechazados en el último dia.
          //total_amt_7d //Monto acumulado total (en usd) de pagos por usuario en la última semana.
        };
      }),
    );
    return data;
  }

  #isNewUser(userCreationDate) {
    const momentSubtractSevenDays = moment().subtract(7, "days");
    const userCreationDateFormat = moment(userCreationDate);
    return userCreationDateFormat.isAfter(momentSubtractSevenDays);
  }

  #getRejectedPaymentLasDay(userId) {
    try {
      const response = this.#paymentService.getPaymentLastDayByUser(userId);
      console.info(response);
      return response;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  #buildResponse(pagination, data) {
    const { currentPage, perPage, total, totalPages } = pagination;
    return {
      page: currentPage,
      per_page: perPage,
      total_pages: totalPages,
      total_count: total,
      data: data,
    };
  }
}
module.exports = V1FraudPreventionIndividualsAnalyticsService;
