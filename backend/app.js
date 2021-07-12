// Mise en place de l'application Express ----------
const express = require("express"); 
const app = express();


// Mise en place de Mongoose pour la connexion à la BDD -----------------
const mongoose = require("mongoose");

require('dotenv').config() // Utilisation du module Dotenv pour accèder à notre variable d'identifiants BDD

mongoose.connect(process.env.DB_ACCESS, // Accès sécurisé à la BDD, les informations de connexion ne sont pas affichés ici
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à la BDD réussie !'))
  .catch(() => console.log('Connexion à la BDD échouée !'));


 // Middleware mis en place pour filtrer les requêtes et éviter les erreurs CORS ---------------------
 app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

// Requête test pour s'assurer de la bonne configuration serveur
app.use((req, res, next) => { 
    res.json({ message: "Bonjour bonjour !" }); 
    next();
 });


module.exports = app;