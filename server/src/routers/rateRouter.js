import express from 'express';
import ratesController from '../controllers/ratesController.js';
import verifyInputs from '../middlewares/verifyInputs.js';
import verifyToken from '../middlewares/verifyToken.js'

const ratesRouter = express.Router();

ratesRouter.post('/:lesson_id', verifyToken, verifyInputs, ratesController.createRate);

export default ratesRouter;