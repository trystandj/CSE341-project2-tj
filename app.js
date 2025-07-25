/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const express = require("express");
const mongodb = require("./data/database");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
const bodyParser = require("body-parser");
const passport = require("passport");
const GitHubStrategy = require("passport-github2").Strategy;
const session = require("express-session");
const cors = require("cors");
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;


app.use(express.json());


app
.use(bodyParser.json())
.use(session({
  secret: process.env.SESSION_SECRET || "your-secret-key-here", // Use environment variable
  resave: false,
  saveUninitialized: true,
}))
.use(passport.initialize())
.use(passport.session())
.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "origin, X-Requested-With, Content-Type, Accept, Z-key");
  next();
})
.use(cors({
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH", "HEAD"], // Fixed typo
  origin: "*"
}));

// GitHub OAuth Strategy
passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: process.env.GITHUB_CALLBACK_URL || "/github/callback"
},
function(accessToken, refreshToken, profile, done) {
  return done(null, profile);
}));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});


app.get("/github/callback", 
  passport.authenticate("github", { failureRedirect: "/api-docs" }),
  (req, res) => {
    req.session.user = req.user;
    res.redirect("/");
  }
);



app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));


app.use("/", require("./routes"));

app.use((req, res) => {
  res.status(404).json({ message: '404: Route not found' });
});


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
    error: process.env.NODE_ENV === 'production' ? undefined : err.stack,
  });
});


process.on("uncaughtException", (err, origin) => {
  console.log(process.stderr.fd, `Caught exception: ${err}\n` + `Exception origin: ${origin}`);
});


mongodb.connectDatabases()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server and Database are running on port ${port}`);
    });
  })
  .catch(err => {
    console.error("Failed to connect to database:", err);
  });
