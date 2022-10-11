//appel des middlewares
const mongoose = require("mongoose");
var moment = require("moment");
var momentDate = moment().format("YYYYMMDDHHMMssSSSSSS");
// Création d'un schema de donnée Sauce pour un stockage dans la BD
const postSchema = mongoose.Schema({
  userImg: { type: String, required: true },
  userId: { type: String, required: true },
  name: { type: String, required: true },
  imageUrl: { type: String, default: "" },
  description: { type: String, required: true },
  date: { type: String, required: true },
  dateDefault: { type: String, default: momentDate },
  likes: { type: Number, default: 0 },
  usersLiked: { type: [String], default: [] },
});

// Exportation du schema de donnée
module.exports = mongoose.model("Post", postSchema);
