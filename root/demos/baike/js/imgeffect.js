//////////////////////////////
// create 2015.03.18 by aming
//
/////////////////////////////
(function (window, document, $, undefined) {
    $.extend($.fn, {
        aming_imgeffect: function (setting, callback) {
            this.version = '1.0.0.0';

            var config = $.extend({
                margin: 0,
                time: 800,
                imgs: null
            }, setting);

            var random_id = parseInt(99999 * Math.random());

            var obj = this;
            var $renderTo = jQuery(this);

            $renderTo.empty();
            $renderTo.amingLine = this;
            $renderTo.attr('data-rid', random_id);

            if ($renderTo.css('position') == 'static') {
                $renderTo.css({
                    position: 'relative'
                });
            }
            $renderTo.css({
                overflow: 'hidden'
            });


            var w = $renderTo.width();
            var h = $renderTo.height();

            var newimg = function (url) {
                var img = new Image();
                var $img = jQuery(img);
                img.src = url;
                if (img.complete) {
                    set_img($img);
                } else {
                    img.onload = function () {
                        set_img(this, $img);
                    };
                }
                $img.hide();

                return img;
            }

            var set_img = function (img, $img) {
                var img_w = img.width;
                var img_h = img.height;
                var scale_w = (w - config.margin * 2) / img_w;
                var scale_h = (h - config.margin * 2) / img_h;
                var scale_min = Math.min(scale_w, scale_h);
                var set_w = Math.round(scale_min * img_w);
                var set_h = Math.round(scale_min * img_h);
                var margin_left = Math.round((w - set_w) / 2);
                var margin_top = Math.round((h - set_h) / 2);
                $img.width(set_w);
                $img.height(set_h);
                $img.css({
                    margin: margin_top + 'px ' + margin_left + 'px',
                });
                var $div = $img.parent();
                $div.addClass('complete');

                $img.show();
            };

            var img_div = function (index, url) {
                var $div = jQuery('<div></div>');
                $div.width(w);
                $div.height(h);
                $div.addClass('img_div');
                $div.attr('data-index', index);
                $div.css({
                    position: 'absolute',
                    top: 0,
                    left: 0
                });
                $div.append(newimg(url));

                return $div;
            };
            var getImgDivByIndex = function (index) {
                return $renderTo.find('.img_div[data-index="' + index + '"]');
            };
            var getImgDivByNotIndex = function (index) {
                return $renderTo.find('.img_div:not([data-index="' + index + '"])');
            };


            jQuery.each(config.imgs, function (i, x) {
                $renderTo.append(img_div(i, x));
            });
            $renderTo.find('.img_div:gt(0)').css({
                top: h / 2,
                left: w / 2 * -1,
                opacity: 0,
                zIndex: 0
            });


            obj.showindex = 0;

            var animate_pre = function (oldindex, newindex) {
                var $items = getImgDivByNotIndex(oldindex);
                var $items_old = getImgDivByIndex(oldindex);
                var $items_new = getImgDivByIndex(newindex);
                $items.css({
                    top: h / 2,
                    left: w / 2 * -1,
                    opacity: 0,
                    zIndex: 0
                });
                $items_new.css({
                    zIndex: 99
                });
                $items_old.css({
                    zIndex: 1
                });
                $items_old.stop().animate({
                    top: h / 2 * -1,
                    left: w / 2,
                    opacity: 0,
                }, config.time);
                $items_new.stop().animate({
                    top: 0,
                    left: 0,
                    opacity: 1,
                }, config.time);

            }
            var animate_next = function (oldindex, newindex) {
                var $items = getImgDivByNotIndex(oldindex);
                var $items_old = getImgDivByIndex(oldindex);
                var $items_new = getImgDivByIndex(newindex);
                $items.css({
                    top: h / 2 * -1,
                    left: w / 2,
                    opacity: 0,
                    display: 'none',
                    zIndex: 0
                });
                $items_new.css({
                    display: 'block',
                    zIndex: 99
                });
                $items_old.css({
                    zIndex: 1
                });
                $items_old.stop().animate({
                    top: h / 2,
                    left: w / 2 * -1,
                    opacity: 0,
                }, config.time);
                $items_new.stop().animate({
                    top: 0,
                    left: 0,
                    opacity: 1,
                }, config.time);

            }

            this.setIndex = function (index) {
                if (index == obj.showindex)
                    return;

                if (index > obj.showindex) { //next
                    if (obj.showindex >= config.count) {
                        obj.showindex = 0;
                    } else {
                        obj.showindex = index + 1;
                    }

                    animate_bottom();
                } else { //pre
                    if (obj.showindex == 0) {
                        obj.showindex = config.count - 1;
                    } else {
                        obj.showindex = index - 1;
                    }
                    animate_top();
                }
            };
            this.pre = function () {
                var index = obj.showindex - 1;
                if (index < 0) {
                    index = config.imgs.length - 1;
                }
                animate_pre(obj.showindex, index);
                obj.showindex = index;
            };
            this.next = function () {
                var index = obj.showindex + 1;
                if (index >= config.imgs.length) {
                    index = 0;
                }
                animate_next(obj.showindex, index);
                obj.showindex = index;
            };
            this.resize = function () {
                w = $renderTo.width();
                h = $renderTo.height();
                var $imgs = $renderTo.find('.img_div.complete img');
                jQuery.each($imgs, function (i, x) {
                    set_img(x, jQuery(x));
                });
            }

            return this;
        }
    });
})(window, document, jQuery);