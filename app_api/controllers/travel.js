const mongoose = require('mongoose');
const Trip = mongoose.model('trips');
const User = mongoose.model('users');

// GET: /trips - lists all trips
const tripsList = async (req, res) => {
    try {
        const trips = await Trip.find({}).exec();
        if (!trips.length) {
            return res.status(404).json({ message: "Trip not found" });
        } else {
            return res.status(200).json(trips);
        }
    } catch (err) {
        return res.status(404).json(err);
    }
};

// GET: /trips/:tripCode - returns a single trip
const tripsFindCode = async (req, res) => {
    try {
        const trip = await Trip.find({ code: req.params.tripCode }).exec();
        if (!trip) {
            return res.status(404).json({ message: "Trip not found" });
        } else {
            return res.status(200).json(trip);
        }
    } catch (err) {
        return res.status(404).json(err);
    }
};

// POST: creates a single trip
const tripsAddTrip = async (req, res) => {
    getUser(req, res, (req, res) => {
        Trip.create({
            code: req.body.code,
            name: req.body.name,
            length: req.body.length,
            start: req.body.start,
            resort: req.body.resort,
            perPerson: req.body.perPerson,
            image: req.body.image,
            description: req.body.description
        })
        .then(trip => {
            return res.status(201).json(trip);
        })
        .catch(err => {
            return res.status(400).json(err);
        });
    });
};

// PUT: changes a single trip
const tripsUpdateTrip = async (req, res) => {
    getUser(req, res, (req, res) => {
        Trip.findOneAndUpdate({ code: req.params.tripCode }, req.body, { new: true })
            .then(trip => {
                if (!trip) {
                    return res.status(404).json({ message: "Trip not found with code " + req.params.tripCode });
                }
                return res.status(200).json(trip);
            })
            .catch(err => {
                if (err.kind === 'ObjectId') {
                    return res.status(404).json({ message: "Trip not found with code " + req.params.tripCode });
                }
                return res.status(500).json(err);
            });
    });
};

const getUser = (req, res, callback) => {
    if (req.payload && req.payload.email) {
        User.findOne({ email: req.payload.email })
            .exec((err, user) => {
                if (!user) {
                    return res.status(404).json({ message: "User not found" });
                } else if (err) {
                    return res.status(404).json(err);
                }
                callback(req, res, user.name);
            });
    } else {
        return res.status(404).json({ message: "User not found" });
    }
};

module.exports = {
    tripsList,
    tripsFindCode,
    tripsAddTrip,
    tripsUpdateTrip
};
