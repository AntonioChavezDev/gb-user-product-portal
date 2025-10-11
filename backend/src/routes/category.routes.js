import express from 'express';
import CategoryController from '../controllers/category.controller.js';
import authMiddleware from '../middleware/auth.middleware.js';

const router = express.Router();
const categoryController = new CategoryController();

router.get('/', authMiddleware, categoryController.getCategories);
router.get('/:id', authMiddleware, categoryController.getCategoryById);
router.post('/', authMiddleware, categoryController.createCategory);
router.put('/:id', authMiddleware, categoryController.updateCategory);
router.delete('/:id', authMiddleware, categoryController.deleteCategory);

export default router;
