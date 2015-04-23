var Slider = function() {
	var obj = this;
	obj.count = 0;
	obj.index = 0;
	obj.images = [];
	obj.time = 3000;
	obj.width = 1000;
	obj.minwidth = 206;
	obj.list = null;
	obj.thumblist = null;
	obj.timer = null;
	obj.open_newtab = true;
	obj.mouse_hover = false;

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
		obj.stopauto();
		if (!!obj.mouse_hover) return;
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
		jQuery('.slider .frame').bind('mouseenter', function() {
			obj.mouse_hover = true;
			obj.stopauto();
		});
		jQuery('.slider .frame').bind('mouseleave', function() {
			obj.mouse_hover = false;
			obj.startauto();
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
		// var img = new Image();
		// div.append(img);
		// img.src = url;
		div.css({
			background: 'url(' + url + ')',
			backgroundSize: 'cover'
		});

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
var Comic_Items = function() {
	var obj = this;
	obj.config = {
		item_min_width: 220,
		item_max_width: 300,
		item_max_count: 10,
		item_min_count: 3

	};
	obj.item_now_count = 4;

	obj.resize_img = function() {
		var img_w = jQuery('.comics .cover').parent().width();
		var f_h = img_w + 100;
		jQuery('.comics .cover').parent()
		jQuery('.comics .cover').width(img_w);
		jQuery('.comics .cover').height(img_w);
		jQuery('.comics li > a').height(f_h);
	};
	obj.checkItemWidth = function(w) {
		return w >= obj.config.item_min_width && w <= obj.config.item_max_width;
	}
	obj.getRowItemCount = function(isadd) {
		var item_change_func = function(i) {
			return i + 1;
		};
		var item_check_func = function(count) {
			return count <= obj.config.item_max_count &&
				count >= obj.config.item_min_count
		};
		if (!isadd) {
			item_change_func = function(i) {
				return i - 1;
			};
		}

		var content_w = jQuery('.tabs_content').width();
		var count = obj.item_now_count;
		var item_w = 0;
		do {
			count = item_change_func(count);
			item_w = 100 / count - 1;
			temp_w = parseFloat(content_w) * parseFloat(item_w / 100);
			console.log({
				item_w: item_w,
				temp_w: temp_w,
				count: count
			})
			if (obj.checkItemWidth(temp_w)) {
				break;
			}
		}
		while (item_check_func(count))
		obj.item_now_count = count;
		jQuery('.comics li').width(item_w + '%');
	};
	obj.resize_item = function() {
		var w = jQuery('.comics li').width();
		if (w > obj.config.item_max_width) {
			obj.getRowItemCount(true);
		} else if (w < obj.config.item_min_width) {
			obj.getRowItemCount(false);
		}
	};
	obj.resize_all = function() {
		obj.resize_item();
		obj.resize_img();
	};

	jQuery(window).bind('resize', obj.resize_all);
	obj.resize_all();
};
var ScrollTop = function() {
	var obj = this;
	obj.config = {
		top: 800,
		showopacity: 1,
		scrolltime: 800
	};
	obj.btn_to_top = null;
	obj.is_show_btn = false;
	obj.scrolltop = function() {
		jQuery('body,html').animate({
			scrollTop: 0
		}, obj.config.scrolltime);
	};
	obj.checkShowButton = function() {
		var s = jQuery(window).scrollTop();
		if (/MSIE /i.test(navigator.userAgent)) {
			s = document.documentElement.scrollTop;
		}
		if (s > obj.config.top) {
			obj.showButton();
		} else {
			obj.hideButton();
		}
	};
	obj.showButton = function() {
		if (!!obj.is_show_btn) return;

		obj.is_show_btn = true;
		obj.btn_to_top.stop().animate({
			opacity: obj.config.showopacity
		}, 400);
	};
	obj.hideButton = function() {
		if (!obj.is_show_btn) return;

		obj.is_show_btn = false;
		obj.btn_to_top.stop().animate({
			opacity: 0
		}, 400);

	};

	obj.bindevent = function() {
		obj.btn_to_top.bind('click', obj.scrolltop);
		jQuery(window).bind('scroll', obj.checkShowButton);
	};

	obj.init = function(btn) {
		obj.btn_to_top = btn;
		obj.bindevent();
	};
};
var Comic_Items_Load = function($root) {
	var obj = this;
	obj.root = $root;
	obj.btn_next = null;
	obj.config = {
		init_count: 24,
		load_count: 12,
		unload_item_class: 'unload'
	};



	obj.check_is_end = function() {
		var unload_items = obj.root.find('li.' + obj.config.unload_item_class);
		return unload_items.length <= 0;
	};
	obj.load_next = function() {
		var unload_items = obj.root.find('li.' + obj.config.unload_item_class);
		unload_items.slice(0, obj.config.load_count).removeClass(obj.config.unload_item_class);
	};
	obj.bindevent = function() {
		obj.btn_next.bind('click', function() {
			if (!obj.check_is_end()) {
				obj.load_next();

				return false;
			}
		});
	};
	obj.init = function() {
		var all_items = obj.root.find('li');
		if (all_items.length <= obj.config.init_count)
			return;

		obj.btn_next = obj.root.find('.btn_next');
		obj.bindevent();
		all_items.slice(obj.config.init_count).addClass(obj.config.unload_item_class);
	};

	obj.init();
};



var slider = null;
var tabs = null;
var comic_items = null;
var scrolltop = null;
var comic_items_load_1 = null;
var comic_items_load_2 = null;

jQuery(document).ready(function($) {
	slider = new Slider();
	tabs = new Tabs();
	comic_items = new Comic_Items();
	scrolltop = new ScrollTop();
	comic_items_load_1 = new Comic_Items_Load(jQuery('.tab_1.tab_item'));
	comic_items_load_2 = new Comic_Items_Load(jQuery('.tab_2.tab_item'));

	slider.init();
	slider.startauto();

	tabs.init();
	scrolltop.init(jQuery('#btn_to_top'));

	jQuery('.comics img.lazyload').lazyload({
		effect: "fadeIn"
	});
	jQuery('.tops_list img.lazyload').lazyload({
		effect: "fadeIn"
	});
});