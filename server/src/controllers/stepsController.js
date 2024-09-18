import Step from '../models/Step.js';

const stepController = {

    getSteps: async (req, res) => {
        try {
            const steps = await Step.findAll();

            if (steps) {
                return res.status(200).json({
                    // Renvoie un message de succès avec toutes les tables des steps au front (json trié par ordre croissant depuis les id)
                    status: 'Succès',
                    message: 'Etapes récupérées',
                    datas: steps.sort((a, b) => {
                        if (a.dataValues.id < b.dataValues.id) {
                          return -1;
                        };
                    })
                });
            } else {
                // Renvoie un message d'erreur si les étapes n'a pas été trouvé dans la bdd
                return res.status(400).json({
                    status: 'Erreur',
                    message: 'Etapes inexistantes',
                });
            }
        } catch (error) {
            res.json(`Erreur: ${ error.message }`);
        }
    },

    getStepById : async (req, res) => {
        try {
            // Récupération de l'étape dans la bdd avec l'id reçu en paramètre de l'URL
            const step = await Step.findByPk(req.params.step_id);

            if (step) {
                return res.status(200).json({
                    status: 'Succès',
                    message: 'Etape récupérée',
                    datas: step.sort((a, b) => {
                        if (a.dataValues.id < b.dataValues.id) {
                          return -1;
                        };
                    })
                });
            } else {
                // Renvoie un message d'erreur si l'étape n'a pas été trouvé dans la bdd
                return res.status(400).json({
                    status: 'Erreur',
                    message: 'Etape inexistante',
                });
            };
        } catch (error) {
            res.json(`Error: ${ error.message }`);
        };
    },

    createStep: async (req, res) => {
        try {
            const step = req.body;
            if (step) {
                const stepCreated = await Step.create(step);

                if (stepCreated) {
                    // Renvoie un message de succès si l'étape a bien été créée
                    return res.status(200).json({
                        status: 'Succès',
                        message: 'Etape ajoutée',
                    });
                } else {
                    // Renvoie un message d'erreur si l'étape est vide
                    return res.status(400).json({
                        status: 'Erreur',
                        message: "L'étape ne peut pas être vide",
                    });
                };
            };
        } catch (error) {
            res.json(`Erreur: ${ error.message }`);
        };
    },

    updateStep: async (req, res) => {
        try {
            // Récupération de l'utilisateur depuis le middleware verifyToken
            const findUserByToken = res.locals.userCheckedbyToken;

            if (findUserByToken) {

                if (findUserByToken.dataValues.role === "instructor" || findUserByToken.dataValues.role === "admin") {
                    const updatedStep = req.body;
                    const stepId = req.params.step_id;
                    await Step.update(updatedStep, { where: { id: stepId }});
                    // Renvoie un message de succès si l'étape a bien été mis à jour
                    return res.status(200).json({
                        status: 'Succès',
                        message: 'Etape mise à jour',
                    });
                } else {
                    // Renvoie un message d'erreur si l'utilisateur n'a pas les droits de mis à jour
                    return res.status(403).json({
                        status: 'Erreur',
                        message: 'Utilisateur non autorisé'
                    });
                };
            };
        } catch (error) {
            res.json(`Erreur: ${ error.message }`);
        };
    },

    deleteStep: async (req, res) =>{  
        try{
            // Récupération de l'utilisateur depuis le middleware verifyToken
            const findUserByToken = res.locals.userCheckedbyToken;
            // Récupération de l'étape à supprimer avec l'id reçu en paramètre de l'URL
            const stepToDelete = await Step.findByPk(req.params.step_id);

            if(stepToDelete && findUserByToken) {

                if (findUserByToken.dataValues.role === "instructor" || findUserByToken.dataValues.role === "admin") {
                    // Suppression de l'étape avec l'id
                    await Step.destroy({ where: { id : stepToDelete.dataValues.id }});
                    // Renvoie un message de succès pour la supression de l'étape
                    return res.status(200).json({
                        status: 'Succès',
                        message: 'Etape supprimée'
                    });
                } else {
                    // Renvoie un message d'erreur si l'utilisateur n'a pas les droits de suppression
                    return res.status(403).json({
                        status: 'Erreur',
                        message: 'Utilisateur non autorisé'
                    });
                }
            } else {
                // Renvoie un message d'erreur si aucune étape n'a été trouvé dans la bdd
                return res.status(400).json({
                    status: 'Erreur',
                    message: 'Etape inexistante',
                });
            };
        } catch (error) {
            res.json(`Erreur: ${ error.message }`);
        };
    },
};

export default stepController;