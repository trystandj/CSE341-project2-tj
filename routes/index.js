/* eslint-disable no-undef */
const router = require("express").Router();

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


router.use("/api-docs", require("./swagger"));

module.exports = router;
