import { VALIDATION_ERRORS } from '../constants/errorConstants.js';
import { USER_TYPES } from '../constants/types';
import Sequelize, { DataTypes } from 'sequelize';
import bcrypt from 'bcrypt';

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
						args: [8, 24],
						msg: VALIDATION_ERRORS.LENGTH_OUT_OF_BOUNDS(8, 24)
					}
				}
			},
			type: {
				type: DataTypes.ENUM(...Object.keys(USER_TYPES)),
				defaultValue: 'SHOPPER',
				allowNull: false
			},
			firstName: {
				type: DataTypes.STRING,
				field: 'first_name',
				validate: {
					len: {
						args: [1, 16],
						msg: VALIDATION_ERRORS.LENGTH_OUT_OF_BOUNDS(1, 16)
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
		},
		{
			underscoredAll: true,
			hooks: {
				beforeCreate: async (user, options) => {
					user.password = await bcrypt.hash(user.password, 10);
				}
			},
			sequelize
		}
		);
	}

	static associate(models) {
		this.hasMany(models.GroceryList, {
			as : 'groceryLists'
		});
	}

	serialize() {
		return {
			username: this.username,
			uuid: this.uuid,
			createdAt: this.created_at,
			updatedAt: this.updated_at,
			type: this.type,
			firstName: this.firstName,
			lastName: this.lastName
		};
	}
}