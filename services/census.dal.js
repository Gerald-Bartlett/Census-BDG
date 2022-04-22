//Pg Database Connection

const dal = require("./postgres_db");
const express = require("express");
const app = express();


//Event Emitters and Log Events
const logEvents = require("../logEvents");
const EventEmitter = require("events");
class ThisEmitter extends EventEmitter {}
const thisEmitter = new ThisEmitter();


// Query By All The Census
const getAllCensus = () => {
  return new Promise(function (resolve, reject) {
    //  add a listener for the log event
    thisEmitter.once("log", (msg) => logEvents(msg));
    //   // Emitting  the event
    thisEmitter.emit(
      "log",
      " -- A Postgres All Census  Log Event has been Emitted!"
    );
    const sql = "SELECT * FROM census ORDER BY family_name ASC";
    dal.query(sql, [], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result.rows);
      }
    });
  });
};


// Query By Family Name

const getCensusByFamilyName = (family_name) => {
  console.log("Family Name Promise");
  return new Promise(function (resolve, reject) {
    //  add a listener for the log event
    thisEmitter.once("log", (msg) => logEvents(msg));
    //   // Emitting  the event
    thisEmitter.emit(
      "log",
      " -- A Postgres Census Family Name  Log Event has been Emitted!" +
        " Family Name: " +
        family_name
    );
    app.set("view-engine", "ejs");
    console.log("Family name: " + family_name);
    const sql = "SELECT * FROM census WHERE family_name = $1";
    dal.query(sql, [family_name], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result.rows);
      }
    });
  });
};

//Query by Province Name

const getCensusByProvinceName = (province) => {
  //  add a listener for the log event
  thisEmitter.once("log", (msg1) => logEvents(msg1));
  //   // Emitting  the event
  thisEmitter.emit(
    "log",
    " -- A Postgres Census Province Log Event has been Emitted!" +
      " Province: " +
      province
  );
  console.log("Province Outside promise");
  return new Promise(function (resolve, reject) {
    app.set("view-engine", "ejs");
    console.log("Inside promise: Province name: " + province);
    const sql = "SELECT * FROM census WHERE province = $1";
    dal.query(sql, [province], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result.rows);
      }
    });
  });
};


//Query By Census Year
const getCensusByYear = (census_year) => {
  //  add a listener for the log event
  thisEmitter.on("log", (msg2) => logEvents(msg2));
  //   // Emitting  the event
  thisEmitter.emit(
    "log",
    " -- A Census Year Log Event has been Emitted!" + " Year: " + census_year
  );
  console.log(" Census Year Outside promise");
  return new Promise(function (resolve, reject) {
    app.set("view-engine", "ejs");
    console.log("Inside promise: Year: " + census_year);
    const sql = "SELECT * FROM census WHERE census_year = $1";
    dal.query(sql, [census_year], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result.rows);
      }
    });
  });
};


// Query By Census Id

const getCensusById = (household_id) => {
  //  add a listener for the log event
  thisEmitter.on("log", (msg3) => logEvents(msg3));
  //   // Emitting  the event
  thisEmitter.emit(
    "log",
    " -- A Postgres Census Household Id  Log Event has been Emitted!" +
      " Household Id: " +
      household_id
  );
  console.log(" Census Id Outside promise");
  return new Promise(function (resolve, reject) {
    app.set("view-engine", "ejs");
    console.log("Inside Household ID : " + household_id);
    const sql = "SELECT * FROM census WHERE household_id = $1";
    dal.query(sql, [household_id], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result.rows);
      }
    });
  });
};

module.exports = {
  getAllCensus,
  getCensusByFamilyName,
  getCensusByProvinceName,
  getCensusByYear,
  getCensusById,
};
