const express = require("express"); 
const Router = express.Router();
const { login, signIn, bookmarkBlog } = require("../controllers/userController")
const { isauthenticate } = require("../middleware/auth");
Router.route("/login").post(login); 
Router.route("/signin").post(signIn); 
Router.route("/bookmark/:id").patch(isauthenticate,bookmarkBlog)
module.exports = Router;