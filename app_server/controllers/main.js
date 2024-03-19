var fs = require('fs');
var info = JSON.parse(fs.readFileSync('app_server/data/index.json', 'utf8'));

/* GET Homepage */
const index = (req, res) => {
    res.render('index', {title:'Travlr Getaways', index});
};

module.exports = {
    index
};