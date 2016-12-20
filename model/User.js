/**
 * Created by wanglei on 2016/11/16.
 * username String 用户名 唯一
 * password String 密码
 * avatar String 头像
 * profile String 个人简介
 * credit Number 个人积分
 * email String 邮箱
 * phone String 手机号码
 * createAt String 用户创建时间
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    username: {type: String, unique: true},
    password: String,
    avatar: {type:String, default:''},
    profile: {type:String, default:"这家伙很懒，什么个性签名都没有留下"},
    credit: {type: Number, default: 0}, //积分
    email: {type:String, unique: true},
    phone: String,
    createdAt: {type:Date, default:Date.now },
    github: {type: String, default:''},
    website:{type: String, default:''}
});

var User = mongoose.model("User", UserSchema);

module.exports = User;