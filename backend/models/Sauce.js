const mongoose = require("mongoose");

const sanitizerPlugin = require("mongoose-sanitizer-plugin"); // Permet de désinfecter les inputs pour éviter certaines injections noSQL


// Création du modèle BDD pour les sauces ---------------------------------------------------------------------------------------------
const sauceSchema = mongoose.Schema({
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

sauceSchema.plugin(sanitizerPlugin);

module.exports = mongoose.model('Sauce', sauceSchema); // Exportation du modèle