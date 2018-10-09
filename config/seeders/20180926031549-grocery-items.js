'use strict';
var fs = require('fs');
var parse = require('csv-parse');
var uuidv4 = require('uuid/v4');

module.exports = {
	up: (queryInterface, Sequelize) => {
		var groceryItems = [];
		var brands = [];
		var products = [];
		var brandUuids = {};
		var productUuids = {};
		return new Promise(function(resolve, reject) {
			fs.createReadStream('config/static_data/products.csv')
				.pipe(parse())
				.on('data', function(row) {
					if (row[0] !== 'grp_id') { // skip the first row
						var upc = row[2];
						var brand = row[3];
						var product = row[4];

						if (product.indexOf('-') !== -1) {
							product = product.substring(0, product.indexOf('-')).trim();
						}

						if (product.trim() === brand.trim()) { // make sure product and brand aren't the same
							brand = null; // set null if the product and brand are the same to skip adding it
						} else if (product.startsWith(brand)) {
							product = product.replace(brand, '');
						}

						var groceryItem = {
							upc
						};

						// TODO COMBINE SIMILAR PRODUCTS TOGETHER
						if (productUuids[product]) {
							groceryItem.product_uuid = productUuids[product];
						} else {
							var productUuid = uuidv4();
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
								var brandUuid = uuidv4();
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
		}).then(function () {
			return queryInterface.bulkInsert('brands', brands, {});
		}).then(function () {
			return queryInterface.bulkInsert('products', products, {});
		}).then(function () {
			return queryInterface.bulkInsert('grocery_items', groceryItems, {});
		});
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete('brands', {});
	}
};
