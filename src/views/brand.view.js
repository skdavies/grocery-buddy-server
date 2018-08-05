import express from 'express';
import brandController from '../controllers/brand.controller.js';

let router = express.Router();

router.get('/', brandController.getAllBrands);
router.get('/:brandId', brandController.getBrandById);
router.post('/', brandController.createBrand);
router.put('/:brandId', brandController.updateBrand);
router.delete('/:brandId', brandController.deleteBrand);

export default router;