/**
 * Created by wanglei on 2016/11/16.
 */

var express = require('express');
var router = express.Router();
var userController = require('../controller/userController');

router.get('/', function(req, res, next) {
  //返回初始数据
  var data = {
    title: 'JavaScript',
    userinfo: req.session.userinfo
  };
  //渲染当前登录用户
  renderLoginUser(req, data, function () {
    res.render('index',data);
  });
});



//根据用户是否登录来获取用户的登录信息
function renderLoginUser(req, data, callback) {
  if (req.session && req.session.userinfo) {
    const id = req.session.userinfo.id;
    userController.queryUserById(id, function (user) {
      data.user = user;
      callback(data);
    });
  } else {
    callback(data);
  }
}

module.exports = router;