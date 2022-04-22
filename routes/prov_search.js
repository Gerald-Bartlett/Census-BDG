// Express

const express = require("express");
const router = express.Router();

// Access to Public Folder
router.use(express.static("public"));

//Access To Data Access Layer
const censusDal = require("../services/census.dal");

// Get Routers
router.get("/", (req, res) => {
  console.log("At The Province Search !");
  // this is what pulls up the dropdown for 3 choices
  res.render("prov_search.ejs");
});

router.get("/prov_results", async (req, res) => {
  console.log("outside");
  var queryStr = require("url").parse(req.url, true).query;
  let results = await censusDal.getCensusByProvinceName(queryStr.search);
  if (results.length === 0) {
    console.log("Inside the Province Results");
    res.render("norecord.ejs");
  } else {
    res.render("prov_results.ejs", { results });
  }
});

module.exports = router;
