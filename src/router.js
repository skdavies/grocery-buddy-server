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

import brandViews from './views/brands.js';
import productViews from './views/products.js';
import groceryItemViews from './views/groceryItems.js';

router.use('/brands', brandViews);
router.use('/products', productViews);
router.use('/grocery-items', groceryItemViews);

export default router;