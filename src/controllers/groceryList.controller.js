import models from '../models/index.js';
import { genericUpdateSuccessResponse, serializeList, isAdmin, isAdminOrOwner } from '../utils/utils.js';

const { GroceryList } = models;

const getAllGroceryLists = async (req, res, next) => {
	const offset = req.query.offset || 0;
	const limit = req.query.limit || 25;
	try {
		if (isAdmin(req)) {
			const groceryLists = await GroceryList.findAll({ offset, limit });
			res.json(serializeList(groceryLists));
		} else {
			res.sendStatus(403);
		}
	} catch (err) {
		next(err);
	}
};
	
const getGroceryListById = async (req, res, next) => {
	try {
		const groceryList = await GroceryList.findOne({ where: { uuid: req.params.groceryListId } });
		res.json(groceryList.serialize());
	} catch (err) {
		next(err);
	}
};

const getGroceryListsByUser = async (req, res, next) => {
	try {
		if (isAdminOrOwner(req)) { // admins or owner
			const groceryLists = await GroceryList.findAll({ where: { user_uuid: req.params.userId } });
			res.json(serializeList(groceryLists));
		} else {
			res.sendStatus(403);
		}
	} catch (err) {
		next(err);
	}
};

const updateGroceryList = async (req, res, next) => {
	if (!GroceryList.hasRequiredFields(req.body)) {
		res.sendStatus(400);
	} else {
		try {
			const data = await GroceryList.update({ name: req.body.name },
				{ where: { uuid: req.params.groceryListId },
					returning: true });
			genericUpdateSuccessResponse(data, res);
		} catch (err) {
			next(err);
		}
	}
};

const createGroceryList = async (req, res, next) => {
	if (!GroceryList.hasRequiredFields(req.body)) {
		res.sendStatus(400);
	} else {
		try {
			const groceryList = await GroceryList.create({ name: req.body.name });
			res.json(groceryList.serialize());
		} catch (err) {
			next(err);
		}
	}
};

const deleteGroceryList = async (req, res, next) => {
	try {
		await GroceryList.destroy({ where: { uuid: req.params.groceryListId } });
		res.sendStatus(200);
	} catch (err) {
		next(err);
	}
};


const groceryListController = {
	getAllGroceryLists,
	getGroceryListById,
	getGroceryListsByUser,
	updateGroceryList,
	createGroceryList,
	deleteGroceryList
};

export default groceryListController;
