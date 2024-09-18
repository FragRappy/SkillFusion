import Category  from "../models/Category.js";

const categoriesController = {

    getCategories: async (req, res) => {
        try {
            const findUserByToken = res.locals.userCheckedByToken
            const categories = await Category.findAll();

            if (categories && findUserByToken){
                return res.status(200).json({
                    //renvoie un message de succès avec toute les tables des categories au front
                    status:'Succès',
                    message:'Catégories récupérées',
                    data: categories,
                });
            } else {
                //renvoie un message d'erreur si les catégories n'ont pas été trouvé dans la bdd
                return res.status(400).json({
                    status:'Erreur',
                    message: 'Catégories inexistantes',
                });
            }
           
        } catch (error){
            res.json(`Erreur : ${ error.message }`);
        };
    },

    getCategoryById: async (req, res)  => {
        try {
            //récuperation de la catégorie dans la bdd avec l'id reçu en paramètres de l'URL
            const categoryId = req.params.category_id;
            const category = await Category.findByPk(categoryId);
            if (category){
                return res.status(200).json({
                    //renvoie un message de succès si la catégorie a bien été trouvé dans la bdd
                    status:'success',
                    message:'data of category sent',
                    data: category
                });
            };
            return res.status(400).json({
                //renvoie un message d'erreur si la catégorie n'a pas été trouvé dans la bdd
                status: 'erreur',
                message:'unknown category ',
            });
        }catch (error) {
            res.json(`erreur : ${ error.message }`);
        };
    },

    createCategory: async (req, res) => {
        try {
            const formCategory = req.body;
            if(formCategory){
                await Category.create(formCategory);
                //renvoie un message de succès si la categorie a bien été crée
                return res.status(200).json({
                    status:'success',
                    message:'created category',
                });
            };
            //renvoie un message d'erreur si la categorie est vide 
            return res.status(400).json({
                status: 'erreur',
                message: 'category cannot be empty', 
            });
        }catch (error) {
            res.json(`erreur : ${ error.message }`);
        };
    },
}

export default categoriesController;
