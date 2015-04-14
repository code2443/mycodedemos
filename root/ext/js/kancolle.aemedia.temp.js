var KancolleExt = function() {
    var obj = this;
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
    this.init = function() {
        this.setTopList();
        this.stopAutoChangeTab();

        obj.setNavIcons();
    }
};

var kancolleExt = new KancolleExt();
kancolleExt.init();