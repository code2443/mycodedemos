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
		return jQuery('<' + tag + '></' + tag + '>');
	};
	obj.add = function(data) {
		obj.add_imgdiv(data.img, data.link);
		obj.add_thumbdiv(data.thumb);
		obj.count++;
	};
	obj.bindevent = function() {
		jQuery('.slider .btn_pre').bind('click', function() {
			obj.pre();
		});
		jQuery('.slider .btn_next').bind('click', function() {
			obj.next();
		});
	};
	obj.bindthumbevent = function($obj) {
		$obj.bind('click', function() {
			obj.setIndex(jQuery(this).data('index'));
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
		jQuery('.slider .mini .list>div').removeClass('current');
		jQuery('.slider .mini .list>div[data-index="' + obj.index + '"]').addClass('current');
	};
	obj.setThumbDivWidth = function() {
		jQuery('.slider .mini').width(obj.count * obj.minwidth);
	};


	obj.init = function() {
		obj.list = jQuery('.slider .frame .list');
		obj.thumblist = jQuery('.slider .mini .list');
		obj.bindevent();
		jQuery.each(obj.list.find('a'), function(index, val) {
			obj.images.push({
				thumb: val.dataset.thumb,
				img: val.dataset.img,
				link: val.href
			});
		});

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
		jQuery('.content .tabs .tabs_item a,.content .tabs .tabs_content .tab_item').removeClass('current');
		jQuery('.content .tabs .tabs_item a[data-tab="' + tab + '"]').addClass('current');
		jQuery('.content .tabs .tabs_content .tab_item.' + tab).addClass('current');
	};

	obj.init = function() {
		var tabs = jQuery('.content .tabs .tabs_item a');
		tabs.bind('click', function() {
			var $this = jQuery(this);
			var tab = $this.data('tab');
			obj.change_tab(tab);

			return false;
		});
	};
};



var slider = null;
var tabs = null;
jQuery(document).ready(function($) {
	slider = new Slider();
	tabs = new Tabs();

	slider.init();
	slider.startauto();

	tabs.init();
});