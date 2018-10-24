'use strict';
module.exports = {
	up: (queryInterface, Sequelize) => {
		// this is the first migration run so we need to verify we have the uuid extension
		return queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";').then(function() {
			return queryInterface.createTable('brands', {
				id: {
					allowNull: false,
					autoIncrement: true,
					type: Sequelize.INTEGER
				},
				name: {
					type: Sequelize.STRING,
					allowNull: false,
					unique: true
				},
				uuid: {
					type: Sequelize.UUID,
					defaultValue: Sequelize.literal('uuid_generate_v4()'),
					allowNull: false,
					unique: true,
					primaryKey: true
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
				}
			});
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('brands');
	}
};