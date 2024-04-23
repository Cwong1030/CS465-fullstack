const mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

// Define user schema
const userSchema = new mongoose.Schema({
    email: { 
        type: String, 
        unique: true, required: true 
    },
    name: { 
        type: String, 
        required: true 
    },
    hash: String,
    salt: String
});

// User set password method
userSchema.methods.setPassword = function(password){
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt,
        1000, 64, 'sha512').toString('hex');
};

// User password validation method
userSchema.methods.validPassword = function (password) {
    var hash = crypto.pbkdf2Sync(password, this.salt,
        1000, 64, 'sha512').toString('hex');

    return this.hash === hash;
};

// User method to generate JWT
userSchema.methods.generateJwt = function () {
    // Initialize expiry date to current date
    const expiry = new Date();
    // Set expiry date to 7 days from current date
    expiry.setDate(expiry.getDate() + 7);

    return jwt.sign({
        _id: this._id,
        email: this.email,
        name: this.name,
        exp: parseInt(expiry.getTime() / 1000, 10)
    }, process.env.JWT_SECRET); // DO NOT JWT_SECRET YOUR SECRET IN THE CODE!
};

mongoose.model('users', userSchema);