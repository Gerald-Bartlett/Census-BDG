// Express

const express = require("express");
const router = express.Router();

// Access to Public Folder
router.use(express.static("public"));


//Access To Data Access Layer
const censusDal = require("../services/census.dal");



// Get Routers
router.get("/", (req, res) => {
  console.log("Here inside Pg Census Year!");
  // this is what pulls up the dropdown for 3 choices
  res.render("pg_year_search.ejs");
});

router.get("/pg_year_results", async (req, res) => { 
  var queryStr = require("url").parse(req.url, true).query;
  let results = await censusDal.getCensusByYear(queryStr.search);
  if (results.length === 0) {
    console.log("Inside pg_year_results");
    res.render("norecord.ejs");
  } else {
    res.render("pg_year_results.ejs", { results });
  }
});

module.exports = router;
