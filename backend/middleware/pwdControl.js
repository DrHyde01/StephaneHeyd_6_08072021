// Middleware gérant la vérificaiton du mot de passe user ------------------------------------------------------
const passwordSchema = require("../models/PwdControl"); // On récupère notre schéma 

// On compare le mot de passe renseigné avec les contraintes notées dans PwdControl 
module.exports = (req, res, next) => {
    if (!passwordSchema.validate(req.body.password)) { // Si les conditions ne sont pas validées une erreur est retournée dans le header
        res.writeHead(400, "{'message' : 'Mot de passe invalide, sont requis : 8 caractères minimum, au moins une majuscule et une minuscule, sans espaces'}", 
        {"content-type" : "application/json"});

        res.end("Ce format de mot de passe n'est pas valide");
    }

    else { // Si les conditions sont remplies on passe au middleware suivant
        next();
    }
};