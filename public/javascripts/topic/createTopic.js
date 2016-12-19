/**
 * Created by wanglei on 2016/12/19.
 */
//添加MarkDown编辑器
$(function () {
    //创建当前页面的全局编辑器
    Editor = editormd({
        id: "editormd",
        width: "100%",
        height: 540,
        path: "/editor-md/lib/"
    });
});

$('#commit').click(function () {
    var title = $('#title').val();
    if(title.length<=10){
        startTitleWarning('标题字数10字以上');
        return ;
    }
    var content = Editor.getMarkdown();
    if(!content|| content == ''){
        return;
    }
    var group = $('#group').val();
    $.ajax({
        url: '/topic/create',
        type: 'post',
        data: {
            title: title,
            group: group,
            content: content
        },
        dataType: 'json',
        success: function(data){
            if(data && data.code == 0){
                window.location = data.redirect;
            }
        }
    });
});

$('#title').focus(function () {
    clearTitleWarning();
});

function clearTitleWarning() {
    $('#title-warning').html('');
    $('#title-warning').css('display','none');
}

function startTitleWarning(text) {
    $('#title-warning').html(text);
    $('#title-warning').css('display','inline');
}
