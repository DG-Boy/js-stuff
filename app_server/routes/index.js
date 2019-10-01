var express = require('express');
var ctrlMain = require('../controllers/main')
var router = express.Router();

/* GET home page. */
router.get('/', ctrlMain.index);

router.get('/image', function(req, res) {
    res.sendFile(__dirname + "/ambal.png");
});

router.get('/gimme', function(req, res) {
    res.sendFile(__dirname + "/rezume.html");
    res.sendFile(__dirname + "/style.css");
});

module.exports = router;
