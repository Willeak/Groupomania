//appel des middlewares
const Comment = require('../models/Comment');
const fs = require('fs'); // pour la fonction des boutons

exports.getAllComments = (req, res, next) => {
      Comment.find()
            .then((comments) => {
                  res.status(200).json(comments);
            })
            .catch((error) => {
                  res.status(400).json({ error: error });
            });
};

// Créer un comment
exports.createComment = (req, res, next) => {
      const commentObject = JSON.parse(req.body.comment);
      delete commentObject._id;
      const comment = new Comment({
            ...commentObject,
            imageUrl: `${req.protocol}://${req.get('host')}/images/${
                  req.file.filename
            }`,
      });
      comment
            .save()
            .then(() => {
                  res.status(201).json({ message: 'Nouveau comment créé !' });
            })
            .catch((error) => {
                  res.status(400).json({ error: error });
            });
};

// Supprimer un comment
exports.deleteComment = (req, res, next) => {
      Comment.findOne({ _id: req.params.id })
            .then((comment) => {
                  // verifie si l'user est bien celui du createur du comment
                  if (Comment.userId !== res.locals.userId)
                        return res.status(403).json({
                              message: 'Vous n êtes pas le créateur de ce comment, vous ne pouvez pas SUPPRIMER ce comment!',
                        });

                  const filename = comment.imageUrl.split('/images/')[1];
                  fs.unlink(`images/${filename}`, () => {
                        Comment.deleteOne({ _id: req.params.id })
                              .then(() =>
                                    res
                                          .status(200)
                                          .json({
                                                message: 'comment supprimée !',
                                          })
                              )
                              .catch((error) =>
                                    res.status(400).json({ error: error })
                              );
                  });
            })
            .catch((error) => res.status(500).json({ error }));
};

//Aimer ou pas une comment
exports.likeOrDislike = (req, res, next) => {
      // Si l'utilisateur aime la comment
      if (req.body.like === 1) {
            // On ajoute 1 like et on l'envoie dans le tableau "usersLiked"
            Comment.updateOne(
                  { _id: req.params.id },
                  {
                        $inc: { likes: req.body.like++ },
                        $push: { usersLiked: req.body.userId },
                  }
            )
                  .then((comment) =>
                        res.status(200).json({ message: 'Like ajouté !' })
                  )
                  .catch((error) => res.status(400).json({ error }));
      } else if (req.body.like === -1) {
            // Si l'utilisateur n'aime pas la comment
            // On ajoute 1 dislike et on l'envoie dans le tableau "usersDisliked"
            Comment.updateOne(
                  { _id: req.params.id },
                  {
                        $inc: { dislikes: req.body.like++ * -1 },
                        $push: { usersDisliked: req.body.userId },
                  }
            )
                  .then((comment) =>
                        res.status(200).json({ message: 'Dislike ajouté !' })
                  )
                  .catch((error) => res.status(400).json({ error }));
      } else {
            // Si like === 0 l'utilisateur supprime son vote
            Comment.findOne({ _id: req.params.id })
                  .then((comment) => {
                        // Si le tableau "userLiked" contient l'ID de l'utilisateur
                        if (comment.usersLiked.includes(req.body.userId)) {
                              // On enlève un like du tableau "userLiked"
                              Comment.updateOne(
                                    { _id: req.params.id },
                                    {
                                          $pull: {
                                                usersLiked: req.body.userId,
                                          },
                                          $inc: { likes: -1 },
                                    }
                              )
                                    .then((comment) => {
                                          res.status(200).json({
                                                message: 'Like supprimé !',
                                          });
                                    })
                                    .catch((error) =>
                                          res.status(400).json({ error })
                                    );
                        } else if (
                              comment.usersDisliked.includes(req.body.userId)
                        ) {
                              // Si le tableau "userDisliked" contient l'ID de l'utilisateur
                              // On enlève un dislike du tableau "userDisliked"
                              Comment.updateOne(
                                    { _id: req.params.id },
                                    {
                                          $pull: {
                                                usersDisliked: req.body.userId,
                                          },
                                          $inc: { dislikes: -1 },
                                    }
                              )
                                    .then((comment) => {
                                          res.status(200).json({
                                                message: 'Dislike supprimé !',
                                          });
                                    })
                                    .catch((error) =>
                                          res.status(400).json({ error })
                                    );
                        }
                  })
                  .catch((error) => res.status(400).json({ error }));
      }
};
