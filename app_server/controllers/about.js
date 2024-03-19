const packageJson = require('../../package.json');

/* GET about view. */
const about = (req, res) => {
    res.render('about', { title: 'Travlr About'});
};

module.exports = {
    about
};