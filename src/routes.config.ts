import express from 'express';
import userController from './controllers/userController';
 
const router = express.Router();
 
router.get('/:id', userController.getUser);
 
router.get('/', userController.getUsers);
 
router.post('/', userController.postUser);
 
router.delete('/:id', userController.deleteUser);
 
export default router;