/**
 * Created by wanglei on 2016/12/11.
 */
$(document).ready(function () {
    $('#sendMessage').click(function () {
        var content = $('#message-content').val();
        var sendUser = $('#send-to-user').val();
        if(!content || !sendUser){
            $('#has-null').css('display','inline');
            return ;
        }
        $.ajax({
            url: '/message',
            type: 'post',
            dataType: 'json',
            data: {
                content: content,
                sendUser: sendUser
            },
            success: function () {

            }
        });
    });

    $('#send-to-user').blur(function () {
        /**
         * 判断该用户名是否存在
         */
        var username = $('#send-to-user').val();
        if (!username) {
            return;
        }
        $.ajax({
            url: '/user/checkUsername',
            type: 'post',
            dataType: 'json',
            data: {
                username: username
            },
            success: function (data) {
                if (data && data.status == 'nouser') {
                    //用户名暂时没有被注册
                    $('#no-user').css('display','inline');
                    $('#sendMessage').attr('disabled',true);
                }
            }
        });
    });

    $('#message-content').focus(function () {

        $('#has-null').css('display','none');
        $('#sendMessage').attr('disabled',false);
    });

    $('#send-to-user').focus(function () {
        $('#no-user').css('display','none');
        $('#has-null').css('display','none');
        $('#sendMessage').attr('disabled',false);
    });
});