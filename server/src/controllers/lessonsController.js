import { Sequelize } from 'sequelize';
import Lesson from '../models/Lesson.js';
import Comment from '../models/Comment.js';
import Step from '../models/Step.js';
import Rate from '../models/Rate.js';
import User from '../models/User.js';
import Category from '../models/Category.js';

const lessonsController =  {
    
    getLessons: async (req, res) => {
        try {
            const findUserByToken = res.locals.userCheckedByToken;

            if(findUserByToken) {
                const lessons = await Lesson.findAll({
                    attributes: {
                        include: [
                            [Sequelize.literal('(SELECT COUNT(*) FROM "comment" WHERE "comment"."lesson_id" = "Lesson"."id")'), 'nb_comments'],
                            [Sequelize.literal('(SELECT COUNT(*) FROM "rate" WHERE "rate"."lesson_id" = "Lesson"."id")'), 'nb_rates'],
                            [Sequelize.literal('(SELECT "username" FROM "user" WHERE "user"."id" = "Lesson"."user_id")'), 'author'],
                            [Sequelize.literal('(SELECT ROUND(AVG("rate")) FROM "rate" WHERE "rate"."lesson_id" = "Lesson"."id")'), 'rate'],
                        ],
                        exclude: ['user_id'],
                    },
                    include: [
                        {
                            model: Rate, 
                            attributes: {
                                exclude: ['lesson_id']
                            }
                        },{
                            model: User, 
                            attributes: {
                                exclude: ['lesson_id']
                            }
                        },{
                            model: Step, 
                            attributes: {
                                exclude: ['lesson_id']
                            }
                        },{
                            model: Comment,
                            attributes: {
                                include: [[Sequelize.literal('(SELECT "username" FROM "user" WHERE "user"."id" = "Comments"."user_id")'), 'author']],
                                exclude: ['lesson_id', 'user_id']
                            }
                        },{
                            model: Category,
                            through: { attributes: [] },
                            attributes: ['id', 'name'], 
                        }
                    ],
                    order: ['createdAt']
                });
    
                if (lessons) {
                    return res.status(200).json({
                        status: 'Succès',
                        message: 'Cours',
                        data: lessons,
                        token: 'valide'
                    });
                } else {
                    // Renvoie un message d'erreur si aucun utilisateur n'a été trouvé dans la bdd
                    return res.status(400).json({
                        status: 'Erreur',
                        message: 'Cours inexistant',
                    });
                }; 
            };
        } catch (error) {
            res.json(`Erreur: ${ error.message }`);
        };
    },

    getLessonsByRate: async (req, res) => {
        try {
            const lessons = await Lesson.findAll({
                attributes: {
                    include: [
                        [Sequelize.literal('(SELECT COUNT(*) FROM "comment" WHERE "comment"."lesson_id" = "Lesson"."id")'), 'nb_comments'],
                        [Sequelize.literal('(SELECT COUNT(*) FROM "rate" WHERE "rate"."lesson_id" = "Lesson"."id")'), 'nb_rates'],
                        [Sequelize.literal('(SELECT "username" FROM "user" WHERE "user"."id" = "Lesson"."user_id")'), 'author'],
                        [Sequelize.literal('(SELECT ROUND(AVG("rate")) FROM "rate" WHERE "rate"."lesson_id" = "Lesson"."id")'), 'rate']
                    ],
                    exclude: ['user_id'],
                },
                include: [
                    {
                        model: Step, 
                        attributes: {
                            exclude: ['lesson_id']
                        }
                    },{
                        model: Comment,
                        attributes: {
                            include: [[Sequelize.literal('(SELECT "username" FROM "user" WHERE "user"."id" = "Comments"."user_id")'), 'author']],
                            exclude: ['lesson_id', 'user_id']
                        }
                    }
                ],
                order: [[Sequelize.literal('rate'), 'DESC']],
            });
            if (lessons){
                return res.status(200).json({
                    status: 'Succès',
                    message: 'Cours trié par notes',
                    data: lessons,
                });
            } else {
                // Renvoie un message d'erreur si les lessons n'ont pas été trouvé dans la bdd
                return res.status(400).json({
                    status: 'Erreur',
                    message: 'Cours inexistant',
                });
            };
        } catch (error) {
            res.json(`Erreur: ${ error.message }`);
        };
    },

    getLessonsByComment: async (req, res) => {
        try {
            const lessons = await Lesson.findAll({
                attributes: { 
                    include: [
                        [Sequelize.literal('(SELECT COUNT(*) FROM "comment" WHERE "comment"."lesson_id" = "Lesson"."id")'), 'nb_comments'],
                        [Sequelize.literal('(SELECT COUNT(*) FROM "rate" WHERE "rate"."lesson_id" = "Lesson"."id")'), 'nb_rates'],
                        [Sequelize.literal('(SELECT "username" FROM "user" WHERE "user"."id" = "Lesson"."user_id")'), 'author'],
                        [Sequelize.literal('(SELECT ROUND(AVG("rate")) FROM "rate" WHERE "rate"."lesson_id" = "Lesson"."id")'), 'rate'],
                    ],
                    exclude: ['user_id']
                },
                include: [
                    {
                        model: Step, 
                        attributes: {
                            exclude: ['lesson_id']
                        }
                    },{
                        model: Comment,
                        attributes: {
                            include: [
                                [Sequelize.literal('(SELECT "username" FROM "user" WHERE "user"."id" = "Comments"."user_id")'), 'author'],
                                [Sequelize.literal('(SELECT "rate" FROM "rate" WHERE "rate"."lesson_id" = "Lesson"."id" AND "rate"."user_id" = "Comments"."user_id")'), 'user_rate'],
                            ],
                            exclude: ['lesson_id', 'user_id']
                        }
                    }
                ],
                order: [[Sequelize.literal('nb_comments'), 'DESC']],
            });

            if (lessons){
                return res.status(200).json({
                    status: 'Succès',
                    message: 'Cours trié par commentaires',
                    data: lessons,
                });
            } else {
                // Renvoie un message d'erreur si les lessons n'ont pas été trouvé dans la bdd
                return res.status(400).json({
                    status: 'Erreur',
                    message: 'Cours inexistant',
                });
            };
        } catch (error) {
            res.json(`Error: ${ error.message }`);
        }
    },

    getLessonById: async (req, res) => {
        const findUserByToken = res.locals.userCheckedByToken;

        if(findUserByToken) {
            try{
                // Récupération de la lesson dans la bdd avec l'id reçu en paramètre de l'URL
                const lessonId = req.params.lesson_id;
                const lesson = await Lesson.findByPk(lessonId, {
                    attributes: { 
                        include: [
                            [Sequelize.literal('(SELECT COUNT(*) FROM "comment" WHERE "comment"."lesson_id" = "Lesson"."id")'), 'nb_comments'],
                            [Sequelize.literal('(SELECT COUNT(*) FROM "rate" WHERE "rate"."lesson_id" = "Lesson"."id")'), 'nb_rates'],
                            [Sequelize.literal('(SELECT ROUND(AVG("rate")) FROM "rate" WHERE "rate"."lesson_id" = "Lesson"."id")'), 'rate'],
                            [Sequelize.literal('(SELECT "username" FROM "user" WHERE "user"."id" = "Lesson"."user_id")'), 'author'],
                        ],
                        exclude: ['user_id']
                    },
                    include: [
                        {
                            model: Step, 
                            attributes: {
                                exclude: ['lesson_id']
                            }
                        },{
                            model: Comment,
                            attributes: {
                                include: [[Sequelize.literal('(SELECT "username" FROM "user" WHERE "user"."id" = "Comments"."user_id")'), 'author']],
                                exclude: ['lesson_id', 'user_id']
                            }
                        },{
                            model: Category, // Inclure le modèle Category
                            attributes: ['id', 'name'], // Ajouter les attributs que vous souhaitez récupérer de la table Category
                            through: {
                                attributes: [] // Ne récupère pas les attributs de la table de liaison
                            }
                        ,}
                    ],
                });
                
                if (lesson){
                    return res.status(200).json({
                        status: 'Succès',
                        message: 'Données du cours',
                        data: lesson,
                        token: 'valide'
                    });
                    
                } else {
                    // Renvoie un message d'erreur si la lesson n'a pas été trouvé dans la bdd
                    return res.status(400).json({
                        status: 'Erreur',
                        message: 'Cours inexistant',
                    });
                };
            }catch (error) {
                res.json(`Error: ${ error.message }`);
            };
        } else {
            return res.status(400).json({
                status: 'Erreur',
                message: 'Utilisateur non autorisé',
            });
        }
    }, 

    getLessonByRole: async (req, res) => { //utile
        try{
            const findUserByToken = res.locals.userCheckedByToken;

            if(findUserByToken.dataValues.role === 'instructor') {

                const lessons = await Lesson.findAll({
                    attributes: {
                        include: [
                            [Sequelize.literal('(SELECT COUNT(*) FROM "comment" WHERE "comment"."lesson_id" = "Lesson"."id")'), 'nb_comments'],
                            [Sequelize.literal('(SELECT COUNT(*) FROM "rate" WHERE "rate"."lesson_id" = "Lesson"."id")'), 'nb_rates'],
                            [Sequelize.literal('(SELECT "username" FROM "user" WHERE "user"."id" = "Lesson"."user_id")'), 'author'],
                            [Sequelize.literal('(SELECT ROUND(AVG("rate")) FROM "rate" WHERE "rate"."lesson_id" = "Lesson"."id")'), 'rate'],
                        ],
                        exclude: ['user_id'],
                    },
                    include: [
                        {
                            model: Category,
                            through: { attributes: [] },
                            attributes: ['id', 'name'], 
                        }
                    ],
                    where: { user_id: findUserByToken.dataValues.id}
                });
    
                if (lessons) {
                    return res.status(200).json({
                        status: 'Succès',
                        message: 'Cours',
                        data: lessons,
                    });
                } else {
                    // Renvoie un message d'erreur si aucun utilisateur n'a été trouvé dans la bdd
                    return res.status(400).json({
                        status: 'Erreur',
                        message: 'Cours inexistant',
                    });
                }; 
            };
        } catch (error) {
            return res.status(400).json({
                status: 'Erreur',
                message: 'Utilisateur non autorisé',
            });
        }
    },

    createLesson: async (req, res) => { //utile
        try{
            const  {title, category, description, image, video, steps, user_id} = req.body.data
   
            if (title && description) {
                const lessonCreated = await Lesson.create({title, description, image, video, user_id});

                const findCategory = await Category.findOne({where : {name: category}})
                await lessonCreated.addCategory(findCategory)
              
                steps && steps.map(async step=> {
                    const stepCreated = await Step.create({ image: step.image, content: step.content, lesson_id: lessonCreated.dataValues.id})
                });
             
                // Renvoie un message de succès si la lesson a bien été créée
                return res.status(200).json({
                    status: 'Succès',
                    message: 'Cours ajouté',
                });
            } else {
                return res.status(400).json({
                    status: 'Erreur',
                    message: 'Cours non ajouté',
                });
            }
        } catch (error) {
            res.json(error);
        };
    },

    updateLesson: async (req, res) => { //utile
        try {
            // Récupération de l'utilisateur depuis le middleware verifyToken
            const findUserByToken = res.locals.userCheckedbyToken;

            if (findUserByToken.dataValues.role === "instructor" || findUserByToken.dataValues.role === "admin") {
                const formLessonUpdate = req.body
                const lessonId = req.params.lesson_id;
                await Lesson.update(formLessonUpdate, {where : {id : lessonId}});
                // Renvoie un message de succès si la lesson a bien été mis à jour
                return res.status(200).json({
                    status: 'Succès',
                    message: 'Cours mis à jour',
                });
            };
            // Renvoie un message d'erreur si l'utilisateur n'a pas les droits de mis à jour
            return res.status(403).json({
                status: 'Erreur',
                message: 'Utilisateur non autorisé'
            });
       
        } catch (error) {
            res.json(`Erreur: ${ error.message }`);
        };
    },

    deleteLesson: async (req, res) => { //utile
        try{
            const lesson = req.body.lesson;

            if (lesson) {
                // Suppression de la lesson avec l'id
                const findLesson = await Lesson.findByPk(lesson.id);
                const deleteLesson = await Lesson.destroy({where : {id : lesson.id}});
                if (deleteLesson) {
                    lesson.Steps.map(async (step) => await Step.destroy({where : {id : step.id}}));
                    lesson.Categories.map(async (category) => await findLesson.removeCategory(category));
                    lesson.Rates.map(async (rate) => await Step.destroy({where : {id : rate.id}}));
                    lesson.Comments.map(async (comment) => await Step.destroy({where : {id : comment.id}}));

                    // Renvoie un message de succès pour la supression de la lesson
                    return res.status(200).json({
                        status: 'Succès',
                        message: 'Cours supprimé'
                    });
                } else {
                    // Renvoie un message d'erreur si aucune lesson n'a été trouvé dans la bdd
                    return res.status(400).json({
                        status: 'Erreur',
                        message: 'Cours non supprimé',
                    })
                }
            } else {
                // Renvoie un message d'erreur si l'utilisateur n'a pas les droits de suppression
                return res.status(403).json({
                    status: 'Erreur',
                    message: 'Utilisateur non autorisé'
                });
            }
        } catch (error) {
            res.json(`Erreur: ${ error.message }`);
        };
    },
};

export default lessonsController;