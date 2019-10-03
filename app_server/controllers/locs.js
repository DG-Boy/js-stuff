/* Получаем (GET) домашнюю страницу */
module.exports.homelist = function (req, res) {
  res.render('locs-list', { title: 'Главная' });
};

/* Получаем (GET) страницу с информацией о локации */
module.exports.locInfo = function (req, res) {
  res.render('loc-info', { title: 'Информация о местоположении' });
};

/* Получаем (GET) страницу с для добавления отзыва */
module.exports.addReview = function (req, res) {
  res.render('add-review', { title: 'Добавление отзыва' });
};
