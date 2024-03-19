var fs = require('fs');
var info = JSON.parse(fs.readFileSync('app_server/data/about.json', 'utf8'));

/* GET about view. */
const about = (req, res) => {
    res.render('about', { title: 'Travlr About', about});
};

module.exports = {
    about
};