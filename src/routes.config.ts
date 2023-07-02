import express from 'express';
import userController from './controllers/userController';
import auth from './middleware/auth'

const router = express.Router();

router.post("/welcome", auth, (req, res) => {
    res.status(200).send("Welcome 🙌 ");
});
router.get('/:id', userController.getUser);

router.get('/', userController.getUsers);

router.post('/', userController.postUser);

router.delete('/:id', userController.deleteUser);

export default router;