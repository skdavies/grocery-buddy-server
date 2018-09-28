import Sequelize, { DataTypes } from 'sequelize';

export default class GroceryItem extends Sequelize.Model {

	static init(sequelize) {
		return super.init({
			uuid: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
				primaryKey: true,
				allowNull: false
			},
			upc: {
				type: DataTypes.STRING,
				unique: true,
				validate: {
					len: {
						args: [12, 12],
						msg: 'UPC must be 12 characters long'
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
		this.belongsTo(models.Product, {
			as: 'product',
			onDelete: 'CASCADE'
		});
		this.belongsTo(models.Brand, {
			as: 'brand',
			onDelete: 'CASCADE'
		});
	}

	static hasRequiredFields(data) {
		return !!(data.product_uuid);
	}

	serialize() {
		return {
			uuid: this.uuid,
			createdAt: this.created_at,
			updatedAt: this.updated_at,
			upc: this.upc,
			brand: this.brand.serialize(),
			product: this.product.serialize()
		};
	}
}