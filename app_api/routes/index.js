const express = require('express');  // Express app
const router = express.Router();     // Router logic
const jwt = require('express-jwt'); // JWT middleware for authentication

const auth = jwt({
    secret: process.env.JWT_SECRET, // Secret key for JWT
    userProperty: 'payload', // Property to attach the user info
    algorithms: ['HS256'] // Algorithm used for signing the JWT
});

const authController = require('../controllers/authentication');
const tripsController = require ('../controllers/trips');

// registers authentication routes
router
    .route('/login')
    .post(authController.login);

router
    .route('/register')
    .post(authController.register);

router
    .route("/trips")
    .get(tripsController.tripsList) // GET Method routes tripList
    .post(auth, tripsController.tripsAddTrip); // POST Method Adds a Trip

// GET method routes tripsFindByCode - parameter required
router
    .route('/trips/:tripCode')
    .get(tripsController.tripsFindByCode)
    .put(auth, tripsController.tripsUpdateTrip);

module.exports = router;