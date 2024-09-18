import Like from '../models/Like.js';

const likesController = {

    getLikes: async (req, res) => {
        try {
            const likes = await Like.findAll({ order: ['id'] });
            if(likes){
                return res.status(200).json({
                    // renvoie un message de succès avec tout les likes au front 
                    status: 'Succès',
                    message: 'Likes récupérés',
                });
            };
            return res.status(400).json({
                //renvoie un message d'erreur si les likes n'ont pas été trouvé dans la bdd
                status: 'Erreur',
                message: 'Pas de likes'
            });
        } catch (error) {
            res.json(`erreur: ${ error.message }`);
        };
    },

    getLikeById: async (req, res) => {
        try {
            //récuperation du like dans la bdd avec l'id reçu en paramètre de l'URL
            const likeId = req.params.like_id;
            const like = await like.findByPk(likeId);
            if(like){
                return res.status(200).json({
                    //renvoie un message de succès si le like a bien été trouvé dans la bdd
                    status: 'Succès',
                    message: 'Like récupéré',
                });  
            };
            return res.status(400).json({
                //renvoie un message d'erreur si le likes n'a pas été trouvé dans la bdd
                status: 'Erreur',
                message: 'Like non trouvé',
            });
        } catch (error) {
            res.json(`erreur : ${ error.message }`);
        };
    },

    createLike: async (req, res) => { //a tester avec comment_id
        try{
            const formLike = req.body;
            const commentId = req.params.comment_id;
            const userId = req.params.user_id;
            if (formLike) {
                //renvoie un message d'erreur si le like na pas pu être ajoutée
                return res.status(400).json({
                    status: 'Erreur',
                    message: "Le like ne peut être vide",
                });
            };
            await Like.create({ilike : formLike, comment_id : commentId, user_id: userId});
            //renvoie un message de succes si le like a bien été ajouté
            res.satus(200).json({
                status:'Succès',
                message: 'Like ajouté',
            });
        } catch (error) {
            res.json(`Erreur : ${ error.message }`);
        }; 
    },
}

export default likesController;