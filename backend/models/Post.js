//appel des middlewares
const mongoose = require("mongoose");

// Création d'un schema de donnée Sauce pour un stockage dans la BD
const postSchema = mongoose.Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  imageUrl: { type: String, default: " " },
  description: { type: String, required: true },
  date: { type: String, required: true },
  likes: { type: Number, default: 0 },
  dislikes: { type: Number, default: 0 },
  usersLiked: { type: [String], default: [] },
  usersDisliked: { type: [String], default: [] },
});

// Exportation du schema de donnée
module.exports = mongoose.model("Post", postSchema);
