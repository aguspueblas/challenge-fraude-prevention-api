"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Payment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Definir la asociación: Un pago pertenece a un usuario
      Payment.belongsTo(models.User, {
        foreignKey: "userId", // Clave foránea en la tabla Payment
        as: "user", // Alias para acceder al usuario desde un pago
      });
    }
  }
  Payment.init(
    {
      user_id: DataTypes.STRING,
      state: DataTypes.STRING,
      local_currency: DataTypes.STRING,
      amount: DataTypes.FLOAT,
    },
    {
      sequelize,
      modelName: "Payment",
      timestamps: true,
    },
  );
  return Payment;
};
