//Express

const express = require("express");
const router = express.Router();

// Access to Public Folder
router.use(express.static("public"));

//Access To Data Access Layer
const censusDal = require("../services/mongo_search.dal");


//Get Router
router.get("/", async (req, res) => {
  console.log("inside landing page of mongo province search");
  res.render("mongo_prov.ejs");
});

router.get("/search", async (req, res) => {
  console.log("Mongo Fam Search");
  var queryStr = require("url").parse(req.url, true).query;
  console.log("results");
  let results = await censusDal.getByProvince(queryStr.search);
  if (results.length === 0) {
    console.log("Inside the inside");    
    res.render("mongoNoRecord.ejs");    
    } else {    
    res.render("mongo_prov_results.ejs", { results });   
    }
  
});

module.exports = router;
