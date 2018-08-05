import express from 'express';
import groceryItemController from '../controllers/groceryItem.controller.js';

let router = express.Router();


// You cannot update a grocery item. You can create a new one and delete a no longer valid one

router.get('/', groceryItemController.getAllGroceryItems);
router.get('/:groceryItemId', groceryItemController.getGroceryItemById);
router.post('/', groceryItemController.createGroceryItem);
router.delete('/:groceryItemId', groceryItemController.deleteGroceryItem);

export default router;