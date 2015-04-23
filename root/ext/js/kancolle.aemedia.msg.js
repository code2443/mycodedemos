// ==UserScript==
// @name         海色定时自动获取消息
// @namespace    http://kancolle.aemedia.org/KancolleMsg/By/AMing
// @version      1.0
// @description  海色定时自动获取消息
// @author       AMing
// @match        http://kancolle.aemedia.org/*
// @grant        none
// ==/UserScript==

var MessageNoticeDialog = function() {
    var obj = this;


    obj.init = function() {
    };

};
var KancolleMsg = function() {
    var obj = this;

    obj.autoGetTime = 10000; //10s
    obj.ajaxUrl = '/api/mobile/index.php?module=checkpost';

    obj.notice = new MessageNoticeDialog();
    obj.notice.init();

    obj.getMsg = function() {
        jQuery.ajax({
            url: obj.ajaxUrl,
            type: 'GET',
            dataType: 'html',
            success: function(data, textStatus, xhr) {
                var json_str = obj.getJsonString(data);
                var json = obj.StringToJson(json_str);
                obj.CheckNewMsg(json);
            }
        });

    };
    obj.getJsonString = function(data) {
        var index = data.indexOf('{');
        if (index >= 0) {
            return data.substr(index);
        }

        return data;
    }
    obj.StringToJson = function(str) {
        return jQuery.parseJSON(str);
    };
    obj.CheckNewMsg = function(data) {
        if (!data || !data.Variables || !data.Variables.notice) {
            return;
        }

    };

    //notice dialog
    //我的消息
    //http://kancolle.aemedia.org/home.php?mod=space&do=pm
    //我的帖子
    //http://kancolle.aemedia.org/home.php?mod=space&do=notice
    //坛友互动
    //http://kancolle.aemedia.org/home.php?mod=space&do=notice&view=interactive
    //系统提醒
    //http://kancolle.aemedia.org/home.php?mod=space&do=notice&view=system


    obj.init = function() {
        // var infolist = obj.getList();
        // var list = jQuery('#threadlisttableid');
        // list.hide();

        // var newlistobj = obj.getNewList(infolist);
        // obj.setCss(newlistobj);
        // list.after(newlistobj);
        // jQuery('# threadlist.bm_c').css({
        //     padding: '0'
        // });
        // jQuery('#autopbn').hide();
        obj.getMsg();
    };

};

var kancolleMsg = new KancolleMsg();
kancolleMsg.init();