import express from 'express';
import lessonsRouter from './lessonsRouter.js';
import usersRouter from './usersRouter.js';
import stepsRouter from './stepsRouter.js';
import likesRouter from './likesRouter.js';
import ratesRouter from './rateRouter.js';
import commentsRouter from './commentsRouter.js'
import categoriesController from './categoriesRouter.js';

const router = express.Router();

router.use('/users', usersRouter);
router.use('/lessons', lessonsRouter);
router.use('/steps', stepsRouter);
router.use('/comments',commentsRouter);
router.use('/rates', ratesRouter);
router.use('/categories', categoriesController);
router.use('/likes', likesRouter);

export default router;