/* Получаем (GET) домашнюю страницу */
module.exports.homelist = function (req, res) {
  res.render('locs-list', { 
    title: 'Loc8r - всегда покажет, что находится рядом ;)',
    pageHeader: {
      title: 'Loc8r',
      strapline: 'всегда покажет, что находится рядом ;)'

    },
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
  res.render('loc-info', { title: 'Информация о местоположении' });
};

/* Получаем (GET) страницу с для добавления отзыва */
module.exports.addReview = function (req, res) {
  res.render('add-review', { title: 'Добавление отзыва' });
};
