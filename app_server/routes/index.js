var express = require('express');

var ctrlLocs = require('../controllers/locs');
var ctrlOthers = require('../controllers/others');

var router = express.Router();


/* Страницы местоположений */
router.get('/', ctrlLocs.homelist);
router.get('/location', ctrlLocs.locInfo);
router.get('/location/review/new', ctrlLocs.addReview);

/* Другие страницы */
router.get('/about', ctrlOthers.about);



module.exports = router;
