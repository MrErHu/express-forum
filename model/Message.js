/**
 * Created by wanglei on 2016/12/11.
 * user_id: Schema.ObjectId 发送者id，非真实发送者id 引用User
 * friend_id: Schema.ObjectId 接受者id，非真实接受者id
 * sender_id: Schema.ObjectId 发送者id，真实的发送者id
 * receiver_id: Schema.ObjectId 接受者id，真实的接受者id
 * message_type: Number 消息类型1：普通消息 2：系统消息
 * message_content: String消息内容
 * send_time: Date 默认时间为当前消息创建时间
 * status: Number 消息状态 1：未读 2：已读 3：删除
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MessageSchema = new Schema({
    user_id: {type: Schema.ObjectId, ref:'User'},
    friend_id: {type: Schema.ObjectId, ref:'User'},
    sender_id: {type: Schema.ObjectId, ref:'User'},
    receiver_id: {type: Schema.ObjectId, ref:'User'},
    message_type: {type: Number, default: 1},
    message_content: String,
    send_time: {type: Date, default: Date.now},
    status: {type: Number, default: 1}
});

var Message = mongoose.model("Message", MessageSchema);

module.exports = Message;