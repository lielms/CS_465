const mongoose = require('mongoose');
const Trip = mongoose.model('trips');
const User = mongoose.model('users');

// GET: /trips - lists all the trips
// Regardless of outcome, response must include HTML status code
// and JSON message to the requesting client
const tripsList = async (req, res) => {
    const q = await Trip
        .find({}) // No filter, return all records
        .exec();

    // Uncomment the following line to show results of query
    // on the console
    // console.log(q);

    if (!q) {
        // Database returned no data
        return res
            .status(404)
            .json(err);
    } else {
        // Return resulting trip list
        return res
            .status(200)
            .json(q);
    }
};

// GET: /trips/:tripCode - lists a single trip
// Regardless of outcome, respnse must includeu HTML status code
// and JSON message to the requesting client
const tripsFindByCode = async(req, res) => {
    const q = await Trip
        .find({'code' : req.params.tripCode })
        .exec();
        // console.log(q);
    if (!q) 
    {  // Database returned no data
        return res
            .status(404)
            .json(err);
    } else {
        // Return resulting trip list
        return res
            .status(200)
            .json(q);
    }
};

// POST: /trips - Adds a new Trip
// Regardless of outcome, response must include HTML status code
// and JSON message to the requesting client
const tripsAddTrip = async (req, res) => {
  const userName = await getUser(req, res);
  if (!userName) return; // getUser already sent response

  const newTrip = new Trip({
    code: req.body.code,
    name: req.body.name,
    length: req.body.length,
    start: req.body.start,
    resort: req.body.resort,
    perPerson: req.body.perPerson,
    image: req.body.image,
    description: req.body.description
  });

  try {
    const q = await newTrip.save();
    return res.status(201).json(q);
  } catch (err) {
    return res.status(400).json(err);
  }
};

// PUT: /trips/:tripCode - Updates a Trip
// Response must include HTML status code and JSON message

const tripsUpdateTrip = async (req, res) => {
  const userName = await getUser(req, res);
  if (!userName) return;

  try {
    const q = await Trip.findOneAndUpdate(
      { code: req.params.tripCode },
      {
        code: req.body.code,
        name: req.body.name,
        length: req.body.length,
        start: req.body.start,
        resort: req.body.resort,
        perPerson: req.body.perPerson,
        image: req.body.image,
        description: req.body.description
      },
      { new: true }
    ).exec();

    if (!q) {
      return res.status(400).json({ error: "Trip not found or update failed" });
    }
    return res.status(201).json(q);
  } catch (err) {
    return res.status(500).json({ error: "Internal server error", details: err.message });
  }
};

const reviewsCreate = (req, res) => {
  getUser(req, res, (req, res, userName) => {
    const locationId = req.params.locationid;
    if (locationId) {
      Loc.findById(locationId)
        .select('reviews')
        .exec((err, location) => {
          if (err) {
            return res
            .status(400)
            .json(err);
          } else {
            doAddReview(req, res, location, userName);
          }
        });
    } else {
      res
      .status(404)
      .json({ message: "Location not found" });
    }
  });
};

const getUser = async (req, res) => {
  if (req.payload && req.payload.email) {
    try {
      const user = await User.findOne({ email: req.payload.email }).exec();
      if (!user) {
        res.status(404).json({ message: "User not found" });
        return null;
      }
      return user.name;
    } catch (err) {
      res.status(400).json(err);
      return null;
    }
  } else {
    res.status(404).json({ message: "User not found" });
    return null;
  }
};

module.exports = {
    tripsList,
    tripsFindByCode,
    tripsAddTrip,
    tripsUpdateTrip
};