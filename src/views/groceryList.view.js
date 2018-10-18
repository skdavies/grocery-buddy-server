import express from 'express';
import passport from 'passport';
import groceryListController from '../controllers/groceryList.controller.js';
import { isAdmin, isShopper } from '../utils/auth';

let router = express.Router();

router.get('/', passport.authenticate('jwt', { session: false }), isAdmin,
	groceryListController.getAllGroceryLists);

router.get('/:groceryListId', passport.authenticate('jwt', { session: false }),
	groceryListController.getGroceryListById);

router.post('/', passport.authenticate('jwt', { session: false }), isShopper,
	groceryListController.createGroceryList);

router.put('/:groceryListId', passport.authenticate('jwt', { session: false }),
	groceryListController.updateGroceryList);

router.delete('/:groceryListId', passport.authenticate('jwt', { session: false }),
	groceryListController.deleteGroceryList);

export default router;