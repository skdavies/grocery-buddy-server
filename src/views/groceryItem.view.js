import express from 'express';
import groceryItemController from '../controllers/groceryItem.controller.js';
import passport from 'passport';

let router = express.Router();
// You cannot update a grocery item. You can create a new one and delete a no longer valid one

router.get('/', groceryItemController.getAllGroceryItems);
router.get('/:groceryItemId', groceryItemController.getGroceryItemById);
router.post('/', passport.authenticate('jwt', { session: false }),
	groceryItemController.createGroceryItem);
router.delete('/:groceryItemId', passport.authenticate('jwt', { session: false }),
	groceryItemController.deleteGroceryItem);

export default router;