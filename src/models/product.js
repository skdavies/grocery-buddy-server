import { VALIDATION_ERRORS } from '../constants/errorConstants';

const product = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: {
          args: [2, 32],
          msg: VALIDATION_ERRORS.LENGTH_OUT_OF_BOUNDS(2, 32)
        }
      }
    }
  }, {
    underscoredAll: true
  });

  Product.associate = (models) => {};

  return Product;
};

export default product;