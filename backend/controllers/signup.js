//appel des middlewares
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/Register");

//création d'un utilisateur
exports.signup = (req, res, next) => {
  bcrypt
    .hash(req.body.pwd, 10) // value 10 = puissance de hachage d'un mot de passe *
    .then((hash) => {
      const user = new User({
        user: req.body.user,
        email: req.body.email,
        roles: "User",
        img: "./images/avatar_neutre.png",
        pwd: hash,
      });
      user
        .save()
        .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};
// connexion d'un utilisateur
exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.status(402).json({ error: "Utilisateur non trouvé !" });
      }
      bcrypt
        .compare(req.body.pwd, user.pwd)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({
              error: "Mot de passe incorrect !",
            });
          }
          res.status(200).json({
            userId: user._id,
            email: user.email,
            roles: user.roles,
            img: user.img,
            token: jwt.sign({ userId: user._id }, `${process.env.RND_TKN}`, {
              expiresIn: "24h",
            }),
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

// Récuperer un utilisateur
exports.getOneUser = (req, res, next) => {
  console.log(req.params.userId);
  User.findOne({ _id: req.params.userId })
    .then((user) => res.status(200).json(user))
    .catch((error) => res.status(404).json({ error: error }));
};

exports.getAllUsers = (req, res, next) => {
  Post.find()
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((error) => {
      res.status(400).json({ error: error });
    });
};

// Supprimer un post
exports.deleteUser = (req, res, next) => {
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
