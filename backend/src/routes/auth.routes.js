import express from 'express';
import UserController from '../controllers/user.controller.js';

const router = express.Router();
const userController = UserController;

router.post('/', userController.authenticate);
router.post('/register', userController.createUser);

export default router;
