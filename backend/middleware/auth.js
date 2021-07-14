// Middleware gérant la protection de nos routes en fonction de l'état user (authentifié ou non) ------------------------------
const jwt = require('jsonwebtoken'); // Utilisation du package Jsonwebtoken

// On met en place le middleware permettant de sécurité nos routes ------------------------------------------------------------
module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]; // Récuparation du token d'authentification présent dans les headers 
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET'); // Vérificaiton du token, les clés doivent correspondre
    const userId = decodedToken.userId; // Idem pour le user id, qui doit correspondre avec le token !
    if (req.body.userId && req.body.userId !== userId) {
      throw 'Invalid user ID'; // Erreur si aucune correspondance 
    } else {                   // Sinon on enchaîne sur le middleware suivant
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
};