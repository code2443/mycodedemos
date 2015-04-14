var Gelbooru = function() {
    var obj = this;

    obj.thumb = {
        width: 160,
        height: 160
    };

    obj.menu_btns = [];
    obj.root = null;
    obj.leftbox = null;
    obj.leftbox_menu = null;
    obj.leftbox_sidebar = null;

    obj.rf = function(selecter) {
        return obj.root.find(selecter);
    };
    obj.uie = function(text) {
        return $('<' + text + '></' + text + '>');
    };
    obj.getRoot = function() {
        obj.root = $('#content');
    };
    obj.getPageType = function() {
        if (obj.rf('#post-view').length > 0) {
            return 'view';
        }

        return 'list';
        // return 'ad';
    };
    obj.createMenuButton = function(text) {
        var btn = obj.uie('a');
        btn.html(text);
        btn.addClass('menu_btn');

        return btn;
    };
    obj.createMenuButtonEvent = function(text, click_func) {
        var btn = obj.createMenuButton(text);
        if (!!click_func) {
            btn.bind('click', click_func);
        }
        obj.menu_btns.push(btn);

        return btn;
    };
    obj.createMenuButtonLink = function(text, url, newwindow) {
        var btn = obj.createMenuButton(text);
        if (!!url) {
            btn.attr({
                href: url
            });
            if (!!newwindow) {
                btn.attr({
                    target: '_blank'
                });
            }
        }
        obj.menu_btns.push(btn);

        return btn;
    };
    obj.createMenuButtonDownload = function(text, url) {
        var btn = obj.createMenuButton(text);
        if (!!url) {
            btn.attr({
                href: url,
                download: url
            });
        }
        obj.menu_btns.push(btn);

        return btn;
    };
    obj.createTabsMenuButton = function(text) {
        var btn = obj.uie('a');
        btn.html(text);
        btn.addClass('menu_btn');
        var li = obj.uie('li');
        li.append(btn);

        return li;
    };
    obj.setListPage = function() {
        var imgs = obj.rf('span.thumb img');
        $.each(imgs, function(index, val) {
            $(val).parent('a').attr({
                target: '_blank'
            });

            var resizeimg = function(img) {
                if (val.width <= 0 || val.height <= 0) return;
                $(img).css({
                    margin: Math.max(0, (obj.thumb.height - img.height) / 2) + 'px ' +
                        Math.max(0, (obj.thumb.width - img.width) / 2) + 'px'
                });
            };
            val.onload = function() {
                resizeimg(this);
            };
            resizeimg(val);
        });

        obj.setPaging();
    };
    obj.setViewPage = function() {
        var img = obj.rf('#image');
        var imgurl = img.attr('src');
        obj.createMenuButtonDownload('Download', imgurl);

        obj.createMenuButtonEvent('Close', function() {
            window.close();
        });
    };
    obj.setLeftBox = function() {
        var div = obj.uie('div');
        div.addClass('leftbox')
        obj.leftbox = div;
        obj.root.append(div);
        var resizeHeight = function() {
            var win = $(window);
            obj.leftbox.height(win.height() - 50);
        };
        $(window).bind('resize', resizeHeight);
        resizeHeight();

        return div;
    };
    obj.setMenu = function() {
        var ul = obj.uie('ul');
        $.each(obj.menu_btns, function(index, val) {
            var li = obj.uie('li');
            li.append(val);
            ul.append(li);
        });
        ul.addClass('menu');
        ul.addClass('current');
        obj.leftbox.append(ul);
        obj.leftbox_menu = ul;

        return ul;
    };
    obj.setSidebar = function() {
        var div = obj.uie('div');
        div.addClass('sidebar_div');
        var sidebar = obj.rf('.sidebar');
        var tags = sidebar.find('#tag-sidebar');
        div.append(tags.clone());
        sidebar.hide();
        obj.leftbox.append(div);
        div.hide();
        obj.leftbox_sidebar = div;

        var lis = obj.rf('.sidebar_div li');
        $.each(lis, function(index, val) {
            var $li = $(val);
            $li.find('*:contains(?),*:contains(+),*:contains(-)').remove();
            $li.css({
                background: $li.find('a').css('color')
            });
            $li.find('*').css({
                color: '#fff'
            });
        });

        return div;
    };
    obj.setTabsMenu = function() {
        var ul = obj.uie('ul');
        var change = obj.createTabsMenuButton('Change');
        var showhide = obj.createTabsMenuButton('Hide');
        ul.append(change);
        ul.append(showhide);

        ul.addClass('menu');
        ul.addClass('tabs');
        obj.root.append(ul);

        change.bind('click', function() {
            if (obj.leftbox_menu.css('display') == 'none') {
                obj.leftbox_menu.show();
                obj.leftbox_sidebar.hide();
            } else {
                obj.leftbox_menu.hide();
                obj.leftbox_sidebar.show();
            }
        });
        showhide.bind('click', function() {
            if (obj.leftbox.css('display') == 'none') {
                obj.leftbox.show();
                showhide.find('.menu_btn').html('Hide');
            } else {
                obj.leftbox.hide();
                showhide.find('.menu_btn').html('Show');
            }
        });
    };
    obj.setPaging = function() {
        var paging = obj.rf('#paginator .pagination');
        var fisrt = paging.find('a:contains(«)');
        var pre = paging.find('a:contains(‹)');
        var next = paging.find('a:contains(›)');
        var last = paging.find('a:contains(»)');
        var now = paging.find('b');

        if (now.length > 0) {
            obj.createMenuButtonEvent(now.text()).addClass('txt_c');
        }
        if (fisrt.length > 0) {
            obj.createMenuButtonLink('Fisrt', fisrt.attr('href'));
        }
        if (pre.length > 0) {
            obj.createMenuButtonLink('Pre', pre.attr('href'));
        }
        if (next.length > 0) {
            obj.createMenuButtonLink('Next', next.attr('href'));
        }
        if (last.length > 0) {
            obj.createMenuButtonLink('Last', last.attr('href'));
        }
    };
    obj.setAdPage = function() {};
    obj.removeAd = function() {
        $('body>*[id!="content"]').remove();
        $('.content>div:first').hide();
        $('#paginator').hide();
        // $('#paginator>center').hide();
        $('.sidebar2.sidebar4>center>*[class!="sidebar3"]').hide();
        $('.status-notice').hide();
    };
    obj.setCss = function() {
        $('html,#content').css({
            background: '#333'
        });
        obj.root.css({
            padding: 0
        });

        obj.rf('.content').css({
            width: '100%'
        });

        obj.rf('.leftbox').css({
            minWidth: '100px',
            position: 'fixed',
            bottom: '45px',
            left: 0,
            overflowX: 'hidden',
            overflowY: 'auto'
        });
        obj.rf('.sidebar_div .sidebar').css({
            background: 'rgba(90, 90, 90, 0.6)',
            width: '100%'
        });
        obj.rf('.sidebar_div .sidebar2').css({
            border: 'none'
        });

        obj.rf('.sidebar_div li').css({
            padding: '6px',
            margin: '2px',
            color: '#fff',
            opacity: '0.6'
        });

        obj.rf('.menu').css({
            listStyle: 'none'
        });
        obj.rf('.menu.current').css({
            position: 'absolute',
            bottom: 0
        });
        obj.rf('.menu.tabs').css({
            position: 'fixed',
            left: 0,
            bottom: 0
        });
        obj.rf('.menu li').css({
            margin: '5px'
        });
        obj.rf('.menu.tabs li').css({
            float: 'left'
        });
        obj.rf('.menu_btn').css({
            background: 'rgba(111, 183, 236, 0.8)',
            padding: '10px',
            color: '#FFF',
            display: 'block'
        });
        obj.rf('span.thumb').css({
            height: obj.thumb.height,
            width: obj.thumb.width,
            border: '1px solid #CCC',
            margin: '5px',
            background: 'rgba(90, 90, 90, 0.6)'
        });
        obj.rf('.txt_c').css({
            textAlign: 'center'
        });
        obj.rf('#image').css({
            margin: '10px'
        });
    };
    obj.setTranslator = function() {
        var div = $("<div id='MicrosoftTranslatorWidget' class='Dark' style='color:white;background-color:#555555'></div>");
        obj.root.append(div);
        div.css({
            position: 'fixed',
            bottom: 0,
            left: 200,
            opacity: 0.8
        });
        setTimeout(function() {
            {
                var s = document.createElement('script');
                s.type = 'text/javascript';
                s.charset = 'UTF-8';
                s.src = ((location && location.href && location.href.indexOf('https') == 0) ? 'https://ssl.microsofttranslator.com' : 'http://www.microsofttranslator.com') + '/ajax/v3/WidgetV3.ashx?siteData=ueOIGRSKkd965FeEGM5JtQ**&ctf=False&ui=true&settings=Manual&from=';
                var p = document.getElementsByTagName('head')[0] || document.documentElement;
                p.insertBefore(s, p.firstChild);
            }
        }, 0);
    };

    obj.init = function() {
        obj.getRoot();
        obj.removeAd();

        switch (obj.getPageType()) {
            case 'view':
                obj.setViewPage();
                break;
            case 'ad':
                obj.setAdPage();
                break;
            default:
                obj.setListPage();
                break;
        }

        obj.setLeftBox();
        obj.setMenu();
        obj.setSidebar();
        obj.setTabsMenu();
        obj.setCss();

        obj.setTranslator();
    };
};


// function appendjs(url, callback) {
//     var script = document.createElement('script');
//     script.src = url;
//     script.onload = callback;
//     document.body.appendChild(script);
// }
// appendjs('http://lib.sinaapp.com/js/jquery/1.9.1/jquery-1.9.1.min.js', function() {

    var gelbooru = new Gelbooru();
    gelbooru.init();


// });