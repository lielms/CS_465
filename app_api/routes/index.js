const express = require("express");  // Express app
const router = express.Router();     // Router logic

const tripsController = require ("../controllers/trips");

router
    .route("/trips")
    .get(tripsController.tripsList) // GET Method routes tripList
    .post(tripsController.tripsAddTrip); // POST Method Adds a Trip

// GET method routes tripsFindByCode - parameter required
router
    .route('/trips/:tripCode')
    .get(tripsController.tripsFindByCode)
    .put(tripsController.tripsUpdateTrip);

module.exports = router;