const express  = require('express');
// const app = express();
const settings = require("../settings");


// app.set("view engine", "ejs");
const userRouter  = express.Router();

/*
// knex call to a temp map table I made on my computer. not real database
  knex('maps').insert({mapid:7, mapname: 'fourfivestillalive'})
    .then(console.log)
    .catch(console.error)
knex.select('*').from('maps')
.then(console.log)
     .finally(function(){
      knex.destroy();
      })
*/

module.exports = function(DataHelpers) {

  let city = '';

  userRouter.post(`/userid/maps`, function(req, res) {
    if (!req.body.text) {
      res.status(400).json({ error: 'invalid request: no data in POST body'});
      return;
    }


    // Insert new row into maps table for newly created map
    // Row will only have an id at this point
    // Will have to add userid upon user implementation
    console.log(DataHelpers);
    mapID = DataHelpers.knex('maps').insert({}).then(result => {
      res.send()
    });

    //insert(default)?

    city = req.body.text;

  });


  userRouter.get(`/userid/maps/mapid`, (req, res) => {
    console.log(req.query.city);

    // Sends user to the main page for a particular map

    // Does this need to render EJS file
    DataHelpers.findCity(req.query.city).then(function(coordinates) {
      res.render("create_map", { coordinates: coordinates, city: req.query.city });
    });

  })

  userRouter.post(`/userid/maps/mapid`, (req, res) => {
    console.log("AHHAHAHAHAH");
  DataHelpers.knex('maps').insert({description: req.body.txt}).then(result => {

      res.render("create_map")
    });
    

  })



  return userRouter;
}
