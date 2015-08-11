$(function() {
    $('.J_single_del').on('click', function() {
        var $this = $(this),
            $id = $this.closest('tr').attr('id');
        $('#my-confirm').modal({
            relatedTarget: this,
            onConfirm: function(options) {
                var $link = $(this.relatedTarget).prev('a');
                var msg = $link.length ? '你要删除的链接 ID 为 ' + $link.data('id') :
                    '确定了，但不知道要整哪样';
                alert(msg);
            },
            onCancel: function() {
                alert('算求，不弄了');
            }
        });
    });
});
