var mongoose = require('mongoose');
var loc = mongoose.model('loc');

var sendJsonRes = function(res, status, content) {
    res.status(status);
    res.json(content);
}

module.exports.locsListByDistance = function (req, res) {
    sendJsonRes(res, 200, {"status": "success"});
};
module.exports.locsCreate = function (req, res) {
    sendJsonRes(res, 200, {"status": "success"});
};
module.exports.locsReadOne = function (req, res) {
    if(req.params && req.params.locid) {
        loc.findById(req.params.locid).exec(function(err, loc) {
            if(!loc) {
                sendJsonRes(res, 404, {
                    "message": "fuck you!"
                });
                return;
            } else if(err) {
                sendJsonRes(res, 404, err);
                return;
            }

            sendJsonRes(res, 200, loc);
        });
    } else {
        sendJsonRes(res, 404, {
            "message": "No locid in request!"
        });
    }
};
module.exports.locsUpdateOne = function (req, res) {
    sendJsonRes(res, 200, {"status": "success"});
};
module.exports.locsDeleteOne = function (req, res) {
    sendJsonRes(res, 200, {"status": "success"});
};
