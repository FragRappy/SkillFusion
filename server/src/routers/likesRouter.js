import express from "express";
import likesController from "../controllers/likesController.js";

const likesRouter = express.Router();

likesRouter.get('/', likesController.getLikes);
likesRouter.get('/:like_id', likesController.getLikeById);
likesRouter.post('/:comment_id', likesController.createLike);


export default likesRouter;