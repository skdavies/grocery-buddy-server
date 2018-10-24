import express from 'express';
import brandController from '../controllers/brand.controller.js';
import passport from 'passport';
import { isAdmin, isShopper } from '../utils/auth';

let router = express.Router();

router.get('/', brandController.getAllBrands);
router.get('/:brandId', brandController.getBrandById);

router.post('/', passport.authenticate('jwt', { session: false }), isShopper,
	brandController.createBrand);

router.put('/:brandId', passport.authenticate('jwt', { session: false }), isAdmin,
	brandController.updateBrand);

router.delete('/:brandId', passport.authenticate('jwt', { session: false }), isAdmin,
	brandController.deleteBrand);

export default router;