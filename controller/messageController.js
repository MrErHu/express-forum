/**
 * Created by wanglei on 2016/12/11.
 */

var Message = require('../model/Message');

/**
 * 发送私信方法
 * @param sender 发送人ID
 * @param receiver 接受人ID
 * @param mesType 消息类型 1->普通消息 2->系统消息
 * @param message 私信内容
 */
module.exports.sendMessage = function (sender,receiver,mesType,message,callback) {
    if(!sender || !receiver || !mesType || !message) {
        //过滤掉无效信息
        return callback(false);
    }else{
        //创建第一个消息数据
        Message.create({
            user_id: sender,
            friend_id: receiver,
            sender_id: sender,
            receiver_id: receiver,
            message_type: Message.commonMes,
            message_content: message,
        },function (err) {
            if(err){
                console.log(err);
                return callback(false);
            }else {
                Message.create({
                    user_id: receiver,
                    friend_id: sender,
                    sender_id: sender,
                    receiver_id: receiver,
                    message_type: Message.commonMes,
                    message_content: message,
                },function (err) {
                    if(err){
                        console.log(err);
                    }else {
                        callback(true);
                    }
                });
            }
        });
    }
};


module.exports.getUnreaderMessageNum = function (userid, callback) {
    Message.count({
        receiver_id: userid,
        friend_id: userid,
        status: 1
    },function (err,num) {
        if (err) {
            console.log(err);
            return callback(0);
        }else{
            return callback(num)
        }
    });
};


module.exports.getUnreaderMessage = function (userid, callback) {

};

module.exports.commonMes = 1;
module.exports.sysMes = 2;
