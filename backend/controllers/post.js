//appel des middlewares
const jwt = require("jsonwebtoken");
const Post = require("../models/Post");
const fs = require("fs"); // pour la fonction des boutons

exports.getAllPosts = (req, res, next) => {
  Post.find()
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((error) => {
      res.status(400).json({ error: error });
    });
};

// Créer un post
exports.createPost = (req, res, next) => {
  if (req.file) {
    const postObject = JSON.parse(req.body.post);
    const post = new Post({
      ...postObject,
      imageUrl: `${req.protocol}://${req.get("host")}/images/post/${
        req.file.filename
      }`,
    });
    post
      .save()
      .then(() => {
        res.status(201).json({ message: "Nouveau post sans image créé !" });
      })
      .catch((error) => {
        // console.log(req.body);
        res.status(402).json({ error: error });
      });
  } else {
    const postObject = req.body.post;
    const post = new Post({
      ...postObject,
    });
    post
      .save()
      .then(() => {
        res.status(201).json({ message: "Nouveau post sans image créé !" });
      })
      .catch((error) => {
        // console.log(req.body);
        res.status(402).json({ error: error });
      });
  }
};

// Supprimer un post
exports.deletePost = (req, res, next) => {
  //recuparation de l'id dans le token fe facon sécurisé !
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, `${process.env.RND_TKN}`);
  const userId = decodedToken.userId;
  //recheche du post concerné
  Post.findOne({ _id: req.params.id })
    .then((post) => {
      console.log("res ", post);
      //droit d'admistrateur sur la suppression de n'importe quel post
      if ("63347f831f9cf84f32dd4f07" === userId) {
        if (post.imageUrl !== "") {
          const filename = post.imageUrl.split("/images/post/")[1];
          fs.unlink(`images/post/${filename}`, () => {
            Post.deleteOne({ _id: req.params.id })
              .then(() => res.status(200).json({ message: "post supprimée !" }))
              .catch((error) => res.status(400).json({ error: error }));
          });
        } else {
          Post.deleteOne({ _id: req.params.id })
            .then(() => res.status(200).json({ message: "post supprimée !" }))
            .catch((error) => res.status(400).json({ error: error }));
        }
      } else {
        console.log("test1", post.userId);
        console.log("test2", req.headers.userid);
        if (post.userId !== userId)
          // verifie si l'user est bien celui du createur du post
          return res.status(403).json({
            message:
              "Vous n êtes pas le créateur de ce post, vous ne pouvez pas SUPPRIMER ce post!",
          });

        if (post.imageUrl !== "") {
          const filename = post.imageUrl.split("/images/post/")[1];
          fs.unlink(`images/post/${filename}`, () => {
            Post.deleteOne({ _id: req.params.id })
              .then(() => res.status(200).json({ message: "post supprimée !" }))
              .catch((error) => res.status(400).json({ error: error }));
          });
        } else {
          Post.deleteOne({ _id: req.params.id })
            .then(() => res.status(200).json({ message: "post supprimée !" }))
            .catch((error) => res.status(400).json({ error: error }));
        }
      }
    })
    .catch((error) => res.status(500).json({ error }));
};

// Modifier un post
exports.modifyPost = (req, res, next) => {
  if (req.file) {
    Post.findOne({ _id: req.params.id })
      .then((post) => {
        // verifie si l'user est bien celui du createur de ce post
        if (res.locals.userId != Post.userId)
          return res.status(403).json({
            message:
              "Vous n êtes pas le créateur de ce post, vous ne pouvez pas MODIFIER ce post !",
          });

        // On supprime l'ancienne image du serveur
        const filename = post.imageUrl.split("/images/")[1];
        fs.unlink(`images/${filename}`, () => {
          const postObject = {
            // On modifie les données et on ajoute la nouvelle image
            ...JSON.parse(req.body.post),
            imageUrl: `${req.protocol}://${req.get("host")}/images/${
              req.file.filename
            }`,
          };
          Post.updateOne(
            { _id: req.params.id },
            { ...postObject, _id: req.params.id }
          )
            .then(() => res.status(200).json({ message: "Objet modifié !" }))
            .catch((error) => res.status(400).json({ error }));
        });
      })
      .catch((error) => res.status(500).json({ error }));
  } else {
    const postObject = { ...req.body };
    // On applique les paramètre de postObject
    Post.updateOne(
      { _id: req.params.id },
      { ...postObject, _id: req.params.id }
    )
      .then(() => res.status(200).json({ message: "Objet modifié !" }))
      .catch((error) => res.status(400).json({ error }));
  }
};

//Aimer ou pas une sauce
exports.likeOrNot = (req, res, next) => {
  // Si l'utilisateur aime la sauce
  if (req.body.like === 1) {
    // on toruve le post concerné
    Post.findOne({ _id: req.params.id }).then((post) => {
      // Si le tableau "userLiked" contient deja l'ID de l'utilisateur on refuse le like
      if (post.usersLiked.includes(req.body.id)) {
        return res.send({ message: "Vous avez déja liké ce post !" });
      } else {
        // si l'userid n'existe pas, on ajoute 1 like et on l'envoie dans le tableau "usersLiked"
        Post.updateOne(
          { _id: req.params.id },
          {
            $inc: { likes: req.body.like++ },
            $push: { usersLiked: req.body.id },
          }
        )
          .then((post) => res.status(200).json({ message: "Like ajouté !" }))
          .catch((error) => res.status(400).json({ error }));
      }
    });
  } else {
    // Si like === 0 l'utilisateur supprime son vote
    Post.findOne({ _id: req.params.id })
      .then((post) => {
        // Si le tableau "userLiked" contient l'ID de l'utilisateur
        if (post.usersLiked.includes(req.body.id)) {
          // On enlève un like du tableau "userLiked"
          Post.updateOne(
            { _id: req.params.id },
            { $pull: { usersLiked: req.body.id }, $inc: { likes: -1 } }
          )
            .then((post) => {
              res.status(200).json({ message: "Like supprimé !" });
            })
            .catch((error) => res.status(400).json({ error }));
        }
      })
      .catch((error) => res.status(400).json({ error }));
  }
};
