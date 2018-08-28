import express from 'express';

let router = express.Router();
/* GET home page. */
router.get('/', (req, res, next) => {
  const descString = 'API for Grocery Store Mapper';
  res.json(descString);
});

import brandView from './views/brand.view.js';
import productView from './views/product.view.js';
import groceryItemView from './views/groceryItem.view.js';
import userView from './views/user.view.js';

router.use('/brands', brandView);
router.use('/products', productView);
router.use('/grocery-items', groceryItemView);
router.use('/users', userView);

export default router;