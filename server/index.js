"use strict";

// Basic express setup:

const PORT          = 8080;
const express       = require("express");
const bodyParser    = require("body-parser");
const app           = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));






// Database comes from PostgresQL
let db;

const DataHelpers = require("./lib/data-helpers.js")(db);
const userMapRoutes = require("./routes/users-userid-maps")(DataHelpers);
app.use("/users-userid-maps", userMapRoutes);


// The `tweets-routes` module works similarly: we pass it the `DataHelpers` object
// so it can define routes that use it to interact with the data layer.


// Mount the tweets routes at the "/tweets" path prefix:


app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
