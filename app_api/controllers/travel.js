const mongoose = require('mongoose');
const model = mongoose.model('trips');

// GET: /trips - return list of all trips
const tripList = async (req, res) => {
    try {
        const trips = await model.find({});
        if (!trips) {
            return res
                .status(404)
                .json({ "message": "trips not found" });
        } else {
            return res
                .status(200)
                .json(trips);
        }
    } catch (err) {
        return res
            .status(404)
            .json(err);
    }
};

// GET: /trips/:tripCode - return a single trip
const tripsFindCode = async (req, res) => {
    try {
        const trip = await model.find({ 'code': req.params.tripCode });
        if (!trip) {
            return res
                .status(404)
                .json({ "message": "trip not found" });
        } else {
            return res
                .status(200)
                .json(trip);
        }
    } catch (err) {
        return res
            .status(404)
            .json(err);
    }
};

// POST: /trips - Adds a new trip
const tripsAddTrip = async(req, res) => {
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

    const q = await newTrip.save();

        if(!q)
        { // Database returned no data
            return res
                .status(400)
                .json(err);
        } else { // Return new trip
            return res
                .status(201)
                .json(q);
        }

};

// PUT: /trips/:tripCode - Adds a new Trip
const tripsUpdateTrip = async(req, res) => {
    // Uncomment for debugging
    console.log(req.params);
    console.log(req.body);
    const q = await model
        .findOneAndUpdate(
            { 'code': req.params.tripCode },
            {
                code: req.body.code,
                name: req.body.name,
                length: req.body.length,
                start: req.body.start,
                resort: req.body.resort,
                perPerson: req.body.perPerson,
                image: req.body.image,
                description: req.body.description
            }
        )
        .exec();

    if (!q) { // Database returned no data
        return res
            .status(400)
            .json(err);
    } else { // Return resulting updated trip
        return res
            .status(201)
            .json(q);
    }

};


module.exports = {
    tripList,
    tripsFindCode,
    tripsAddTrip,
    tripsUpdateTrip
};