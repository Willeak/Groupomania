// Importation de MONGOOSE
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

//modele de saisie de connexion
const userSchema = mongoose.Schema({
      user: { type: String, required: true },
      email: { type: String, required: true, unique: true }, //email requis et unique
      roles: { type: String, required: true },
      pwd: { type: String, required: true },
});

// uniqueValidator = évite que plusieurs utilisateurs s'inscrivent avec le même mail
userSchema.plugin(uniqueValidator);

// exportation du schéma sous forme de modele
module.exports = mongoose.model('User', userSchema);
