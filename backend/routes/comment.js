// Création du routeur Express
const express = require("express");
// appel du routeur express
const router = express.Router();

// Importation du middleware AUTH pour sécuriser les routes
const auth = require("../middleware/auth");
// Importation du middleware MULTER pour la gestion des images Comment
const multer = require("../middleware/multerUser");

const commentCtrl = require("../controllers/comment");

router.get("/", auth, commentCtrl.getAllComments); // afficher toutes les sauces
router.post("/", auth, multer, commentCtrl.createComment); // creer une sauce
router.delete("/:id", auth, commentCtrl.deleteComment); // supprimer la sauce
router.post("/:id/like", auth, commentCtrl.likeOrDislike); // like ou dislikes des sauces

module.exports = router;
