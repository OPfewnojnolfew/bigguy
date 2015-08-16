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
        }),
        $modal = $('.J_moal'),
        $modalTitle = $('.am-modal-hd span'),
        $submit = $('.J_modal_submit'),
        $modalForm = $('.J_modal_form'),
        $multiCheckbox = $('th input[type="checkbox"]'), //多选
        $singleCheckbox = $('td input[type="checkbox"]'), //单选
        EDIT = '编辑',
        ADD = '添加',
        /**
         * 删除品牌
         * @param  {[type]}   ids      [description]
         * @param  {Function} callback [description]
         * @return {[type]}            [description]
         */
        del = function(ids, callback) {
            if (!ids) {
                notify.warn('未选择任何项');
                return;
            }
            $('.J_confirm').modal({
                onConfirm: function(options) {
                    $.post('', {
                        ids: ids
                    }).then(function(res) {
                        if (res.code == 200) {
                            notify.warn('删除成功');
                            callback && callback();
                        } else {
                            notify.warn(res.message);
                        }
                    });
                },
                onCancel: function() {}
            });
        };
    /**
     * 单条删除
     * @param  {[type]} 
     * @return {[type]}   [description]
     */
    $('.J_single_del').on('click', function() {
        var $this = $(this),
            $tr = $this.closest('tr'),
            id = $tr.attr('data-id');
        del(id, function() {
            $tr.remove();
        });
    });
    /**
     * 批量删除
     * @param  {[type]} 
     * @return {[type]}   [description]
     */
    $('.J_multi-del').on('click', function() {
        var ids = [];
        $singleCheckbox.each(function() {
            this.checked && ids.push($(this).closest('tr').attr('data-id'));
        });
        del(ids.join(','), function() {
            location.href = location.href;
        });
    });
    /**
     * 增添机型图片
     * @param  {[type]} 
     * @return {[type]}   [description]
     */
    $('.J_add').on('click', function() {
        $modalTitle.text(ADD);
        $submit.text(ADD);
        $modalForm[0].reset();
        imageUploadify.reset();
        $modal.modal();
    });
    /**
     * 编辑机型图片
     * @param  {[type]} 
     * @return {[type]}   [description]
     */
    $('.J_edit').on('click', function() {
        var $tr = $(this).closest('tr');
        $modalTitle.text(EDIT);
        $submit.text(EDIT);
        $('.J_modal_name').val($tr.attr('data-name'));
        $('.J_modal_id').val($tr.attr('data-id'));
        $('.J_isface')[0].checked = $tr.attr('data-isface') === '1' ? true : false;
        imageUploadify.set($tr.attr('data-imageid'), $tr.attr('data-imagepath'));
        $modal.modal();
    });
    /**
     * 提交
     * @param  {[type]} 
     * @return {[type]}   [description]
     */
    $submit.on('click', function() {
        var $name = $('.J_modal_name'),
            $id = $('.J_modal_id'),
            id = $id.val(),
            t = id ? EDIT : ADD,
            name = $.trim($name.val());
        if (name === '') {
            notify.warn('型号名称不能为空!');
            $name.focus();
            return;
        }
        var message = imageUploadify.get();
        if (message && (message = message.errorMessage)) {
            notify.warn(message);
            return;
        }
        $modalForm.ajaxSubmit({
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
