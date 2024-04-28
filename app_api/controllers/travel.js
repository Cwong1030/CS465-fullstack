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
    try {
        const user = await getUser(req, res);
        if (!user) {
            return;
        }
        
        const trip = await Trip.create({
            code: req.body.code,
            name: req.body.name,
            length: req.body.length,
            start: req.body.start,
            resort: req.body.resort,
            perPerson: req.body.perPerson,
            image: req.body.image,
            description: req.body.description
        });

        return res
            .status(201)
            .json(trip);
    } catch (err) {
        console
            .error(err);
        return res
            .status(500)
            .json({ message: 'Internal Server Error' });
    }
};

   
// PUT: changes a single trip
const tripsUpdateTrip = async (req, res) => {
    try {
        // Assuming getUser is an async function
        const user = await getUser(req, res);
        
        // Proceed with update if user is authenticated
        const updatedTrip = await Trip.findOneAndUpdate(
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
            },
            { new: true }
        );

        if (!updatedTrip) {
            return res.status(404).send({
                message: "Trip not found with code " + req.params.tripCode
            });
        }

        res.send(updatedTrip);
    } catch (err) {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Trip not found with code " + req.params.tripCode
            });
        }
        return res.status(500).json(err);
    }
};


const getUser = async (req, res) => {
    try {
        if (req.auth && req.auth.email) {
            const user = await User
                .findOne({ email: req.auth.email });
            if (!user) {
                return res
                    .status(404)
                    .json({ message: 'User not found' });
            }
            return user;
        } else {
            return res
                .status(404)
                .json({ message: 'User not found' });
        }
    } catch (err) {
        console
            .error(err);
        return res
            .status(500)
            .json({ message: 'Internal Server Error' });
    }
};




module.exports = {
    tripsList,
    tripsFindCode,
    tripsAddTrip,
    tripsUpdateTrip
};
