/**
 * Created by wanglei on 2016/12/21.
 */


$('#pwd-btn').click(function () {
    var old_pwd = $('#old_pwd').val();
    var pwd = $('#pwd').val();
    var re_pwd = $('#re_pwd').val();

    if(!old_pwd || !pwd || !re_pwd){
        $('#pwd-tip').css('display','inline');
        $('#pwd-tip').html('输入为空');
        return;
    }

    if(pwd !== re_pwd){
        $('#pwd-tip').css('display','inline');
        $('#pwd-tip').html('两次密码不一致');
        return;
    }

    $.ajax({
        url: '/user/changePwd',
        type: 'PUT',
        data: {
            old_pwd : old_pwd,
            pwd: pwd,
        },
        dataType: 'json',
        success: function(result){
            if(result && result.code == 0){
                window.location = '/user/login';
            }
            if(result && result.code !=0 && result.message){
                $('#pwd-tip').css('display','inline');
                $('#pwd-tip').html(result.message);
            }
        }
    });
});


$('#set-btn').click(function () {
    var email = $('#email').val();
    var github = $('#github').val();
    var website = $('#website').val();
    var profile = $('#profile').val();

    $.ajax({
        url: '/user',
        type: 'PUT',
        data: {
            email: email,
            github: github,
            website: website,
            profile: profile
        },
        dataType: 'json',
        success: function (result) {
            if(result && result.code == 0){
                window.location.reload();
            }else {
                $('#set-tip').css('display','inline');
                $('#set-tip').html(result.message);
            }
        }

    });
});




$('#old_pwd').focus(clearPwdTip);
$('#pwd').focus(clearPwdTip);
$('#re_pwd').focus(clearPwdTip);

function clearPwdTip() {
    $('#pwd-tip').css('display','none');
}