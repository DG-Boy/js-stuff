var mongoose = require('mongoose');
var loc = mongoose.model('loc');

var sendJsonRes = function(res, status, content) {
	res.status(status);
	res.json(content);
}

module.exports.reviewsCreate = function (req, res) {
	sendJsonRes(res, 200, {"status": "success"});
};
module.exports.reviewsReadOne = function (req, res) {
	if(req.params && req.params.locid && req.params.reviewid) {
		loc
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
	sendJsonRes(res, 200, {"status": "success"});
};
module.exports.reviewsDeleteOne = function (req, res) {
	sendJsonRes(res, 200, {"status": "success"});
};
