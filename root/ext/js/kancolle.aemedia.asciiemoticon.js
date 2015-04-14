var KancolleAsciiEmoticon = function() {
    var obj = this;
    var $ = jQuery;
    obj.$imgdiv = null;
    obj.imglist = [
        '٩(๑´0`๑)۶',
        'ヾ(◍°∇°◍)ﾉﾞ',
        'ヾ(❀╹◡╹)ﾉ~',
        'ฅ( ̳• ◡ • ̳)ฅ',
        '(´,,•∀•,,`)',
        '٩(๑❛ᴗ❛๑)۶',
        '*罒▽罒*',
        '´∀`',
        '(๑>؂<๑）',
        'ヽ●*´∀`*●ﾉ',
        'ヾ(Ő∀Ő๑)ﾉ',
        '(*´・ｖ・)',
        '(´･ω･`)',
        '(´∇ﾉ‘*)ノ',
        '(‘・ω・´)”',
        '٩(✘д✘๑;)۶',
        '(/ﾟДﾟ)/',
        '(,,#ﾟДﾟ)',
        '(＃‘д´)ﾉ',
        '( •̥́ ˍ •̀ू )',
        '(๑ó△ò๑)',
        '(*/ω＼*)',
        '(*´∀`*)',
        '(๑•́ ₃ •̀๑)',
        '*\\(๑• ₃ •๑)*',
        '( ･ω･)ﾉ',
        '(｡´∀‘)ﾉ',
        '(o´Д`)',
        '(╯｀皿′)╯（┻━┻',
        '(/"≡ _ ≡)/~┴┴（#－.－）',
        '(╯°□°）╯（ ┻━┻',
        '┻━┻〜☆　ヽ(´∇‘ヽ)',
        '(๑•̀ㅂ•́)و✧',
        '✧*｡٩(ˊωˋ*)و✧*｡',
        '∑(・ω・ﾉ)ﾉ',
        '∑(゜ロ゜;)',
        '∑(ﾟДﾟ|||)',
        'Ծ‸Ծ',
        '｢(ﾟﾍﾟ)',
        '눈_눈',
        '(・_・ヾ',
        '_(:_」∠)_',
        '_(•̀ω•́ 」∠)_',
        '_§:з)))」∠)_',
        '_8(:з」∠)_',
        '٩(๑❛ᴗ❛๑)۶',
        '(｡•́__ก̀｡)',
        'ლ(°Д°ლ)',
        '(ʘ̆ʚʘ̆)',
        '٩(๑´3‘๑)۶',
        '(｡˘•ε•˘｡)',
        'Z(∩3∩)Z',
        '(ΦωΦ)',
        '（=ˇωˇ=）',
        '（⺻▽⺻ ）',
        '。(;￢д￢)',
        '(　･ิω･ิ)ノิ ',
        'o(￣ヘ￣o＃).',
        '.(｡￫‿￩｡)',
        '(,,Ծ▽Ծ,,)',
        '(｡▰‿‿▰｡) ❤',
        '( ´◔ ‸◔\')',
        'Σ(°Д°;',
        '(°Д°)',
        '∑(￣□￣;)',
        'Σ(・ω・ノ)ノ',
        '(ﾟﾛ ﾟﾉ)ﾉ',
        'Σ┗(＠ロ＠;)┛',
        'Σヽ(ﾟД ﾟ; )ﾉ',
        '( ´∀｀)σ',
        '(σ´□｀)σ',
        '( ﾟДﾟ)σ'
    ];

    obj.insertFunc = null;

    obj.createBtn = function() {
        var a = $('<a id="e_current_sml" title="颜文字" href="javascript:;" initialized="true">颜文字</a>');
        a.css({
            backgroundPosition: '-3px -80px'
        });

        return a;
    };
    obj.createImageList = function() {
        var div = $('<div></div>');
        div.addClass('asciiemot_div');
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
    obj.createItem = function(val) {
        var li = $('<li></li>');
        var span = $('<span></span>');
        li.append(span);
        span.html(val);
        li.attr('data-val', val);

        return li;
    };
    obj.bindEventByButton = function($obj) {
        $obj.bind('click', function() {
            if (obj.$imgdiv.css('display') == 'none') {
                var p = $(this).offset();
                obj.insertFunc = obj.insertTextToFull;
                obj.showDiv({
                    top: p.top + 50,
                    left: p.left - 100
                });
            } else {
                obj.hideDiv();
            }
        });
    };

    obj.hasEdit = function() {
        var $edit = $('#e_body');

        return $edit.length > 0;
    };
    obj.hasMiniEdit = function() {
        var $edit = $('#fastpostform');

        return $edit.length > 0;
    };
    obj.hasReplyEdit = function() {
        var $edit = $('#postform');
        var fwin = $edit.attr('fwin');

        return $edit.length > 0 && fwin == 'reply';
    };
    obj.hasMiniBtn = function($obj) {
        var $btn = $obj.find('.mini_btn_sml');

        return $btn.length > 0;
    };
    obj.createMiniBtn = function() {
        var a = $('<a href="javascript:;" class="fsml mini_btn_sml" fwin="reply">颜文字</a>');

        a.css({
            backgroundPosition: '-20px -20px'
        });

        return a;
    };
    obj.bindEventByMiniButton = function($obj) {
        $obj.bind('click', function() {
            if (obj.$imgdiv.css('display') == 'none') {
                var p = $(this).offset();
                obj.insertFunc = obj.insertTextToMini;
                obj.showDiv({
                    top: p.top + 25,
                    left: p.left - 40
                });
            } else {
                obj.hideDiv();
            }
        });
    };
    obj.bindEventByReplyButton = function($obj) {
        $obj.bind('click', function() {
            if (obj.$imgdiv.css('display') == 'none') {
                var p = $(this).offset();
                obj.insertFunc = obj.insertTextToReply;
                obj.showDiv(p);
            } else {
                obj.hideDiv();
            }
        });
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
            left: '0',
            zIndex: '998'
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
            width: 'auto',
            height: '20px',
            margin: '2px',
            border: '1px solid #ccc',
            textAlign: 'center',
            cursor: 'pointer',
            background: '#fff',
            overflow: 'hidden',
            padding: '2px 5px'
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
            var val = $(this).data('val');
            if (!!val) {
                obj.insertFunc(val);
                obj.hideDiv();
            }
        });
        div.find('.close').bind('click', function() {
            obj.hideDiv();
        });
    };


    obj.insertTextToFull = function(val) {
        insertText(val, false);
    };
    obj.insertTextToMini = function(val) {
        seditor_insertunit('fastpost', val);
    };
    obj.insertTextToReply = function(val) {
        seditor_insertunit('post', val);
    };

    obj.showDiv = function(p) {
        obj.$imgdiv.css({
            top: p.top,
            left: p.left
        });
        obj.$imgdiv.show();
    };
    obj.hideDiv = function() {
        obj.$imgdiv.hide();
    };
    obj.appendToBody = function() {
        if ($('.asciiemot_div').length > 0) return;

        $('body').append(obj.$imgdiv);
    };

    obj.initImageList = function() {
        var imgdiv = obj.createImageList();
        obj.setCss(imgdiv);
        obj.bindEventByImagelist(imgdiv);

        obj.$imgdiv = imgdiv;
        obj.appendToBody();
    };


    obj.initFullEdit = function() {
        if (!obj.hasEdit()) return;

        var btn = obj.createBtn();
        $('#e_body #e_sml').after(btn);
        obj.bindEventByButton(btn);
    };

    obj.initMiniEdit = function() {
        if (!obj.hasMiniEdit()) return;

        var btn = obj.createMiniBtn();
        $('#fastpostform #fastpostsml').after(btn);
        obj.bindEventByMiniButton(btn);
    };
    obj.initReplyEdit = function() {
        if (!obj.hasReplyEdit() && obj.hasMiniBtn()) return;

        var btn = obj.createMiniBtn();
        $('#postform #postsml').after(btn);
        obj.bindEventByReplyButton(btn);
    };

    obj.bindReplayShowEvent = function() {
        $('.fastre').bind('click', function() {
            setTimeout(obj.initReplyEdit, 1000);
        });
    };

    obj.init = function() {
        obj.initFullEdit();
        obj.initMiniEdit();
        obj.initImageList();
        obj.bindReplayShowEvent();
    };
};

var kancolleAsciiEmoticon = new KancolleAsciiEmoticon();
kancolleAsciiEmoticon.init();