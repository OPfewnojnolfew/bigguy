$(function() {
    var $params = $('.J_param'), //参数 data-key value
        $confirmModal = $('.J_confirm'), //模态confirm
        $confirmModalTitle = $('.am-modal-hd', $confirmModal),
        $confirmModalContent = $('.am-modal-bd', $confirmModal),
        $multiCheckbox = $('th input[type="checkbox"]'), //多选
        $singleCheckbox = $('td input[type="checkbox"]'), //单选
        /**
         * 删除用户
         * @param  {[type]}   ids      [description]
         * @param  {Function} callback [description]
         * @return {[type]}            [description]
         */
        delUsers = function(ids, callback) {
            if (!ids) {
                notify.warn('未选择任何项');
                return;
            }
            $confirmModalContent.text('确定删除选中的用户吗?');
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
        },
        /**
         * 禁用用户
         * @param  {[type]}   ids      [description]
         * @param  {Function} callback [description]
         * @return {[type]}            [description]
         */
        banUsers = function(ids, callback) {
            if (!ids) {
                notify.warn('未选择任何项');
                return;
            }
            $confirmModalContent.text('确定禁用选中的用户吗?');
            $('.J_confirm').modal({
                onConfirm: function(options) {
                    $.post('', {
                        ids: ids
                    }).then(function(res) {
                        if (res.code == 200) {
                            notify.warn('禁用成功');
                            callback && callback();
                        } else {
                            notify.warn(res.message);
                        }
                    });
                },
                onCancel: function() {}
            });
        },
        /**
         * 启用用户
         * @param  {[type]}   ids      [description]
         * @param  {Function} callback [description]
         * @return {[type]}            [description]
         */
        startusingUsers = function(ids, callback) {
            if (!ids) {
                notify.warn('未选择任何项');
                return;
            }
            $confirmModalContent.text('确定启用选中的用户吗?');
            $('.J_confirm').modal({
                onConfirm: function(options) {
                    $.post('', {
                        ids: ids
                    }).then(function(res) {
                        if (res.code == 200) {
                            notify.warn('启用成功');
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
     * 初始化参数
     * @param  {[type]} 
     * @return {[type]}   [description]
     */
    // $params.each(function() {
    //     var $this = $(this),
    //         key = $(this).attr('name');
    //     key && $this.val(Toolkit.getParameterByName(key));
    // });
    /**
     * 单条删除
     * @param  {[type]} 
     * @return {[type]}   [description]
     */
    $('.J_single_del').on('click', function() {
        var $this = $(this),
            $tr = $this.closest('tr'),
            id = $tr.attr('data-id');
        delUsers(id, function() {
            location.href = location.href;
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
        delUsers(ids.join(','), function() {
            location.href = location.href;
        });
    });

    /************************************用户管理-待审核经纪人************************************/
    /**
     * 验证
     * @param  {[type]} 
     * @return {[type]}   [description]
     */
    $('.J_archive').on('click', function() {
        var $this = $(this),
            href = $this.attr('data-href'),
            id = $this.closest('tr').attr('data-id');
        if (href && id) {
            location.href = href + '?id=' + id;
        }
    });
    /************************************用户管理-审核经纪人************************************/
    var archiveId = $('.J_archive_id').val(),
        $archiveForm = $('.J_archive_form'),
        $archiveStatus = $('.J_archive_status');
    /**
     * 审核合格
     * @param  {[type]} 
     * @return {[type]}   [description]
     */
    $('.J_pass,.J_nopass').on('click', function() {
        $archiveStatus.val($(this).attr('data-status'));
        if (archiveId === '') {
            notify.warn('用户为空');
            return;
        }
        $archiveForm.ajaxSubmit({
            success: function(res) {
                if (res.code == 200) {
                    notify.success('审核成功');
                    location.href = '';
                } else {
                    notify.warn('审核失败');
                }
            }
        });
    });
    /************************************用户管理-已认证经纪人************************************/

    /**
     * 单条禁用
     * @param  {[type]} 
     * @return {[type]}   [description]
     */
    $('.J_single_ban').on('click', function() {
        var $this = $(this),
            $tr = $this.closest('tr'),
            id = $tr.attr('data-id');
        banUsers(id, function() {
            $('.J_status', $tr).html('<span class="am-badge am-badge-danger">禁用</span>');
            $this.addClass('am-hide');
            $this.siblings('.J_single_startusing').removeClass('am-hide');
        });
    });
    /**
     * 单条启用
     * @param  {[type]} 
     * @return {[type]}   [description]
     */
    $('.J_single_startusing').on('click', function() {
        var $this = $(this),
            $tr = $this.closest('tr'),
            id = $tr.attr('data-id');
        startusingUsers(id, function() {
            $('.J_status', $tr).html('<span class="am-badge am-badge-success">启用</span>');
            $this.addClass('am-hide');
            $this.siblings('.J_single_ban').removeClass('am-hide');
        });
    });
    /**
     * 详情
     * @param  {[type]} 
     * @return {[type]}   [description]
     */
    $('.J_detail').on('click', function() {
        var $this = $(this),
            href = $this.attr('data-href'),
            id = $this.closest('tr').attr('data-id');
        if (href && id) {
            location.href = href + '?id=' + id;
        }
    });
    /**
     * 选择年月查询
     * @param  {[type]} 
     * @return {[type]}   [description]
     */
    $('.J_year,.J_month').on('change', function() {
        $('.J_select_form').submit();
    });
});
