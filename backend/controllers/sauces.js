// Ce controller contient toute la logique métier de notre interface sauces -------------------------------------------------------
const Sauce = require("../models/Sauce"); // Importation du modèle sauce
const fs = require("fs"); // Permet la manipulation de fichiers

// Récupération de la liste des sauces présentes--------------------------------------------------------------------
exports.getAllSauces = (req, res, next) => {
  Sauce.find()
    .then(
      // On récupère ici l'ensemble des sauces de la BDD
      (sauces) => {
        res.status(200).json(sauces); // Pour les transmettre au front-end
      }
    )
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

// Récupération d'une sauce avec son ID --------------------------------------------------------------------------------
exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({
    _id: req.params.id, // On réupère l'id pour accèder à la sauce dans la BDD
  })
    .then((sauces) => {
      res.status(200).json(sauces); 
    })
    .catch((error) => {
      res.status(404).json({
        error: error,
      });
    });
};

// Ajout d'une sauce --------------------------------------------------------------------------------------------------------------
exports.createSauce = (req, res, next) => {
  const sauceObj = JSON.parse(req.body.sauce); // La nouvelle sauce doit être enregistrée en tant qu'objet
  delete sauceObj._id; // On supprime l'id généré automatiquement
  const sauce = new Sauce({
    ...sauceObj, // Pour copier tout les éléments de l'objet
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`, // Résolution de l'url complète de l'image
    likes: 0, // Compteur likes à 0
    dislikes: 0, // Idem pour les dislikes
    usersLiked: [], // Remise du tableau likes / dislikes à 0 (vide)
    usersDisliked: [],
  });

  sauce.save() // On sauvegarde la sauce dans la BDD
    .then(() => {
        res.status(201).json({
          message: "Votre sauce est enregistrée !",
        });
      }
    )
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

// Modificaiton d'une sauce existante ----------------------------------------------------------------------------------
exports.modifySauce = (req, res, next) => {
  const sauceObj = req.file // On vérifie si req.file est existant en utilisant l'opérateur ternaire
    ? {
        ...JSON.parse(req.body.sauce), // Si présent on traîte la nouvelle image
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body }; // Dans le second cas on traîte uniquement le nouvel objet

  Sauce.updateOne({ _id: req.params.id }, { ...sauceObj, _id: req.params.id }) // Puis ont met à jour la BDD
    .then(() => res.status(200).json({ message: "Votre sauce est modifée !" }))
    .catch((error) => res.status(400).json({ error }));
};

// Suppression d'une sauce -------------------------------------------------------------------------------------------
exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({
    _id: req.params.id,
  }) // On réupère l'id pour accèder à la sauce dans la BDD
    .then((sauces) => {
      const filename = sauces.imageUrl.split("/images/")[1]; // On récupére le chemin de l'image
      fs.unlink(`images/${filename}`, () => {
        // Pour la supprimer
        Sauce.deleteOne({ _id: req.params.id }) // En callback on supprime la sauce de la BDD
          .then(() =>
            res.status(200).json({ message: "Votre sauce est supprimée !" })
          )
          .catch((error) => res.status(400).json({ error }));
      });
    })
    .catch((error) => res.status(500).json({ error }));
};

// Gestion de la notation d'une sauce ----------------------------------------------------------------------------------------------
exports.rateSauce = (req, res, next) => {
  //On utilise l'instruction switch pour lier des actions aux différents cas de figure :
  switch (req.body.like) {
    // Cas 1, ajout d'un like
    case 1:
      Sauce.updateOne(
        { _id: req.params.id }, // Recherche de la sauce par l'id
        {
          $inc: { likes: 1 }, // On incrémente un like grâce à l'opérateur inc de mongoDB
          $push: { usersLiked: req.body.userId } // Et on rajoute au tableau via push en prenant en compte l'id de l'user
        }
      )
        .then(() => res.status(201).json({ message: "Like enregistré" }))
        .catch((error) => res.status(400).json({ error }));
    break;

    // Cas O, annulation d'un like ou d'un dislike
    case 0:
      Sauce.findOne({ _id: req.params.id }) // On va vérifier si l'user id est déjà lié au tableau usersLiked ou usersDisliked
        .then((sauces) => {
          if (sauces.usersLiked.find(user => user === req.body.userId)) {
            // Si l'user id est déjà lié à usersLiked
            Sauce.updateOne(
              { _id: req.params.id },
              {
                $inc: { likes: -1 }, // On soustraie le like
                $pull: { usersLiked: req.body.userId } // On le soustraie du tableau
              }
            )
            .then(() => {
              res.status(201).json({ message: "Note mise à jour" });
            }).catch((error) => {
              res.status(400).json({ error });
            });
          }

          if (sauces.usersDisliked.find(user => user === req.body.userId)) {
            // Si l'user id est déjà lié à usersDisliked
            Sauce.updateOne(
              { _id: req.params.id },
              {
                $inc: { dislikes: -1 }, // On soustraie le dislike
                $pull: { usersDisliked: req.body.userId } //On le soustraie du tableau
              }
            )
            .then(() => {
              res.status(201).json({ message: "Note mise à jour" });
            }).catch((error) => {
              res.status(400).json({ error });
            });
          }
        })

        .catch((error) => {
          res.status(404).json({ error });
        });
    break;

    // Cas -1, ajout d'un dislike
    case -1:
      Sauce.updateOne(
        { _id: req.params.id },
        {
          // Recherche de la sauce par l'id
          $inc: { dislikes: 1 }, // On incrémente un dislike grâce à l'opérateur inc de mongoDB
          $push: { usersDisliked: req.body.userId }, // Et on rajoute au tableau via push
        }
      )
        .then(() => res.status(201).json({ message: "Dislike enregistré" }))
        .catch((error) => res.status(400).json({ error }));
    break;
  }
};
