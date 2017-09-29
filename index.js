"use strict";

// Basic express setup:

const PORT          = 8080;
const express       = require("express");
const bodyParser    = require("body-parser");
const app           = express();
const pg     	 	    = require('pg')
const settings      = require('./settings')

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

client.connect((err)=> {
	let text='SELECT * FROM maps WHERE mapname LIKE($1)'
	let value = [process.argv[2]]
	console.log(process.argv[2])
	if (err) {
		return console.error("connection error", err);
	}
	client.query(text,value, (err,result) => {
		if (err) {
			return console.error("query error", err);
		}
		console.log(result.rows);
		client.end();
	});
});


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));






// Database comes from PostgresQL
// let db;

// const DataHelpers = require("./lib/data-helpers.js")(db);
// const userMapRoutes = require("./routes/users-userid-maps")(DataHelpers);
// app.use("/users-userid-maps", userMapRoutes);


// The `tweets-routes` module works similarly: we pass it the `DataHelpers` object
// so it can define routes that use it to interact with the data layer.


// Mount the tweets routes at the "/tweets" path prefix:


app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
