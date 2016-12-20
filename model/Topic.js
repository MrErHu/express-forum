/**
 * Created by wanglei on 2016/12/13.
 * 数据结构字段说明 帖子
 * title String 标题
 * group Number 所属论坛分类 1->论坛  2->问答  3->问答
 * author ObjectId 帖子作者
 * createdAt Date 创建时间
 * updateAt Date 更新时间(指操作帖子的时间)
 * watchdeNum Number 帖子创建时间
 * favUser Array 收藏的用户
 * content 内容
 * comment Array 评论
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TopicSchema = new Schema({
    title: {type: String},
    group: {type: Number, index: true},
    author: {type: Schema.ObjectId, ref:'User'},
    createdAt: {type: Date, default: Date.now},
    updateAt: {type: Date, default: Date},
    watchedNum: {type: Number, default: 0},
    favUser: [{type: Schema.ObjectId, ref:'User'}],
    comment: [{type: Schema.ObjectId, ref:'Comment'}],
    content: {type: String}
});

var Topic = mongoose.model('Topic', TopicSchema);
module.exports = Topic;