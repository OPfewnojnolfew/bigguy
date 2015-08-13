$(function() {
    var $modal = $('.J_moal'),
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
    $('.J_add').on('click', function() {
        $modalTitle.text(ADD);
        $submit.text(ADD);
        $modalForm[0].reset();
        $modal.modal();
    });
    $('.J_edit').on('click', function() {
        var $tr = $(this).closest('tr');
        $modalTitle.text(EDIT);
        $submit.text(EDIT);
        $('.J_modal_name').val($tr.attr('data-name'));
        $('.J_modal_id').val($tr.attr('data-id'));
        $modal.modal();
    });
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
    $('.J_set_pic').on('click', function() {
        var $this = $(this),
            href = $this.attr('data-href'),
            id = $this.closest('tr').attr('data-id');
        if (href && id) {
            location.href = href + '?id=' + id;
        }
    });
});
