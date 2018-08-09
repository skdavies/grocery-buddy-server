import Sequelize, { DataTypes } from 'sequelize';

export default class GroceryItem extends Sequelize.Model {

  static init(sequelize) {
    return super.init({
        uuid: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
          allowNull: false
        }
      }, {
        underscoredAll: true,
        sequelize
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.Product, {
      as: 'product'
    });
    this.belongsTo(models.Brand, {
      as: 'brand'
    });
  }

  static hasRequiredFields(data) {
    return !!(data.brand_uuid) && !!(data.product_uuid);
  }
}