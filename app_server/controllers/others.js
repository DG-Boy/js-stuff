/* Получаем (GET) страницу "О нас" */
module.exports.about = function (req, res) {
    res.render('general-text', { title: 'О нас' });
  };
