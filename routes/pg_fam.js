// Express

const express = require("express");
const router = express.Router();

// Access to Public Folder
router.use(express.static("public"));



const censusDal = require("../services/census.dal");

//Get Routers

router.get("/", (req, res) => {
  console.log("Here at Family Census Database Access Layer now!");
  // this is what pulls up the dropdown for 3 choices
  res.render("pg_fam.ejs");
});

router.get("/search", async (req, res) => {
  console.log("outside");
  var queryStr = require("url").parse(req.url, true).query;
  let results = await censusDal.getCensusByFamilyName(queryStr.search);
  if (results.length === 0) {
    console.log("Inside the Results");
    res.render("norecord.ejs");
  } else {
    res.render("pg_fam_results.ejs", { results });
  }
});

module.exports = router;
