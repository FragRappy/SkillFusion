import express from 'express';
import commentsController from '../controllers/commentsController.js';
import verifyToken from '../middlewares/verifyToken.js';

const commentsRouter = express.Router();

commentsRouter.get('/', commentsController.getComments);
commentsRouter.get('/:comment_id', commentsController.getCommentsById);
commentsRouter.post('/', verifyToken, commentsController.createComment);
commentsRouter.patch('/:comment_id', commentsController.updateComment);
commentsRouter.delete('/:commentToDelete_id/:userWhoDelete_id', commentsController.deleteComment);

export default commentsRouter;