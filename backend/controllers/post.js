//appel des middlewares
const jwt = require("jsonwebtoken");
const Post = require("../models/Post");
const User = require("../models/Register");
const fs = require("fs"); // pour la fonction des boutons

//afficher tout les posts
exports.getAllPosts = (req, res, next) => {
  Post.find()
    //recuperation par ordre descendant
    .sort({ $natural: 1 })
    //avec une limite de 15 posts
    .limit(15)
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((error) => {
      res.status(400).json({ error: error });
    });
};

// Récuperer un utilisateur
exports.getOnePost = (req, res, next) => {
  console.log(req.params);
  Post.findOne({ _id: req.params.id })
    .then((post) => res.status(200).json(post))
    .catch((error) => res.status(404).json({ error: error }));
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
      //rechercher l'utilisateur pour connaitre son role
      User.findOne({ _id: userId }).then((user) => {
        console.log("utilisateur", user.roles);
        console.log("Admin");
        //droit d'admistrateur sur la suppression de n'importe quel post
        if (user.roles === "Admin") {
          if (post.imageUrl !== "") {
            const filename = post.imageUrl.split("/images/post/")[1];
            fs.unlink(`images/post/${filename}`, () => {
              Post.deleteOne({ _id: req.params.id })
                .then(() =>
                  res.status(200).json({ message: "post supprimée !" })
                )
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
                .then(() =>
                  res.status(200).json({ message: "post supprimée !" })
                )
                .catch((error) => res.status(400).json({ error: error }));
            });
          } else {
            Post.deleteOne({ _id: req.params.id })
              .then(() => res.status(200).json({ message: "post supprimée !" }))
              .catch((error) => res.status(400).json({ error: error }));
          }
        }
      });
    })
    .catch((error) => res.status(500).json({ error }));
};

// Modifier un post
exports.modifyPost = (req, res, next) => {
  //recuparation de l'id dans le token fe facon sécurisé !
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, `${process.env.RND_TKN}`);
  const userId = decodedToken.userId;
  console.log(req.params.id);
  Post.findOne({ _id: req.params.id })
    .then((post) => {
      //rechercher l'utilisateur pour connaitre son role
      User.findOne({ _id: userId }).then((user) => {
        console.log("utilisateur", user.roles);
        console.log("Admin");
        if (req.file) {
          //droit d'admistrateur sur la modification de n'importe quel post
          if (user.roles === "Admin") {
            // On supprime l'ancienne image du serveur
            const filename = post.imageUrl.split("/images/post/")[1];
            fs.unlink(`images/post/${filename}`, () => {
              let postObject;
              if (req.body.post === undefined) {
                postObject = {
                  // On modifie les données et on ajoute la nouvelle image

                  imageUrl: `${req.protocol}://${req.get("host")}/images/post/${
                    req.file.filename
                  }`,
                };
              } else {
                postObject = {
                  // On modifie les données et on ajoute la nouvelle image
                  ...JSON.parse(req.body.post),
                  imageUrl: `${req.protocol}://${req.get("host")}/images/post/${
                    req.file.filename
                  }`,
                };
              }

              Post.updateOne(
                { _id: req.params.id },
                { ...postObject, _id: req.params.id }
              )
                .then(() =>
                  res.status(200).json({ message: "Objet modifié 1 !" })
                )
                .catch((error) => res.status(400).json({ error }));
            });
          } else {
            // verifie si l'user est bien celui du createur de ce post
            if (post.userId !== userId) {
              return res.status(403).json({
                message:
                  "Vous n êtes pas le créateur de ce post, vous ne pouvez pas MODIFIER ce post !",
              });
            }
            // On supprime l'ancienne image du serveur
            const filename = post.imageUrl.split("/images/post/")[1];
            fs.unlink(`images/post/${filename}`, () => {
              let postObject;
              if (req.body.post === undefined) {
                postObject = {
                  // On modifie les données et on ajoute la nouvelle image

                  imageUrl: `${req.protocol}://${req.get("host")}/images/post/${
                    req.file.filename
                  }`,
                };
              } else {
                postObject = {
                  // On modifie les données et on ajoute la nouvelle image
                  ...JSON.parse(req.body.post),
                  imageUrl: `${req.protocol}://${req.get("host")}/images/post/${
                    req.file.filename
                  }`,
                };
              }

              Post.updateOne(
                { _id: req.params.id },
                { ...postObject, _id: req.params.id }
              )
                .then(() =>
                  res.status(200).json({ message: "Objet modifié 1 !" })
                )
                .catch((error) => res.status(400).json({ error }));
            });
          }
        } else {
          if (user.roles === "Admin") {
            console.log("body:", req.body.post);
            // console.log(post);
            // verifie si l'user est bien celui du createur de ce post
            const postObject = {
              // On modifie les données et on ajoute la nouvelle image
              ...req.body.post,
            };
            Post.updateOne(
              { _id: req.params.id },
              { ...postObject, _id: req.params.id }
            )
              .then(() =>
                res.status(200).json({ message: "Objet modifié 1 !" })
              )
              .catch((error) => res.status(400).json({ error }));
          } else {
            console.log("body:", req.body.post);
            // console.log(post);
            // verifie si l'user est bien celui du createur de ce post
            if (post.userId !== userId)
              return res.status(403).json({
                message:
                  "Vous n êtes pas le créateur de ce post, vous ne pouvez pas MODIFIER ce post !",
              });

            const postObject = {
              // On modifie les données et on ajoute la nouvelle image
              ...req.body.post,
            };
            Post.updateOne(
              { _id: req.params.id },
              { ...postObject, _id: req.params.id }
            )
              .then(() =>
                res.status(200).json({ message: "Objet modifié 1 !" })
              )
              .catch((error) => res.status(400).json({ error }));
          }
        }
      });
    })
    .catch((error) => res.status(500).json({ error }));
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
