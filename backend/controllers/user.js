//appel des middlewares
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/Register');

//création d'un utilisateur
exports.signup = (req, res, next) => {
      bcrypt.hash(req.body.pwd, 10) // value 10 = puissance de hachage d'un mot de passe *
            .then((hash) => {
                  const user = new User({
                        user: req.body.user,
                        email: req.body.email,
                        roles: 'User',
                        pwd: hash,
                  });
                  user.save()
                        .then(() =>
                              res
                                    .status(201)
                                    .json({ message: 'Utilisateur créé !' })
                        )
                        .catch((error) => res.status(400).json({ error }));
            })
            .catch((error) => res.status(500).json({ error }));
};
// connexion d'un utilisateur
exports.login = (req, res, next) => {
      User.findOne({ email: req.body.email })
            .then((user) => {
                  if (!user) {
                        return res
                              .status(402)
                              .json({ error: 'Utilisateur non trouvé !' });
                  }
                  bcrypt.compare(req.body.pwd, user.pwd)
                        .then((valid) => {
                              if (!valid) {
                                    return res.status(401).json({
                                          error: 'Mot de passe incorrect !',
                                    });
                              }
                              res.status(200).json({
                                    userId: user._id,
                                    Roles: user.roles,
                                    accessToken: jwt.sign(
                                          { userId: user._id },
                                          `${process.env.RND_TKN}`,
                                          {
                                                expiresIn: '24h',
                                          }
                                    ),
                              });
                        })
                        .catch((error) => res.status(500).json({ error }));
            })
            .catch((error) => res.status(500).json({ error }));
};
