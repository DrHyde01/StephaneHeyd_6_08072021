// Mise en place des routes concernant la gestion des users ----------------------------------------------------------
const express = require('express'); // Utilisation de express
const router = express.Router(); // Et de sa méthode router pour créer notre route

const userCtrl = require('../controllers/users'); // Importation du controller users
const pwdCtrl = require('../middleware/pwdControl'); // Importation du schéma permettant de contrôler les passwords

// Création des routes user
router.post('/signup', pwdCtrl, userCtrl.signup); // Création d'un nouvel user
router.post('/login', userCtrl.login); // Connexion d'un user existant

module.exports = router; // Exportation du router