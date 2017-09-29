"use strict";

// Basic express setup:

const PORT          = 8080;
const express       = require("express");
const bodyParser    = require("body-parser");
const app           = express();
const pg     	 	    = require('pg');
const settings      = require('../settings');
const path = require('path');

app.set("view engine", "ejs");
app.set('views', path.join(__dirname, '..', 'public/views'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

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

const DataHelpers = require("./data_helpers.js")(databaseConnection);
const usersRoutes = require("../routes/users")(DataHelpers);
const homeRoutes = require("../routes/home")(DataHelpers);
app.use("/users", usersRoutes);
app.use("/home", homeRoutes);

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});

