"use strict";

const settings      = require('../settings');

// PostqreSQL Database Connection function call
const databaseConnection =  {
  knex:  require('knex')({
    client: 'pg',
    version: '7.2',
    debug:true,
    connection: {
      host: settings.host,
      user     : settings.user,
      password : settings.password,
      database : settings.database,
    }
  })
};

const PORT          = 8080;
const express       = require("express");
const bodyParser    = require("body-parser");
const app           = express();
const pg     	 	    = require('pg');
const cookieSession = require('cookie-session');
const flash = require('connect-flash');
const path = require('path');
const User = require('../server/userauth.js')(databaseConnection.knex);

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(flash());




// const User = require('./lib/user')(databaseConnection.knex);

app.use(cookieSession({
  name: 'session',
  keys: [process.env.SESSION_SECRET || 'development']
}));

const DataHelpers = require("./data_helpers.js")(databaseConnection);
const usersRoutes = require("../routes/users")(DataHelpers);
const homeRoutes = require("../routes/home")(DataHelpers);
const authRoutes = require("../routes/auth")(User);
app.use("/users", usersRoutes);
app.use("/home", homeRoutes);
app.use("/", authRoutes);

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});

