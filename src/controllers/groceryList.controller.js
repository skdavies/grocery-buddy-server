import models from '../models/index.js';
import { genericUpdateSuccessResponse, serializeList, isAdmin, isAdminOrOwner, isShopper } from '../utils/utils.js';

const { GroceryList, GroceryListItem } = models;

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
			include: [{ model: GroceryListItem, as: 'items' }],
			order: [
				[{ model: GroceryListItem, as: 'items' }, 'rank', 'desc']
			]
		});
		if (isAdmin(req) || req.user.uuid === groceryList.user_uuid) {
			res.json(groceryList.serialize());
		} else {
			res.sendStatus(403);
		}
	} catch (err) {
		next(err);
	}
};

const getGroceryListsByUser = async (req, res, next) => {
	if (!isAdminOrOwner(req)) { // change security level here if you want to be able to view other peoples lists
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
	let { items } = req.body;
	if (!req.body.name || !items || items.length === 0) {
		res.sendStatus(400);
	} else if (!isShopper(req)) {
		res.sendStatus(403);
	} else {
		try {
			// TODO check if more validation needed
			for (let i = 0; i < items; i++) {
				items[i].rank = i;
			}
			const groceryList = await GroceryList.create({
				name: req.body.name,
				user_uuid: req.user.uuid,
				items
			}, {
				include: [{ model: GroceryListItem, as: 'items' }]
			});
			res.json(groceryList.serialize());
		} catch (err) {
			next(err);
		}
	}
};

const deleteGroceryList = async (req, res, next) => {
	try {
		const groceryList = await GroceryList.findOne({ where: { uuid: req.params.groceryListId } });
		if (isAdmin(req) || req.user.uuid === groceryList.user_uuid) {
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
