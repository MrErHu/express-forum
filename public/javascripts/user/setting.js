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
                $('#pwd-tip').html(message);
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