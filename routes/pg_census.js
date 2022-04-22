// Express

const express = require("express");
const router = express.Router();

// Access to Public Folder
router.use(express.static("public"));


//Access To Data Access Layer
const censusDal = require("../services/census.dal");


//Get Routers
router.get("/", (req, res) => {
  console.log("Inside pg census!");
  // this is what pulls up the dropdown for 3 choices
  res.render("pg_census.ejs");
});


module.exports = router;
