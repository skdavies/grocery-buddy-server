import express from 'express';
import userController from '../controllers/user.controller.js';
import groceryListController from '../controllers/groceryList.controller.js';
import passport from 'passport';
import { isAdmin, isAdminOrOwner } from '../utils/auth';

let router = express.Router();

router.post('/login', passport.authenticate('login', { session: false }),
	userController.login);

router.post('/register', passport.authenticate('register', { session: false }),
	userController.register);

router.get('/', passport.authenticate('jwt', { session: false }), isAdmin,
	userController.getAllUsers);

router.get('/:userId', passport.authenticate('jwt', { session: false }), isAdminOrOwner,
	userController.getUserById);

router.put('/:userId', passport.authenticate('jwt', { session: false }), isAdminOrOwner,
	userController.updateUser);

router.delete('/:userId', passport.authenticate('jwt', { session: false }), isAdmin,
	userController.deleteUser);

router.get('/:userId/grocery-lists', passport.authenticate('jwt', { session: false }), isAdminOrOwner,
	groceryListController.getGroceryListsByUser);

export default router;