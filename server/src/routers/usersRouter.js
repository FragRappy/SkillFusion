import express from 'express';
import usersController from '../controllers/usersController.js';
import verifyToken from '../middlewares/verifyToken.js';
import verifyInputs from '../middlewares/verifyInputs.js';

const usersRouter = express.Router();

//user method
usersRouter.get('/', verifyToken, usersController.getUser);
usersRouter.get('/all', usersController.getUsers);

usersRouter.post('/login', verifyInputs, usersController.login);
usersRouter.post('/register', verifyInputs, usersController.register);

usersRouter.patch('/', verifyToken, verifyInputs, usersController.updateUser);
usersRouter.patch('/:user_id', verifyToken, usersController.updateRole);
usersRouter.patch('/logout', verifyToken, usersController.logout);

usersRouter.delete('/:user_id' , verifyToken, usersController.deleteUser);

//Follow method
usersRouter.get('/follow', verifyToken, usersController.getFollow);

usersRouter.post('/follow/:lesson_id', verifyToken, usersController.addFollow);

usersRouter.delete('/unfollow/:lesson_id', verifyToken, usersController.deleteFollow);


export default usersRouter;