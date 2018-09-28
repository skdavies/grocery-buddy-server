import models from '../models/index.js';
import { genericUpdateSuccessResponse } from '../utils/utils.js';
import { isAdmin, isShopper } from '../utils/utils';

const { Product } = models;

const getAllProducts = async (req, res, next) => {
	const offset = req.query.offset || 0;
	const limit = req.query.limit || 25;
	try {
		const products = await Product.findAll({ offset, limit });
		res.json(products.map((product) => {
			return product.serialize();
		}));
	} catch (err) {
		next(err);
	}
};

const getProductById = async (req, res, next) => {
	try {
		const product = await Product.findOne({ where: { uuid: req.params.productId } });
		res.json(product.serialize());
	} catch (err) {
		next(err);
	}
};

const updateProduct = async (req, res, next) => {
	if (!isAdmin(req)) {
		res.sendStatus(403);
	} else if (!Product.hasRequiredFields(req.body)) {
		res.sendStatus(400);
	} else {
		try {
			const data = await Product.update({ name: req.body.name }, {
				where: { uuid: req.params.productId },
				returning: true
			});
			genericUpdateSuccessResponse(data, res);
		} catch (err) {
			next(err);
		}
	}
};

const createProduct = async (req, res, next) => {
	if (!isShopper(req)) {
		res.sendStatus(403);
	} else if (!Product.hasRequiredFields(req.body)) {
		res.sendStatus(400);
	} else {
		try {
			const product = await Product.create({ name: req.body.name });
			res.json(product.serialize());
		} catch (err) {
			next(err);
		}
	}
};

const deleteProduct = async (req, res, next) => {
	if (!isAdmin(req)) {
		res.sendStatus(403);
	} else {
		try {
			await Product.destroy({ where: { uuid: req.params.productId } });
			res.sendStatus(200);
		} catch (err) {
			next(err);
		}
	}
};

const productController = {
	getAllProducts,
	getProductById,
	updateProduct,
	createProduct,
	deleteProduct
};

export default productController;
