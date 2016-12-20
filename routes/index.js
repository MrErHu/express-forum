/**
 * Created by wanglei on 2016/11/16.
 */

var express = require('express');
var router = express.Router();
var userController = require('../controller/userController');
var topicController = require('../controller/topicController');
var tool = require('../controller/tool');
var renderLoginUser = tool.renderLoginUser;

router.get('/', function(req, res, next) {
  //返回初始数据
  var data = {
    title: 'JavaScript',
    userinfo: req.session.userinfo
  };
  //渲染当前登录用户
  renderLoginUser(req, data, function () {
    topicController.getTopicList(0,20,1,function (topicList) {
      data.topicList = topicList;
      res.render('index',data);
    })
  });
});


module.exports = router;