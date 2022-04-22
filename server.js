if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

//modules
const express = require("express");
const bcrypt = require("bcrypt");
const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const flash = require("express-flash");
const session = require("express-session");
const methodOverride = require("method-override");
const uuid = require("uuid");
const logins = require("./services/postgres_logins"); // use POSTGRESQL dal

const app = express();

//Routers
const censusRouter = require("./routes/pg_census");
const pgFamRouter = require("./routes/pg_fam");
const provNameRouter = require("./routes/prov_search");
const yearRouter = require("./routes/pg_year_search");
const pgIdRouter = require("./routes/pg_id");
const mongoProvRouter = require("./routes/mongo_prov");
const mongoIdRouter = require("./routes/mongo_id");
const mongoRouter = require("./routes/mongo_fam");
const mongoCensusRouter = require("./routes/mongo_census");
const mongoYearRouter = require("./routes/mongo_year");


//Event emitters and logs
const logEvents = require("./logEvents");
const EventEmitter = require("events");
class ThisEmitter extends EventEmitter {}
const thisEmitter = new ThisEmitter();

//  add a listener for the log event
thisEmitter.on("log", (msg) => logEvents(msg));
//   // Emitting  the event
thisEmitter.emit("log", " -- A Log Event has been Emitted!");
 
// login passport
passport.use(
  new localStrategy(
    { usernameField: "email" },
    async (email, password, done) => {
      let user = await logins.getLoginByEmail(email);
      if (user == null) {
        return done(null, false, { message: "No user with that email." });
      }
      try {
        if (await bcrypt.compare(password, user.password)) {
          return done(null, user);
        } else {
          return done(null, false, {
            message: "Incorrect password was entered.",
          });
        }
      } catch (error) {
        return done(error);
      }
    }
  )
);
passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser(async (id, done) => {
  let user = await logins.getLoginById(id);
  done(null, user);
});

// express
app.set("view-engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(flash());

//secret session security
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
//call for  passport initializations
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride("_method"));

app.get("/", checkAuthenticated, (req, res) => {
  console.log("index authentication check");
  res.render("index.ejs", { name: req.user.username });
});
// call for routers
app.use("/mongo_fam", mongoRouter);
app.use("/mongo_census", mongoCensusRouter);
app.use("/mongo_prov", mongoProvRouter);
app.use("/mongo_id", mongoIdRouter);
app.use("/mongo_year", mongoYearRouter);

app.use("/pg_fam", pgFamRouter);
app.use("/pg_census", censusRouter);
app.use("/pg_year_search", yearRouter);
app.use("/prov_search", provNameRouter);
app.use("/pg_id", pgIdRouter);

// login page rendered
app.get("/login", checkNotAuthenticated, (req, res) => {
  res.render("login.ejs");
});

app.post(
  "/login",
  checkNotAuthenticated,
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true,
  })
);


// register page rendered
app.get("/register", checkNotAuthenticated, (req, res) => {
  res.render("register.ejs");
});

app.post("/register", checkNotAuthenticated, async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    let result = await logins.addLogin(
      req.body.name,
      req.body.email,
      hashedPassword,
      uuid.v4()
    );
    res.redirect("/login");
  } catch (error) {
    console.log(error);
    res.redirect("/register");
  }
});

app.delete("/logout", (req, res) => {
  req.logOut();
  res.redirect("login");
});


//Auth checks

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect("/");
  }
  return next();
}

app.use(express.static("public"));
app.listen(3000);
