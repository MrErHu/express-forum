/**
 * Created by wanglei on 2016/12/4.
 */
$(document).ready(function () {

    /**
     * 判断该用户名是否已经注册
     */
    $('#username').blur(function () {
        //判断该用户名是否已经被注册过
        var username = $('#username').val();
        if(!username){
            return ;
        }
        $.ajax({
            url: '/user/checkUsername',
            type: 'post',
            dataType: 'json',
            data:{
                username:username
            },
            success: function (data) {
                if(data && data.status == 'nouser'){
                    //用户名暂时没有被注册
                }else {
                    //用户名已经被注册
                    $('#username-tip').css('display','block');
                    $('#register-btn').attr('disabled','true');
                }
            }
        });
    });

    $('#username').focus(function () {
        $('#username-tip').css('display','none');
        $('#register-btn').attr('disabled',false);
    });

    /**
     * 判断两次输入的密码是否一致
     */
    $('#repassword').blur(function () {
        //判断两次的密码是否一致
        var password = $('#password').val();
        var repassword = $('#repassword').val();
        if (password != repassword) {
            //如果两次输入的密码不一致，第二次显示的密码框是红色
            //给出提示，两次密码不一致
            $('#register-btn').attr('disabled', true);
            $('#repassword-tip').css('display', 'inline');
        } else {
            $('#register-btn').attr('disabled', false);
            $('#repassword-tip').css('display', 'none');
        }
    });

    /**
     * 清除提示效果
     */
    $('#repassword').focus(function () {
        $('#register-btn').attr('disabled', false);
        $('#repassword-tip').css('display', 'none');
    });


    /**
     * 提交按钮
     */
    $('#register-btn').click(function () {
        var username = $('#username').val();
        var password = $('#password').val();
        if(username && password){
            //提交表单
            $.ajax({
                url: '/user/register ',
                type: 'post',
                dataType: 'json',
                data: {
                    username: username,
                    password: password
                },
                success: function (data) {
                    if(data && data.status && data.status == 'success'){
                        window.location= '/user/login';
                    }
                    else {
                        alert('注册出错啦');
                    }
                }
            });
        }
    });



});




