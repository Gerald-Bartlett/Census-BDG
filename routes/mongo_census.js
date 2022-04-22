// Express

const express = require("express");
const router = express.Router();

// Access to Public Folder
router.use(express.static("public"));


//Access to Data Access Layer
const censusDal = require("../services/mongo_search.dal");


//Get Router
router.get("/", async (req, res) => {
  console.log("inside the page of mongo census");
  console.log()
  res.render("mongo_census.ejs");
});

module.exports = router;
