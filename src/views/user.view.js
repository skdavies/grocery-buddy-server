import express from 'express';
import userController from '../controllers/user.controller.js';
import groceryListController from '../controllers/groceryList.controller.js';
import passport from 'passport';

let router = express.Router();

router.post('/login',
	passport.authenticate('login', { session: false }),
	userController.login);

router.post('/register',
	passport.authenticate('register', { session: false }),
	userController.register);

router.get('/', userController.getAllUsers);

router.get('/:userId', userController.getUserById);

router.put('/:userId',
	passport.authenticate('jwt', { session: false }),
	userController.updateUser);

router.delete('/:userId', userController.deleteUser);

router.put('/:userId/grocery-lists',
	passport.authenticate('jwt', { session: false }),
	groceryListController.getGroceryListsByUser);

export default router;