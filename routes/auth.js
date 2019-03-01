const express = require("express");
const passport = require("passport");
const router = express.Router();
const User = require("../models/User");

// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;

router.get("/login", (req, res, next) => {
  res.render("auth/login", { message: req.flash("error") });
});

router.post("/process-signup", (req, res, next) => {
  const { username, password } = req.body;

  // // enforce password rules (can't be empty and MUST have a digit)
  // if (!originalPassword || !originalPassword.match(/[0-9]/)) {
  //   next(new Error("Password can't be blank and can't contain a number"));
  //   // use return to STOP the function here if the password is BAD
  //   return;
  // }

  // encrypt the user's password before saving it
  // const encryptedPassword = bcrypt.hashSync(originalPassword, 10);
  // console.log("coucou juste avant create", {
  //   username,
  //   encryptedPassword
  // });
  User.create({ username, password })
    .then(userDoc => {
      req.logIn(userDoc, () => {
        // hide encrypted password before sending the json (its a security risk)
        userDoc.encryptedPassword = undefined;
        res.json(userDoc);
        res.redirect("/");
      });
    })
    .catch(err => next(err));
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/auth/login",
    failureFlash: true,
    passReqToCallback: true
  })
);

router.get("/signup", (req, res, next) => {
  res.render("auth/signup");
});

router.post("/signup", (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  if (username === "" || password === "") {
    res.render("auth/signup", { message: "Indicate username and password" });
    return;
  }

  User.findOne({ username }, "username", (err, user) => {
    if (user !== null) {
      res.render("auth/signup", { message: "The username already exists" });
      return;
    }

    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    const newUser = new User({
      username,
      password: hashPass
    });

    newUser
      .save()
      .then(() => {
        res.redirect("/");
      })
      .catch(err => {
        res.render("auth/signup", { message: "Something went wrong" });
      });
  });
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

module.exports = router;
