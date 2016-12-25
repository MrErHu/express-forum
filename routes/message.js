/**
 * Created by wanglei on 2016/12/11.
 */
var express = require('express');
var router = express.Router();
var tool = require('../controller/tool');
var renderLoginUser = tool.renderLoginUser;
var userController = require('../controller/userController');
var messageController = require('../controller/messageController');

var AuthChecker = require('../middlewares/AuthChecker');
router.use(AuthChecker);

router.get('/', function (req, res, next) {
    var data = {
        title: 'JavaScript',
        userinfo: req.session.userinfo,
    };
    //渲染当前登录用户
    renderLoginUser(req, data, function (data) {
        res.render('message/message', data);
    });
});

router.post('/', function (req, res, next) {
    renderLoginData(req, res, function (data) {
        var sendUser = req.body.sendUser;
        var content = req.body.content;
        //查询发送用户的当前信息
        userController.queryUserByName(sendUser,function (sendtoUser) {
            //发送私信，将信息存储在数据库
            messageController.sendMessage(data.id, sendtoUser._id,
                messageController.commonMes, content, function (result) {
                    if(result){
                        res.json({
                            code: 0
                        });
                    }else {
                        res.json({
                            code: -1
                        });
                    }
                });
        });
    });
});


function renderLoginData(req, res, next){
    var data = {};
    Object.assign(data, req.session.userinfo);
    next(data);
}


module.exports = router;