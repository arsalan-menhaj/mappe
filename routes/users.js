const express  = require('express');
const app = express();
app.set("view engine", "ejs");
const userRouter  = express.Router();


module.exports = function(DataHelpers) {

  userRouter.post(`/:userid/maps`, function(req, res) {
    if (!req.body.text) {
      res.status(400).json({ error: 'invalid request: no data in POST body'});
      return;
    }

    res.render("create_map", { coordinates: DataHelpers.findCity(req.body.text) });
  }

  userRouter.get(`/:userid/maps/mapid`, (req, res) => {
    // Sends user to the main page for a particular map
    res.render("create_map", { coordinates: DataHelpers.findCity(req.body.text) });
  })

  return userRouter;
}
