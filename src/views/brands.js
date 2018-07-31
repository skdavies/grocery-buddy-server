import express from 'express';

let router = express.Router();
import models from '../models/index.js';

const Brand = models.Brand;

router.get('/', (req, res) => {
  const offset = req.query.offset || 0;
  const limit = req.query.limit || 25;
  Brand.findAll({ offset, limit })
    .then((brands) => {
      res.json(brands);
    });
});

router.get('/:brandId', (req, res) => {
  Brand.findOne({ where: { uuid: req.params.brandId } })
    .then((brand) => {
      res.json(brand); //TODO abstract into function
    })
    .catch((err) => {
      res.sendStatus(500);
    });
});

router.post('/', (req, res) => {
  if (!req.body.name) {
    res.sendStatus(400);
  } else {
    Brand.create({ name: req.body.name })
      .then((brand) => {
        res.json(brand);
      })
      .catch((err) => {
        if (err.name === 'SequelizeValidationError') { //TODO abstract into function
          res.status(400).send(err.message);
        } else {
          res.sendStatus(500);
        }
      });
  }
});

router.put('/:brandId', (req, res) => {
  if (!req.body.name) {
    res.sendStatus(400);
  } else {
    Brand.update({ name: req.body.name }, { where: { uuid: req.params.brandId }, returning: true })
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

router.delete('/:brandId', (req, res) => {
  Brand.destroy({ where: { uuid: req.params.brandId } })
    .then((response) => {
      res.sendStatus(200);
    })
    .catch((err) => {
      res.sendStatus(500);
    });
});

export default router;