/**
 * Created by wanglei on 2016/12/11.
 */

/**
 * 查询用户是否登录
 * @param req
 * @param res
 * @param next
 * @constructor
 */
var AuthChecker = function (req, res, next) {
    console.log('权限检查........');
    var userinfo = req.session.userinfo;
    console.log('当前用户:'+JSON.stringify(userinfo));
    if(!userinfo){
        //用户没有登录
        res.redirect('/user/login');
    }else {
        //用户已经登录
        next();
    }
};

module.exports = AuthChecker;