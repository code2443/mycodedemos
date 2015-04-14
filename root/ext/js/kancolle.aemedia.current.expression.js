var KancolleCurrentExpression = function() {
    var obj = this;
    var $ = jQuery;
    obj.$imgdiv = null;
    /* 表情图片的最大宽度，设置为0则不限制 */
    obj.maxWidth = 100;
    /* 表情图片的最大高度，设置为0则不限制 */
    obj.maxHeight = 100;
    /* 表情图片的地址列表 */
    obj.imglist = [
        'http://ww4.sinaimg.cn/large/dabbd266jw1eqon8ro4lmj204a03e0sp.jpg',
        'http://ww4.sinaimg.cn/large/dabbd266jw1eqon8sgtcnj206104eaa9.jpg',
        'http://ww3.sinaimg.cn/large/dabbd266jw1eqon8v6v0xj204t03xdfx.jpg',
        'http://ww2.sinaimg.cn/large/dabbd266jw1eqon8uaqoij202q022dfo.jpg',
        'http://ww1.sinaimg.cn/large/dabbd266jw1eqon8wf9c5j205c04swep.jpg',
        'http://ww4.sinaimg.cn/large/dabbd266jw1eqon8xc8p8j204w04xt8y.jpg',
        'http://ww1.sinaimg.cn/large/dabbd266jw1eqon8xyzrrj203i02emx3.jpg',
        'http://ww3.sinaimg.cn/large/dabbd266jw1eqon8ynyv8j205503kt8o.jpg',
        'http://ww1.sinaimg.cn/large/dabbd266jw1eqon9176zmj205506aaa8.jpg',
        'http://ww1.sinaimg.cn/large/dabbd266jw1eqon91zaxxj203w03zaa2.jpg',
        'http://ww2.sinaimg.cn/large/dabbd266jw1eqon93c7onj203902w3yd.jpg',
        'http://ww2.sinaimg.cn/large/dabbd266jw1eqon94ee10j20go0blmzr.jpg',
        'http://ww3.sinaimg.cn/large/dabbd266jw1eqon95gzjmj2043050q33.jpg',
        'http://ww1.sinaimg.cn/large/dabbd266jw1eqon96ealuj206r05m0t7.jpg',
        'http://ww1.sinaimg.cn/large/dabbd266jw1eqon97a1i9j202n031gli.jpg',
        'http://ww3.sinaimg.cn/large/dabbd266jw1eqon985sm6j206i07zmxm.jpg',
        'http://ww2.sinaimg.cn/large/dabbd266jw1eqon98zyc6j2038049mx6.jpg',
        'http://ww3.sinaimg.cn/large/dabbd266jw1eqon99ow64j205804g74g.jpg',
        'http://ww4.sinaimg.cn/large/dabbd266jw1eqon9ay02ej2036041mx5.jpg',
        'http://ww2.sinaimg.cn/large/dabbd266jw1eqon9bxuvsj207e05swes.jpg',
        'http://ww4.sinaimg.cn/large/dabbd266jw1eqon9cr7xhj203s044dft.jpg',
        'http://ww4.sinaimg.cn/large/dabbd266jw1eqon9dfvkij208005pmxk.jpg',
        'http://ww3.sinaimg.cn/large/dabbd266jw1eqon9ej27dj207q074t93.jpg',
        'http://ww3.sinaimg.cn/large/dabbd266jw1eqon9f886jj2029042a9x.jpg',
        'http://ww4.sinaimg.cn/large/dabbd266jw1eqon9fv2ouj205h04274f.jpg',
        'http://ww4.sinaimg.cn/large/dabbd266jw1eqon9gvprej206f06ymxm.jpg',
        'http://ww1.sinaimg.cn/large/dabbd266jw1eqon9hq8c4j20cb07vmy5.jpg',
        'http://ww1.sinaimg.cn/large/dabbd266jw1eqon9ih2wzj209p030wep.jpg',
        'http://ww4.sinaimg.cn/large/dabbd266jw1eqon9jgzjyj206407ajs3.jpg',
        'http://ww3.sinaimg.cn/large/dabbd266jw1eqon9k2dmaj20ci08nq4b.jpg',
        'http://ww2.sinaimg.cn/large/dabbd266jw1eqon9l3ui2j208t07mgmb.jpg',
        'http://ww1.sinaimg.cn/large/dabbd266jw1eqonafabobj208e06kaak.jpg',
        'http://ww3.sinaimg.cn/large/dabbd266jw1eqonag3w57j205k02qq2z.jpg',
        'http://ww4.sinaimg.cn/large/dabbd266jw1eqonakl1r1j20a50c9q4f.jpg',
        'http://ww3.sinaimg.cn/large/dabbd266jw1eqoncemgf5j204703o3yi.jpg',
        'http://ww1.sinaimg.cn/large/dabbd266jw1eqoncfljmej204t04ljrh.jpg',
        'http://ww4.sinaimg.cn/large/dabbd266jw1eqonclxlbfj206w04w0t0.jpg',
        'http://ww1.sinaimg.cn/large/dabbd266jw1eqoncqe3kij205m053mx7.jpg',
        'http://ww1.sinaimg.cn/large/dabbd266jw1eqoncwlgosj203k04hdfw.jpg',
        'http://ww4.sinaimg.cn/large/dabbd266jw1eqond70n36j205g05w0t0.jpg',
        'http://ww3.sinaimg.cn/large/dabbd266jw1eqondac6wmj207o03z0sz.jpg',
        'http://ww3.sinaimg.cn/large/dabbd266jw1eqondebbldj203b0263ye.jpg',
        'http://ww2.sinaimg.cn/large/dabbd266jw1eqondlzhppj204i04idfw.jpg',
        'http://ww4.sinaimg.cn/large/dabbd266jw1eqondovu9hj206i055wer.jpg',
        'http://ww2.sinaimg.cn/large/dabbd266jw1eqondse6xxj20b807caat.jpg',
        'http://ww1.sinaimg.cn/large/dabbd266jw1eqondxnjadj207i05m74o.jpg',
        'http://ww4.sinaimg.cn/large/dabbd266jw1eqone04lzhj206r06wjru.jpg',

        'http://ww4.sinaimg.cn/large/005X3pWTjw1ep9sstew0ej301f01k742.jpg',
        'http://ww2.sinaimg.cn/large/005X3q9sjw1ep9vpewuhfj302j036glg.jpg',
        'http://ww1.sinaimg.cn/large/005X4kHAjw1ep9sp2x7lvj304b04g3yi.jpg',
        'http://ww2.sinaimg.cn/large/dabbd266jw1eqdixk5nqsj201c01c3yi.jpg',
        'http://ww1.sinaimg.cn/large/dabbd266jw1eqo1cciyt7j20b40awjrr.jpg'
    ];

    obj.createBtn = function() {
        var a = $('<a id="e_current_sml" title="自定义表情" href="javascript:;" initialized="true">自定义表情</a>');
        a.css({
            backgroundPosition: '-3px -80px'
        });

        return a;
    };
    obj.createImageList = function() {
        var div = $('<div></div>');
        div.addClass('current_imgs_div');
        var close = $('<div></div>');
        close.addClass('close');
        div.append(close);
        var ul = $('<ul></ul>');
        div.append(ul);

        $.each(obj.imglist, function(index, val) {
            var item = obj.createItem(val);
            ul.append(item);
        });

        return div;
    };
    obj.createItem = function(url) {
        var li = $('<li></li>');
        var img = new Image();
        img.src = url;
        li.append(img);

        return li;
    };
    obj.bindEventByButton = function($obj) {
        $obj.bind('click', function() {
            if (obj.$imgdiv.css('display') == 'none') {
                var p = $(this).offset();
                obj.showDiv(p);
            } else {
                obj.hideDiv();
            }
        });
    };

    obj.hasEdit = function() {
        var $edit = $('#e_body');

        return $edit.length > 0;
    };

    obj.setCss = function(div) {
        div.css({
            width: '530px',
            height: '300px',
            border: '1px solid #ccc',
            position: 'absolute',
            background: '#eee',
            display: 'none',
            top: '0',
            left: '0'
        });
        div.find('ul').css({
            width: '520px',
            height: '270px',
            margin: '25px 5px 5px 5px',
            overflowY: 'scroll',
            padding: '0'
        });
        div.find('li').css({
            listStyle: 'none',
            float: 'left',
            width: '50px',
            height: '50px',
            margin: '5px',
            border: '1px solid #ccc',
            textAlign: 'center',
            cursor: 'pointer',
            background: '#fff',
            overflow: 'hidden'
        });
        div.find('li img').css({
            height: '50px'
        });
        div.find('.close').css({
            width: '20px',
            height: '20px',
            position: 'absolute',
            background: '#FF0',
            top: '4px',
            right: '5px',
            cursor: 'pointer',
            background: 'url(http://kancolle.aemedia.org/./template/999test_cn_img/dz_model_15020401/common/cls.gif) no-repeat 0 0'
        });
    };
    obj.bindEventByImagelist = function(div) {
        div.find('li').bind('click', function() {
            var url = $(this).find('img').attr('src');
            if (!!url) {
                var style = '';
                if (obj.maxWidth > 0) {
                    style += 'max-width:' + obj.maxWidth + 'px;';
                }
                if (obj.maxHeight > 0) {
                    style += 'max-height:' + obj.maxHeight + 'px;';
                }
                var html = '<img src="' + url + '" border="0"  alt="" style="' + style + '" />';
                insertText(html, false);
                obj.hideDiv();
            }
        });
        div.find('.close').bind('click', function() {
            obj.hideDiv();
        });
    };
    obj.showDiv = function(p) {
        obj.$imgdiv.css({
            top: p.top + 50,
            left: p.left - 100
        });
        obj.$imgdiv.show();
    };
    obj.hideDiv = function() {
        obj.$imgdiv.hide();
    };
    obj.appendToBody = function() {
        if ($('.current_imgs_div').length > 0) return;

        $('body').append(obj.$imgdiv);
    };

    obj.init = function() {
        if (!obj.hasEdit()) return;

        var btn = obj.createBtn();
        $('#e_body #e_sml').after(btn);
        obj.bindEventByButton(btn);

        var imgdiv = obj.createImageList();
        obj.setCss(imgdiv);
        obj.bindEventByImagelist(imgdiv);

        obj.$imgdiv = imgdiv;
        obj.appendToBody();
    };

};

var kancolleCurrentExpression = new KancolleCurrentExpression();
kancolleCurrentExpression.init();