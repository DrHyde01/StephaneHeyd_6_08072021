// Mise en place de l'application permettant d'utiliser l'API -----------------------------------------------------------------------------------------------------------------------
const express = require('express'); // Express est un framework basé sur node.js, permettant de faciliter le déploiement de notre API
const mongoose = require('mongoose'); // Mongoose permettra de communiquer avec notre BDD
const mongoSanitize = require('express-mongo-sanitize'); // Afin de nettoyer les input et prévenir des injections noSQL avant l'envoi à la BDD
const helmet = require('helmet'); // Le package Helmet va permettre de sécuriser davantage nos routes par le rajout de headers
const path = require('path'); // On utilise path pour que l'app puisse travailler sur notre dossier images

const saucesRoutes = require("./routes/sauces"); // Import du router sauces
const usersRoutes = require("./routes/users"); // Import du router users

require('dotenv').config() // Utilisation du module Dotenv pour accèder à notre variable d'identifiants BDD


// Mise en place de Mongoose pour la connexion à la BDD --------------------------------------------------------------------
mongoose.connect(process.env.DB_ACCESS, // Accès sécurisé à la BDD, les informations de connexion ne sont pas affichés ici
  { useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
    })
  .then(() => console.log('Connexion à la BDD réussie !'))
  .catch(() => console.log('Connexion à la BDD échouée !'));

// On commence à créer l'application ici --------------------------------------------------------------------------------------------------------------------------
const app = express(); 

// Middleware mis en place pour filtrer les requêtes et éviter les erreurs CORS liées aux échanges back et front
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // Accès à notre api peut importe l'origine
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'); // Ajout de headers aux requêtes
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS'); // Acceptation des requêtes renseignées
  next();
  });

app.use(express.json()); // Remplace bodyParser sur les dernières versions de Express, utile pour parser nos inputs
app.use(express.urlencoded({ extended: true })); // En complément de express.json, afin de gérer les objets plus riches
app.use(mongoSanitize()); // On utilise la fonction sanitize pour éviter les injections 
app.use(helmet()); // Appel du package Helmet
app.use('/images', express.static(path.join(__dirname, 'images'))); // Pour que Express gère le dossier images de manière statique à chaque requête 

app.use("/api/sauces", saucesRoutes); // Utilisation du routeur sauces
app.use("/api/auth", usersRoutes); // Utilisation du routeur users

module.exports = app; // Export de l'app pour une utilisation dans d'autres fichiers du projet  