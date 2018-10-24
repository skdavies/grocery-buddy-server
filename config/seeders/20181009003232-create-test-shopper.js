'use strict';
require('dotenv').config();
const uuidv4 = require('uuid/v4');
const bcrypt = require('bcrypt');

module.exports = {
	up: async (queryInterface, Sequelize) => {
		const userUuid = uuidv4();
		const groceryListUuid = uuidv4();
		const password = await bcrypt.hash(process.env.GB_TEST_SHOPPER_PASSWORD, 10);
		await queryInterface.bulkInsert('users', [{
			first_name: 'Test',
			username: 'testshopper',
			last_name: 'Shopper',
			uuid: userUuid,
			password
		}], {});

		await queryInterface.bulkInsert('grocery_lists', [{
			uuid: groceryListUuid,
			name: 'Test grocery list',
			user_uuid: userUuid
		}], {});

		const response = await queryInterface.sequelize.query(
			'SELECT uuid FROM grocery_items LIMIT 3;'
		);
		const groceryItems = response[0];

		await queryInterface.bulkInsert('grocery_list_items', [{
			grocery_list_uuid: groceryListUuid,
			grocery_item_uuid: groceryItems[0].uuid,
			rank: 0
		},
		{
			grocery_list_uuid: groceryListUuid,
			grocery_item_uuid: groceryItems[1].uuid,
			rank: 1
		},
		{
			grocery_list_uuid: groceryListUuid,
			grocery_item_uuid: groceryItems[2].uuid,
			rank: 2
		}], {});
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.bulkDelete('users', null, {}); // will cascade delete grocery lists and list items
	}
};
