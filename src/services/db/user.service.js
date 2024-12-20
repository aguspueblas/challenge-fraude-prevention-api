const { Op } = require("sequelize");
const { User, Payment } = require("../../database/models");

class UserService {
  #userModel;
  constructor() {
    this.#userModel = User;
  }

  async getUsersWithPaginationAndPaymentsBetweenDates(
    page,
    limit,
    order = "ASC",
    fromDate,
    toDate,
  ) {
    try {
      const queryResult = await this.#userModel.findAndCountAll({
        limit,
        offset: (page - 1) * limit,
        order: [
          ["createdAt", order], // Ordenar por la columna 'createdAt' en orden descendente
        ],
        include: [
          {
            model: Payment,
            as: "payments",
            where: {
              createdAt: {
                [Op.gte]: fromDate,
                [Op.lt]: toDate,
              },
            },
            required: false,
          },
        ],
        distinct: true,
      });
      const totalPages = Math.ceil(queryResult.count / limit);
      return {
        users: queryResult.rows,
        pagination: {
          total: queryResult.count, // Total de usuarios en la base de datos
          totalPages, // Total de páginas
          currentPage: page, // Página actual
          perPage: limit, // Número de usuarios por página
        },
      };
    } catch (error) {
      console.error("Error al obtener usuarios paginados:", error.message);
      throw error;
    }
  }
}

module.exports = UserService;
