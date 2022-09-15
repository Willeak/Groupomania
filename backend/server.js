// Importation pakage HTTP de node.js
const http = require("http");
// Importation de APP pour l'utilisation de l'application sur le serveur
const app = require("./app");

// La fonction NORMAILZEPORT renvoie un port valide
const normalizePort = (val) => {
  const port = parseInt(val, 10);
  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};

// Ajout du SET PORT de connexion 3000
// La fonction NORMALIZEPORT renvoie un port valide
const port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

// La fonction ERROHANDLER recherche le erreurs et les gere
const errorHandler = (error) => {
  if (error.syscall !== "listen") {
    throw error;
  }
  const address = server.address();
  const bind =
    typeof address === "string" ? "pipe " + address : "port: " + port;
  switch (error.code) {
    case "EACCES":
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

// Appel au serveur
const server = http.createServer(app);

// Affiche le port de connexion, gere les erreurs
// Ecouteur d'evenement LISTEN
server.on("error", errorHandler);
server.on("listening", () => {
  const address = server.address();
  const bind = typeof address === "string" ? "pipe " + address : "port " + port;
  //  enregistre le port nommé sur lequel le serveur s'exécute dans la console
  console.log("Listening on " + bind);
});

// Connexion au port defini
server.listen(port);
