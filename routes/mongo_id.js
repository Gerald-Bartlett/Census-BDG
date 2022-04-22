const express = require("express");
const router = express.Router();

// Access to Public Folder
const censusDal = require("../services/mongo_search.dal");


// Get Routers
router.get("/", async (req, res) => {
  console.log("inside landing page of mongo province search");
  res.render("mongo_id.ejs");
});

router.get("/search", async (req, res) => {
  console.log("Mongo ID Search");
  const queryObject = require("url").parse(req.url, true).query;
  const searchString = queryObject.search;
  const searchInteger = parseInt(searchString);
  console.log(searchInteger);
  console.log("results");

  const results = await censusDal.getByHouseholdId(searchInteger);
  //This code is the same as above but done in two lines instead of 4 lines.
  //const queryStr = require("url").parse(req.url, true).query;
  //const results = await censusDal.getByHouseholdId(parseInt(queryStr.search));
  console.log(JSON.stringify(results, null, 2));
  if (results.length === 0) {
    console.log("Inside the inside");
    res.render("mongoNoRecord.ejs");
  } else {
    res.render("mongo_id_results.ejs", { results });
  }
});

module.exports = router;
