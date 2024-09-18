import User from "../models/User.js";

const verifyToken = async (req, res, next) => {
    // Récupération du token en entête de la requête
    const token = req.headers.authorization.split('Bearer ')[1]
    // Récupération de l'utilisateur dans la bdd depuis le token
    const findUserByToken = await User.findOne({ where: { token: token }});
    
    if (findUserByToken === null || findUserByToken === undefined) {
        // Renvoie un message d'erreur si aucun utilisateur n'a été trouvé dans la bdd
        return res.status(400).json({
            status: 'Erreur',
            message: 'Token non attribué'
        });
    }; 

    // Attribue à la variable local userChecked l'utilisateur récupéré
    res.locals.userCheckedByToken = findUserByToken;
    // Next() permet de continuer d'executer le prochain middleware
    next();
};

export default verifyToken;