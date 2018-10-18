'use strict';
const fs = require('fs');
const parse = require('csv-parse');
const uuidv4 = require('uuid/v4');

module.exports = {
	up: async (queryInterface, Sequelize) => {
		let groceryItems = [];
		let brands = [];
		let products = [];
		let brandUuids = {};
		let productUuids = {};
		await new Promise(function(resolve, reject) {
			fs.createReadStream('config/static_data/products.csv')
				.pipe(parse())
				.on('data', function(row) {
					if (row[0] !== 'grp_id') { // skip the first row
						const upc = row[2];
						let brand = row[3];
						let product = row[4];

						if (product.indexOf('-') !== -1) {
							product = product.substring(0, product.indexOf('-')).trim();
						}

						if (product.trim() === brand.trim()) { // make sure product and brand aren't the same
							brand = null; // set null if the product and brand are the same to skip adding it
						} else if (product.startsWith(brand)) {
							product = product.replace(brand, '');
						}

						let groceryItem = {
							upc
						};

						// TODO COMBINE SIMILAR PRODUCTS TOGETHER
						if (productUuids[product]) {
							groceryItem.product_uuid = productUuids[product];
						} else {
							const productUuid = uuidv4();
							products.push({
								name: product,
								uuid: productUuid
							});
							productUuids[product] = productUuid;
							groceryItem.product_uuid = productUuid;
						}

						// brand is optional
						if (brand) {
							if (brandUuids[brand]) {
								groceryItem.brand_uuid = brandUuids[brand];
							} else {
								const brandUuid = uuidv4();
								brands.push({
									name: brand,
									uuid: brandUuid
								});
								brandUuids[brand] = brandUuid;
								groceryItem.brand_uuid = brandUuid;
							}
						}

						groceryItems.push(groceryItem);
					}
				})
				.on('error', function (err) {
					reject(err);
				})
				.on('end', function() {
					resolve(groceryItems);
				});
		});
		await queryInterface.bulkInsert('brands', brands, {});
		await queryInterface.bulkInsert('products', products, {});
		await queryInterface.bulkInsert('grocery_items', groceryItems, {});
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.bulkDelete('brands', {});
		await queryInterface.bulkDelete('products', {});
		await queryInterface.bulkDelete('grocery_items', {});
	}
};
