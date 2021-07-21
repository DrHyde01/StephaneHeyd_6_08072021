// Mise en place des routes concernant la gestion des users ---------------------------------------------------------------------
const express = require('express'); // Utilisation de express
const router = express.Router(); // Et de sa méthode router pour créer notre route

const userCtrl = require('../controllers/users'); // Importation du controller users
const pwdCtrl = require('../middleware/pwdControl'); // Importation du schéma permettant de contrôler la création de passwords
const max = require("../middleware/limiter"); // Utilisation d'un limiter pour éviter les trop nombreuses tentatives de connexion


// Création des routes user
router.post('/signup', pwdCtrl, userCtrl.signup); // Création d'un nouvel user avec contrôle du format de password
router.post('/login', max.limiter, userCtrl.login); // Connexion d'un user existant avec utilisation du limiter

module.exports = router; // Exportation du router