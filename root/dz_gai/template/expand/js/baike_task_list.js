var TaskData = function() {
	var obj = this;

	obj.cate_list = [];
	obj.task_list = [];

	obj.get_cate_item = function(val) {
		var $item = jQuery(val);

		return {
			cate: $item.data('cate'),
			name: $item.text(),
			root: $item.data('root'),
			itemclass: $item.data('class')
		};
	};
	obj.init_cate = function($root) {
		var items = $root.find('li');
		jQuery.each(items, function(index, val) {
			var item = obj.get_cate_item(val);
			obj.cate_list.push(item);
		});
	};
	obj.get_task_cate = function(cate) {
		cate = cate.toLocaleLowerCase();
		var newcatelist = obj.cate_list.slice(0);
		newcatelist.sort(function(a, b) {
			return a.cate.length > b.cate.length ? -1 : 1
		});
		//先从多个（字符串比较长）的分类开始匹配，防止被短的分类提前分配掉
		for (var i = 0; i < newcatelist.length; i++) {
			var item = newcatelist[i];
			var index = cate.indexOf(item.cate);
			var w_index = cate.indexOf('w' + item.cate); //防止婚礼任务被别的分类分配
			if (index >= 0 && w_index < 0) {
				return {
					val: item.cate,
					index: cate.substr(index + item.cate.length)
				};
			}
		};

		return null;
	};
	obj.get_task_item = function(val) {
		var $item = jQuery(val);
		var data = {
			name: $item.text(),
			url: $item.attr('href')
		};
		var match = data.name.match(/【(\S*?)】/);
		if (match.length < 2) {
			return null;
		}
		data.cate = match[1];
		data.name = data.name.replace(match[0], '');

		var title = $item.text();
		var cate = obj.get_task_cate(data.cate);
		if (cate == null) {
			return null;
		}
		data.cate = cate.val;
		data.index = cate.index;

		return data;
	};
	obj.init_task = function($root) {
		var items = $root.find('a');
		jQuery.each(items, function(index, val) {
			var item = obj.get_task_item(val);
			if (!!item) {
				obj.task_list.push(item);
			}
		});
	};

	obj.get_catelist = function(root) {
		return jQuery.grep(obj.cate_list, function(x, i) {
			return x.root == root;
		});
	};
	obj.get_tasklist = function(cate) {
		return jQuery.grep(obj.task_list, function(x, i) {
			return x.cate == cate;
		});
	};
	obj.find_tasklist = function(kw) {
		return jQuery.grep(obj.task_list, function(x, i) {
			return x.name.indexOf(kw) >= 0;
		});
	};

	obj.init = function() {
		obj.init_cate(jQuery('.main_frame .all_cate'));
		obj.init_task(jQuery('.main_frame .all_task'));
	};

	return obj;
};
var TaskAnimate = function() {
	var obj = this;
	obj.show_children = function($title, end_callback) {
		$title.addClass('animateing');
		$title.addClass('open');
		var $cate = $title.parent();
		var $children_frame = $cate.children('.children_frame');
		var $children = $children_frame.children('.children');
		$children_frame.animate({
			height: $children.height()
		}, 400, 'easeInOutQuart', function() {
			$children_frame.css({
				height: 'auto'
			});
			$title.removeClass('animateing');
			if (!!end_callback) {
				end_callback();
			}
		});
	};
	obj.hide_children = function($title, end_callback) {
		$title.addClass('animateing');
		$title.removeClass('open');
		var $cate = $title.parent();
		var $children_frame = $cate.children('.children_frame');
		var $children = $children_frame.children('.children');
		$children_frame.animate({
			height: 0
		}, 400, 'easeInOutQuart', function() {
			$title.removeClass('animateing');
			if (!!end_callback) {
				end_callback();
			}
		});
	};

	obj.bindevent = function($cate) {
		if ($cate.hasClass('bindevent')) {
			return;
		}
		$cate.addClass('bindevent');
		$cate.bind('click', function() {
			var $this = jQuery(this);
			if ($this.hasClass('animateing')) {
				return;
			}
			if ($this.hasClass('open')) {
				obj.hide_children($this);
			} else {
				obj.show_children($this);
			}
		});

	}

	return obj;
};
// .main_content.all_cate.children_frame
var TaskList = function() {
	var obj = this;
	obj.taskdata = null;
	obj.animate = new TaskAnimate();
	obj.all_task_frame = null;

	obj.set_data = function(data) {
		obj.taskdata = data;
	};

	obj.uie = function(tag) {
		return jQuery('<' + tag + '></' + tag + '>');
	};
	obj.write_task_item = function(item) {
		var li = obj.uie('li');
		var a = obj.uie('a');
		var b = obj.uie('b');
		// var i = obj.uie('i');
		var span = obj.uie('span');
		li.append(a);
		a.attr({
			href: item.url,
			target: '_blank'
		});
		a.append(b);
		// a.append(i);
		a.append(span);
		b.html(item.cate + item.index);
		// i.html(item.index);
		span.html(item.name);

		return li;
	};
	obj.write_tasks = function(list) {
		var ul = obj.uie('ul');
		jQuery.each(list, function(index, val) {
			var li = obj.write_task_item(val);
			ul.append(li);
		});

		return ul;
	};

	obj.write_tasks_order = function(cate) {
		var list = obj.taskdata.get_tasklist(cate);
		list.sort(function(a, b) {
			return parseInt(a.index) > parseInt(b.index) ? 1 : -1
		});

		return obj.write_tasks(list);
	};

	obj.hasChildrenCate = function(item) {
		return item.cate.indexOf('_root') > 0;
	};

	obj.write_cate = function(item) {
		var frame = obj.uie('div');
		var title = obj.uie('div');
		var i = obj.uie('i');
		var span = obj.uie('span');
		frame.append(title);
		frame.addClass('cate');
		frame.addClass(item.itemclass);
		title.addClass('title');
		title.append(i);
		title.append(span);
		span.html(item.name);

		var children_frame = obj.uie('div');
		var children;
		if (obj.hasChildrenCate(item)) {
			children = obj.write_cates(item.cate);
		} else {
			children = obj.write_tasks_order(item.cate);
		}
		if (!!children) {
			children_frame.addClass('children_frame');
			frame.append(children_frame);
			children.addClass('children');
			children_frame.append(children);
		}
		obj.animate.bindevent(title);

		return frame;
	};
	obj.write_cates = function(root) {
		var list_box = obj.uie('div');

		var cate_list = obj.taskdata.get_catelist(root);
		jQuery.each(cate_list, function(index, val) {
			var item = obj.write_cate(val);
			list_box.append(item);
		});

		return list_box;
	};
	obj.write_all = function() {
		obj.all_task_frame.empty();
		var list = obj.write_cates('root');
		list.addClass('all_cate');
		obj.all_task_frame.append(list);
	};
	obj.init = function() {
		obj.all_task_frame = jQuery('.main_frame .main_content .tasklist');
	};
	obj.open_first = function() {
		var first = jQuery('.main_content .all_cate .cate:first .title');
		first.trigger('click');
	};

	return obj;
};


var taskdata = null;
var tasklist = null;
jQuery(document).ready(function($) {
	taskdata = new TaskData();
	taskdata.init();
	tasklist = new TaskList();
	tasklist.set_data(taskdata);
	tasklist.init();
	tasklist.write_all();
	setTimeout(tasklist.open_first, 0);
});