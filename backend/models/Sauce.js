// Création du modèle BDD pour les sauces ---------------------------------------------------------------------------------------------
const mongoose = require("mongoose");

const sauceSchema = mongoose.Schema({
    userId : { type : String, required: true}, // Id unique fourni par MongoDB pour l'user qui a créé une sauce
    name : { type : String, required: true},
    manufacturer : { type : String, required: true},
    description : { type : String, required: true},
    mainPepper : { type : String, required: true},
    imageUrl : { type : String, required: true},
    heat : { type : Number, required: true}, // Nombre entre 1 et 10 décrivant la sauce
    likes : { type : Number, defaut: 0, required: false},
    dislikes : { type : Number, defaut: 0, required: false},
    usersLiked : { type : [String], required: false}, // Tableau d'identifiants d'utilisateurs ayant aimé la sauce
    usersDisliked :  { type : [String], required: false} // Tableau d'identifiants d'utilisateurs n'ayant pas aimé la sauce
});

module.exports = mongoose.model('Sauce', sauceSchema); // Exportation du modèle