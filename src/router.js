import express from 'express';

let router = express.Router();
/* GET home page. */
router.get('/', (req, res, next) => {
  let languages = [
    {
      language: 'Spanish'
    },
    {
      language: "French"
    },
    {
      language: "German"
    }
  ];
  res.json(languages);
});

import brandView from './views/brand.view.js';
import productView from './views/product.view.js';
import groceryItemView from './views/groceryItem.view.js';

router.use('/brands', brandView);
router.use('/products', productView);
router.use('/grocery-items', groceryItemView);

export default router;