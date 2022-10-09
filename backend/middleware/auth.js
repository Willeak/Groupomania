//appel des middlewares
const jwt = require("jsonwebtoken");
//Authentification via un token
module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, `${process.env.RND_TKN}`);
    const userId = decodedToken.id;

    if (req.body.userId && req.body.userId !== userId) {
      // Si le token ne correspond pas au userId : erreur
      throw "User ID non valable !";
    } else {
      // Si tout est valide on passe au prochain middleware
      next();
      // console.log("token valide !");
      // console.log("auth file:", req.file);
      console.log("auth body:", req.body.post);
    }
  } catch (error) {
    // console.log(req);
    res.status(402).json({ error });
    console.log(token);
  }
};
