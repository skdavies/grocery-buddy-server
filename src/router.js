import express from 'express';

let router = express.Router();
/* GET home page. */
router.get('/', (req, res, next) => {
	res.json('API for Grocery Store Mapper');
});

import brandView from './views/brand.view.js';
import productView from './views/product.view.js';
import groceryItemView from './views/groceryItem.view.js';
import userView from './views/user.view.js';
import groceryListView from './views/groceryList.view.js';

router.use('/brands', brandView);
router.use('/products', productView);
router.use('/grocery-items', groceryItemView);
router.use('/users', userView);
router.use('/grocery-lists', groceryListView);

export default router;