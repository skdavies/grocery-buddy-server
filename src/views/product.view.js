import express from 'express';
import productController from '../controllers/product.controller.js';
import passport from 'passport';
import { isAdmin, isShopper } from '../utils/auth';


let router = express.Router();

router.get('/', productController.getAllProducts);
router.get('/:productId', productController.getProductById);

router.post('/', passport.authenticate('jwt', { session: false }), isShopper,
	productController.createProduct);

router.put('/:productId', passport.authenticate('jwt', { session: false }), isAdmin,
	productController.updateProduct);

router.delete('/:productId', passport.authenticate('jwt', { session: false }), isAdmin,
	productController.deleteProduct);

export default router;