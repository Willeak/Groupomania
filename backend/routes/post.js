// Création du routeur Express
const express = require("express");
// appel du routeur express
const router = express.Router();

// Importation du middleware AUTH pour sécuriser les routes
const auth = require("../middleware/auth");
// Importation du middleware MULTER pour la gestion des images
const multerPost = require("../middleware/multerPost");

const postCtrl = require("../controllers/post");

router.get("/", auth, postCtrl.getAllPosts); // afficher toutes les posts
router.post("/createPost", auth, multerPost, postCtrl.createPost); // creer un posts
router.delete("/:id", auth, postCtrl.deletePost); // supprimer le posts
router.put("/:id", auth, multerPost, postCtrl.modifyPost); // modifier un posts
router.post("/:id/like", auth, postCtrl.likeOrDislike); // like ou dislikes des posts

module.exports = router;
