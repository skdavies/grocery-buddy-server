'use strict';
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('grocery_items', {
			id: {
				allowNull: false,
				autoIncrement: true,
				type: Sequelize.INTEGER
			},
			uuid: {
				type: Sequelize.UUID,
				defaultValue: Sequelize.literal('uuid_generate_v4()'),
				allowNull: false,
				unique: false,
				primaryKey: true
			},
			upc: {
				type: Sequelize.STRING,
				unique: true
			},
			created_at: {
				allowNull: false,
				type: Sequelize.DATE,
				defaultValue: Sequelize.fn('now')
			},
			updated_at: {
				allowNull: false,
				type: Sequelize.DATE,
				defaultValue: Sequelize.fn('now')
			},
			brand_uuid: {
				type: Sequelize.UUID,
				onDelete: 'CASCADE',
				onUpdate: 'CASCADE',
				references: {
					model: 'brands',
					key: 'uuid'
				}
			},
			product_uuid: {
				type: Sequelize.UUID,
				allowNull: false,
				onDelete: 'CASCADE',
				onUpdate: 'CASCADE',
				references: {
					model: 'products',
					key: 'uuid'
				}
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('grocery_items');
	}
};