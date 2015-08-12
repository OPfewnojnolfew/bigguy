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
    $params.each(function() {
        var $this = $(this),
            key = $(this).attr('name');
        key && $this.val(Toolkit.getParameterByName(key));
    });
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
        delUsers(ids.join(','), function() {
            location.href = location.href;
        });
    });
    // $('.J_search_btn').on('click', function() {
    //     var params = [];
    //     $params.each(function() {
    //         var $this = $(this);
    //         params.push($this.attr('data-key') + '=' + $this.val());
    //     });
    //     params = '?' + params.join('&');
    //     location.href = location.href + params;

    // });

    /**
     * 全选
     * @param  {[type]} 
     * @return {[type]}   [description]
     */
    $multiCheckbox.on('change', function() {
        var mulitdom = this;
        $singleCheckbox.each(function() {
            this.checked = mulitdom.checked;
        });
    });
    /**
     * 单选
     * @param  {[type]} 
     * @return {[type]}   [description]
     */
    $singleCheckbox.on('change', function() {
        var isAllchecked = true;
        $singleCheckbox.each(function() {
            if (!this.checked) {
                isAllchecked = false;
                return false;
            }
        });
        $multiCheckbox[0].checked = isAllchecked;
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
    //审核类型  PASS通过，NOPASS不通过
    var AUDITTYPE = {
        PASS: 1,
        NOPASS: 0
    };
    /**
     * 审核合格
     * @param  {[type]} 
     * @return {[type]}   [description]
     */
    $('.J_pass').on('click', function() {
        $.post('', {
            type: AUDITTYPE.PASS
        }).then(function(res) {
            if (res == 200) {
                notify.success('审核成功');
                location.href = '';
            } else {
                notify.success('审核出错');
            }
        });
    });
    /**
     * 审核不合格
     * @param  {[type]} 
     * @return {[type]}   [description]
     */
    $('.J_nopass').on('click', function() {
        var reasonText = $('.J_reason').val();
        $.post('', {
            type: AUDITTYPE.NOPASS,
            reason: reasonText
        }).then(function() {
            if (res == 200) {
                notify.success('审核成功');
                location.href = '';
            } else {
                notify.success('审核出错');
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
});
