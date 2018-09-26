'use strict';
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('grocery_list_items', {
			id: {
				allowNull: false,
				autoIncrement: true,
				type: Sequelize.INTEGER
			},
			uuid: {
				allowNull: false,
				type: Sequelize.UUID,
				defaultValue: Sequelize.UUIDV4,
				primaryKey: true
			},
			rank: {
				allowNull: false,
				type: Sequelize.INTEGER
			},
			quantity: {
				allowNull: false,
				defaultValue: 1,
				type: Sequelize.INTEGER
			},
			completed: {
				type: Sequelize.BOOLEAN,
				allowNull: false,
				defaultValue: false
			},
			grocery_item_uuid: {
				allowNull: false,
				type: Sequelize.UUID,
				references: {
					model: 'grocery_items',
					key: 'uuid'
				}
			},
			grocery_list_uuid: {
				allowNull: false,
				type: Sequelize.UUID,
				references: {
					model: 'grocery_lists',
					key: 'uuid'
				}
			},
			created_at: {
				allowNull: false,
				type: Sequelize.DATE
			},
			updated_at: {
				allowNull: false,
				type: Sequelize.DATE
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('grocery_list_items');
	}
};