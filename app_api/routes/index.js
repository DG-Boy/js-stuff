var express = require('express');
var router = express.Router();

var ctrlLocs = require('../controllers/locs');
var ctrlReviews = require('../controllers/reviews');


/* Местоположения */
router.get('/locs', ctrlLocs.locsListByDistance);
router.post('/locs', ctrlLocs.locsCreate);
router.get('/locs/:locid', ctrlLocs.locsReadOne);
router.put('/locs/:locid', ctrlLocs.locsUpdateOne);
router.delete('/locs/:locid', ctrlLocs.locsDeleteOne);

/* Отзывы */
router.post('/locs/:locid/reviews', ctrlReviews.reviewsCreate);
router.get('/locs/:locid/reviews/:reviewid', ctrlReviews.reviewsReadOne);
router.put('/locs/:locid/reviews/:reviewid', ctrlReviews.reviewsUpdateOne);
router.delete('/locs/:locid/reviews/:reviewid', ctrlReviews.reviewsDeleteOne);


module.exports = router;
