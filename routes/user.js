let express = require('express');
let router = express.Router();
let passport = require("passport");
const catchAsync = require('../utils/catchAsync');
let User = require("../models/user");

// show reg form
router.get("/register",(req,res) => {
  res.render("register", {page:'register'});
});

//handle sign up logic
router.post("/register", catchAsync(async(req,res,next) => {
  try{
      const {name, email, password, confirmPassword} = req.body;
      const user = new User({name, email});
      const registeredUser = await User.register(user, password);
      req.login(registeredUser, err => {
          if (err) return next(err);
          req.flash('success', 'Welcome to Query!');
          res.redirect('/');
      })
  } catch(e) {
      console.log(e.message);
      req.flash('error', e.message);
      res.redirect('register');
  }
}));

//show login form
router.get("/login", (req,res) => {
  res.render("login", {page:'login'});
});

//handling login logic
router.post("/login", passport.authenticate("local",
    {
        successRedirect: "/",
        failureRedirect: "/login",
        failureFlash: true,
        successFlash: "Welcome back to Query!"
    }), function(req,res){
});

// logout route
router.get("/logout",(req,res) => {
    req.logout();
    req.flash("success", "Logged you out!");
    res.redirect("/");
});

module.exports = router;
