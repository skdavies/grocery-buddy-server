import { VALIDATION_ERRORS } from '../constants/errorConstants.js';
import Sequelize, { DataTypes } from 'sequelize';
import { serializeList } from '../utils/utils';

export default class GroceryList extends Sequelize.Model {

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
			} }, {
			underscoredAll: true,
			sequelize
		}
		);
	}

	isOwnedBy(uuid) {
		return this.user.uuid === uuid;
	}

	static associate(models) {
		this.belongsTo(models.User, {
			as: 'user'
		});
		this.hasMany(models.GroceryListItem, {
			as: 'items',
			onDelete: 'CASCADE'
		});
	}

	static hasRequiredFields(data) {
		return !!(data.name);
	}

	serialize() {
		return {
			uuid: this.uuid,
			name: this.name,
			createdAt: this.created_at,
			updatedAt: this.updated_at,
			items: this.items ? serializeList(this.items) : []
		};
	}
}