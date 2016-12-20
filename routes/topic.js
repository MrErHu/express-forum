/**
 * Created by wanglei on 2016/12/18.
 */

var express = require('express');
var router = express.Router();
var AuthChecker  = require('../middlewares/AuthChecker');
var topicController = require('../controller/topicController');
var tool = require('../controller/tool');
var renderLoginUser = tool.renderLoginUser;

router.get('/create', function (req, res, next) {
    AuthChecker(req, res, function () {
        var data = {
            title: 'JavaScript',
            userinfo: req.session.userinfo
        };
        renderLoginUser(req, data, function (data) {
            //返回初始数据
            res.render('topic/createTopic',data);
        });
    });
});

router.post('/create', function (req, res, next) {
    AuthChecker(req, res, function () {
        var data = {
            userinfo: req.session.userinfo
        }
        renderLoginUser(req, data, function (data) {
            var content = req.body.content;
            var title = req.body.title;
            var group = req.body.group;
            if(!group || !content || title.length<=10){
                res.json({
                    code: -1
                });
                return ;
            }
            topicController.createTopic(title, group, data.user, content,
            function (result) {
                if(result){
                    res.json({
                        code: 0,
                        redirect: '/'
                    });
                }else{
                    res.json({
                        code: -1,
                    });
                }
            });
        });
    });
});


router.get('/:topicId',function (req, res, next) {
    var topicId = req.params.topicId;
    var data = {
        title: 'JavaScript',
        userinfo: req.session.userinfo
    };
    //渲染当前登录用户
    renderLoginUser(req, data, function (data) {
        topicController.getTopic(topicId, function (topic) {
            data.topic = topic;
            console.log(JSON.stringify(data));
            res.render('topic/topic',data);
        });
    });
});

module.exports = router;