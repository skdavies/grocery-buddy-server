import Sequelize, { DataTypes } from 'sequelize';

export default class GroceryListItem extends Sequelize.Model {

	static init(sequelize) {
		return super.init({
			uuid: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
				primaryKey: true,
				allowNull: false
			},
			quantity: {
				type: DataTypes.INTEGER,
				defaultValue: 1,
				allowNull: false
			},
			rank: {
				type: DataTypes.INTEGER,
				allowNull: false
			},
			completed: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
				defaultValue: false
			}
		}, {
			underscoredAll: true,
			sequelize
		}
		);
	}

	static associate(models) {
		this.belongsTo(models.GroceryItem, {
			as: 'groceryItem'
		});
	}
  
	serialize() {
		return {
			uuid: this.uuid,
			createdAt: this.created_at,
			updatedAt: this.updated_at,
			rank: this.rank,
			quantity: this.quantity,
			completed: this.completed
		};
	}
}