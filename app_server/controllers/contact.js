var fs = require('fs');
var info = JSON.parse(fs.readFileSync('app_server/data/contact.json', 'utf8'));

/* GET contact view. */
const contact = (req, res) => {
    res.render('contact', { title: 'Travlr Contact', contact});
};

module.exports = {
    contact
};