$(function() {
    var $multiCheckbox = $('th input[type="checkbox"]'), //多选
        $singleCheckbox = $('td input[type="checkbox"]'), //单选
        rewardStatus = {
            on: {
                code: '1',
                name: '开启',
                className: 'toggle-on'
            }, //奖励开启
            off: {
                code: '0',
                name: '关闭',
                className: 'toggle-off'
            } //奖励关闭
        },
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
     * 编辑
     * @param  {[type]} 
     * @return {[type]}   [description]
     */
    $('.J_edit').on('click', function() {
        var $this = $(this),
            href = $this.attr('data-href'),
            id = $this.closest('tr').attr('data-id');
        if (href && id) {
            location.href = href + '?id=' + id;
        }
    });
    /**
     * 改变状态
     * @param  {[type]} 
     * @return {[type]}   [description]
     */
    $('.J_change_status').on('click', function() {
        var $this = $(this),
            status = $this.attr('data-status'),
            toggleStatus = status === rewardStatus.on.code ? rewardStatus.off : rewardStatus.on,
            id = $this.closest('tr').attr('data-id');
        $.post('', {
            id: id,
            status: toggleStatus.code
        }).then(function(res) {
            if (res.code == 200) {
                notify.warn(toggleStatus.code + '成功');
                $this.removeClass(function(i, classNames) {
                    return classNames.replace('J_change_status', '');
                }).addClass(toggleStatus.className).attr('data-status', toggleStatus.code);
            } else {
                notify.warn(toggleStatus.code + '失败');
            }
        });
    });
    /**
     * 提交添加编辑奖励
     * @param  {[type]} 
     * @return {[type]}   [description]
     */
    $('.J_submit').on('click', function() {
        var $rewardId = $('#reward-id'),
            $rewardName = $('#reward-name'),
            $rewardMoney = $('#reward-money'),
            $rewardDes = $('#reward-des'),
            $rewardRule = $('#reward-rule'),
            id = $rewardId.val(),
            name = $.trim($rewardName.val()),
            money = $.trim($rewardMoney.val()),
            des = $.trim($rewardDes.val()),
            rule = $.trim($rewardRule.val());
        if (name == '') {
            notify.warn('奖励名称不能为空');
            $rewardName.focus();
            return;
        }
        $('.J_reward_form').ajaxSubmit({
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
