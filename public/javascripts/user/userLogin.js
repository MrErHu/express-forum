/**
 * Created by mr_wang on 2016/12/4.
 */
$(document).ready(function () {

    $('#username').blur(function () {
        var username = $('#username').val();
        if(!username){
            $('#username-tip-nofill').css('display','block');
            $('#login-btn').attr('disabled',true);
            return ;
        }
        $.ajax({
            url: '/user/checkUsername',
            type: 'post',
            data: {
                username: username
            },
            dataType: 'json',
            success: function (data) {
                if(data && data.status == 'nouser'){
                    $('#username-tip-nouser').css('display','block');
                    $('#login-btn').attr('disabled',true);
                }else{
                    $('#username-tip-nouser').css('display','none');
                    $('#login-btn').attr('disabled',false);
                }
            }
        });
    });

    $('#username').focus(function () {
        $('#username-tip-nofill').css('display','none');
        $('#username-tip-nouser').css('display','none');
        $('#server-message').css('display','none');
        $('#login-btn').attr('disabled',false);
    });

    $('#login-btn').click(function () {
        var username = $('#username').val();
        var password = $('#password').val();
        if(username && password){
            //Restful 登录相当于创建新的session信息
            //使用post方法
            $.ajax({
                url: '/user/login',
                type: 'post',
                data: {
                    username: username,
                    password: password
                },
                dataType: 'json',
                success: function (data) {
                    if(data.status == 'success'){
                        window.location = '/';
                    }else{
                        //登录出错
                        $('#server-message').css('display','block');
                        $('#server-message span').html(data.message);
                    }
                }
            });
        }
    });
});