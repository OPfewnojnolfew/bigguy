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
    $('.J_detail').on('click', function() {
        var $this = $(this),
            href = $this.attr('data-href'),
            id = $this.closest('tr').attr('data-id');
        if (href && id) {
            location.href = href + '?id=' + id;
        }
    });
    /************************************用户管理-已认证经纪人-提供车源************************************/
    var $selectForm = $('.J_select_form'),
        $year = $('.J_year'),
        $month = $('.J_month');

    $year.on('change', function() {
        $selectForm.submit();
    });
    $month.on('change', function() {
        $selectForm.submit();
    });
    /************************************用户管理-已认证经纪人-提供车源************************************/
    $('.J_edit_user').on('click', function() {
        var $this = $(this),
            href = $this.attr('data-href'),
            id = $this.closest('tr').attr('data-id');
        if (href && id) {
            location.href = href + '?id=' + id;
        }
    });
    /************************************用户管理-已认证经纪人-新增编辑管理员************************************/
    $('.J_user_submit').on('click', function() {
        var $username = $('#user-name'),
            $userPass = $('#user-password'),
            $usertruename = $('#user-truename'),
            id = $('#user_id').val(),
            t = id ? '编辑' : '新增',
            username = $.trim($username.val()),
            userPass = $.trim($userPass.val()),
            usertruename = $.trim($usertruename.val());
        if (!(/^(0|86|17951)?(13[0-9]|15[012356789]|18[0-9]|14[57])[0-9]{8}$/.test(username) && username.length)) {
            notify.warn('手机号不符合规定！');
            $username.focus();
            return false;
        }
        if (!(/^[\w]{6,10}$/.test(userPass))) {
            notify.warn('密码应为6-10字母数字构成');
            $userPass.focus();
            return false;
        }
        $('.J_user_form').ajaxSubmit({
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
