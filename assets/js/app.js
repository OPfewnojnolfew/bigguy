(function($) {
    $(function() {
        var $fullText = $('.admin-fullText');
        $('#admin-fullscreen').on('click', function() {
            $.AMUI.fullscreen.toggle();
        });

        $(document).on($.AMUI.fullscreen.raw.fullscreenchange, function() {
            $fullText.text($.AMUI.fullscreen.isFullscreen ? '退出全屏' : '开启全屏');
        });
        /**
         * 生成菜单
         * @return {[type]} [description]
         */
        (function() {
            var menuData = [{
                name: '首页',
                href: '#',
                iconClass: ''
            }, {
                name: '第二页',
                href: '#',
                iconClass: ''
            }, {
                name: '用户管理',
                href: '#',
                iconClass: '',
                children: [{
                    name: '个人用户',
                    href: '#',
                    iconClass: '',
                }, {
                    name: '未认证经纪人',
                    href: '#',
                    iconClass: '',
                }, {
                    name: '待审核经纪人',
                    href: '#',
                    iconClass: '',
                }, {
                    name: '已认证经纪人',
                    href: '#',
                    iconClass: '',
                }]
            }, {
                name: '第二页',
                href: '#',
                iconClass: ''
            }];
            var i = 0,
                item,
                $ul = $('<ul class="am-list admin-sidebar-list"></ul>'),
                $li,
                $a,
                j,
                subLen,
                subcollapseName,
                subItem,
                $subul,
                $subli,
                len = menuData.length;
            for (; i < len; i++) {
                item = menuData[i];
                if (item.children && (subLen = item.children.length)) {
                    $li = $('<li class="admin-parent"></li>');
                    subcollapseName = 'collapse-nav-' + i;
                    $a = $('<a class="am-cf" data-am-collapse="{target: \'#' + subcollapseName + '\'}"><span class="' + item.iconClass + '"></span> ' + item.name + ' <span class="am-icon-angle-right am-fr am-margin-right"></span></a>');
                    $subul = $('<ul class="am-list am-collapse admin-sidebar-sub am-in" id="' + subcollapseName + '">');
                    for (j = 0; j < item.children.length; j++) {
                        subItem = item.children[j];
                        $subli = $('<li><a href="' + subItem.href + '"><span class="' + subItem.iconClass + '"></span>' + subItem.name + '</a></li>');
                        $subul.append($subli);
                    }
                    $li.append($a).append($subul);
                } else {
                    $li = $('<li><a href="' + item.href + '"><span class="' + item.iconClass + '"></span>' + item.name + '</a></li>');
                }
                $ul.append($li);
            }
            $('.J_menu').offCanvas();
            $('.J_menu .am-offcanvas-bar').html($ul);
        })();
    });
})(jQuery);
