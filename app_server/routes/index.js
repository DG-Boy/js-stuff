var express = require('express');
var ctrlMain = require('../controllers/main')
var router = express.Router();

const bodyParser = require("body-parser");
const parser = bodyParser.urlencoded({extended: false});

/* GET home page. */
router.get('/', ctrlMain.index);

router.get('/image', function(req, res) {
    res.sendFile(__dirname + "/ambal.png");
});


router.get('/css', parser, function(req, res) {
    res.sendFile(__dirname + "/style.css");
});

router.get('/gimme/html', parser, function(req, res) {
    res.sendFile(__dirname + "/rezume.html");
});

module.exports = router;
