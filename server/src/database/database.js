import Sequelize from 'sequelize';
import "dotenv/config";

// Configuration de l'ORM sequelize 
const sequelize = new Sequelize({
    logging: false, // active ou désactive les messages rendus dans le terminal
    dialect: 'postgres', // donne à sequelize le type de bdd avec laquelle il devra communiquer (ici postgres)
    database: process.env.DB_NAME, // va chercher dans le .env l'information contenu dans la variable DB_NAME
    username: process.env.DB_USER, // va chercher dans le .env l'information contenu dans la variable DB_USER
    password: process.env.DB_PASSWORD, // va chercher dans le .env l'information contenu dans la variable DB_PASSWORD
    port: process.env.DB_PORT, // va chercher dans le .env l'information contenu dans la variable DB_PORT
    host: process.env.DB_HOST, // va chercher dans le .env l'information contenu dans la variable DB_HOST
});

export default sequelize;