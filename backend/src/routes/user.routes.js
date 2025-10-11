import express from 'express';
import authMiddleware from '../middleware/auth.middleware.js';
import UserController from '../controllers/user.controller.js';

const router = express.Router();
const userController = UserController;

router.get('/', authMiddleware, userController.getUsers);
router.get('/:username', authMiddleware, userController.getUser);
router.post('/', userController.createUser);
router.put('/:username', authMiddleware, userController.updateUser);
router.delete('/:username', authMiddleware, userController.deleteUser);

export default router;