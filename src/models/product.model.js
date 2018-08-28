import { VALIDATION_ERRORS } from '../constants/errorConstants';
import Sequelize, { DataTypes } from 'sequelize';

export default class Product extends Sequelize.Model {

	static init(sequelize) {
		return super.init({
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
			underscoredAll: true,
			sequelize
		}
		);
	}

	static associate(models) {
	}

	static hasRequiredFields(data) {
		return !!(data.name);
	}

	serialize() {
		return {
			uuid: this.uuid,
			name: this.name,
			createdAt: this.created_at,
			updatedAt: this.updated_at
		};
	}
}