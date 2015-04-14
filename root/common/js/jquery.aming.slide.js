﻿/**
* $.amingslide
* @extends jquery.1.7.1
* @fileOverview 图片幻灯片效果
* @author 阿命
* @email y2443@163.com
* @site wwww.y2443.com
* @version 1.12.31.0
* @date 2012-12-31
*/
(function ($) {
    $.extend($.fn, {
        amingslide: function (setting) {
            //默认值
            var sdata = $.extend({
                column_count: 10,
                rom_count: 10,
                change_time: 5000,
                item_time: 400,
                imglist: []
            }, setting);
            //内部参数
            var random_id = parseInt(10000 * Math.random());
            var renderTo = jQuery(this);
            var slide_index = 0;
            var slides_nav_auto = null;
            var item_width = 0;
            var item_height = 0;
            var renderTo_width = 0;
            var renderTo_height = 0;
            //Init
            renderTo_width = renderTo.width();
            renderTo_height = renderTo.height();
            item_width = renderTo_width / sdata.column_count;
            item_height = renderTo_height / sdata.rom_count;
            //InitCss
            renderTo.css("position", "relative");
            renderTo.css("overflow", "hidden");
            //对象
            var thisobj = {
                Next: function () {
                    if (sdata.imglist.length > 0) {
                        this.NextImage();
                    }
                },
                LoadImage: function (index) {
                    clearTimeout(slides_nav_auto);
                    for (var item_c = 0; item_c < sdata.column_count; item_c++) {
                        for (var item_r = 0; item_r < sdata.rom_count; item_r++) {
                            this.WriteItem(item_c, item_r, index);
                        }
                    }
                    slides_nav_auto = setTimeout(function () {
                        thisobj.Next();
                    }, sdata.change_time);
                },
                WriteItem: function (column, rom, index) {
                    var top = rom * item_height;
                    var left = column * item_width;
                    var $newitem = this.CreateItem(index, column, rom, top, left);
                    $newitem.css("top", top - item_height);
                    $newitem.css("left", left + item_width);
                    $newitem.css("position", "absolute");
                    $newitem.css("opacity", "0");
                    $newitem.css("z-index", "9999");
                    var delay_time = (column + rom * sdata.column_count) * 100;//间隔100毫秒
                    //var delay_time = parseInt(20 * Math.random() + 1) * 100;//随机
                    this.HideItem(index, column, rom, top, left, delay_time);
                    this.ShowItem($newitem, column, rom, top, left, delay_time);
                },
                CreateItem: function (index, column, rom, top, left) {
                    var item_id = "slide_item_r" + random_id + "_i" + index + "_c" + column + "_r" + rom;

                    var $newitem = jQuery("#" + item_id);
                    if ($newitem.length > 0) {//存在则直接返回
                        return $newitem;
                    }
                    //不存在则创建新的
                    var imgurl = sdata.imglist[index];
                    var top = rom * item_height;
                    var left = column * item_width;
                    $newitem = jQuery("<div></div>");
                    $newitem.attr("id", item_id);
                    $newitem.css("width", item_width);
                    $newitem.css("height", item_height);
                    $newitem.css("background-image", "url(" + imgurl + ")");
                    $newitem.css("background-position", "-" + left + "px -" + top + "px");

                    return $newitem;
                },
                ShowItem: function ($obj, column, rom, top, left, delay_time) {
                    //var delay_time = (rom * this.container_size.width + column * 100);//间隔100毫秒
                    //var delay_time = parseInt(10 * Math.random() + 1) * 150;//随机

                    renderTo.append($obj);
                    //$newitem.delay(delay_time).fadeIn(800);
                    $obj.delay(delay_time + 100).animate({
                        top: top, left: left, opacity: 1
                    }, sdata.item_time);
                },
                HideItem: function (index, column, rom, top, left, delay_time) {
                    var olditem_index = index - 1;
                    if (olditem_index < 0) {
                        olditem_index = sdata.imglist.length - 1;
                    }
                    var oldid = "slide_item_r" + random_id + "_i" + olditem_index + "_c" + column + "_r" + rom;
                    var $olditem = jQuery("#" + oldid);
                    if ($olditem.length == 0) {//不存在则直接返回
                        return;
                    }
                    $olditem.css("z-index", "1");
                    $olditem.delay(delay_time).animate({
                        top: top + item_height, left: left - item_width, opacity: 0
                    }, sdata.item_time);
                },
                NextImage: function () {
                    slide_index++;
                    if (slide_index > sdata.imglist.length - 1) {
                        slide_index = 0;
                    }
                    this.LoadImage(slide_index);
                }
            }
            thisobj.Next();

            return this;
        }
    });
})(jQuery);
