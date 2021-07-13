// Création du modèle User pour la BDD ---------------------------------------------------------------------------------------------------------
const mongoose = require("mongoose"); // Importation du package Mongoose
require('mongoose-type-email');

const uniqueValidator = require("mongoose-unique-validator"); // Utilisation du package Unique Validator pour prévalidation des informations
const sanitizerPlugin = require("mongoose-sanitizer-plugin"); // Permet de désinfecter les inputs pour éviter certaines injections noSQL

// Création du schéma User -------------------------------------------------------
const userSchema = mongoose.Schema({
    email : { type : String, required: [true, 'Veuillez rentrer une adresse mail valide'], unique: true, match: [/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/, "Veuillez entrer une adresse email valide"]}, // L'adresse mail doit être unique, et non partagée par deux users
    password : { type : String, required: true } 
});

userSchema.plugin(uniqueValidator);
userSchema.plugin(sanitizerPlugin);

module.exports = mongoose.model('User', userSchema); // Exportation du modèle
