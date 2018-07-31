import express from 'express';

let router = express.Router();
import models from '../models/index.js';

const Product = models.Product;

router.get('/', (req, res) => {
  const offset = req.query.offset || 0;
  const limit = req.query.limit || 25;
  Product.findAll({ offset, limit })
    .then((products) => {
      res.json(products);
    });
});

router.get('/:productId', (req, res) => {
  Product.findOne({ where: { uuid: req.params.productId } })
    .then((product) => {
      res.json(product); //TODO abstract into function in class
    })
    .catch((err) => {
      res.sendStatus(500);
    });
});

router.post('/', (req, res) => {
  if (!req.body.name) {
    res.sendStatus(400);
  } else {
    Product.create({ name: req.body.name })
      .then((product) => {
        res.json(product);
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

router.put('/:productId', (req, res) => {
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
});

router.delete('/:productId', (req, res) => {
  Product.destroy({ where: { uuid: req.params.productId } })
    .then((response) => {
      res.sendStatus(200);
    })
    .catch((err) => {
      res.sendStatus(500);
    });
});

export default router;