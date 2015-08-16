$(function() {
    var $confirmModal = $('.J_confirm'), //模态confirm
        $multiCheckbox = $('th input[type="checkbox"]'), //多选
        $singleCheckbox = $('td input[type="checkbox"]'), //单选
        /**
         * 删除管理员
         * @param  {[type]}   ids      [description]
         * @param  {Function} callback [description]
         * @return {[type]}            [description]
         */
        delUsers = function(ids, callback) {
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
    /**
     * 编辑管理员
     * @param  {[type]} 
     * @return {[type]}   [description]
     */
    $('.J_edit_user').on('click', function() {
        var $this = $(this),
            href = $this.attr('data-href'),
            id = $this.closest('tr').attr('data-id');
        if (href && id) {
            location.href = href + '?id=' + id;
        }
    });
    /**
     * 提交编辑新增
     * @param  {[type]} 
     * @return {[type]}   [description]
     */
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
