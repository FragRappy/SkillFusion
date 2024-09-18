import Rate  from  "../models/Rate.js";
import User from "../models/User.js";
import Lesson from "../models/Lesson.js";

const ratesController = {

    createRate: async (req, res) => {
        try{
            const rate = req.body;
            const findUserByToken = res.locals.userCheckedByToken;
            const findRateById = await Rate.findOne({ where: {lesson_id: req.params.lesson_id, user_id: findUserByToken.dataValues.id} });
            if (rate) { 
                if (findRateById){
                    const rateUpdated = await Rate.update(rate, { where: { user_id: findUserByToken.dataValues.id, lesson_id: findRateById.dataValues.lesson_id }});
                    if (rateUpdated) {
                        return res.status(200).json({
                            //renvoie un message de succès si la note a bien été crée
                            status: 'Succès',
                            message: 'Note mise à jour',
                            token: 'valide'
                        }); 
                    };
                } else {
                    const rateCreated = await Rate.create({rate: parseInt(rate.rate), lesson_id: req.params.lesson_id, user_id: findUserByToken.dataValues.id});
                    if (rateCreated) {
                        return res.status(200).json({
                            //renvoie un message de succès si la note a bien été crée
                            status: 'Succès',
                            message: 'Note ajouté',
                            token: 'valide'
                        }); 
                    } else if (rate.rate > 5 || rate.rate < 1) {
                        return res.status(400).json({
                            // renvoie un message d'erreur si la note est vide 
                            status: 'Erreur',
                            message: 'La note doit être comprise entre 1 et 5'
                        });
                    } else {
                        return res.status(400).json({
                            // renvoie un message d'erreur si la note est vide 
                            status: 'Error',
                            message: 'La note ne peut pas être de 0'
                        });
                    };
                };
            };
        } catch (error)  {
            res.json(`Erreur : ${ error.message }`);
        };
    },
};


export default ratesController;