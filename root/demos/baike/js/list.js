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
			class: $item.data('class')
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
		var match = data.name.match(/【(\S*)】/);
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

var taskdata = null;
jQuery(document).ready(function($) {
	taskdata = new TaskData();
	taskdata.init();
});