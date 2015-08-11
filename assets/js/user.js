$(function() {
    var $multiCheckbox = $('th input[type="checkbox"]'),
        $singleCheckbox = $('td input[type="checkbox"]'),
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
                    }, function() {
                        notify.warn('请求异常，请重试!');
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
    $('.J_search_btn').on('click', function() {
        // var $name = $('.J_search_name'),
        //     param = {},
        //     name = $.trim($name.val());
        // if (name === '') {
        //     notify.warn('请输入要搜索的名称');
        //     $name.focus();
        //     return;
        // }
        // param[$name.attr('data-key')] = name;
        var params = [];
        var $params = $('.J_param');
        $param.each(function() {
            var $this = $(this);
            params.push($this.attr('data-key') + '=' + $this.val());
            // params[$this.attr('data-key')] = $this.val();
        });
        params = '?' + params.join('&');
        location.href = location.href + params;

    });
    $multiCheckbox.on('change', function() {
        var mulitdom = this;
        $singleCheckbox.each(function() {
            this.checked = mulitdom.checked;
        });
    });
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
    $('.J_archive').on('click', function() {
        var $this = $(this),
            href = $this.attr('data-href'),
            id = $this.closest('tr').attr('data-id');
        if (href && id) {
            location.href = href + '?id=' + id;
        }
    });
});
