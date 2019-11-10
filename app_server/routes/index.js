var express = require('express');
var router = express.Router();

var ctrlLocs = require('../controllers/locs');
var ctrlOthers = require('../controllers/others');



/* Страницы местоположений */
router.get('/', ctrlLocs.homelist);
router.get('/loc/:locid', ctrlLocs.locInfo);
router.get('/loc/:locid/reviews/new', ctrlLocs.addReview);
router.post('/loc/:locid/reviews/new', ctrlLocs.doAddReview);

/* Другие страницы */
router.get('/about', ctrlOthers.about);


module.exports = router;
