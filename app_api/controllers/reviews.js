var mongoose = require('mongoose');
var Loc = mongoose.model('loc');

var sendJsonRes = function(res, status, content) {
	res.status(status);
	res.json(content);
}
var addReview = function(req, res, loc) {
	if(!loc) {
		sendJsonRes(res, 404, {
			"message" : "locID not found"
		});
	} else {
		loc.reviews.push({
			author: req.body.author,
			rating: req.body.rating,
			reviewText: req.body.reviewText
		});

		loc.save(function(err, loc) {
			var thisReview;
			if(err) {
				sendJsonRes(res, 400, err);
			} else {
				updateAverageRating(loc._id);
				thisReview = loc.review[loc.review.length - 1];
				sendJsonRes(res, 201, thisReview);
			}
		});
	}
};
var updateAverageRating = function(locid) {
	Loc
	.findById(locid)
	.select('rating reviews')
	.exec(
		function (err, locid) {
			if(!err) {
				setAverageRating(loc);
			}
		}
	);
};
var setAverageRating = function (loc) {
	var reviewCount, ratingAverage, ratingTotal;
	if(loc.review && loc.reviews.length > 0) {
		reviewCount = loc.review.length;
		ratingTotal = 0;

		for(var i = 0; i < reviewCount; i++) {
			ratingTotal += loc.review[i].rating;
		}
		ratingAverage = parseInt(ratingTotal / reviewCount, 10);
		loc.rating = ratingAverage;
		loc.save(function(err) {
			if(err) {
				console.log(err);
			} else {
				console.log("Average rating updated to ", ratingAverage0);
			}
		});
	}
};

module.exports.reviewsCreate = function (req, res) {
	var locid = req.params.locid;
	if(locid) {
		Loc
		.findById(locid)
		.select('reviews')
		.exec(function(err, loc) {
			if(err) {
				sendJsonRes(res, 400, err);
			} else {
				addReview(req, res, loc);
			}
		});
	} else {
		sendJsonRes(res, 404, {
			"message": "No found, locID required!"
		});
	}
};
module.exports.reviewsReadOne = function (req, res) {
	if(req.params && req.params.locid && req.params.reviewid) {
		Loc
		.findById(req.params.locid)
		.select('name reviews')
		.exec(function(err, loc) {
			var res2, review;
			if(!loc) {
				sendJsonRes(res, 404, {
					"message": "locID not found!"
				});
				return;
			} else if(err) {
				sendJsonRes(res, 404, err);
				return;
			}
			
			if(loc.reviews && loc.reviews.length > 0) {
				review = loc.reviews.id(req.params.reviewid);
				if(!review) {
					sendJsonRes(res, 404, {
						"message": "reviewID not found!"
					});
				} else {
					res2 = {
						loc : {
							name : loc.name,
							id : req.params.locid
						},
						review : review
					};
					sendJsonRes(res, 200, res2);
				}
			} else {
				sendJsonRes(res, 404, {
					"message": "No reviews found!"
				});
			}
		});
	} else {
		sendJsonRes(res, 404, {
			"message": "No found, locID and reviewID are both required!"
		});
	}
};
module.exports.reviewsUpdateOne = function (req, res) {
	if(!req.params.locid || !req.params.reviewid) {
		sendJsonRes(res, 404, {
			"message": "No found, locID and reviewID is both required!"
		});
		return;
	}

	//1. Найти соответсвующий документ
	//2. Найти соответсвующий поддокумент
	Loc
	.findById(req.params.locid)
	.select('reviews')
	.exec(
		function(err, loc) {
			var thisReview;
			if(!loc) {
				sendJsonRes(res, 404, {
					"message": "locID not found!"
				});
				return;
			} else if(err) {
				sendJsonRes(res, 400, err);
				return;
			}

			if(loc.reviews && loc.reviews.length > 0) {
				thisReview = loc.reviews.id(req.params.reviewid);
				if(!thisReview) {
					sendJsonRes(res, 404, {
						"message": "reviewid not found"
					});
				} else {
					//3. Выполнить какие-либо изменения экземпляра
					thisReview.author = req.body.author;
					thisReview.rating = req.body.rating;
					thisReview.reviewText = req.body.reviewText;

					//4. Сохранить документ
					loc.save(function(err, loc) {
						//5. Отправить JSON-ответ
						if(err) {
							sendJsonRes(res, 404, err);
						} else {
							updateAverageRating(loc._id);
							sendJsonRes(res, 200, thisReview);
						}
					});
				}
			} else {
				sendJsonRes(res, 404, {
					"message": "No review to update"
				});
			}
	});
};
module.exports.reviewsDeleteOne = function (req, res) {
	if(!req.params.locid || !req.params.reviewid) {
		sendJsonRes(res, 404, {
			"message": "No found, locID and reviewID is both required!"
		});
		return;
	}

	Loc
	.findById(req.params.locid)
	.select('reviews')
	.exec(
		function(err, loc) {
			if(!loc) {
				sendJsonRes(res, 404, {"message": "locID not found!"});
				return;
			} else if(err) {
				sendJsonRes(res, 400, err);
				return;
			}

			if(loc.reviews && loc.reviews.length > 0) {
				if(!loc.reviews.id(req.params.reviewid)) {
					sendJsonRes(res, 404, {"message": "reviewid not found"});
				} else {
					loc.reviews.id(req.params.reviewid).remove();
					loc.save(function(err) {
						if(err) {
							sendJsonRes(res, 404, err);
						} else {
							updateAverageRating(loc._id);
							sendJsonRes(res, 204, null);
						}
					});
				}
			} else {
				sendJsonRes(res, 404, {"message": "No review to update"});
			}
	});
};
