$(function() {
    var uploadAttachment = function(ARG) {
        var btnTxt = ARG.btnTxt || '上传图片';
        var fileFormat = ARG.fileFormat || '*.gif; *.jpg; *.png; *.jpeg;';
        var sizeLimit = ARG.sizeLimit || '5MB';
        var fileEl = ARG.fileEl;
        var hiddenEl = ARG.hiddenEl;
        var resultEl = ARG.resultEl;
        var uploaderURL = ARG.uploaderURL;
        var fileLimit = ARG.fileLimit || 999;
        var width = ARG.width || 120;
        var height = ARG.width || 32;
        if (fileEl.length == 1) {
            fileEl.uploadify({
                'buttonClass': '',
                'width': width,
                'height': height,
                'buttonText': '<i class="am-icon-upload"></i> ' + btnTxt,
                'uploadLimit': fileLimit,
                'fileTypeExts': fileFormat,
                'fileSizeLimit': sizeLimit,
                'swf': 'assets/img/upload-swf.swf',
                'queueID': 'ZSUploadBox',
                'uploader': uploaderURL,
                'onUploadProgress': function(file, bytesUploaded, bytesTotal, totalBytesUploaded, totalBytesTotal) {
                    var percent = ((bytesUploaded / bytesTotal).toFixed(2) * 100);
                    resultEl.html('<i class="am-icon-spinner icon-spin"></i> 正在上传...' + percent + '%').show();
                },
                'onUploadStart': function() {
                    resultEl.html('<i class="am-icon-spinner icon-spin"></i> 正在上传...').show();
                },
                'formData': {
                    'sessionid': fileEl.attr('data-sid'),
                    'type': 'submit',
                    'is_preview': 1
                },
                'removeTimeout': 0,
                'multi': false,
                'onFallback': function() {
                    resultEl.html('上传失败，请重试 :(').show();
                },
                'onUploadSuccess': function(file, str, response) {
                    var data = eval('(' + str + ')');
                    /*
                      data返回的值为：
                      status:状态
                      data.src:图像路径
                      data.id:图像ID
                    */
                    if (response && data.savename) {
                        //更新图像及ID
                        resultEl.html('<img src="' + data.savename + '" alt=""/><a href="javascript:;" class="red J_removeAtt"> <i class="icon-trash"></i> 删除</a>').show();
                        hiddenEl.val(data.savename);
                    }
                }
            });
            //删除
            resultEl.delegate('.J_removeAtt', 'click', function() {
                resultEl.html('').hide();
                hiddenEl.val('');
            });
        }
    };

    //初始化
    // uploadAttachment({
    //     btnTxt: '选择图像',
    //     fileEl: $('#img_file'),
    //     hiddenEl: $('#img_hidden'),
    //     resultEl: $('#img_loading'),
    //     uploaderURL: 'xxx.php'
    // });

    $('.J_add').on('click', function() {
    	$('.am-modal').modal();
    });
});
