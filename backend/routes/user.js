//appel des middlewares
const express = require("express");
const router = express.Router();

const userCtrl = require("../controllers/signup");

// const auth = require("../middleware/auth");
const multer = require("../middleware/multer");

// Importation du middleware AUTH pour sécuriser les routes
const auth = require("../middleware/auth");

//route de signup et login
router.post("/signup", userCtrl.signup);
router.post("/login", userCtrl.login);
router.get("/:id", multer, userCtrl.getOneUser); // afficher un user

router.get("/", auth, userCtrl.getAllUsers); // afficher toutes les user
router.delete("/:id", auth, userCtrl.deleteUser); // supprimer la sauce

module.exports = router;
