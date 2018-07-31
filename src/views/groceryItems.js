import express from 'express';

let router = express.Router();
import models from '../models/index.js';

const { GroceryItem, Product, Brand } = models;


router.get('/', (req, res) => {
  const offset = req.query.offset || 0;
  const limit = req.query.limit || 25;
  GroceryItem.findAll({ offset, limit })
    .then((groceryItems) => {
      res.json(groceryItems);
    });
});

router.get('/:groceryItemId', (req, res) => {
  GroceryItem.findOne({
    where: { uuid: req.params.groceryItemId },
    include: [{ model: Product, as: 'product' }, { model: Brand, as: 'brand' }]
  })
    .then((groceryItem) => {
      res.json(groceryItem); //TODO abstract into function in class
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

router.post('/', (req, res) => {
  const { brand_uuid, product_uuid } = req.body;
  if (!brand_uuid || !product_uuid) {
    res.sendStatus(400);
  } else {
    GroceryItem.create({ brand_uuid, product_uuid }, {
      include: [{ model: Product, as: 'product' }, { model: Brand, as: 'brand' }]
    })
      .then((groceryItem) => {
        res.json(groceryItem);
      })
      .catch((err) => {
        if (err.name === 'SequelizeValidationError') { //TODO abstract into function in class
          res.status(400).send(err.message);
        } else {
          res.sendStatus(500);
        }
      });
  }
});

router.put('/:groceryItemId', (req, res) => {
  if (!req.body.name) {
    res.sendStatus(400);
  } else {
    GroceryItem.update({ name: req.body.name }, { where: { uuid: req.params.groceryItemId }, returning: true })
      .then((response) => {
        res.json(response[1][0]); //TODO abstract into function
      })
      .catch((err) => {
        if (err.name === 'SequelizeValidationError') {
          res.status(400).send(err.message);
        } else {
          res.sendStatus(500);
        }
      });
  }
});

router.delete('/:groceryItemId', (req, res) => {
  GroceryItem.destroy({ where: { uuid: req.params.groceryItemId } })
    .then((response) => {
      res.sendStatus(200);
    })
    .catch((err) => {
      res.sendStatus(500);
    });
});

export default router;