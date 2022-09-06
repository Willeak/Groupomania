//appel des middlewares
const mongoose = require("mongoose");

// Création d'un schema de donnée Sauce pour un stockage dans la BD
const commentSchema = mongoose.Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  likes: { type: Number, default: 0 },
  dislikes: { type: Number, default: 0 },
  usersLiked: { type: [String], default: [] },
  usersDisliked: { type: [String], default: [] },
});

// Exportation du schema de donnée
module.exports = mongoose.model("Comment", commentSchema);
