const { User, Payment } = require("../../database/models");

class UserService {
  #userModel;
  constructor() {
    this.#userModel = User;
  }

  async getUsersWithPagination(page, limit, order = "ASC") {
    try {
      const queryResult = await this.#userModel.findAndCountAll({
        limit,
        offset: (page - 1) * limit,
        order: [
          ["createdAt", order], // Ordenar por la columna 'createdAt' en orden descendente
        ],
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
      console.error("Error al obtener usuarios paginados:", error);
      throw error;
    }
  }
}

module.exports = UserService;
