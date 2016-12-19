/**
 * Created by wanglei on 2016/12/11.
 */
var userController = require('./userController');

//根据用户是否登录来获取用户的登录信息
module.exports.renderLoginUser = function (req, data, callback) {
    if (req.session && req.session.userinfo) {
        const id = req.session.userinfo.id;
        userController.queryUserById(id, function (user) {
            data.user = user;
            callback(data);
        });
    } else {
        callback(data);
    }
};

