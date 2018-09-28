import models from '../models/index.js';
import { genericUpdateSuccessResponse } from '../utils/utils.js';
import { isAdmin, isShopper } from '../utils/utils';

const { Brand } = models;

const getAllBrands = async (req, res, next) => {
	const offset = req.query.offset || 0;
	const limit = req.query.limit || 25;
	try {
		const brands = await Brand.findAll({ offset, limit });
		res.json(brands.map((brand) => {
			return brand.serialize();
		}));
	} catch (err) {
		next(err);
	}
};

const getBrandById = async (req, res, next) => {
	try {
		const brand = await Brand.findOne({ where: { uuid: req.params.brandId } });
		res.json(brand.serialize());
	} catch (err) {
		next(err);
	}
};

const updateBrand = async (req, res, next) => {
	if (!isAdmin(req)) {
		res.sendStatus(403);
	} else if (!Brand.hasRequiredFields(req.body)) {
		res.sendStatus(400);
	} else {
		try {
			const data = await Brand.update({ name: req.body.name }, {
				where: { uuid: req.params.brandId },
				returning: true
			});
			genericUpdateSuccessResponse(data, res);
		} catch (err) {
			next(err);
		}
	}
};

const createBrand = async (req, res, next) => {
	if (!isShopper(req)) {
		res.sendStatus(403);
	} else if (!Brand.hasRequiredFields(req.body)) {
		res.sendStatus(400);
	} else {
		try {
			const brand = await Brand.create({ name: req.body.name });
			res.json(brand.serialize());
		} catch (err) {
			next(err);
		}
	}
};

const deleteBrand = async (req, res, next) => {
	if (!isAdmin(req)) {
		res.sendStatus(403);
	} else {
		try {
			await Brand.destroy({ where: { uuid: req.params.brandId } });
			res.sendStatus(200);
		} catch (err) {
			next(err);
		}
	}
};

const brandController = {
	getAllBrands,
	getBrandById,
	updateBrand,
	createBrand,
	deleteBrand
};

export default brandController;
