import { VALIDATION_ERRORS } from '../constants/errorConstants';

const brand = (sequelize, DataTypes) => {
  const Brand = sequelize.define('Brand', {
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

  Brand.associate = (models) => {};

  return Brand;
};

export default brand;