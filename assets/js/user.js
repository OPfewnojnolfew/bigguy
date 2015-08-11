$(function() {
    $('.J_single_del').on('click', function() {
        var $this = $(this);
        $('.J_confirm').modal({
            relatedTarget: this,
            onConfirm: function(options) {
                var $tr = $(this.relatedTarget).closest('tr'),
                    id = $tr.attr('id');
                if (!id) {
                    notify.warn('该记录不存在或已删除');
                }
                $.post('', {
                    id: id
                }).then(function(res) {
                    if (res.code == 200) {
                        notify.warn('删除成功');
                        $tr.remove();
                    } else {
                        notify.warn(res.message);
                    }
                }, function() {
                    notify.warn('请求异常，请重试!');
                });
            },
            onCancel: function() {}
        });
    });
});
