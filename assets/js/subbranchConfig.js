$(function() {
    var $subbranchModal = $('.J_subbranch_moal'),
        $subbranchModalTitle = $('.am-modal-hd span'),
        $subbranchSubmit = $('.J_subbranch_submit'),
        $subbranchForm = $('.J_subbranch_form'),
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
        delSubBranchs = function(ids, callback) {
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
        delSubBranchs(id, function() {
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
        delSubBranchs(ids.join(','), function() {
            location.href = location.href;
        });
    });
    /**
     * 添加型号
     * @param  {[type]} 
     * @return {[type]}   [description]
     */
    $('.J_add_subbranch').on('click', function() {
        $subbranchModalTitle.text(ADD);
        $subbranchSubmit.text(ADD);
        $subbranchForm[0].reset();
        $subbranchModal.modal();
    });
    /**
     * 编辑型号
     * @param  {[type]} 
     * @return {[type]}   [description]
     */
    $('.J_subbranch_edit').on('click', function() {
        var $tr = $(this).closest('tr');
        $subbranchModalTitle.text(EDIT);
        $subbranchSubmit.text(EDIT);
        $('.J_subbranch_name').val($tr.attr('data-name'));
        $('.J_subbranch_id').val($tr.attr('data-id'));
        $subbranchModal.modal();
    });
    /**
     * 提交
     * @param  {[type]} 
     * @return {[type]}   [description]
     */
    $subbranchSubmit.on('click', function() {
        var $name = $('.J_subbranch_name'),
            $id = $('.J_subbranch_id'),
            id = $id.val(),
            t = id ? EDIT : ADD,
            name = $.trim($name.val());
        if (name === '') {
            notify.warn('型号名称不能为空!');
            $name.focus();
            return;
        }
        $subbranchForm.ajaxSubmit({
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
