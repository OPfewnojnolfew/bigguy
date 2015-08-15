$(function() {
    var $form = $('.am-form'),
        $isPass = $('#ispass');
    /**
     *  审核通过
     * @param  {[type]} 
     * @return {[type]}   [description]
     */
    $('.J_pass').on('click', function() {
        var $serialnumber = $('#serialnumber'),
            $usedtime = $('#usedtime'),
            serialnumber = $.trim($serialnumber.val()),
            usedtime = $.trim($usedtime.val());
        if (serialnumber === '') {
            notify.warn('出厂编号不能为空');
            $serialnumber.focus();
            return false;
        }
        if (usedtime === '') {
            notify.warn('使用时间不能为空');
            $usedtime.focus();
            return false;
        }
        $isPass.val($(this).attr('data-status'));
        $form.ajaxSubmit({
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
    /**
     *  审核不通过
     * @param  {[type]} 
     * @return {[type]}   [description]
     */
    $('.J_nopass').on('click', function() {
        $isPass.val($(this).attr('data-status'));
        $form.ajaxSubmit({
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

});
