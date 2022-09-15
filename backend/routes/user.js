//appel des middlewares
const express = require("express");
const router = express.Router();

const userCtrl = require("../controllers/signup");

//route de signup et login
router.post("/signup", userCtrl.signup);
router.post("/login", userCtrl.login);
router.get("/user", userCtrl.getOneUser);

module.exports = router;
