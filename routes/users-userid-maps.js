module.exports = function(DataHelpers) {
  mapsRoutes.post(`/users/userid/maps`, function(req, res) {
    if (!req.body.text) {
      res.status(400).json({ error: 'invalid request: no data in POST body'});
      return;
    }
    // Needs to return map for city entered into "Create Map" input
    DataHelpers.getCityMap(req.body.text);
  }
  return mapsRoutes;
}
