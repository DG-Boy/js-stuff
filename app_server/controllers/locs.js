var request = require('request');

var apiOptions = {
  server: "http://localhost:3000"
};
if(process.env.NODE_ENV === 'production') {
  apiOptions.server = 'https://loc8r-dgboy.herokuapp.com/'
}

var renderHomepage = function(req, res, resBody) {
  res.render('locs-list', { 
    title: 'Loc8r - всегда покажет, что находится рядом ;)',
    pageHeader: {
      title: 'Loc8r',
      strapline: 'всегда покажет, что находится рядом ;)'
    },
    sidebar: "Always here",
    locs: resBody

    //dorm    {lat: 43.987241, lng: 56.302498}
    //nrtk    {lat: 43.988464, lng: 56.302585}
    //5ka     {lat: 43.984070, lng: 56.303885}
  });
};

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
    for(var i = 0; i < data.length; i++) {
      data[i].distance = _formatDistance(data[i].distance);
    }

    renderHomepage(req, res, body);
  });
};

/* Получаем (GET) страницу с информацией о локации */
module.exports.locInfo = function (req, res) {
  res.render('loc-info', { 
    title: 'Общага',
    pageHeader: {title: 'Общага'},
    sidebar: {
      context: 'Sugar? Yeaah, gimme some, gimme dome, i\'ma smoke some',
      callToAction: 'Let\'s get it!'
    },
    loc: {
      name: 'Общага',
      address: 'ул.Студентческая, д.6/б',
      rating: 5,
      facilities: ['Вечно нет горячей воды ', 'Лидка', 'Обрыганная кухня every day'],
      coords: {lat: 43.987241, lng: 56.302498},
      openingTimes: [{
        days: 'Пн - Пт',
        opening: '7:00',
        closing: '21:00',
        closed: false
      }, {
        days: 'Сб',
        opening: '8:00',
        closing: '17:00',
        closed: false
      }, {
        days: 'Вс',
        closed: true
      }],
      reviews: [{
        author: 'DG Boy',
        rating: 5,
        timestamp: '08.10.2019',
        reviewText: 'Wow!'
      }, {
        author: 'Стики Фингер',
        rating: 4,
        timestamp: '03.10.2019',
        reviewText: 'Только finger щекочет мой ass!!!'
      }, {
        author: 'Егорка Ебоиийка',
        rating: 1,
        timestamp: '02.09.2019',
        reviewText: 'Непросто быть собой, когда шагает boy'
      }]
    }
  });
};

/* Получаем (GET) страницу с для добавления отзыва */
module.exports.addReview = function (req, res) {
  res.render('add-review', { 
    title: 'Добавление отзыва на Loc8r',
    pageHeader: {title: 'Добавление отзыва'},
  });
};
