/**
 * Created by wanglei on 2016/12/13.
 * 数据结构字段说明 评论
 * topic ObjectId 对应帖子Id
 * author ObjectId 对应评论的作者
 * group Number 对应所属群组：1->论坛  2->问答   3->作品
 * content String 回复的内容
 * status Number 贴子的状态 -1表示被删除 0表示正常
 * createdAt Date 创建时间
 * favNum 点赞数量
 * 
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CommentSchema = new Schema({
    topicId: {type: Schema.ObjectId, ref:'Topic',index: true},
    author: { type: Schema.ObjectId, ref: 'User'},
    group: {type: Number, default: 0, index: true},
    content: String,
    status: {type: Number, default: 0},
    createdAt: { type: Date, default: Date.now },
    favNum: {type:Number, default: 0}
});

var Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;