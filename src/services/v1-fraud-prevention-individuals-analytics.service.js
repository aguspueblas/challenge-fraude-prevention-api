const { PAYMENT_STATUS } = require("../helpers/constants");
const { getKeyRedis, setKeyRedis } = require("../helpers/utils");
const PaymentService = require("./db/payment.service");
const UserService = require("./db/user.service");
const moment = require("moment-timezone");
const GetCurrencyConverterService = require("./get-currency-converter.service");
const { ErrorConstructor } = require("../helpers/error-constructor");
const GetCurrencyConverteConnector = require("./connectors/get-currency-converter.connector");

class V1FraudPreventionIndividualsAnalyticsService {
  #userService;
  #paymentService;
  #currencyConverterService;
  #currentDate = moment().endOf("day");
  #dateSubtractSevenDays = moment().subtract(7, "days").startOf("day");

  constructor() {
    this.#userService = new UserService();
    this.#paymentService = new PaymentService();
    this.#currencyConverterService = new GetCurrencyConverterService();
  }

  async execute(req, res, next) {
    try {
      const { page = 1, limit = 10 } = req.query;
      const usersWithPagination =
        await this.#userService.getUsersWithPaginationAndPaymentsBetweenDates(
          page,
          limit,
          "ASC",
          this.#dateSubtractSevenDays.toDate(),
          this.#currentDate.toDate(),
        );
      const data = await this.#buildData(usersWithPagination.users);
      // return this.#buildResponse(usersWithPagination.pagination, data);
      return data;
    } catch (error) {
      console.error(error.message);
      throw error;
    }
  }

  async #buildData(users) {
    const response = [];
    for (const user of users){
      const data = user.dataValues;
      const rulesPaymets = await this.#applyRulesForPayments(data.payments);
      response.push({
        user_id: data.user_id,
        is_new_user: this.#isNewUser(data.createdAt),
        qty_rejected_1d: rulesPaymets.countPaymentRejectedLastDay, //Cantidad de pagos rechazados en el último dia.
        total_amt_7d: rulesPaymets.totalAmountUsd, // Monto total en USD de pagos no rechazados
      });
    }    
    return response;
  }

  #isNewUser(userCreationDate) {
    const userCreationDateFormat = moment(userCreationDate);
    return userCreationDateFormat.isAfter(this.#dateSubtractSevenDays);
  }

  async #applyRulesForPayments(userPayments) {
    const dateSubtractOneDay = this.#currentDate
      .subtract(1, "d")
      .startOf("day"); // Un día atrás desde la fecha actual
    let totalAmountUsd = 0; // Para almacenar el monto total en USD
    let countPaymentRejectedLastDay = 0; // Contador de pagos rechazados en el último día
    
    for (const payment of userPayments) {
      const data = payment.dataValues;
      const paymentDate = moment(data.createdAt);
      //Chequea que el pago sea del ultimo dia y que este en rechazado.
      if (data.state == PAYMENT_STATUS.REFUSED) {
        if (paymentDate.isAfter(dateSubtractOneDay)) {
          countPaymentRejectedLastDay += 1;
          continue;
        }
      } else {
        //Si no es un pago rechazado.
        if (data.state !== PAYMENT_STATUS.REFUSED) {
          const paymentCurrency = data.local_currency;
          if (paymentCurrency !== "USD") {
            const rate = await this.#currencyConverterService.getRate(
              paymentCurrency,
              "USD",
            );
            totalAmountUsd = data.amount * rate;
          } else {
            totalAmountUsd = data.amount;
          }
        }
      }
    };

    return { countPaymentRejectedLastDay, totalAmountUsd };
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
