const http = require("http"); // Utilisation du package http de Node, penser à passer en HTTPS ! 
const app = require("./app"); // Utilisation de l'application Express

// CONFIGURATION DU SERVEUR -------------------------------------------------------------------------------------------

const server = http.createServer(app); // Création du serveur via Express 

const normalizePort = (val) => { // Fonction permettant de renvoyer un port valide sous forme de nombre ou d'une chaîne
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};

const port = normalizePort(process.env.PORT || "3000"); // Le serveur écoute soit la variable définie au préalable, soit le port 3000
app.set("port", port);

const errorHandler = (error) => { // Gestion des erreurs serveur
  if (error.syscall !== "listen") {
    throw error;
  }
  const address = server.address();
  const bind = typeof address === "string" ? "pipe" + address : +"port" + port;
  switch (error.code) {
    case "EACESS":
      console.error(bind + " requires elevated privileges.");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use.");
      process.exit(1);
      break;
    default:
      throw error;
  }
};

server.on("error", errorHandler);
server.on("listening", () => { // Ecouteur d'évènements retournant le port / canal du serveur via la console 
  const address = server.address();
  const bind = typeof address === "string" ? "pipe " + address : "port " + port;
  console.log("Listening on " + bind);
});

server.listen(port);
