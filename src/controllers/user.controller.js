import models from '../models/index.js';
import { genericUpdateSuccessResponse, signToken } from '../utils/utils.js';
import { USER_TYPES } from '../constants/types';

const { User } = models;

const getAllUsers = async (req, res, next) => {
	const offset = req.query.offset || 0;
	const limit = req.query.limit || 25;
	try {
		const users = await User.findAll({ offset, limit });
		res.json(users.map((user) => {
			return user.serialize();
		}));
	} catch (err) {
		next(err);
	}
};

const getUserById = async (req, res, next) => {
	try {
		let user = await User.findOne({ where: { uuid: req.params.userId } });
		res.json(user.serialize());
	} catch (err) {
		next(err);
	}
};

const updateUser = async (req, res, next) => {
	try {
		if (req.user.type === USER_TYPES.ADMIN || req.params.userId === req.user.uuid) {
			let response = await User.update(req.body, { where: { uuid: req.params.userId }, returning: true });
			genericUpdateSuccessResponse(response, res);
		} else {
			res.sendStatus(401);
		}
	} catch (err) {
		next(err);
	}
};

const register = async (req, res, next) => {
	try {
		res.json({
			user: req.user.serialize(),
			token: signToken(req.user)
		});
	} catch (err) {
		next(err);
	}
};

const login = async (req, res, next) => {
	try {
		res.json({
			user: req.user.serialize(),
			token: signToken(req.user)
		});
	} catch (err) {
		next(err);
	}
};

const deleteUser = async (req, res, next) => {
	try {
		await User.destroy({ where: { uuid: req.params.userId } });
		res.sendStatus(200);
	} catch (err) {
		next(err);
	}
};

const userController = {
	getAllUsers,
	getUserById,
	updateUser,
	register,
	login,
	deleteUser
};

export default userController;
