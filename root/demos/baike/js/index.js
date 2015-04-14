var Tile = function() {
	var obj = this;
	obj.metroRoot = null;
	obj.$main_tile_effect = null;
	obj.animate_time = 3000;
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

	obj.showRectBig = function(index) {
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
				});
			});
		});
	};

	obj.showRectMini = function(index) {
		var $item = obj.getTileItem(index);
		var $bg = obj.getBackground(index);
		var $character = obj.getCharacter(index);
		var $title = obj.getTitle(index);
		var $title_img = $title.find('img');

		$item.addClass('complete');
	};
	obj.showSquareBig = function(index) {
		var $item = obj.getTileItem(index);
		var $bg = obj.getBackground(index);
		var $character = obj.getCharacter(index);
		var $title = obj.getTitle(index);
		var $title_img = $title.find('img');

		$item.addClass('complete');
	};
	obj.showSquareMini = function(index) {
		var $item = obj.getTileItem(index);
		var $bg = obj.getBackground(index);
		var $character = obj.getCharacter(index);
		var $title = obj.getTitle(index);
		var $title_img = $title.find('img');

		$item.addClass('complete');
	};

	obj.showTile = function() {
		var delaytime = 0;
		$.each(obj.metroRoot.find('.item'), function(index, val) {
			var $this = $(this);
			setTimeout(function() { //延时执行
				if ($this.hasClass('rect_b')) {
					obj.showRectBig($this.data('index'));
				}
				if ($this.hasClass('rect_m')) {
					obj.showRectMini($this.data('index'));
				}
				if ($this.hasClass('square_b')) {
					obj.showSquareBig($this.data('index'));
				}
				if ($this.hasClass('square_m')) {
					obj.showSquareMini($this.data('index'));
				}
			}, delaytime);
			delaytime += 200; //延时执行
		});
	};

	obj.init = function() {
		obj.metroRoot = $('.metro');
		obj.showTile();
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


var tile = null;
var windowScroll = null;
jQuery(document).ready(function($) {
	tile = new Tile();
	windowScroll = new WindowScroll();
	// slider.init();
	// slider.startauto();

	// tabs.init();
	// windowScroll.init();

	tile.init();
});