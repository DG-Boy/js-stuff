/* Получаем (GET) страницу "О нас" */
module.exports.about = function (req, res) {
    res.render('general-text', { 
      title: 'О нашем Loc8r',
      content: 'Loc8r создан для помощи людям, ищущих помощь. \nТра-ля-ля, тру-лю-люм. YEAH!'
    });
  };
