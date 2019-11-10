var request = require('request');

var apiOptions = {
	server: "http://localhost:3000"
};
if(process.env.NODE_ENV === 'production') {
	apiOptions.server = 'https://loc8r-dgboy.herokuapp.com/'
}


var _formatDistance = function (distance) {
	var numDistance, unit;
	if(distance > 1000) {
		numDistance = parseFloat(distance).toFixed(1);
		unit = 'km';
	} else {
		numDistance = parseInt(distance);
		unit = 'm';
	}

	return numDistance + " " + unit;
}
var _showError= function (req, res, status) {
  var title, content;
  if(status == 404) {
	title = "404. Страница не найдена!";
	content = "Мы не можем найти эту страницу... :с";
  } else {
	title = status + ". Неизвестная ошибка!";
	content = "Мы не знаем шо происходит... :3";
  }
  res.status(status);
  res.render('generic-text',  {
	title: title,
	content: content
  })
}


var renderHomepage = function(req, res, data) {
	var message;
	if(!(data instanceof Array)) {
		message = "API lookup error";
		data = [];
	} else {
		if(!data.length) {
			message = "Рядом никаких интересных мест :(";
		}
	}
	res.render('locs-list', { 
		title: 'Loc8r - всегда покажет, что находится рядом ;)',
		pageHeader: {
			title: 'Loc8r',
			strapline: 'всегда покажет, что находится рядом ;)'
		},
		sidebar: "Always here",
		locs: data,
		message: message
	});
};
var renderLocInfo = function(req, res, data) {
	res.render('loc-info', { 
		title: data.name,
		pageHeader: {title: data.name},
		sidebar: {
			context: 'Sugar? Yeaah, gimme some, gimme dome, i\'ma smoke some',
			callToAction: 'Let\'s get it!'
		},
		loc: data
	});
};
var renderReviewForm = function(req, res, data) {
	res.render('loc-review-form', { 
		title: 'Добавление отзыва к "' + data.name + '" на Loc8r',
		pageHeader: {title: 'Отзыв к "' + data.name + '"'},
		error: req.query.err
	});
};

var getLocInfo = function (req, res, callback) {
  var requestOptions, path;
	path = '/api/locs/' + req.params.locid;

	requestOptions = {
		url: apiOptions.server + path,
		method: "GET",
		json: {}
	};

	request(requestOptions, function(err, res2, body) {
		if(res2.statusCode === 200) {
			var data = body;
			data.coords = {
				lng: body.coords[0],
				lat: body.coords[1]
			};
			callback(req, res, data);
		} else {
	  _showError(req, res, res2.statusCode);
	}
	});
}


/* Получаем (GET) домашнюю страницу */
module.exports.homelist = function (req, res) {
	var requestOptions, path;
	path = '/api/locs';

	requestOptions = {
		url: apiOptions.server + path,
		method: "GET",
		json: {},
		qs: {
			lng: 56.302498,
			lat: 43.987241,
			maxdist: 5000
		}
	};

	request(requestOptions, function(err, res2, body) {
		var data = body;
		if(res2.statusCode === 200 && data.length) {
			for(var i = 0; i < data.length; i++) {
				data[i].distance = _formatDistance(data[i].distance);
			}
		}

		renderHomepage(req, res, data);
	});
};
/* Получаем (GET) страницу с информацией о локации */
module.exports.locInfo = function (req, res) {
	getLocInfo(req, res, function (req, res, resData) {
	renderLocInfo(req, res, resData);
  });
};
/* Получаем (GET) страницу с для добавления отзыва */
module.exports.addReview = function (req, res) {
	getLocInfo(req, res, function (req, res, resData) {
	  renderReviewForm(req, res, resData);
  });
};
/* Получаем (GET) страницу с для добавления отзыва */
module.exports.doAddReview = function (req, res) {
	var requestOptions, path, locid, postdata;
  locid = req.params.locid;
  path = '/api/locs/' + locid + '/reviews';
  
  postdata = {
		author: req.body.name,
		rating: parseInt(req.body.rating, 10),
		reviewText: req.body.review
	};

	requestOptions = {
		url: apiOptions.server + path,
		method: "POST",
		json: postdata
	};

	if(!postdata.author || !postdata.rating || !postdata.reviewText) {
		res.redirect('/loc/' + locid + '/reviews/new?err=val');
	} else {
		request(requestOptions, function(err, res2, body) {
			if(res2.statusCode === 201) {
				res.redirect('/loc/' + locid);
			} else if(res2.statusCode === 400 && body.name && body.name === "ValidationError") {
				res.redirect('/loc/' + locid + '/reviews/new?err=val');
			} else {
				console.log(body);
				_showError(req, res, res2.statusCode);
			}
		});
	}
};
