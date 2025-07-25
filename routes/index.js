/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const passport = require("passport");

/* eslint-disable no-undef */
const router = require("express").Router();
const express = require("express");
const app = express();
const swaggerAutogen = require("./swagger");
const { handleValidation, isAuthenticated } = require("../utilities/validate");
const session = require("express-session");

router.get("/", (req, res) => {
  // #swagger.tags = ['Home']
  // #swagger.description = 'Home page endpoint'
  res.send("Welcome to the home page!");
});


router.use(
  "/books",
  require("./book")
  // #swagger.tags = ['Books']
  // #swagger.description = 'Books related endpoints'
);


router.use(
  "/authors",
  require("./author")
  // #swagger.tags = ['Authors']
  // #swagger.description = 'Authors related endpoints'
);


// GitHub OAuth Routes
router.get("/login", passport.authenticate("github"));

// Logout route
router.get("/logout", function (req, res, next) {
  req.logout(function(err) {
    if (err) return next(err);
    
    // Clear the user from session explicitly
    req.session.user = null;

    req.session.destroy(err => {
      if (err) return next(err);
      res.clearCookie("connect.sid"); // Clear session cookie
      res.redirect("/");
    });
  });
});

router.use("/api-docs", require("./swagger"));

module.exports = router;
