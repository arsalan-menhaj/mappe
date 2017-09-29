const express  = require('express');
const homeRouter  = express.Router();


module.exports = function (DataHelpers) {

  homeRouter.get('/', function(req, res) {
    res.render('index');
  });

  return homeRouter;
}