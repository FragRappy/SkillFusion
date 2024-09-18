import { Sequelize } from "sequelize";
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import 'dotenv/config';
import User from "../models/User.js";
import Lesson from "../models/Lesson.js";

const usersController = {

    login: async (req, res) => {
        try {
            // Récuperation de l'email et du password depuis le middleware verifyInputs
            const { email, password } = res.locals.inputsChecked;
            // Récupération de l'utilisateur dans la bdd avec l'email reçu depuis le middleware verifyInputs
            const findUserByEmail = res.locals.userCheckedByEmail;

            if (findUserByEmail) {
               // Comparaison du mot de passe reçu avec celui de la bdd
                bcrypt.compare(password, findUserByEmail.dataValues.password, async (err, result) => {
                    if (!result) {
                        // Renvoie d'un message d'erreur si la comparaison échoue
                        return res.status(401).json({
                            status: 'Erreur',
                            message: 'Mot de passe incorrect.'
                        });
                    }; 
                    // Création du token
                    const token = crypto.randomBytes(32).toString('hex');

                    // Attribution du token et de son temps avant expiration à l'utilisateur 
                    const userUpdated =  await User.update({ 
                        token: token, 
                        tokenExpires: Date.now() + 28800000 // en millisecondes
                    },{ where: { 
                            email: findUserByEmail.dataValues.email 
                        }
                    }); 

                    //Récupération de l'utilisateur mis à jour avec le token depuis l'email
                    const user = await User.findOne({ where: { email: email }});

                    if (userUpdated && user) {
                        // Renvoie du token pour que l'utilisateur puisse s'authentifier sur toutes les autres requêtes API
                        return res.status(201).json({
                            status: 'Succès',
                            message: 'Utilisateur connecté.',
                            data: user
                        });
                    } else {
                        return res.status(400).json({
                            status: 'Erreur',
                            message: 'Utilisateur non connecté.'
                        });
                    };
                });
            } else {
                // Renvoie un message d'erreur si aucun utilisateur n'a été trouvé dans la bdd
                return res.status(400).json({
                    status: 'Erreur',
                    message: 'Utilisateur inexistant.'
                });
            };
        } catch (error) {
            res.json(`Erreur : ${ error.message }`)
        };
    },

    register: async (req, res) =>{
        try {
            // Récuperation de l'username, l'email et du password depuis le middleware verifyInputs
            let { username, email, password } = res.locals.inputsChecked;
            const findUserByEmail = res.locals.userCheckedByEmail;
            const findUserByUsername = res.locals.userCheckedByUsername;

            if (findUserByEmail) {
                // Vérification si l'email est déjà utilisé dans la bdd
                return res.status(403).json({
                    status: 'Erreur',
                    message: `Ce courriel est déjà utilisé.`
                });
            };

             // Vérification si le pseudo est déjà utilisé dans la bdd
            if (findUserByUsername) {
                return res.status(403).json({
                    status: 'Erreur',
                    message: `Nom d'utilisateur indisponible.`
                });
            };

            bcrypt.hash(password, 10, async (err, hash) => {
                // Créer un utilisateur avec l'username, l'email et le mot de passe haché
                const userCreated = await User.create({ username, email, password: hash });

                if (userCreated) {
                    // Renvoie un message de succès si l'utilisateur a été crée dans la bdd
                    return res.status(201).json({
                        status: 'Succès',
                        message: 'Utilisateur ajouté.'
                    });
                } else {
                    return res.status(400).json({
                        status: 'Erreur',
                        message: 'Utilisateur non ajouté.'
                    });
                }
            });
        } catch (error) {
            res.json(`Erreur: ${ error.message }`);
        };
    },

    getUsers: async (req , res) =>{
        try {
            // Récupération de tous les utilisateurs de la bdd (les champs mot de passe, token, tokenExpires, date creation et date mise à jour ont été exclus)
            const users = await User.findAll({
                order: ['id'],
                attributes: {
                  exclude: ["password", "token", "tokenExpires", "updatedAt"],
                }
            });

            if (users) {
                // Renvoie un message de succès avec toutes les tables des utilisateurs au front (json trié par ordre croissant depuis les id)
                return res.status(200).json({
                    status: 'Succès',
                    message: 'Utilisateurs récupérés.',
                    data: users
                });
            } else {
                // Renvoie un message d'erreur si aucun utilisateur n'a été trouvé dans la bdd
                return res.status(400).json({
                    status: 'Erreur',
                    message: 'Utilisateurs inexistants.',
                });
            };  
        } catch (error) {
            res.json(`Erreur: ${ error.message }`);
        };
    },

    getUser: async (req, res) =>{
        try {
            // Récupération de l'utilisateur dans la bdd avec l'id reçu en paramètre de l'URL (le champs mot de passe a été exclus)
            const findUserByToken = res.locals.userCheckedByToken;

            const findUserById = await User.findByPk(findUserByToken.dataValues.id, { attributes: { exclude: ['password'] }});

            if (findUserById && findUserByToken) {
                // Renvoie un message de succès avec la table de l'utilisateur au front si un utilisateur a été trouvé dans la bdd
                return res.status(200).json({
                    status: 'Succès',
                    message: 'Utilisateur récupéré.',
                    data: findUserById,
                    token: 'valide'
                });
            } else {
                return res.status(400).json({
                    status: 'Erreur',
                    message: 'Utilisateur inexistant.',
                });
            };
        } catch (error) {
            res.json(`Erreur: ${ error.message }`);
        };
    },

    updateUser: async (req, res) => {
        try {
            //Récupération de l'username et de l'email depuis le middleware verifyInputs
            const {username, email} = res.locals.inputsChecked;
            // Récupération de l'utilisateur depuis le middleware verifyToken
            const findUserByToken = res.locals.userCheckedByToken;
            
            // Vérification si l'email est déjà utilisé dans la bdd
            const findUserByEmail = res.locals.userCheckedByEmail;
            if (findUserByEmail && findUserByEmail.dataValues.id !== findUserByToken.dataValues.id){
                // Renvoie un message d'erreur si l'email n'est pas disponible et qu'il n'appartient pas à l'utilisateur connecté
                return res.status(403).json({
                    status: 'Erreur',
                    message: `Ce courriel est déjà utilisé.`
                });
            };
           
            // Vérification si le pseudo est déjà utilisé dans la bdd
            const findUserByUsername = res.locals.userCheckedByUsername;
            if (findUserByUsername && findUserByUsername.dataValues.id !== findUserByToken.dataValues.id){
                // Renvoie un message d'erreur si le pseudo n'est pas disponible et qu'il n'appartient pas à l'utilisateur connecté
                return res.status(403).json({
                    status: 'Erreur',
                    message: `Nom d'utilisateur indisponible.`
                });
            };

            // Met à jour l'utilisateur depuis le formulaire reçu
            const userUpdated = await User.update({ 
                username: username, 
                email: email 
                },{ where: { 
                    id: findUserByToken.dataValues.id, 
                }
            });
            if (userUpdated) {
                // Renvoie un message de succès si l'utilisateur a bien été mis à jour
                return res.status(200).json({
                    status: 'Succès',
                    message: 'Utilisateur mis à jour.'
                });
            } else {
                return res.status(400).json({
                    status: 'Erreur',
                    message: 'Utilisateur non mis à jour.'
                });
            };
        } catch (error) {
            res.json(`Erreur: ${ error.message }`);
        };
    },

    updateRole: async(req, res) => {
        try {
            // Récupération de l'utilisateur depuis le middleware verifyToken
            const findUserByToken = res.locals.userCheckedByToken;
            const user = await User.findByPk(req.params.user_id);

            if(findUserByToken.dataValues.role === 'admin' && user){
                const userUpdated = await User.update({ 
                    role : req.body.role
                    },{ where: { 
                        id: user.id, 
                    }
                });
                if (userUpdated) {
                    // Renvoie un message de succès si l'utilisateur a bien été mis à jour
                    return res.status(200).json({
                        status: 'Succès',
                        message: 'Utilisateur mis à jour.'
                    });
                } else {
                    return res.status(400).json({
                        status: 'Erreur',
                        message: 'Utilisateur non mis à jour.'
                    });
                };
            }
        } catch (error) {
            res.json(`Erreur: ${ error.message }`);
        }
    },

    deleteUser: async (req, res) => {
        try {
            // Récupération de l'utilisateur depuis le middleware verifyToken
            const findUserByToken = res.locals.userCheckedByToken;
            // Récupération de l'utilisateur à supprimer avec l'id reçu en paramètre de l'URL
            const userToDelete = await User.findByPk(req.params.user_id);

            if ( findUserByToken.dataValues.role === "admin" || userToDelete.dataValues.id === findUserByToken.dataValues.id ) {
                // Suppression de l'utilisateur avec l'id
                const userDeleted = await User.destroy({ where : { id : userToDelete.dataValues.id }});

                if (userDeleted) {
                    // Renvoie un message de succès pour la supression de l'utilisateur
                    return res.status(200).json({
                        status: 'Succès',
                        message: 'Utilisateur supprimé.'
                    });
                } else {
                    return res.status(400).json({
                        status: 'Erreur',
                        message: 'Utilisateur inexistant.'
                    });
                }
            } else {
                // Renvoie un message d'erreur si l'utilisateur n'a pas les droits de suppression
                return res.status(403).json({
                    status: 'Erreur',
                    message: 'Utilisateur non autorisé.'
                });
            };
        } catch (error) {
            res.json(`Erreur: ${ error.message }`);
        };
    },

    logout: async (req, res) => {
        try {
            // Récupération de l'utilisateur depuis le middleware verifyToken
            const findUserByToken = res.locals.userCheckedByToken;

            // Met à jour le token de l'utilisateur en le mettant à null
            if (findUserByToken) {
                const tokenDeleted = await User.update({ token: null, tokenExpires: null }, { where: { token: findUserByToken.dataValues.token }});

                if (tokenDeleted) {
                    // Renvoie un message de succès pour la suppression du token de l'utilisateur dans la bdd
                    return res.status(200).json({
                        status: 'Succès',
                        message: 'Token supprimé.',
                        token: 'valide'
                    });
                } else {
                    return res.status(400).json({
                        status: 'Erreur',
                        message: 'Token non supprimé.'
                    });
                };
            };
        } catch (error) {
            res.json(`Erreur : ${ error.message }`);
        };
    },

    getFollow: async (req, res) => {
        try {
            // Récupération de l'utilisateur depuis le middleware verifyToken
            const findUserByToken = res.locals.userCheckedByToken;
            
            if (findUserByToken) {
                const lessonsFollowed = await Lesson.findAll({
                    attributes: ['id', 'title', 'image'],
                    where: {
                        id: {
                            [Sequelize.Op.in]: Sequelize.literal(`(SELECT "LessonId" FROM "follow" WHERE "UserId" = ${findUserByToken.dataValues.id})`)
                        }
                    }
                });

                if (lessonsFollowed) {
                    // Renvoie un message de succès si les cours suivis ont été récupéré dans la bdd
                    return res.status(201).json({
                        status: 'Succès',
                        message: 'Cours suivi récupéré.',
                        data: lessonsFollowed,
                        token: 'valide',
                    });
                } else {
                    return res.status(400).json({
                        status: 'Erreur',
                        message: "Cours suivi inexistant.",
                    });
                };
            };
        } catch (error) {
            res.json(`Erreur: ${ error.message }`);
        };
    },
    
    addFollow: async (req, res) => {
        try {
            // Récupération de l'utilisateur depuis le middleware verifyToken
            const findUserByToken = res.locals.userCheckedByToken;
            // Récupération de la lesson dans la bdd avec l'id reçu en paramètre de l'URL
            const lessonId = req.params.lesson_id;
            const findLessonById =  await Lesson.findByPk(lessonId)

            if (findUserByToken && lessonId) {
                const lessonFollowed = await findLessonById.addUser(findUserByToken);

                if (lessonFollowed) {
                    // Renvoie un message de succès si l'utilisateur a été crée dans la bdd
                    return res.status(201).json({
                        status: 'Succès',
                        message: 'Cours ajouté au suivi.',
                        // token: 'valide'
                    });
                } else {
                    return res.status(400).json({
                        status: 'Erreur',
                        message: "Cours non ajouté au suivi.",
                    });
                };
            };
        } catch (error) {
            res.json(`Erreur: ${ error.message }`);
        };
    },

    deleteFollow: async (req, res) => {
        try {
            // Récupération de l'utilisateur depuis le middleware verifyToken
            const findUserByToken = res.locals.userCheckedByToken;
            // Récupération de la lesson dans la bdd avec l'id reçu en paramètre de l'URL
            const lessonId = req.params.lesson_id;
            const findLessonById =  await Lesson.findByPk(lessonId)

            if (findUserByToken && lessonId) {
                const lessonFollowed = await findLessonById.removeUser(findUserByToken);

                if (lessonFollowed) {
                    // Renvoie un message de succès si l'utilisateur a bien été mis à jour
                    return res.status(200).json({
                        status: 'Succès',
                        message: 'Cours retiré du suivi.',
                    });
                } else {
                    return res.status(400).json({
                        status: 'Erreur',
                        message: "Cours non retiré du suivi.",
                    });
                };
            };
        } catch (error) {
            res.json(`Erreur: ${ error.message }`);
        };
    },
};

export default usersController;