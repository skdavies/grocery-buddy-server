import express from 'express';
import passport from 'passport';
import groceryListController from '../controllers/groceryList.controller.js';

let router = express.Router();

router.get('/', passport.authenticate('jwt', { session: false }), groceryListController.getAllGroceryLists);
router.get('/:groceryListId', groceryListController.getGroceryListById);
router.post('/', groceryListController.createGroceryList);
router.put('/:groceryListId', groceryListController.updateGroceryList);
router.delete('/:groceryListId', groceryListController.deleteGroceryList);

export default router;