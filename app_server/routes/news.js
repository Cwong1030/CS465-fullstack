var express = require('express');
var router = express.Router();
const controller= require('../controllers/news');

/* GET news view. */
router.get('/', controller.newsList);

module.exports = router;