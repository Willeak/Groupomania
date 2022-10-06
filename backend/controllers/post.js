//appel des middlewares
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
  // console.log(req.body.post.imageUrl);
  // console.log(req.file);
  const postObject = req.body.post;

  if (req.body.post.imageUrl !== undefined) {
    const post = new Post({
      ...postObject,
      imageUrl: `${req.protocol}://${req.get("host")}/images/post/${req.file}`,
    });
    post
      .save()
      .then(() => {
        res.status(201).json({ message: "Nouveau post avec image créé !" });
      })
      .catch((error) => {
        // console.log(req.body);
        res.status(401).json({ error: error });
      });
  } else {
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
  Post.findOne({ _id: req.params.id })
    .then((post) => {
      // verifie si l'user est bien celui du createur du post
      if (Post.userId !== res.locals.userId)
        return res.status(403).json({
          message:
            "Vous n êtes pas le créateur de ce post, vous ne pouvez pas SUPPRIMER ce post!",
        });

      const filename = post.imageUrl.split("/images/")[1];
      fs.unlink(`images/${filename}`, () => {
        Post.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: "post supprimée !" }))
          .catch((error) => res.status(400).json({ error: error }));
      });
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

//Aimer ou pas une post
exports.likeOrDislike = (req, res, next) => {
  // Si l'utilisateur aime la post
  if (req.body.like === 1) {
    // On ajoute 1 like et on l'envoie dans le tableau "usersLiked"
    Post.updateOne(
      { _id: req.params.id },
      {
        $inc: { likes: req.body.like++ },
        $push: { usersLiked: req.body.userId },
      }
    )
      .then((post) => res.status(200).json({ message: "Like ajouté !" }))
      .catch((error) => res.status(400).json({ error }));
  } else if (req.body.like === -1) {
    // Si l'utilisateur n'aime pas la post
    // On ajoute 1 dislike et on l'envoie dans le tableau "usersDisliked"
    Post.updateOne(
      { _id: req.params.id },
      {
        $inc: { dislikes: req.body.like++ * -1 },
        $push: { usersDisliked: req.body.userId },
      }
    )
      .then((post) => res.status(200).json({ message: "Dislike ajouté !" }))
      .catch((error) => res.status(400).json({ error }));
  } else {
    // Si like === 0 l'utilisateur supprime son vote
    Post.findOne({ _id: req.params.id })
      .then((post) => {
        // Si le tableau "userLiked" contient l'ID de l'utilisateur
        if (post.usersLiked.includes(req.body.userId)) {
          // On enlève un like du tableau "userLiked"
          Post.updateOne(
            { _id: req.params.id },
            { $pull: { usersLiked: req.body.userId }, $inc: { likes: -1 } }
          )
            .then((post) => {
              res.status(200).json({ message: "Like supprimé !" });
            })
            .catch((error) => res.status(400).json({ error }));
        } else if (post.usersDisliked.includes(req.body.userId)) {
          // Si le tableau "userDisliked" contient l'ID de l'utilisateur
          // On enlève un dislike du tableau "userDisliked"
          Post.updateOne(
            { _id: req.params.id },
            {
              $pull: { usersDisliked: req.body.userId },
              $inc: { dislikes: -1 },
            }
          )
            .then((post) => {
              res.status(200).json({ message: "Dislike supprimé !" });
            })
            .catch((error) => res.status(400).json({ error }));
        }
      })
      .catch((error) => res.status(400).json({ error }));
  }
};
