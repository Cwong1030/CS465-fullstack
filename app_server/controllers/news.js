const packageJson = require('../../package.json');

/* GET news view. */
const news = (req, res) => {
    res.render('news', { title: 'Travlr News' });
};

module.exports = {
    news
};