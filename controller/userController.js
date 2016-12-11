/**
 * Created by mr_wang on 2016/11/17.
 */

var User = require('../model/User');
var userController = {};

userController.registerUser = function (userModel, callback) {
    User.create(userModel,function (err,item) {
        if(err){
            console.log(err);
        }
        callback(err,item);
    });
};

userController.queryUsernameNum = function (username, callback) {
    User.count({username:username},function (err,data) {
        if(err){
            console.error(err);
        }else{
            return callback(data);
        }
    });
}


module.exports = userController;