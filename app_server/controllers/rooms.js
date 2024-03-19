var fs = require('fs');
var info = JSON.parse(fs.readFileSync('app_server/data/rooms.json', 'utf8'));

/* GET rooms view. */
const rooms = (req, res) => {
    res.render('rooms', { title: 'Travlr Rooms', rooms});
};

module.exports = {
    rooms
};