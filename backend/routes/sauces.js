// Mise en place des routes concernant la gestion CRUD des sauces  ------------------------------------------------------------
const express = require("express");
const router = express.Router();

const auth = require('../middleware/auth'); // Importation de notre middleware auth servant à protéger nos routes
const multer = require('../middleware/multer-config'); // Importation du middleware multer et de sa configuration
const saucesCtrl = require("../controllers/sauces"); // On aura besoin de la logique métier décrite dans le controlleur sauces

// Création des routes sauces --------------------------------------------------------------------------------------------------
router.get('/', auth, saucesCtrl.getAllSauces); // Récupération de la liste des sauces
router.get('/:id', auth, saucesCtrl.getOneSauce); // Récupération d'une sauce par ID
router.post('/', auth, multer, saucesCtrl.createSauce); // Ajout d'une sauce
router.put('/:id', auth, multer, saucesCtrl.modifySauce); // Modification d'une sauce
router.delete('/:id', auth, saucesCtrl.deleteSauce); // Suppression d'une sauce
router.post('/:id/like', auth, saucesCtrl.rateSauce); // Notation d'une sauce

// Toutes les routes sont protégées par le middleware auth, multer est utilisé pour les routes POST et PUT

module.exports = router; // Exportation du router 

