/**
 * Created by wanglei on 2016/12/18.
 */

var express = require('express');
var router = express.Router();
var AuthChecker  = require('../middlewares/AuthChecker');

router.get('/create', function (req, res, next) {
    AuthChecker(req, res, function () {
        res.render('topic/createTopic',{});
    });
});


module.exports = router;