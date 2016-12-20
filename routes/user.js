/**
 * Created by wanglei on 2016/11/16.
 */

var express = require('express');
var path = require('path');
var User = require('../model/User');
var userController  = require('../controller/userController');
var router = express.Router();
var AuthCheck = require('../middlewares/AuthChecker');
var tool = require('../controller/tool');
var renderLoginUser = tool.renderLoginUser;
/**
 * 渲染登录界面
 */
router.get('/login', function (req, res) {
   res.render('user/login',{
       title: 'JavaScript'
   });
});

/**
 * 登录请求的操作
 */
router.post('/login', function (req, res) {
    const username = req.body.username;
    const password = req.body.password;

    if(!username || !password){
        res.json({
            status: 'fail',
            message: '输入不合法'
        });
        return ;
    }
    //判别用户密码是否正确
    User.findOne({username: username},function (err,user) {
        if(err){
            res.json({
                status: 'fail',
                message: '服务器出错了'
            });
        }else {
            if(user && password == user.password){
                //密码正确
                req.session.userinfo = {
                    id: user._id,
                    username: user.username,
                    avatar: user.avatar,
                    email: user.email
                };
                res.json({
                    status: 'success',
                    message: 'ok'
                });
            }else{
                //密码错误
                res.json({
                    status: 'fail',
                    message: '密码错误'
                });
            }
        }
    });

});

/**
 * 渲染注册的界面
 */

router.get('/register', function (req, res) {
    res.render('user/register',{});
});

/**
 * 注册进行的操作
 */
router.post('/register', function (req, res, next) {
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;

    if(!username && !password){
        res.json({
            status: 'fail',
            message: '输入信息不合法'
        });
    }
    userController.registerUser({
        username:username,
        password:password,
        email: email
    },function (err,item) {
        if(err){
            console.log(JSON.stringify(err));
            res.json({
                status: 'fail',
                message: '服务器出错了'
            });
        }else {
            console.log('注册新用户:' + username);
            res.json({
                status: 'success',
                message: ''
            });
        }
    })
});
/**
 * 查询是否存在对应的用户名
 */
router.post('/checkUsername',function (req, res, next) {
    const username = req.body.username;
    userController.queryUsernameNum(username,function (data) {
        if(data == 0){
            res.json({'status': 'nouser'});
        }else{
            res.json({'status': 'hasuser'});
        }
    });
});

/**
 * 查询邮箱是否已经注册
 */
router.post('/checkUseremail', function (req, res, next) {
    const email = req.body.email;
    console.log(email+' : '+userController.createUserAvatar(email));
    userController.queryUserByEmail(email,function (user) {
        if(!!user){
            res.json({
                code: -1
            });
        }else{
            res.json({
                code: 0
            });
        }
    });
});

/**
 * 退出登录
 */
router.get('/signout',function (req, res, next) {
    req.session.destroy(function (err) {
        if(err){
            console.log('退出出错');
            res.json({
                status: 'fail',
                message: '服务器出错了'
            });
        }else{
            //成功退出，重定向到首页
            res.redirect('/');
        }
    });

});

/**
 * 渲染设置当前登录用户的信息的页面
 */
router.get('/setting', function (req, res, next) {
    var userinfo = req.session.userinfo;
    var data = {
        title: 'JavaScript',
        userinfo: userinfo
    };
    AuthCheck(req, res, function () {
        renderLoginUser(req, data, function (data) {
            var id = userinfo && userinfo.id;
            userController.queryUserById(id, function (user) {
                data.user = user;
                res.render('user/setting', data);
            });
        });
    });
});





module.exports = router;