$(function() {
    /**
    *
    * 图片默认参数，可传入自定义{
           buttonClass: '',
           width: 120,
           height: 32,
           previewWidth: 100,//预览图片宽
           previewHeight: 80,//预览图片高
           buttonText: '上传图片',
           fileFormat: '*.gif; *.jpg; *.png; *.jpeg;',
           uploadLimit: 999,
           sizeLimit: '5MB',
           multi: false,
           removeTimeout: 0,
           swf: 'assets/js/uploadify/uploadify.swf',
           uploader: '',
           queueID: '01234556789',
           defaultID: '',
           defaultPath: '',
           fieldFormat: {   //删除图片id字段名称和路径名称
               uploadedImageId: 'id',//上传成功后台返回的图片ID字段名称
               uploadedImagePath: 'src',//上传成功后台返回的图片路径字段名称
               formImageId:'id',//提交form表单的图片ID字段名称
               formImagePath:'id'//提交form表单的图片路径字段名称
           }
    * @type {[type]}
    */
    var imageUploadify = $('.J_upload_container').imageUploadify({
        previewWidth: 120,
        previewHeight: 80,
        fieldFormat: {
            uploadedImageId: 'yourselfiamgeid',
            uploadedImagePath: 'yourselfiamgesrc'
        }
    });
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
