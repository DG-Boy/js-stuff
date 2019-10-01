/* Получаем (GET) страницу "О нас" */
module.exports.about = function (req, res) {
    res.render('about', { title: 'О нас' });
  };
