import models from '../models/index.js';
import { genericUpdateSuccessResponse, serializeList, isAdmin, isAdminOrOwner, isShopper } from '../utils/utils.js';

const { GroceryList, User } = models;

const getAllGroceryLists = async (req, res, next) => {
	const offset = req.query.offset || 0;
	const limit = req.query.limit || 25;
	if (!isAdmin(req)) {
		res.sendStatus(403);
	} else {
		try {
			const groceryLists = await GroceryList.findAll({ offset, limit });
			res.json(serializeList(groceryLists));
		} catch (err) {
			next(err);
		}
	}
};
	
const getGroceryListById = async (req, res, next) => {
	try {
		const groceryList = await GroceryList.findOne({
			where: { uuid: req.params.groceryListId },
			include: [{ model: User, as: 'user' }] });
		if (isAdmin(req) || req.user.uuid === groceryList.user.uuid) {
			res.json(groceryList.serialize());
		} else {
			res.sendStatus(403);
		}
	} catch (err) {
		next(err);
	}
};

const getGroceryListsByUser = async (req, res, next) => {
	if (!isAdminOrOwner(req)) {
		res.sendStatus(403);
	} else {
		try {
			const groceryLists = await GroceryList.findAll({ where: { user_uuid: req.params.userId } });
			res.json(serializeList(groceryLists));
		} catch (err) {
			next(err);
		}
	}
};

const updateGroceryList = async (req, res, next) => {
	if (!GroceryList.hasRequiredFields(req.body)) {
		res.sendStatus(400);
	} else if (!isAdminOrOwner(req)) {
		res.sendStatus(403);
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
	} else if (!isShopper(req)) {
		res.sendStatus(403);
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
		const groceryList = await GroceryList.findOne({
			where: { uuid: req.params.groceryListId },
			include: [{ model: User, as: 'user' }] });
		if (isAdmin(req) || req.user.uuid === groceryList.user.uuid) {
			await groceryList.destroy();
			res.sendStatus(200);
		} else {
			res.sendStatus(403);
		}
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
