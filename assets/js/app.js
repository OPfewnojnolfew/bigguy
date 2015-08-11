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
        /**
         * 警告框
         * @return {[type]} [description]
         */
        (function() {
            var win = window,
                doc = document;
            var ENV = {
                on: function(el, type, cb) {
                    if ('addEventListener' in win) {
                        el.addEventListener(type, cb, false);
                    } else {
                        el.attachEvent('on' + type, cb);
                    }
                },

                off: function(el, type, cb) {
                    if ('addEventListener' in win) {
                        el.removeEventListener(type, cb, false);
                    } else {
                        el.detachEvent('on' + type, cb);
                    }
                },

                bind: function(fn, ctx) {
                    return function() {
                        fn.apply(ctx, arguments);
                    };
                },

                isArray: Array.isArray ||
                    function(obj) {
                        return Object.prototype.toString.call(obj) === '[object Array]';
                    },

                config: function(preferred, fallback) {
                    return preferred ? preferred : fallback;
                },

                transSupport: false,

                useFilter: /msie [678]/i.test(navigator.userAgent),
                // sniff, sniff
                checkTransition: function() {
                    var el = doc.createElement('div');
                    var vendors = {
                        webkit: 'webkit',
                        Moz: '',
                        O: 'o',
                        ms: 'MS'
                    };

                    for (var vendor in vendors) {
                        if (vendor + 'Transition' in el.style) {
                            this.vendorPrefix = vendors[vendor];
                            this.transSupport = true;
                        }
                    }
                }
            };

            ENV.checkTransition();
            var DOMPanel = (function() {

                var panel = null;

                return {

                    append: function(dom) {
                        this.getPanel().append(dom);
                    },

                    prepend: function(dom) {
                        this.getPanel().prepend(dom);
                    },

                    getPanel: function() {
                        if (panel === null) {
                            panel = jQuery('#domPanel');
                            if (panel.size() === 0) {
                                panel = jQuery('<div id="domPanel" />').prependTo('body');
                            }

                            // 点击对话框不会触发给document绑定的点击行为
                            panel.click(Toolkit.cancelBubble);
                            panel.mousedown(Toolkit.cancelBubble);
                        }

                        return panel;
                    }
                };

            })();

            var Notify = function(o) {
                o = o || {};
                this.queue = [];
                this.baseCls = o.baseCls || 'notify';
                this.addnCls = o.addnCls || '';
                this.timeout = 'timeout' in o ? o.timeout : 3000;
                this.waitForMove = o.waitForMove || false;
                this.clickToClose = o.clickToClose || false;
                this.container = o.container;

                try {
                    this.setupEl();
                } catch (e) {
                    jQuery(ENV.bind(this.setupEl, this));
                }
            };

            Notify.prototype = {

                constructor: Notify,

                setupEl: function() {
                    var el = doc.createElement('div');
                    el.style.display = 'none';
                    this.container = this.container || DOMPanel.getPanel()[0];
                    this.container.appendChild(el);
                    this.el = el;
                    this.removeEvent = ENV.bind(this.remove, this);
                    this.transEvent = ENV.bind(this.afterAnimation, this);
                    this.run();
                },

                afterTimeout: function() {
                    if (!ENV.config(this.currentMsg.waitForMove, this.waitForMove)) {
                        this.remove();
                    } else if (!this.removeEventsSet) {
                        ENV.on(doc.body, 'mousemove', this.removeEvent);
                        ENV.on(doc.body, 'click', this.removeEvent);
                        ENV.on(doc.body, 'keypress', this.removeEvent);
                        ENV.on(doc.body, 'touchstart', this.removeEvent);
                        this.removeEventsSet = true;
                    }
                },

                run: function() {
                    if (this.animating || !this.queue.length || !this.el) {
                        return;
                    }

                    this.animating = true;
                    if (this.currentTimer) {
                        clearTimeout(this.currentTimer);
                        this.currentTimer = null;
                    }

                    var msg = this.queue.shift();
                    var clickToClose = ENV.config(msg.clickToClose, this.clickToClose);

                    if (clickToClose) {
                        ENV.on(this.el, 'click', this.removeEvent);
                        ENV.on(this.el, 'touchstart', this.removeEvent);
                    }
                    var timeout = ENV.config(msg.timeout, this.timeout);

                    if (timeout > 0) {
                        this.currentTimer = setTimeout(ENV.bind(this.afterTimeout, this), timeout);
                    }

                    if (ENV.isArray(msg.html)) {
                        msg.html = '<ul><li>' + msg.html.join('<li>') + '</ul>';
                    }

                    this.el.innerHTML = msg.html;
                    this.currentMsg = msg;
                    this.el.className = this.baseCls;
                    if (ENV.transSupport) {
                        this.el.style.display = 'block';
                        setTimeout(ENV.bind(this.showMessage, this), 50);
                    } else {
                        this.showMessage();
                    }

                },

                setOpacity: function(opacity) {
                    if (ENV.useFilter) {
                        try {
                            this.el.filters.item('DXImageTransform.Microsoft.Alpha').Opacity = opacity * 100;
                        } catch (err) {}
                    } else {
                        this.el.style.opacity = String(opacity);
                    }
                },

                showMessage: function() {
                    var addnCls = ENV.config(this.currentMsg.addnCls, this.addnCls);
                    if (ENV.transSupport) {
                        this.el.className = this.baseCls + ' ' + addnCls + ' ' + this.baseCls + '-animate';
                    } else {
                        var opacity = 0;
                        this.el.className = this.baseCls + ' ' + addnCls + ' ' + this.baseCls + '-js-animate';
                        this.setOpacity(0); // reset value so hover states work
                        this.el.style.display = 'block';

                        var self = this;
                        var interval = setInterval(function() {
                            if (opacity < 1) {
                                opacity += 0.1;
                                opacity = Math.min(1, opacity);
                                self.setOpacity(opacity);
                            } else {
                                clearInterval(interval);
                            }
                        }, 30);
                    }
                },

                hideMessage: function() {
                    var addnCls = ENV.config(this.currentMsg.addnCls, this.addnCls);
                    if (ENV.transSupport) {
                        this.el.className = this.baseCls + ' ' + addnCls;
                        ENV.on(this.el, ENV.vendorPrefix ? ENV.vendorPrefix + 'TransitionEnd' : 'transitionend', this.transEvent);
                    } else {
                        var opacity = 1;
                        var self = this;
                        var interval = setInterval(function() {
                            if (opacity > 0) {
                                opacity -= 0.1;
                                opacity = Math.max(0, opacity);
                                self.setOpacity(opacity);
                            } else {
                                self.el.className = self.baseCls + ' ' + addnCls;
                                clearInterval(interval);
                                self.afterAnimation();
                            }
                        }, 30);
                    }
                },

                afterAnimation: function() {
                    if (ENV.transSupport) {
                        ENV.off(this.el, ENV.vendorPrefix ? ENV.vendorPrefix + 'TransitionEnd' : 'transitionend', this.transEvent);
                    }

                    if (this.currentMsg.cb) {
                        this.currentMsg.cb();
                    }
                    this.el.style.display = 'none';
                    this.animating = false;
                    this.run();
                },

                remove: function(e) {
                    var cb = typeof e === 'function' ? e : null;

                    ENV.off(doc.body, 'mousemove', this.removeEvent);
                    ENV.off(doc.body, 'click', this.removeEvent);
                    ENV.off(doc.body, 'keypress', this.removeEvent);
                    ENV.off(doc.body, 'touchstart', this.removeEvent);
                    ENV.off(this.el, 'click', this.removeEvent);
                    ENV.off(this.el, 'touchstart', this.removeEvent);
                    this.removeEventsSet = false;

                    if (cb && this.currentMsg) {
                        this.currentMsg.cb = cb;
                    }
                    if (this.animating) {
                        this.hideMessage();
                    } else if (cb) {
                        cb();
                    }
                },

                log: function(html, o, cb, defaults) {
                    var msg = {},
                        opt = null;
                    if (defaults) {
                        for (opt in defaults) {
                            msg[opt] = defaults[opt];
                        }
                    }

                    if (typeof o === 'function') {
                        cb = o;
                    } else if (o) {
                        for (opt in o) {
                            msg[opt] = o[opt];
                        }
                    }

                    msg.html = html;
                    msg.cb = cb ? cb : msg.cb;
                    this.queue.push(msg);
                    this.run();
                    return this;
                },

                spawn: function(defaults) {
                    var self = this;
                    return function(html, o, cb) {
                        return self.log.call(self, html, o, cb, defaults);
                    };
                }
            };

            window.notify = new Notify();

            notify.info = notify.spawn({
                addnCls: 'notify-info'
            });

            notify.error = notify.spawn({
                addnCls: 'notify-error'
            });

            notify.warn = notify.spawn({
                addnCls: 'notify-warn'
            });

            notify.success = notify.spawn({
                addnCls: 'notify-success'
            });
        })();
    });
})(jQuery);
