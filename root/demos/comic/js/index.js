var Slider = function() {
	var obj = this;
	obj.count = 0;
	obj.index = 0;
	obj.images = [];
	obj.time = 2000;
	obj.width = 1000;
	obj.minwidth = 206;
	obj.list = null;
	obj.thumblist = null;
	obj.timer = null;
	obj.open_newtab = true;

	obj.next = function() {
		var newindex = obj.index + 1;
		if (newindex >= obj.count) {
			newindex = 0;
		}
		obj.index = newindex;
		obj.setIndex();
	};
	obj.pre = function() {
		var newindex = obj.index - 1;
		if (newindex < 0) {
			newindex = obj.count - 1;
		}
		obj.index = newindex;
		obj.setIndex();
	};
	obj.setIndex = function(index) {
		if (index != 0 && !index) {
			index = obj.index;
		} else {
			obj.index = index;
		}
		var left = index * obj.width * -1;
		obj.stopauto();
		obj.list.stop().animate({
			left: left
		}, 1000, 'easeInOutQuart', obj.startauto);
		obj.set_current();
	};
	obj.stopauto = function() {
		clearTimeout(obj.timer);
	};
	obj.startauto = function() {
		obj.timer = setTimeout(obj.next, obj.time);
	};
	obj.uie = function(tag) {
		return $('<' + tag + '></' + tag + '>');
	};
	obj.add = function(data) {
		obj.add_imgdiv(data.img, data.link);
		obj.add_thumbdiv(data.thumb);
		obj.count++;
	};
	obj.bindevent = function() {
		$('.slider .btn_pre').bind('click', function() {
			obj.pre();
		});
		$('.slider .btn_next').bind('click', function() {
			obj.next();
		});
	};
	obj.bindthumbevent = function($obj) {
		$obj.bind('click', function() {
			obj.setIndex($(this).data('index'));
		});
	};
	obj.add_imgdiv = function(url, link) {
		var a = obj.uie('a');
		a.attr('href', link);
		if (!!obj.open_newtab) {
			a.attr('target', '_blank');
		}
		var div = obj.uie('div');
		a.append(div);
		var img = new Image();
		div.append(img);
		img.src = url;

		obj.list.append(a);
	};
	obj.add_thumbdiv = function(url) {
		var div = obj.uie('div');
		div.attr('data-index', obj.count);
		var img = new Image();
		div.append(img);
		img.src = url;

		obj.thumblist.append(div);
		obj.bindthumbevent(div);
	};
	obj.set_current = function() {
		$('.slider .mini .list>div').removeClass('current');
		$('.slider .mini .list>div[data-index="' + obj.index + '"]').addClass('current');
	};
	obj.setThumbDivWidth = function() {
		$('.slider .mini').width(obj.count * obj.minwidth);
	};


	obj.init = function() {
		obj.list = $('.slider .frame .list');
		obj.thumblist = $('.slider .mini .list');
		obj.bindevent();

		for (var i = 0; i < obj.images.length; i++) {
			var item = obj.images[i];
			obj.add(item);
		};
		obj.setThumbDivWidth();
		obj.set_current();
	};
};
var Tabs = function() {
	var obj = this;

	obj.change_tab = function(tab) {
		$('.content .tabs .tabs_item a,.content .tabs .tabs_content >div').removeClass('current');
		$('.content .tabs .tabs_item a[data-tab="' + tab + '"],.content .tabs .tabs_content >div[data-tab="' + tab + '"]').addClass('current');
	};

	obj.init = function() {
		var tabs = $('.content .tabs .tabs_item a');
		tabs.bind('click', function() {
			var $this = $(this);
			var tab = $this.data('tab');
			obj.change_tab(tab);

			return false;
		});
	};
};
var WindowScroll = function() {
	var obj = this;
	obj.fixedTop = 50;

	obj.init = function() {
		$(window).bind('scroll', function() {
			var s = $(window).scrollTop();
			if (/MSIE /i.test(navigator.userAgent)) {
				s = document.documentElement.scrollTop;
			}
			if (s > obj.fixedTop) {
				$('.head,.slider').addClass('fixed');
			} else {
				$('.head,.slider').removeClass('fixed');
			}
		});
	};
};


var slider = null;
var tabs = null;
var windowScroll = null;
jQuery(document).ready(function($) {
	slider = new Slider();
	tabs = new Tabs();
	windowScroll = new WindowScroll();

	slider.images = [{
		thumb: 'http://kcvp-logs-moe-static.smartgslb.com/images/head/1.jpg',
		img: 'http://kcvp-logs-moe-static.smartgslb.com/images/head/1.jpg',
		link: 'http://kcvp-logs-moe-static.smartgslb.com/images/head/1.jpg'
	}, {
		thumb: 'http://kcvp-logs-moe-static.smartgslb.com/images/head/2.jpg',
		img: 'http://kcvp-logs-moe-static.smartgslb.com/images/head/2.jpg',
		link: 'http://kcvp-logs-moe-static.smartgslb.com/images/head/2.jpg'
	}, {
		thumb: 'http://kcvp-logs-moe-static.smartgslb.com/images/head/3.jpg',
		img: 'http://kcvp-logs-moe-static.smartgslb.com/images/head/3.jpg',
		link: 'http://kcvp-logs-moe-static.smartgslb.com/images/head/3.jpg'
	}, {
		thumb: 'http://kcvp-logs-moe-static.smartgslb.com/images/head/4.jpg',
		img: 'http://kcvp-logs-moe-static.smartgslb.com/images/head/4.jpg',
		link: 'http://kcvp-logs-moe-static.smartgslb.com/images/head/4.jpg'
	}, {
		thumb: 'http://kcvp-logs-moe-static.smartgslb.com/images/head/5.jpg',
		img: 'http://kcvp-logs-moe-static.smartgslb.com/images/head/5.jpg',
		link: 'http://kcvp-logs-moe-static.smartgslb.com/images/head/5.jpg'
	}];
	slider.init();
	slider.startauto();

	tabs.init();
	windowScroll.init();
});