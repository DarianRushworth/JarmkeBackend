'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      product.belongsTo(models.category)
      product.belongsToMany(models.order, {
        through: "orderProducts",
        foreignKey: "productId"
      })
      product.belongsToMany(models.user, {
        through: "userFavorites",
        key: "productId"
      })
    }
  };
  product.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "categories",
        key: "id"
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    },
    unitsInStock: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    metal: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'product',
  });
  return product;
};