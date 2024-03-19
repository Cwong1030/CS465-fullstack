const packageJson = require('../../package.json');

/* GET contact view. */
const contact = (req, res) => {
    res.render('contact', { title: 'Travlr Contact'});
};

module.exports = {
    contact
};