/**
 * Created by mr_wang on 2016/12/19.
 */
var Topic = require('../model/Topic');
var userController = require('../controller/userController');
var userStatic = require('../static/userStatic');

/**
 * 创建新的文章
 * @param title 文章题目
 * @param group 文章所属论坛
 * @param author 文章作者
 * @param content 文章内容
 * @param callback 回调函数
 */
module.exports.createTopic = function (title, group, author, content, callback) {
    Topic.create({
        title: title,
        group: group,
        author: author._id,
        content: content
    }, function (err, topic) {
        if (err) {
            console.log(err);
            return callback(false);
        } else {
            //为用户增加发帖的积分
            userController.addCredit(author._id, userStatic.topicCredit,
                function (result) {
                    callback(result);
                });
        }
    });
};

