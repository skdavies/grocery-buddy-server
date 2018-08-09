import models from '../models/index.js';
import { genericErrorResponse } from '../utils/responses.js';

const { GroceryItem, Product, Brand } = models;

const getAllGroceryItems = (req, res) => {
  const offset = req.query.offset || 0;
  const limit = req.query.limit || 25;
  GroceryItem.findAll({ offset, limit })
    .then((groceryItems) => {
      res.json(groceryItems);
    })
    .catch((err) => {
      res.sendStatus(500);
    });
};

const getGroceryItemById = (req, res) => {
  GroceryItem.findOne({
    where: { uuid: req.params.groceryItemId },
    include: [{ model: Product, as: 'product' }, { model: Brand, as: 'brand' }]
  })
    .then((groceryItem) => {
      res.json(groceryItem);
    })
    .catch((err) => {
      res.sendStatus(500);
    });
};

const createGroceryItem = (req, res) => {
  if (!GroceryItem.hasRequiredFields(req.body)) {
    res.sendStatus(400);
  } else {
    const { brand_uuid, product_uuid } = req.body;
    GroceryItem.create({ brand_uuid, product_uuid }, {
      include: [{ model: Product, as: 'product' }, { model: Brand, as: 'brand' }]
    })
      .then((groceryItem) => {
        res.json(groceryItem);
      })
      .catch((err) => {
        genericErrorResponse(err, res);
      });
  }
};

const deleteGroceryItem = (req, res) => {
  GroceryItem.destroy({ where: { uuid: req.params.groceryItemId } })
    .then((response) => {
      res.sendStatus(200);
    })
    .catch((err) => {
      res.sendStatus(500);
    });
};

const groceryItemController = {
  getAllGroceryItems,
  getGroceryItemById,
  createGroceryItem,
  deleteGroceryItem
};

export default groceryItemController;
