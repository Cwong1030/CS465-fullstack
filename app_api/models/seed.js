// Bring in the DB connection and the Trip Schema
const Mongoose = require('./db');
const Meals = require('../models/meals');
const News = require('../models/news');
const Rooms = require('../models/rooms');
const Trip = require('./travlr');

// Read seed data from json file
const fs = require('fs');
const meals = JSON.parse(fs.readFileSync('./app_server/data/meals.json', 'utf8'));
const news = JSON.parse(fs.readFileSync('./app_server/data/news.json', 'utf8'));
const rooms = JSON.parse(fs.readFileSync('./app_server/data/rooms.json', 'utf8'));
const trips = JSON.parse(fs.readFileSync('./app_server/data/trips.json', 'utf8'));


// delete any existing records, then insert seed data
const seedDB = async () => {
    await Meals.deleteMany({});
    await Meals.insertMany(meals);

    await News.deleteMany({});
    await News.insertMany(news);

    await Rooms.deleteMany({});
    await Rooms.insertMany(rooms);

    await Trip.deleteMany({});
    await Trip.insertMany(trips);  
};

// Close the MongoDB connection and exit
seedDB().then(async () => {
    await Mongoose.connection.close();
    process.exit(0);
});
