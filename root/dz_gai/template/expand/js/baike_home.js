var Tile = function() {
	var obj = this;
	obj.metroRoot = null;
	obj.$main_tile_effect = null;
	obj.animate_time = 3000;
	obj.animate_delaytime = 200;
	obj.getTileItem = function(index) {
		return obj.metroRoot.find('.item[data-index="' + index + '"]');
	};
	obj.getBackground = function(index) {
		return obj.metroRoot.find('.item[data-index="' + index + '"] .bg');
	};
	obj.getCharacter = function(index) {
		return obj.metroRoot.find('.item[data-index="' + index + '"] .character');
	};
	obj.getTitle = function(index) {
		return obj.metroRoot.find('.item[data-index="' + index + '"] .title');
	};



	obj.showLogo = function(callback) {
		var $logo = jQuery('.main_frame .head img');

		$logo.animate({
			top: 0
		}, 600, 'easeInOutQuart', callback);
	};
	obj.showRectBig = function(index, item_index, end_callback) {
		var $item = obj.getTileItem(index);
		var $bg = obj.getBackground(index);
		var $character = obj.getCharacter(index);
		var $title = obj.getTitle(index);
		var $title_img = $title.find('img');

		$bg.animate({
			// left: 0,
			opacity: 1
		}, 400, function() {
			$title.animate({
				bottom: 0
			}, 800, 'easeInOutQuart', function() {
				$title_img.delay(200).animate({
					right: 0
				}, 600, 'easeOutBack');
				$character.animate({
					right: 0,
					// opacity: 1
				}, 600, 'easeOutExpo', function() {
					$item.addClass('complete');
					if (!!end_callback)
						end_callback(item_index);
				});
			});
		});
	};

	obj.showRectMini = function(index, item_index, end_callback) {
		var $item = obj.getTileItem(index);
		var $bg = obj.getBackground(index);
		var $title = obj.getTitle(index);
		$bg.animate({
			// left: 0,
			opacity: 1
		}, 400, function() {
			$title.animate({
				right: 0
			}, 600, 'easeOutBack', function() {
				$item.addClass('complete');
				if (!!end_callback)
					end_callback(item_index);
			});
		});
	};
	obj.showRectMiniSimple = function(index, item_index, end_callback) {
		var $item = obj.getTileItem(index);
		var $bg = obj.getBackground(index);
		var $title = obj.getTitle(index);

		$bg.animate({
			bottom: 0
		}, 600, 'easeOutBack', function() {
			$item.addClass('complete');
			if (!!end_callback)
				end_callback(item_index);
		});
	};
	obj.showSquareBig = function(index, item_index, end_callback) {
		var $item = obj.getTileItem(index);
		var $bg = obj.getBackground(index);
		var $character = obj.getCharacter(index);
		var $title = obj.getTitle(index);
		var $title_img = $title.find('img');

		$bg.animate({
			bottom: 0
		}, 600, 'easeOutBack', function() {
			$item.addClass('complete');
			if (!!end_callback)
				end_callback(item_index);
		});
	};
	obj.showSquareMini = function(index, item_index, end_callback) {
		var $item = obj.getTileItem(index);
		var $bg = obj.getBackground(index);
		var $character = obj.getCharacter(index);
		var $title = obj.getTitle(index);
		var $title_img = $title.find('img');

		$bg.animate({
			bottom: 0
		}, 600, 'easeOutBack', function() {
			$item.addClass('complete');
			if (!!end_callback)
				end_callback(item_index);
		});
	};

	obj.showTile = function(last_show_callback, end_callback) {
		var delaytime = 0;
		var items = obj.metroRoot.find('.item');
		var end_func = function(index) {
			if (index == items.length - 1 && !!end_callback) {
				end_callback();
			}
		};
		jQuery.each(items, function(index, val) {
			var $this = jQuery(this);
			setTimeout(function() { //延时执行
				if ($this.hasClass('rect_b')) {
					obj.showRectBig($this.data('index'), index, end_func);
				}
				if ($this.hasClass('rect_m')) {
					if ($this.hasClass('simple')) {
						obj.showRectMiniSimple($this.data('index'), index, end_func);
					} else {
						obj.showRectMini($this.data('index'), index, end_func);
					}
				}
				if ($this.hasClass('square_b')) {
					obj.showSquareBig($this.data('index'), index, end_func);
				}
				if ($this.hasClass('square_m')) {
					obj.showSquareMini($this.data('index'), index, end_func);
				}
				if (index == items.length - 1 && !!last_show_callback) {
					last_show_callback();
				}
			}, delaytime);
			delaytime += obj.animate_delaytime; //延时执行
		});
	};
	obj.showListItem = function($item, item_index, end_callback) {
		$item.animate({
			right: 0
		}, 600, 'easeOutBack', function() {
			end_callback(item_index);
		});
	};
	obj.showList = function($list, last_show_callback, end_callback) {
		var delaytime = 0;
		var lis = $list.find('li');
		var end_func = function(index) {
			if (index == lis.length - 1 && !!end_callback) {
				end_callback();
			}
		};
		jQuery.each(lis, function (index, val) {
			var $this = jQuery(this);
			setTimeout(function() { //延时执行
				obj.showListItem($this, index, end_func);
				if (index == lis.length - 1 && !!last_show_callback) {
					last_show_callback();
				}
			}, delaytime);
			delaytime += 60; //延时执行
		});
	};
	obj.showListTitle = function($title, end_callback) {
		var $title_h5 = $title.find('h5');
		$title.animate({
			height: 24
		}, 400, function() {
			$title_h5.animate({
				right: 0
			}, 600, 'easeOutBack', function() {
				if (!!end_callback)
					end_callback();
			});
		});
	};
	obj.showAllRightList = function() {
	    obj.showList(jQuery('.right .list.hot'), function () {
		    obj.showList(jQuery('.right .list.new'), null, obj.showAllRightListTitle);
		});
	};
	obj.showAllRightListTitle = function() {
		obj.showListTitle(jQuery('.right .list.hot .title'), function() {
		    obj.showListTitle(jQuery('.right .list.new .title'));
		});
	};

	obj.init = function() {
		obj.metroRoot = jQuery('.metro');
		obj.showLogo();
		setTimeout(function() {
			obj.showTile(obj.showAllRightList);
		}, obj.animate_delaytime);
	};
};
var WindowScroll = function() {
	var obj = this;
	obj.fixedTop = 50;

	obj.init = function() {
		jQuery(window).bind('scroll', function() {
			var s = jQuery(window).scrollTop();
			if (/MSIE /i.test(navigator.userAgent)) {
				s = document.documentElement.scrollTop;
			}
			if (s > obj.fixedTop) {
				jQuery('.head,.slider').addClass('fixed');
			} else {
				jQuery('.head,.slider').removeClass('fixed');
			}
		});
	};
};


var tile = null;
var windowScroll = null;
jQuery(document).ready(function() {
	tile = new Tile();
	windowScroll = new WindowScroll();
	// slider.init();
	// slider.startauto();

	// tabs.init();
	// windowScroll.init();

	tile.init();
});