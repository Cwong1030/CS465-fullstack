const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.model('users');

const register = (req, res) => {
  if (!req.body.name || !req.body.email || !req.body.password) {
    return res
        .status(400)
        .json({ "message": "All fields required" });
  }
  
  // Create new user
  const user = new User();
  user.name = req.body.name;
  user.email = req.body.email;
  user.setPassword(req.body.password);

  // Save user using Promises
  user.save()
    .then(() => {
      const token = user.generateJwt();
      res
        .status(200)
        .json({ token });
    })
    .catch(err => {
      res
        .status(400)
        .json(err);
    });
};

const login = (req, res, next) => {
  // Check if all fields are filled
  if (!req.body.email || !req.body.password) {
    return res
        .status(400)
        .json({ message: 'All fields required' });
  }

  // Passport authentication middleware moved into the route handler
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      console.error('Error during authentication:', err); // Log the error
      return res.status(500).json({ message: 'Internal Server Error' });
    }
    if (!user) {
      return res
        .status(401)
        .json({ message: 'Authentication failed' });
    }
    req.login(user, { session: false }, (err) => {
      if (err) {
        console.error('Error during login:', err); // Log the error
        return res
            .status(500)
            .json({ message: 'Internal Server Error' });
      }
      const token = user.generateJwt();
      res
        .status(200)
        .json({ token });
    });
  })(req, res, next);
};

module.exports = {
  register,
  login
};
