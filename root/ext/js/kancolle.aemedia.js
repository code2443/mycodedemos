var KancolleExt = function() {
    var obj = this;
    /*判断是否有横幅改变分区icon的样式*/
    this.setPageLogo = function() {
        jQuery('#ct>img').remove();
        var $div = jQuery('#ct .t9_cle:first+div[class^="t9_"]');
        if ($div.length > 0) {
            $div.find('div').css({
                top: 5,
                left: 10
            });
            $div.find('img').css({
                width: 115,
                height: 115
            });
        }
        jQuery('.bm.bml.pbn>div:first').css('padding-left', '140px');
    };
    /*替换顶部导航栏的消息地址为帖子消息*/
    this.setNavMsg = function() {
        jQuery('.t9_02 a').attr('href', 'http://kancolle.aemedia.org/home.php?mod=space&do=notice&view=mypost');
        jQuery('#t9_forumlist_btn').attr('href', '/');
    };
    /*移除水b排行榜和最新会员榜的posts和date*/
    this.setTopList = function() {
        var $emlist = jQuery('#portal_block_38_content em,#portal_block_37_content em');
        jQuery.each($emlist, function() {
            var $this = jQuery(this);
            var html = $this.html();
            html = html.replace('date:', '');
            html = html.replace('posts:', '');
            $this.html(html);
        });
    };
    /*停止顶部文章列表自动跳转tab*/
    this.stopAutoChangeTab = function() {
        if (!!window.tabTimer) {
            clearTimeout(tabTimer);
        }
    };
    /* 设置导航栏 */
    this.setNavIcons = function() {
        var $navs = jQuery('.t9_n.wp ul');
        var $menu = jQuery('#toptb .t9_03').parent();
        console.log($navs);
        console.log($menu);
        $navs.find('li:first').remove();
        var $lis = $navs.find('li').clone();

        $lis.css({
            'overflow': 'hidden'
        });
        $lis.find('img').css({
            'display': 'block',
            'margin': '8px 0 0 6px',
            'width': '34px',
            'height': '34px',
            'borderRadius': '3px'
        });
        $lis.find('a').css({
            'fontSize: 0;': '0'
        });
        $lis.find('a').attr('target', '_self');
        var t9_01 = $menu.find('.t9_01');
        t9_01.before($lis);
        jQuery('#scbar').hide();

        jQuery('.t9_forumlist_btn').unbind('click');
    };
    this.init = function() {
        this.setPageLogo();
        this.setNavMsg();
        this.setTopList();
        this.stopAutoChangeTab();

        obj.setNavIcons();
    }
};

var kancolleExt = new KancolleExt();
kancolleExt.init();