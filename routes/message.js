/**
 * Created by wanglei on 2016/12/11.
 */
var express = require('express');
var router = express.Router();

var AuthChecker = require('../middlewares/AuthChecker');
router.use(AuthChecker);

router.get('/', function (req, res, next) {
    var data = {};
    if(req.session.userinfo){
        data.userinfo = req.session.userinfo;
    }
    res.render('message/message', data);
});


module.exports = router;