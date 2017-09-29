const express  = require('express');
const app = express();
const settings = require("../settings")
const knex = require('knex')({
  client: 'pg',
  version: '7.2',
  debug:true,
  connection: {
    host: settings.host,
    user     : settings.user,
    password : settings.password,
    database : settings.database,
  }
});
app.set("view engine", "ejs");
const userRouter  = express.Router();


// knex call to a temp map table I made on my computer. not real database
  knex('maps').insert({mapid:7, mapname: 'fourfivestillalive'})
    .then(console.log)
    .catch(console.error)
knex.select('*').from('maps')
.then(console.log)
ß     .finally(function(){
      knex.destroy();
      })

module.exports = function(DataHelpers) {

  userRouter.post(`/userid/maps`, function(req, res) {
    if (!req.body.text) {
      res.status(400).json({ error: 'invalid request: no data in POST body'});
      return;
    }

   

    // DataHelpers.createMap(mapname, usercreationID)

    let city = req.body.text;

    res.redirect(`/:usersid/maps/mapid?city=${city}`);
  });


    // Create a row in maps for this new map
    // Fill in with random map id, name is null

    let city = req.body.text;

    res.redirect(`/userid/maps/mapid?city=${city}`);
  }


  userRouter.get(`/userid/maps/mapid`, (req, res) => {
    // Sends user to the main page for a particular map

    res.render("create_map", { coordinates:req.query.city });

    res.render("create_map", { coordinates: DataHelpers.findCity(req.query.city) });

  })

  return userRouter;
}
