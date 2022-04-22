
// Express
const express = require("express");
const router = express.Router();

// Access to Public Folder
router.use(express.static("public"));


//Access To Data Access Layer
const censusDal = require("../services/census.dal");


// Get Routers
router.get("/", (req, res) => {
  console.log("Here at Pg Household Id now!");
  // this is what pulls up the dropdown for 3 choices
  res.render("pg_id.ejs");
});

router.get("/search", async (req, res) => {
  console.log("Household Id");
  var queryStr = require("url").parse(req.url, true).query;
  let results = await censusDal.getCensusById(queryStr.search);
  if (results.length === 0) {
    console.log("Inside of Pg Household Id Results");
    res.render("norecord.ejs");
  } else {
    res.render("pg_id_results.ejs", { results });
  }
});

module.exports = router;
