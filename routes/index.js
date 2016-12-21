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
  var tag = req.query.tag;
  if(!tag){
    //若不存在tag,则默认为1
    tag = 1;
  }
  //返回初始数据
  var data = {
    title: 'JavaScript',
    userinfo: req.session.userinfo,
    tag: tag
  };
  //渲染当前登录用户
  renderLoginUser(req, data, function (data) {
    topicController.getTopicList(0,20,parseInt(tag),function (topicList) {
      data.topicList = topicList;
      userController.getUserCreditTop(function (userCreditList) {
        data.userCreditList = userCreditList;
        res.render('index',data);
      });
    });
  });
});


module.exports = router;