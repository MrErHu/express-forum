/**
 * Created by mr_wang on 2016/11/17.
 */

var User = require('../model/User');
var userController = {};
var gravatar = require('gravatar');

userController.registerUser = function (userModel, callback) {
    const email = userModel.email;
    const avatar = userController.createUserAvatar(email);
    console.log(avatar);
    //增加头像
    userModel.avatar = avatar;
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
};

userController.queryUserByName = function (username, callback) {
    User.findOne({
        username: username
    },function (err, user) {
        if(err){
            console.log(err);
        }
        return callback(user);
    });
};

userController.queryUserById = function (id, callback) {
    User.findOne({
        _id: id
    },function (err, user) {
        if(err){
            console.log(err);
        }
        return callback(user);
    });
};

userController.queryUserByEmail = function (email, callback) {
    User.findOne({
        email: email
    },function (err, user) {
        if(err){
            console.log(err);
        }
        return callback(user);
    });
};

userController.createUserAvatar= function(email){
    if(!email){
        return;
    }
    var url = gravatar.url(email, {protocol: 'http', s: '100'});
    return url;
};



module.exports = userController;