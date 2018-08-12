import { VALIDATION_ERRORS } from '../constants/errorConstants.js';
import { USER_TYPES } from '../constants/types';
import Sequelize, { DataTypes } from 'sequelize';

export default class User extends Sequelize.Model {

  static init(sequelize) {
    return super.init({
        uuid: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
          allowNull: false
        },
        username: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
          validate: {
            len: {
              args: [2, 16],
              msg: VALIDATION_ERRORS.LENGTH_OUT_OF_BOUNDS(2, 16)
            }
          }
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            len: {
              args: [2, 16],
              msg: VALIDATION_ERRORS.LENGTH_OUT_OF_BOUNDS(2, 16)
            }
          }
        },
        type: {
          type: DataTypes.ENUM(...USER_TYPES),
          allowNull: false
        },
        firstName: {
          type: DataTypes.STRING,
          field: 'first_name',
          validate: {
            len: {
              args: [2, 16],
              msg: VALIDATION_ERRORS.LENGTH_OUT_OF_BOUNDS(2, 16)
            }
          }
        },
        lastName: {
          type: DataTypes.STRING,
          field: 'last_name',
          validate: {
            len: {
              args: [2, 16],
              msg: VALIDATION_ERRORS.LENGTH_OUT_OF_BOUNDS(2, 16)
            }
          }
        }
      }, {
        underscoredAll: true,
        sequelize
      }
    );
  }

  static associate(models) {
  }

  static hasRequiredFields(data) {
    return !!(data.username) && !!(data.password) && !!(data.type);
  }
}