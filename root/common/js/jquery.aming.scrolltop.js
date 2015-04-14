/**
 * $.aming_nav
 * @extends jquery.1.7.1
 * @fileOverview 回到顶部
 * @author 阿命
 * @email y2443@163.com
 * @site wwww.y2443.com
 * @version 1.0.0.1
 * @date 2013-09-11
 * Copyright (c) 2012-2013 AMing
 * @example
 *     var anav = $("#test").aming_nav({
 *                datalist: [{
 *                    left: -90,
 *                    color: "#C5885B",
 *                    imgurl: "images/31532569_200_50_t.jpg",
 *                    title: "[Home]首页",
 *                    link: "http://www.y2443.com",
 *                    target: true
 *                }]
 *            });
 *
 *
 *    anav.shownav();
 *    anav.hidenav(400);
 */
jQuery.extend(jQuery.easing, {
    easeOutExpo: function(x, t, b, c, d) {
        return (t == d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
    }
});

(function(window, document, $, undefined) {
    $.extend($.fn, {
        version: '1.0.0.1',

        aming_scrolltop: function(setting) { //默认值
            var sdata = $.extend({
                mainwidth: 1050,
                top: 400,
                width: 70,
                height: 70,
                imgurl: "images/to_top.png",
                scrolltime: 400,
                showopacity: 0.8
            }, setting);

            /* creat div */
            var $totop_frame = jQuery('<div class="aming_totop_frame"></div>');
            var $totop_content = jQuery('<div class="aming_totop_content"></div>');
            var $to_top = jQuery('<a class="aming_to_top" href="javascript:void();"></a>');
            $totop_content.append($to_top);
            $totop_frame.append($totop_content);
            jQuery('body').append($totop_frame);

            /* set css */
            $to_top.css({
                width: sdata.width,
                height: sdata.height,
                position: 'absolute',
                top: '-100px',
                right: '-70px',
                cursor: 'pointer',
                background: 'url(' + sdata.imgurl + ')',
                opacity: '0',
                boxShadow: '1px 1px 6px rgba(20, 20, 20, 0.9)'
            });

            $totop_content.css({
                width: sdata.mainwidth,
                height: '0',
                position: 'relative',
                margin: '0 auto'
            });

            $totop_frame.css({
                width: '100%',
                height: '0',
                position: 'fixed',
                bottom: '25px',
                left: '0',
                zIndex: '10000000000000000'
            });

            /* set event */
            jQuery(window).bind('scroll', function() {
                var s = jQuery(window).scrollTop();
                if (/MSIE /i.test(navigator.userAgent)) {
                    s = document.documentElement.scrollTop;
                }
                if (s > sdata.top) {
                    $to_top.stop().animate({
                        opacity: sdata.showopacity
                    }, 400);
                } else {
                    $to_top.stop().animate({
                        opacity: 0
                    }, 400);
                }
            });

            $to_top.bind('click', function() {
                jQuery('body,html').animate({
                    scrollTop: 0
                }, sdata.scrolltime, "easeOutExpo");
            });

            $to_top.bind('mouseover', function() {
                $to_top.css('background-position-y', sdata.height + 'px');
            });

            $to_top.bind('mouseout', function() {
                $to_top.css('background-position-y', '0');
            });

            return this;
        }
    });
})(window, document, jQuery);