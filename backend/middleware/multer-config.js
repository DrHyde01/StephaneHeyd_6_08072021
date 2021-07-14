// Middleware permettant de configurer Multer, un package permettant de téléverser des données ------------------------
const multer = require('multer'); // Utilisation de multer

// Gestion des extensions pour le images importées
const MIME_TYPES = { 
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

// Gestion de la destination des images importées, ici elles seront placées dans le dossier images du backend
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'images');
  },
// Gestion du format du fichier importé 
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_'); // Remplace les espaces par des underscores
    const extension = MIME_TYPES[file.mimetype];         // Résolution de l'extension du fichier
    callback(null, name + Date.now() + '.' + extension); // Rajout d'un timestamp
  }
});

// Exportation du module pré-configuré
module.exports = multer({storage: storage}).single('image'); 