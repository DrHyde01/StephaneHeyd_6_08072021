// Ce controlleur contient toute la logique métier de notre interface user, logique appliquée aux routes POST de création et de connexion ------
const User = require("../models/User"); // Utilisation du schéma user
const bcrypt = require("bcrypt"); // Bcrypt sera utilisé pour hasher le mot de passe user
const jwt = require('jsonwebtoken'); // Jsonwebtoken permettera des opérations sécurisées par l'utilisaiton d'un token

// Gestion de la création d'un utilisateur et cryptage du mot de passe  ---------------------------------------------------------------
exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 12) // Salage du mot de passe
    .then(hash => {                    // Réception du hash généré et création du nouvel user
        const user = new User({       // Création du user via le modèle prévu pour la BDD
        email: req.body.email,        // Récupération de l'adresse mail
        password: hash                // Et du mot de passe crypté
    });
    user.save()                       // Puis sauvegarde dans la BDD
    .then(() => res.status(201).json({ message: "Utilisateur créé !"}))

    .catch(error => res.status(400).json({ error }));  // Une erreur est transmise si l'user existe déjà
    })

    .catch(error => res.status(500).json({ error }));
};

// Gestion de la connexion d'un utilisateur existant -----------------------------------------------------------------------------
exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email }) // On vérifié si l'user est déjà présent dans la BDD
      .then(user => {
        if (!user) {
          return res.status(401).json({ error: 'Utilisateur inexistant !' }); // Si non un message d'erreur est retourné
        }
        bcrypt.compare(req.body.password, user.password) // On compare les hash de mot de passe transmis avec celui en mémoire
          .then(valid => {
            if (!valid) {
              return res.status(401).json({ error: 'Mot de passe incorrect !' });
            }
            res.status(200).json({ // Si OK un token est renvoyé au frontend avec un user id
              userId: user._id,
              token: jwt.sign(     // Sign permet d'encoder un nouveau token
                { userId: user._id },
                'RANDOM_TOKEN_SECRET', // Cette clé d'encodage devra être renforcée en prod !
                { expiresIn: '24h' } // Le token a une durée de vie déterminée
              )
            });
          })
          .catch(error => res.status(500).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
  };