var express = require('express');
var router = express.Router();
const controller = require('../controllers/travel');

/* GET home page. */
router.get('/', controller.tripList);

module.exports = router;