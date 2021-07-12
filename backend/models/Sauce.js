const mongoose = require("mongoose");

// Création du modèle BDD pour les sauces -------------------------------------------
const sauceSchema = mongoose.Schema({
    id : { type: String, required: true}, // Id unique créé par MongoDB
    userId : { type : String, required: true}, // Id unique MongoDB pour l'user qui a créé une sauce
    name : { type : String, required: true},
    manufacturer : { type : String, required: true},
    description : { type : String, required: true},
    mainPepper : { type : String, required: true},
    imageUrl : { type : String, required: true},
    heat : { type : Number, required: true}, // Nombre entre 1 et 10 décrivant la sauce
    likes : { type : Number, required: true},
    dislikes : { type : Number, required: true},
    usersLiked : { type : [String], required: true}, // Tableau d'identifiants d'utilisateurs ayant aimé la sauce
    usersDisliked :  { type : [String], required: true} // Tableau d'identifiants d'utilisateurs n'ayant pas aimé la sauce
});

module.exports = mongoose.model('Sauce', sauceSchema); // Exportation du modèle