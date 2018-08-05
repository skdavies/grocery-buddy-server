import models from '../models/index.js';

const { Product } = models;

const getAllProducts = (req, res) => {
  const offset = req.query.offset || 0;
  const limit = req.query.limit || 25;
  Product.findAll({ offset, limit })
    .then((products) => {
      res.json(products);
    })
    .catch((err) => {
      res.sendStatus(500);
    });
};

const getProductById = (req, res) => {
  Product.findOne({ where: { uuid: req.params.productId } })
    .then((product) => {
      res.json(product); //TODO abstract into function
    })
    .catch((err) => {
      res.sendStatus(500);
    });
};

const updateProduct = (req, res) => {
  if (!req.body.name) {
    res.sendStatus(400);
  } else {
    Product.update({ name: req.body.name }, { where: { uuid: req.params.productId }, returning: true })
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
};

const createProduct = (req, res) => {
  if (!req.body.name) {
    res.sendStatus(400);
  } else {
    Product.create({ name: req.body.name })
      .then((product) => {
        res.json(product);
      })
      .catch((err) => {
        if (err.name === 'SequelizeValidationError') { //TODO abstract into function
          res.status(400).send(err.message);
        } else {
          res.sendStatus(500);
        }
      });
  }
};

const deleteProduct = (req, res) => {
  Product.destroy({ where: { uuid: req.params.productId } })
    .then((response) => {
      res.sendStatus(200);
    })
    .catch((err) => {
      res.sendStatus(500);
    });
};

const productController = {
  getAllProducts,
  getProductById,
  updateProduct,
  createProduct,
  deleteProduct
};

export default productController;
