var express = require('express');
var router = express.Router();
const controller= require('../controllers/meals');

/* GET meals view. */
router.get('/', controller.mealList);

module.exports = router;