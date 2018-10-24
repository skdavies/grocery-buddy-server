import { USER_TYPES } from '../constants/types';

export const isAdmin = (req, res, next) => {
	if (req.user && req.user.type === USER_TYPES.ADMIN) {
		return next();
	} else {
		res.sendStatus(403);
	}
};

export const isAdminOrOwner = (req, res, next) => {
	if (req.user && (req.user.type === USER_TYPES.ADMIN || req.params.userId === req.user.uuid)) {
		return next();
	} else {
		res.sendStatus(403);
	}
};

export const isShopper = (req, res, next) => {
	if (req.user && req.user.type === USER_TYPES.SHOPPER) {
		return next();
	} else {
		res.sendStatus(403);
	}
};