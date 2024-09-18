import express from 'express';
import lessonsController from '../controllers/lessonsController.js';
import verifyToken from '../middlewares/verifyToken.js';

const lessonsRouter = express.Router();

lessonsRouter.get('/all', verifyToken, lessonsController.getLessons);
lessonsRouter.get('/byrole', verifyToken, lessonsController.getLessonByRole);
lessonsRouter.get('/byrate', lessonsController.getLessonsByRate);
lessonsRouter.get('/bycomment', lessonsController.getLessonsByComment);
lessonsRouter.get('/:lesson_id', verifyToken, lessonsController.getLessonById);

lessonsRouter.post('/', verifyToken, lessonsController.createLesson);

lessonsRouter.patch('/:lesson_id', verifyToken, lessonsController.updateLesson);

lessonsRouter.delete('/', verifyToken, lessonsController.deleteLesson);

export default lessonsRouter;