import express  from "express";
import stepsController from '../controllers/stepsController.js';
import verifyToken from '../middlewares/verifyToken.js';

const stepsRouter = express.Router();

stepsRouter.get('/', stepsController.getSteps);
stepsRouter.get('/:step_id', stepsController.getStepById);

stepsRouter.post('/', verifyToken, stepsController.createStep);

stepsRouter.patch('/:step_id', verifyToken, stepsController.updateStep);

stepsRouter.delete('/:step_id', verifyToken, stepsController.deleteStep);

export default stepsRouter;