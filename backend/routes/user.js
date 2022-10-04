//appel des middlewares
const express = require("express");
const router = express.Router();

const userCtrl = require("../controllers/signup");

// const auth = require("../middleware/auth");
const multerUser = require("../middleware/multerUser");

// Importation du middleware AUTH pour sécuriser les routes
const auth = require("../middleware/auth");

//route de signup et login
router.post("/signup", userCtrl.signup);
router.post("/login", userCtrl.login);
router.get("/:id", multerUser, auth, userCtrl.getOneUser); // afficher un user

router.put("/:id", auth, multerUser, userCtrl.modifyUser); // modifier une sauce
router.get("/", auth, userCtrl.getAllUsers); // afficher toutes les utilisateurs
router.delete("/:id", auth, userCtrl.deleteUser); // supprimer un utilisateur

module.exports = router;
