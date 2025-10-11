import express from 'express';
import authMiddleware from '../middleware/auth.middleware.js';
import ProductController from '../controllers/product.controller.js';

const router = express.Router();
const productController = new ProductController();

// Create a new product
router.post('/', authMiddleware, productController.createProduct);

// Get all products
router.get('/', authMiddleware, productController.getProducts);

// Get a product by ID
router.get('/:id', authMiddleware, productController.getProduct);

// Update a product by ID
router.put('/:id', authMiddleware, productController.updateProduct);

// Delete a product by ID
router.delete('/:id', authMiddleware, productController.deleteProduct);

export default router;