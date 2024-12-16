'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Definir la asociación: Un usuario puede tener muchos pagos
      User.hasMany(sequelize.models.Payment, {
        foreignKey: 'user_id',
        as: 'payments'
      });
    }
  }
  User.init({
    country: {
      type: DataTypes.STRING,
      allowNull: null
    }
  }, {
    sequelize,
    modelName: 'users',
    timestamps: true
  });
  
  

  return User;
};