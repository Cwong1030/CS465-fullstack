var fs = require('fs');
var info = JSON.parse(fs.readFileSync('app_server/data/meals.json', 'utf8'));

/* GET meals view. */
const meals = (req, res) => {
    res.render('meals', { title: 'Travlr Meals', meals});
};

module.exports = {
    meals
};