// Création de la route sauces en suivant les insctructions du front-end  
const express = require("express");
const router = express.Router();

const saucesCtrl = require("../controllers/sauces"); // On aura besoin de la logique métier décrite dans le controller sauces


module.exports = router; // Exportation du router 

