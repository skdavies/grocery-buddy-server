import models from '../models/index.js';
import { genericUpdateSuccessResponse, genericErrorResponse } from '../utils/responses.js';

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
      res.json(product);
    })
    .catch((err) => {
      res.sendStatus(500);
    });
};

const updateProduct = (req, res) => {
  if (!Product.hasRequiredFields(req.body)) {
    res.sendStatus(400);
  } else {
    Product.update({ name: req.body.name }, { where: { uuid: req.params.productId }, returning: true })
      .then((data) => {
        genericUpdateSuccessResponse(data, res);
      })
      .catch((err) => {
        genericErrorResponse(err, res);
      });
  }
};

const createProduct = (req, res) => {
  if (!Product.hasRequiredFields(req.body)) {
    res.sendStatus(400);
  } else {
    Product.create({ name: req.body.name })
      .then((product) => {
        res.json(product);
      })
      .catch((err) => {
        genericErrorResponse(err, res);
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
