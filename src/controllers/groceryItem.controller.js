import models from '../models/index.js';

const { GroceryItem, Product, Brand } = models;

const getAllGroceryItems = async (req, res, next) => {
  const offset = req.query.offset || 0;
  const limit = req.query.limit || 25;
  try {
    const groceryItems = await GroceryItem.findAll({ offset, limit });
    res.json(groceryItems);
  } catch (err) {
    next(err);
  }
};

const getGroceryItemById = async (req, res, next) => {
  try {
    const groceryItem = await GroceryItem.findOne({
      where: { uuid: req.params.groceryItemId },
      include: [{ model: Product, as: 'product' }, { model: Brand, as: 'brand' }]
    });
    res.json(groceryItem);
  } catch (err) {
    next(err);
  }
};

const createGroceryItem = async (req, res, next) => {
  if (!GroceryItem.hasRequiredFields(req.body)) {
    res.sendStatus(400);
  } else {
    const { brand_uuid, product_uuid } = req.body;
    try {
      const groceryItem = await GroceryItem.create({ brand_uuid, product_uuid }, {
        include: [{ model: Product, as: 'product' }, { model: Brand, as: 'brand' }]
      });
      res.json(groceryItem);
    } catch (err) {
      next(err);
    }
  }
};

const deleteGroceryItem = async (req, res, next) => {
  try {
    await GroceryItem.destroy({ where: { uuid: req.params.groceryItemId } });
    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
};

const groceryItemController = {
  getAllGroceryItems,
  getGroceryItemById,
  createGroceryItem,
  deleteGroceryItem
};

export default groceryItemController;
