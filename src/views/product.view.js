import express from 'express';
import productController from '../controllers/product.controller.js';
import passport from 'passport';


let router = express.Router();

router.get('/', productController.getAllProducts);
router.get('/:productId', productController.getProductById);
router.post('/', passport.authenticate('jwt', { session: false }),
	productController.createProduct);
router.put('/:productId', passport.authenticate('jwt', { session: false }),
	productController.updateProduct);
router.delete('/:productId', passport.authenticate('jwt', { session: false }),
	productController.deleteProduct);

export default router;