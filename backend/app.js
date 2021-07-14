// Mise en place de l'application permettant d'utiliser l'API -----------------------------------------------------------------------------------------------------------------------
const express = require("express"); // Express est un framework basé sur node.js, permettant de faciliter l'emploi de l'app
const bodyParser = require('body-parser'); // Package permettant de parser les requêtes
const mongoose = require("mongoose"); // Mongoose permet de gérer notre BDD
const path = require('path'); // On utilise path pour que l'app puisse travailler sur les fichiers et les dossiers

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

// On commence à créer l'application ici -----------------------------------------------------------------------------------
const app = express(); 

 // Middleware mis en place pour filtrer les requêtes et éviter les erreurs CORS 
 app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });
 
app.use(bodyParser.json()); 
app.use('/images', express.static(path.join(__dirname, 'images'))); // Pour que Express gère le dossier images de manière statique à chaque requête 
app.use("/api/sauces", saucesRoutes); // Utilisation du routeur sauces
app.use("/api/auth", usersRoutes); // Utilisation du routeur users

module.exports = app; // Export de l'app pour une utilisation dans d'autres fichiers du projet  