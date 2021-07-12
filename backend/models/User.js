const mongoose = require("mongoose");
require('mongoose-type-email');
const uniqueValidator = require('mongoose-unique-validator'); // Utilisation du package Unique Validator pour prévalidation des informations

// Création du modèle BDD pour les users -------------------------------------------
const userSchema = mongoose.Schema({
    userId : { type : String, required: true}, // Identifiant unique MongoDB pour l'utilisateur qui a créé la sauce
    email : { type : String, required: [true, 'Veuillez rentrer une adresse mail valide'], unique: true, match: '[a-z0-9\._%+-]+@[a-z0-9.-]+\.[a-z]{2,10}]'}, // L'adresse mail doit être unique, et non partagée par deux users
    password : { type : String, required: true} // pwd hâché
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema); // Expotation du modèle
