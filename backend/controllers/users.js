// Ce controller contient toute la logique métier de notre interface user, logique appliquée aux routes POST de création et de connexion 
const User = require("../models/User"); // Utilisation du schéma user
const bcrypt = require("bcrypt"); // Bcrypt sera utilisé pour hasher le mot de passe user
const jwt = require('jsonwebtoken'); // Jsonwebtoken permettera une connexion sécurisée par l"utilisaiton d'un token

// Gestion de la création d'un utilisateur ---------------------------------------------------------------
exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 15) // Salage du mot de passe
    .then(hash => {                    // Réception du hash généré et création du nouvel user
        const user = new User({       
        email: req.body.email,
        password: hash
    });
    user.save()
    .then(() => res.status(201).json({ message: "Utilisateur créé !"}))
    .catch(error => res.status(400).json({ error })); 
    })
    .catch(error => res.status(500).json({ error }));
};

// Gestion de la connexion d'un utilisateur existant -------------------------------------------------------
exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
      .then(user => {
        if (!user) {
          return res.status(401).json({ error: 'Utilisateur inexistant !' });
        }
        bcrypt.compare(req.body.password, user.password)
          .then(valid => {
            if (!valid) {
              return res.status(401).json({ error: 'Mot de passe incorrect !' });
            }
            res.status(200).json({
              userId: user._id,
              token: jwt.sign(
                { userId: user._id },
                'RANDOM_TOKEN_SECRET',
                { expiresIn: '24h' }
              )
            });
          })
          .catch(error => res.status(500).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
  };