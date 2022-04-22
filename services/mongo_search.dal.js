
//Mongo Database Connection
//const dal = require("./mongodb_db");

const { MongoClient } = require("mongodb");
const uri =
  "mongodb://localhost:27017";
const client = new MongoClient(uri);



const express = require("express");
const app = express();


//Event Emitters and Log Events
const logEvents = require("../logEvents");
const EventEmitter = require("events");
class ThisEmitter extends EventEmitter {}
const thisEmitter = new ThisEmitter();


//database Queries and Log Events

// By Family Name
async function getByFamilyName(name) {
  //  add a listener for the log event
thisEmitter.once("log", (msg) => logEvents(msg));
//   // Emitting  the event
thisEmitter.emit("log", " -- A Mongo Census Family Name  Log Event has been Emitted!" + " Family Name: " + name);
  app.set("view-engine", "ejs");
  console.log(`Found the families now`);
  await client.connect();
  const cursor = client
    .db("Census")
    .collection("census")
    .find({ family_name: name });
  const results = await cursor.toArray();
  console.log("Retuning Mongo fam Results");
  return results;
}

//Query by Province Name

async function getByProvince(province) {
   //  add a listener for the log event
thisEmitter.once("log", (msg) => logEvents(msg));
//   // Emitting  the event
thisEmitter.emit("log", " -- A Mongo Census Province  Log Event has been Emitted!" + " Province : " + province);
  app.set("view-engine", "ejs");
  console.log(`Found the families now`);
  await client.connect();
  const cursor = client
    .db("Census")
    .collection("census")
    .find({ province: province });
  const results = await cursor.toArray();
  console.log("Retuning Mongo fam Results");
  return results;
}

//Query by Household Id

async function getByHouseholdId(household_id) {
   //  add a listener for the log event
thisEmitter.once("log", (msg) => logEvents(msg));
//   // Emitting  the event
thisEmitter.emit("log", " -- A Mongo Census Household Id  Log Event has been Emitted!" + " Household Id: " + household_id);
  app.set("view-engine", "ejs");
  console.log(`Found the Household ID function now`);
  await client.connect();
  const cursor = client
    .db("Census")
    .collection("census")
    .find({ household_id: household_id });
  const results = await cursor.toArray();
  console.log(results);
  console.log("Retuning Mongo Household ID Results");
  return results;
}

//Query By Census Year

async function getByYear(census_year) {
   //  add a listener for the log event
thisEmitter.once("log", (msg) => logEvents(msg));
//   // Emitting  the event
thisEmitter.emit("log", " -- A Mongo Census Year Log Event has been Emitted!" + " Year: " + census_year);
  app.set("view-engine", "ejs");
  console.log(`Found the year function now`);
  await client.connect();
  const cursor = client
    .db("Census")
    .collection("census")
    .find({ census_year: census_year });
  const results = await cursor.toArray();
  console.log(results);
  console.log("Retuning Mongo year Results");
  return results;
}

// By Province
// async function getByProvince(name) {
//   app.set("view-engine", "ejs");
//   console.log(`Found the Province now stage-3`);
//   await client.connect();
//   const cursor = client
//     .db("Census")
//     .collection("census")
//     .find({ province: name });
//   const results = await cursor.toArray();

//   return results;
// }

module.exports = {
  getByFamilyName,
  getByProvince,
  getByHouseholdId,
  getByYear,
};
