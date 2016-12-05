/**
 * Created by mr_wang on 2016/11/16.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    username: {type: String, unique: true},
    password: String,
    avatar: String,
    profile: String,
    credit: Number, //积分
    email: {type: String, unique: true},
    phone: String,
    createdAt: {type:Date, default:Date.now }
});

var User = mongoose.model("User", UserSchema);

module.exports = User;