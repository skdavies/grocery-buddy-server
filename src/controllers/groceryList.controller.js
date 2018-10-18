import models from '../models/index.js';
import { genericUpdateSuccessResponse, serializeList, isAdmin, isAdminOrOwner, isShopper } from '../utils/utils.js';
import { USER_TYPES } from '../constants/types';

const { GroceryList, GroceryListItem } = models;

const getAllGroceryLists = async (req, res, next) => {
	const offset = req.query.offset || 0;
	const limit = req.query.limit || 25;
	try {
		const groceryLists = await GroceryList.findAll({ offset, limit });
		res.json(serializeList(groceryLists));
	} catch (err) {
		next(err);
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
		if (req.user.type === USER_TYPES.ADMIN || groceryList.isOwnedBy(req.user.uuid)) {
			res.json(groceryList.serialize());
		} else {
			res.sendStatus(403);
		}
	} catch (err) {
		next(err);
	}
};

const getGroceryListsByUser = async (req, res, next) => {
	try {
		const groceryLists = await GroceryList.findAll({ where: { user_uuid: req.params.userId } });
		res.json(serializeList(groceryLists));
	} catch (err) {
		next(err);
	}
};

const updateGroceryList = async (req, res, next) => {
	const { name, items } = req.body;
	if (!name || !Array.isArray(items) || items.length === 0) {
		res.sendStatus(400);
	} else {
		try {
			const groceryList = await GroceryList.findOne({ where: { uuid: req.params.groceryListId } });
			if (groceryList.isOwnedBy(req.user.uuid)) {
				groceryList.name = name;
				for (let i = 0; i < items.length; i++) {
					items[i].rank = i; // set ranks to the order given
				}
				groceryList.items = items;
				await groceryList.save();
				res.json(groceryList.serialize());
			} else {
				res.sendStatus(403);
			}
		} catch (err) {
			next(err);
		}
	}
};

const createGroceryList = async (req, res, next) => {
	let { items } = req.body;
	if (!name || !Array.isArray(items) || items.length === 0) {
		res.sendStatus(400);
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
		if (req.user.type === USER_TYPES.ADMIN || groceryList.isOwnedBy(req.user.uuid)) {
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
