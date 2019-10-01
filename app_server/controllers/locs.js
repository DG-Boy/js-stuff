/* Получаем (GET) домашнюю страницу */
module.exports.homelist = function (req, res) {
  res.render('homelist', { title: 'Главная' });
};

/* Получаем (GET) страницу с информацией о локации */
module.exports.locInfo = function (req, res) {
  res.render('locInfo', { title: 'Инофрмация о местоположении' });
};

/* Получаем (GET) страницу с для добавления отзыва */
module.exports.addReview = function (req, res) {
  res.render('addReview', { title: 'Добавление отзыва' });
};
