var mongoose = require('mongoose');
var Loc = mongoose.model('loc');

var sendJsonRes = function(res, status, content) {
	res.status(status);
	res.json(content);
};

var theEarth = (function() {
	var earthRadius = 6371;
	
	var getDistanceFromRads = function(rads) {
		return parseFloat(rads * earthRadius);
	};
	var getRadsFromDistance = function(distance) {
		return parseFloat(distance / earthRadius);
	};
	
	return {
		getDistanceFromRads : getDistanceFromRads,
		getRadsFromDistance : getRadsFromDistance
	};
})();

module.exports.locsListByDistance = function (req, res) {
	var lng = parseFloat(req.query.lng);
	var lat = parseFloat(req.query.lat);
	var maxdist = parseFloat(req.query.maxdist);

	if(!lng || !lat || !maxdist) {
		sendJsonRes(res, 404, {
			"message": "lng and lat query parameters are required"
		});
		return;
	}
	
	Loc.aggregate([{
			$geoNear: {
				near: { type: "Point", coordinates: [ lng, lat ] },
				spherical: true, 
				maxDistance: maxdist,
				distanceField: "dist.calculated"
			}
		}], 
		function(err, results) {
			if(err) {
				sendJsonRes(res, 404, err);
			} else {
				var locs = [];
				results.forEach(function(doc) {
					locs.push({
						distance: doc.dist.calculated,
						name: doc.name,
						address: doc.address,
						rating: doc.rating,
						facilities: doc.facilities,
						_id: doc._id
					});
				});
				sendJsonRes(res, 200, locs);
			}
		}
	);
};
module.exports.locsCreate = function (req, res) {
	Loc.create({
		name: req.body.name,
		address: req.body.address,
		facilities: req.body.facilities.split(","),
		coords: [
			parseFloat(req.body.lng),
			parseFloat(req.body.lat)
		],
		openingTimes: [
		{
			days: req.body.days1,
			opening: req.body.opening1,
			closing: req.body.closing1,
			closed: req.body.closed1
		}, {
			days: req.body.days2,
			opening: req.body.opening2,
			closing: req.body.closing2,
			closed: req.body.closed2
		}]
	}, function(err, loc) {
		if(err) {
			sendJsonRes(res, 400, err);
		} else {
			sendJsonRes(res, 201, loc);
		}
	}
	)
};
module.exports.locsReadOne = function (req, res) {
	if(req.params && req.params.locid) {
		Loc.findById(req.params.locid).exec(function(err, loc) {
			if(!loc) {
				sendJsonRes(res, 404, {
					"message": "Where is my loc?!"
				});
				return;
			} else if(err) {
				sendJsonRes(res, 404, err);
				return;
			}

			sendJsonRes(res, 200, loc);
		});
	} else {
		sendJsonRes(res, 404, {
			"message": "No locid in request!"
		});
	}
};
module.exports.locsUpdateOne = function (req, res) {
	if(!req.params.locid) {
		sendJsonRes(res, 404, {
			"message": "No found, locID is required!"
		});
		return;
	} else {
		// 1. Найти соответсвующий документ
		Loc
		.findById(req.params.locid)
		.select('-reviews -rating')
		.exec(
			function(err, loc) {
				if(!loc) {
					sendJsonRes(res, 404, {
						"message": "locID not found!"
					});
					return;
				} else if(err) {
					sendJsonRes(res, 400, err);
					return;
				}

				// 2. Выполнить какие-либо изменения экземпляра
				loc.name = req.body.name;
				loc.address = req.body.address;
				loc.facilities = req.body.facilities.split(",");
				loc.coords = [parseFloat(req.body.lng), parseFloat(req.body.lat)];
				loc.openingTimes = [{
						days: req.body.days1,
						opening: req.body.opening1,
						closing: req.body.closing1,
						closed: req.body.closed1
					}, {
						days: req.body.days2,
						opening: req.body.opening2,
						closing: req.body.closing2,
						closed: req.body.closed2
					}];

				// 3. Сохранить документ
				loc.save(function(err, loc) {
					// 4. Отправить JSON-ответ
					if(err) {
						sendJsonRes(res, 404, err);
					} else {
						sendJsonRes(res, 200, loc);
					}
				});
		});
	}
};
module.exports.locsDeleteOne = function (req, res) {
	var locid = req.params.locid;
	if(locid) {
		Loc
		.findByIdAndRemove(locid)
		.exec(
			function(err, loc) {
				if(err) {
					sendJsonRes(res, 404, err);
					return;
				}
				
				// Loc.remove(function(err, loc) {}); 

				sendJsonRes(res, 204, null);
		});
	} else {
		sendJsonRes(res, 404, {
			"message": "No locID"
		});
	}
};
