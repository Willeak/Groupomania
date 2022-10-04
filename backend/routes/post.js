// Création du routeur Express
const express = require("express");
// appel du routeur express
const router = express.Router();

// Importation du middleware AUTH pour sécuriser les routes
const auth = require("../middleware/auth");
// Importation du middleware MULTER pour la gestion des images
const multer = require("../middleware/multerUser");

const postCtrl = require("../controllers/post");

router.get("/", auth, postCtrl.getAllPosts); // afficher toutes les sauces
router.post("/", auth, multer, postCtrl.createPost); // creer une sauce
router.delete("/:id", auth, postCtrl.deletePost); // supprimer la sauce
router.post("/:id/like", auth, postCtrl.likeOrDislike); // like ou dislikes des sauces

module.exports = router;
