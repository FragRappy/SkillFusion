import validator from "validator";
import User from "../models/User.js";

const verifyInputs = async (req, res, next) => {
    // Reset des données du res.locals
    res.locals.inputsChecked = {};
    res.locals.userCheckedByEmail = {};
    res.locals.userCheckedByUsername = {};
    // Création des variables findUserByEmail et findUserByUsername
    let findUserByEmail = {};
    let findUserByUsername = {};
    // Récupération de l'username, l'email et le password du formulaire reçu
    const { username, email, password } = req.body;
    // Préparation d'un réponse de l'api pour des erreurs custom
    const error =  {errEmail: [], errPassword: [], errUsername: []}

    if(username === ''){
        if (validator.isEmpty(username)) {
            const message = "Veuillez saisir un nom d'utilisateur";
            error.errUsername.push(message);
        };
    };
   
    if (username) {
        // Attribue l'utilisateur dans la bdd avec l'username reçu à findUserByUsername
        
        findUserByUsername = await User.findOne({ where: { username: username }});

        if(!validator.isLength(username, { min:2, max:20 })) {
            const message = "Le nom d'utilisateur doit contenir entre 2 et 20 caractères";
            error.errUsername.push(message);
        };
    };

    if (email === '') {
        if (validator.isEmpty(email)) {
            const message = 'Veuillez saisir votre adresse email';
            error.errEmail.push(message);
        };
    };

    if (email) {
        
        // Attribue l'utilisateur dans la bdd avec l'email reçu à findUserByEmail
        findUserByEmail = await User.findOne({ where: { email: email }});

        if(!validator.isEmail(email)) {
            const message = "L'email saisi est incorrect";
            error.errEmail.push(message);
        };
    };
    
    if (password === ''){
        if (validator.isEmpty(password)) {
            const message = 'Veuillez saisir un mot de passe';
            error.errPassword.push(message);
        };
    };

    if (password) {
        const options = { minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 };
        if (!validator.isStrongPassword(password, options)) {
            const message = 'Le mot de passe doit contenir au moins 8 caractères, 1 majuscule, 1 minuscule, 1 chiffre et 1 caractère spécial';
            error.errPassword.push(message);
        };
    };
   
    if(error.errEmail.length > 0 || error.errPassword.length > 0 || error.errUsername.length > 0) {

        return res.status(400).json({
            status: 'Erreur',
            error
        });
    };

    // Attribue à la variable inputsChecked du res.locals avec l'username, l'email et le password depuis le formulaire reçu
    res.locals.inputsChecked = { username, email, password };
    // Attribue à la variable userCheckedByEmail avec l'utilisateur trouvé depuis l'email
    res.locals.userCheckedByEmail = findUserByEmail;
    // Attribue à la variable userCheckedByEmail avec l'utilisateur trouvé depuis l'username
    res.locals.userCheckedByUsername = findUserByUsername;
    // Next() permet de continuer d'executer le prochain middleware
    next();
};

export default verifyInputs;