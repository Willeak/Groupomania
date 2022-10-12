//appel des middlewares
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs"); // pour la fonction des boutons

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
        img: " ",
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
            user: user.user,
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

//get all users
exports.getAllUsers = (req, res, next) => {
  //recuparation de l'id dans le token fe facon sécurisé !
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, `${process.env.RND_TKN}`);
  const userId = decodedToken.userId;
  //rechercher l'utilisateur pour connaitre son role
  User.findOne({ _id: userId }).then((user) => {
    //vérifie si la demande est faite par un administateur ou non
    if (user.roles !== "Admin")
      return res.status(403).json({
        message: "Vous n êtes pas administrateur !",
      });
    User.find()
      .then((users) => {
        res.status(200).json({ users });
      })
      .catch((error) => {
        res.status(400).json({ error: error });
      });
  });
};

// Récuperer un utilisateur
exports.getOneUser = (req, res, next) => {
  User.findOne({ _id: req.params.id })
    .then((user) => res.status(200).json(user))
    .catch((error) => res.status(404).json({ error: error }));
};

// Modifier un utilisateur
exports.modifyUser = (req, res, next) => {
  //si la requete comporte une image
  if (req.file) {
    User.findOne({ _id: req.params.id })
      .then((user) => {
        // verifie si l'user est bien celui du createur du compte
        if (res.locals.userId != User.userId)
          return res.status(403).json({
            message: "erreur !",
          });

        const userObject = {
          // On modifie les données et on ajoute la nouvelle image
          // ...JSON.parse(req.body.user),
          img: `/images/profile/${req.file.filename}`,
        };
        User.updateOne(
          { _id: req.params.id },
          { ...userObject, _id: req.params.id }
        )
          .then(() =>
            res.status(200).json({ message: "Photo de profil modifié !" })
          )
          .catch((error) => res.status(400).json({ error }));
      })
      .catch((error) => res.status(500).json({ error })); // error actuel
  } else {
    const userObject = { ...req.body };
    // On applique les paramètre de sauceObject
    User.updateOne(
      { _id: req.params.id },
      { ...userObject, _id: req.params.id }
    )
      .then(() => res.status(200).json({ message: "Objet modifié !" }))
      .catch((error) => res.status(400).json({ error }));
  }
};

// Supprimer un post
exports.deleteUser = (req, res, next) => {
  User.findOne({ _id: req.params.id })
    .then((user) => {
      // verifie si l'user est bien celui du createur du post
      // if (User.roles !== Admin)
      //   return res.status(403).json({
      //     message:
      //       "Vous n êtes pas le créateur de ce post, vous ne pouvez pas SUPPRIMER ce post!",
      //   });

      const filename = user.img.split("/images/")[1];
      fs.unlink(`images/${filename}`, () => {
        User.deleteOne({ _id: req.params.id })
          .then(() =>
            res.status(200).json({ message: "Utilisateur supprimée !" })
          )
          .catch((error) => res.status(400).json({ error: error }));
      });
    })
    .catch((error) => res.status(500).json({ error }));
};
