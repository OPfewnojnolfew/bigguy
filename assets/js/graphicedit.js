$(function() {
    //初始化图片上传
    var imageUploadify = $('.J_upload_container').imageUploadify();
    /**
     * 提交
     * @param  {[type]} 
     * @return {[type]}   [description]
     */
    $('.J_graphic_submit').on('click', function() {
        var $title = $('#graphic-title'),
            $id = $('#graphic_id'),
            id = $id.val(),
            t = id ? '编辑' : '添加',
            title = $.trim($title.val());
        if (title === '') {
            notify.warn('标题不能为空!');
            $title.focus();
            return;
        }
        var message = imageUploadify.get();
        if (message && (message = message.errorMessage)) {
            notify.warn(message);
            return;
        }
        $('.J_graphic_form').ajaxSubmit({
            success: function(res) {
                if (res.code == 200) {
                    notify.success(t + '成功');
                    location.href = '';
                } else {
                    notify.warn(t + '失败');
                }
            }
        });
    });
});
