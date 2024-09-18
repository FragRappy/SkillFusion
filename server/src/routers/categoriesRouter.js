import express from 'express';
import categoriesController from '../controllers/categoriesController.js';
import verifyToken from '../middlewares/verifyToken.js';

const categoriesRouter = express.Router();

categoriesRouter.get('/', verifyToken, categoriesController.getCategories);
categoriesRouter.get('/:category_id', categoriesController.getCategoryById);
categoriesRouter.post('/', categoriesController.createCategory);


export default categoriesRouter;