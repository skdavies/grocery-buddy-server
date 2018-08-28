import Sequelize from 'sequelize';
import jwt from 'jsonwebtoken';
import { USER_TYPES } from '../constants/types';

export const genericUpdateSuccessResponse = (data, res) => {
	if (data[1] && data[1][0]) {
		res.json(data[1][0].serialize());
	} else {
		res.sendStatus(200);
	}
};

export const sequelizeErrorHandler = (err, req, res, next) => {
	console.log(err);
	// TODO ONE DAY THESE SHOULD BE LOGGED IN SOME WAY OTHER THAN CONSOLE
	// If ever in production, should not return errors straight from the DB unless TODO check if errors are safe to return
	if (err instanceof Sequelize.ValidationError) {
		res.status(400).send(err.errors[0].message);
	} else if (err instanceof Sequelize.DatabaseError) {
		res.status(400).send(err.errors[0].message);
	} else if (err instanceof Sequelize.UniqueConstraintError) {
		res.status(409).send(err.errors[0].message);
	} else {
		res.sendStatus(500);
	}
};

export const signToken = (user) => {
	const tokenUser = {
		uuid: user.uuid,
		username: user.username,
		type: user.type,
		firstName: user.firstName,
		lastName: user.lastName
	};
	let options = {};
	switch (user.type) {
		case USER_TYPES.ADMIN:
			options.expiresIn = '1h';
			break;
		case USER_TYPES.MANAGER:
			options.expiresIn = '8h';
			break;
		default:
	}
	return jwt.sign({ user: tokenUser }, process.env.GSM_JWT_SECRET, options);
};