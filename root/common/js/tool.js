var Tools = {
	appendJs: function(url, callback) {
		var script = document.createElement('script');
		script.type = 'text/javascript';
		script.src = url;
		if (!!callback) {
			script.onload = callback;
		}
		document.body.appendChild(script);

		return script;
	},
	appendCss: function(url, callback) {
		var link = document.createElement('link');
		link.rel = 'stylesheet';
		link.type = 'text/css';
		link.href = url;
		if (!!callback) {
			link.onload = callback;
		}
		document.body.appendChild(link);

		return link;
	},
	uie: function(tag) {
		return document.createElement(tag);
	}
};