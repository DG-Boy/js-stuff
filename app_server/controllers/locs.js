/* Получаем (GET) домашнюю страницу */
module.exports.homelist = function (req, res) {
  res.render('locs-list', { 
    title: 'Loc8r - всегда покажет, что находится рядом ;)',
    pageHeader: {
      title: 'Loc8r',
      strapline: 'всегда покажет, что находится рядом ;)'
    },
    sidebar: "Ехал Грека через реку",
    locs: [{
      name: 'Общага',
      address: 'ул. Студенческая, д.6/б',
      rating: '5',
      facilities: ['Вечно нет горячей воды ', 'Лидка', 'Обрыганная кухня every day'],
      distance: '0м'
    }, {
      name: 'НРТК',
      address: 'ул. Студенческая, д.6',
      rating: '4',
      facilities: ['Дудос', 'Токарь', 'Чёпа', 'Вадик', 'Дмитра', 'Поц'],
      distance: '10м'
    }, {
      name: 'Пятёрочка',
      address: 'пр. Гагарина',
      rating: '3',
      facilities: ['Где сырки!', 'Красная цена'],
      distance: '100м'
    }]
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
      coords: {lat: 43.987239, lng: 56.302408},  
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
