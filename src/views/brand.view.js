import express from 'express';
import brandController from '../controllers/brand.controller.js';
import passport from 'passport';

let router = express.Router();

router.get('/', brandController.getAllBrands);
router.get('/:brandId', brandController.getBrandById);
router.post('/', passport.authenticate('jwt', { session: false }),
	brandController.createBrand);
router.put('/:brandId', passport.authenticate('jwt', { session: false }),
	brandController.updateBrand);
router.delete('/:brandId', passport.authenticate('jwt', { session: false }),
	brandController.deleteBrand);

export default router;