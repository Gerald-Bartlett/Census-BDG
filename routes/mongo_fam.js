//Express
const express = require("express");
const router = express.Router();

// Access to Public Folder
const censusDal = require("../services/mongo_search.dal");


//Get Router
router.get("/", async (req, res) => {
  console.log("inside landing page of mongo search");

  res.render("mongo_fam.ejs");
});

router.get("/search", async (req, res) => {
  console.log("Mongo Fam Search");  
  var queryStr = require("url").parse(req.url, true).query;
  console.log("results");  
  let results = await censusDal.getByFamilyName(queryStr.search);  
  console.log(results);  
  if (results.length === 0) {  
  console.log("Inside the Family Name");  
  res.render("mongonorecord.ejs");  
  } else {  
  res.render("mongo_fam_results.ejs", { results });  
  }
  
  });


module.exports = router;
