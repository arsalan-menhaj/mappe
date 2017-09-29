const express  = require('express');
const app = express();
app.set("view engine", "ejs");
const userRouter  = express.Router();


module.exports = function(DataHelpers) {

  userRouter.post(`/userid/maps`, function(req, res) {
    if (!req.body.text) {
      res.status(400).json({ error: 'invalid request: no data in POST body'});
      return;
    }

    // Create a row in maps for this new map
    // Fill in with random map id, name is null

    let city = req.body.text;

    res.redirect(`/userid/maps/mapid?city=${city}`);
  }

  userRouter.get(`/userid/maps/mapid`, (req, res) => {
    // Sends user to the main page for a particular map
    res.render("create_map", { coordinates: DataHelpers.findCity(req.query.city) });
  })

  return userRouter;
}
