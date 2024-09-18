import express from 'express';
import 'dotenv/config';
import sequelize from './src/database/database.js';
import router from './src/routers/router.js';
import cors from "cors";
import {Category, Comment, Lesson, Like, Rate, Step, User} from './src/models/index.js'

const app = express();
const port = process.env.PORT || 3000; // Le port est défini dans le fichier .env, si celui-ci est occupé ou absent alors le port 3000 sera utilisé

app.use(express.urlencoded({ extended: true })); // Middleware permettant d'accéder à req.body dans les controlleurs liés à des routes utilisant la méthode POST
app.use(express.static('./public')); // Middleware dirigeant les routes de fichiers statiques dans le dossier public

app.use(cors())
app.use(express.json());

await sequelize.sync();
await User.sync();
await Lesson.sync();
await Category.sync();
await Comment.sync();
await Like.sync();
await Step.sync();
await Rate.sync();

app.use(router);

app.listen(port, () => {
    console.log(`Serveur démarré sur http://localhost:${port}`);
});
