import models from '../models/index.js';
import { genericUpdateSuccessResponse, genericErrorResponse } from '../utils/responses.js';

const { Brand } = models;

const getAllBrands = (req, res) => {
  const offset = req.query.offset || 0;
  const limit = req.query.limit || 25;
  Brand.findAll({ offset, limit })
    .then((brands) => {
      res.json(brands);
    })
    .catch((err) => {
      res.sendStatus(500);
    });
};

const getBrandById = (req, res) => {
  Brand.findOne({ where: { uuid: req.params.brandId } })
    .then((brand) => {
      res.json(brand);
    })
    .catch((err) => {
      res.sendStatus(500);
    });
};

const updateBrand = (req, res) => {
  if (!req.body.name) {
    res.sendStatus(400);
  } else {
    Brand.update({ name: req.body.name }, { where: { uuid: req.params.brandId }, returning: true })
      .then((response) => {
        genericUpdateSuccessResponse(response);
      })
      .catch((err) => {
        genericErrorResponse(err, res);
      });
  }
};

const createBrand = (req, res) => {
  if (!req.body.name) {
    res.sendStatus(400);
  } else {
    Brand.create({ name: req.body.name })
      .then((brand) => {
        res.json(brand);
      })
      .catch((err) => {
        genericErrorResponse(err, res);
      });
  }
};

const deleteBrand = (req, res) => {
  Brand.destroy({ where: { uuid: req.params.brandId } })
    .then((response) => {
      res.sendStatus(200);
    })
    .catch((err) => {
      res.sendStatus(500);
    });
};

const brandController = {
  getAllBrands,
  getBrandById,
  updateBrand,
  createBrand,
  deleteBrand
};

export default brandController;
