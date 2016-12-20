/**
 * Created by mr_wang on 2016/12/19.
 */
var Topic = require('../model/Topic');
var userController = require('../controller/userController');
var userStatic = require('../static/userStatic');
var tool = require('../controller/tool');
var moment = require('moment');

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

/**
 * 获得帖子的数组
 * @param startnum 获取帖子的起始书
 * @param count 获得帖子的总数目
 * @param group 获取帖子的群组
 * @param callback 回调函数
 */
module.exports.getTopicList = function (startnum, count, group, callback) {
    Topic.find({
        group: parseInt(group)
    }).sort({"updateAt": -1})
        .skip(parseInt(startnum))
        .limit(parseInt(count)).lean()
        .populate('author')
        .exec(function (err,data) {
        if(err){
            console.log(err);
            return callback(null);
        }else {
            data.forEach(function (topic) {
                topic.updateAtStr = tool.getRelativeTime(topic.updateAt);
            });
            callback(data);
        }
    });
};

/**
 * 获得某个帖子的信息
 * @param topicId 帖子的Id
 * @param callback 回调函数
 */
module.exports.getTopic = function (topicId, callback) {
    Topic.findOne({
        _id: topicId
    }).populate("author")
        .lean().exec(function (err, topic) {
        if (err) {
            console.log(err);
            callback(null);
        } else {
            increaseWatchNum(topicId, function (result) {
                topic.updateAtStr = tool.getRelativeTime(topic.updateAt);
                topic.createdAtStr = tool.getRelativeTime(topic.createdAt);
                callback(topic);
            });
        }
    });
};

/**
 * 增加某个帖子的点击数量
 * @param topicId 帖子Id
 * @param callback 回调函数
 */
function increaseWatchNum(topicId, callback) {
    Topic.update({
        _id: topicId
    },{
        "$inc":{"watchedNum": 1}
    },function (err) {
        if(err){
            console.log(err);
            return callback(false);
        }else {
            return callback(true);
        }
    })
};
