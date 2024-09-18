import  Comment  from "../models/Comment.js";
import User from "../models/User.js";

const commentsController = {

    getComments: async (req, res) =>{
        try {
            const comments = await Comment.findAll({ order: ['id'] });
            
            if (comments){
                return res.status(200).json({
                    //renvoie un message de succès avec toutes les tables des commentaires au front 
                    status:'Succès',
                    message: 'Commentaires récupérés',
                    data: comments
                });
            };

            return res.status(400).json({
                //renvoie un message d'erreur si les commentaires n'ont pas été trouvé dans la bdd
                status:'Erreur',
                message: 'Pas de commentaires',
            });
        } catch (error) {
            res.json(`Erreur: ${error.message}`);
        }
    },

    getCommentsById: async (req, res) =>{
        try {
            //Récupération du commmentaire dans la bdd avec l'id reçu en paramètre de l'URL
            const commentId = req.params.comment_id;
            const comment = await Comment.findByPk(commentId);

            if (comment){
                return res.status(200).json({
                    status:'Succès',
                    message: 'Commentaire récupéré',
                    data: comment
                });
                
            };
            //Renvoie un message d'erreur si le commentaire n'a pas été trouvé dans la bdd
            return res.status(400).json({
                status: 'Erreur',
                message: 'Commentaire non trouvé'
            });
        } catch (error) {
            res.json(`Erreur: ${ error.message }`);
        };
    },

    createComment: async (req, res) =>{
        try {
            const {content, lesson_id} = req.body.data;
            const findUserByToken = res.locals.userCheckedByToken;

            if(content) {
                await Comment.create({content, lesson_id, user_id: findUserByToken.dataValues.id});
                //Renvoie un message de succès si le commentaire a bien été crée
                return res.status(200).json({
                    status: 'Succès',
                    message: 'Commentaire ajouté',
                });
            } else {
                //Renvoie un message d'erreur si le commentaire est vide 
                return res.status(400).json({
                    status: 'Erreur',
                    message: 'Le commentaire ne peut être vide',
                });          
            }
        } catch (error) {
        res.json(`erreur: ${error.message}`)
        }
    },

    updateComment: async (req, res) => {
        try {
            const formComment = req.body;
            const commentId = req.params.comment_id;
            await Comment.update(formComment, {where : {id: commentId}});
            res.json('commentaire modifié');
        } catch (error){
            res.json(`erreur: ${error}`);
        }
    },

    deleteComment: async (req, res) => {

        const commentToDelete = req.params.commentToDelete_id;
        const userWhoDelete = req.params.userWhoDelete_id;

        const findCommentToDelete = await Comment.findByPk(commentToDelete);
        const findUserWhoDelete = await User.findByPk(userWhoDelete);

            try {
                if (findUserWhoDelete.dataValues.role === "admin" || findCommentToDelete.dataValues.user_id === findUserWhoDelete.dataValues.id ) {
                    await Comment.destroy({where : {id : commentToDelete}});
                    res.json('commentaire supprimé');
                } else {
                    res.json ("l'utilisateur n'est pas autorisé à supprimer ce commentaire!");
                }
            } catch (error) {
                res.json(`Erreur: ${error}`);
            }
        },
    }

export default commentsController;
