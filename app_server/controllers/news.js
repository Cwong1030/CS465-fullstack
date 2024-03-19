var fs = require('fs');
var info = JSON.parse(fs.readFileSync('app_server/data/news.json', 'utf8'));

/* GET news view. */
const news = (req, res) => {
    res.render('news', { title: 'Travlr News', news});
};

module.exports = {
    news
};