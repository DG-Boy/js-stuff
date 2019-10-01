var express = require('express');
const bodyParser = require("body-parser");

var ctrlLocs = require('../controllers/locs');
var ctrlOthers = require('../controllers/others');

var router = express.Router();
const parser = bodyParser.urlencoded({extended: false});



/* Страницы местоположений */
router.get('/', ctrlLocs.homelist);
router.get('/location', ctrlLocs.locInfo);
router.get('/location/review/new', ctrlLocs.addReview);

/* Другие страницы */
router.get('/about', ctrlLocs.about);



module.exports = router;
