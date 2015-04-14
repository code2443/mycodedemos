http://amm.moe/ext/js/gelbooru.js// ==UserScript==
// @name         gelbooru自定义
// @namespace    http://www.gelbooru.com/CurrentModel/By/amoe
// @version      1.0
// @description  gelbooru自定义
// @author       amoe
// @match        http://www.gelbooru.com/*
// @grant        none
// ==/UserScript==

function appendjs(url, callback) {
    var script = document.createElement('script');
    script.src = url;
    script.onload = callback;
    document.body.appendChild(script);
}
appendjs('http://lib.sinaapp.com/js/jquery/1.9.1/jquery-1.9.1.min.js', function() {
	appendjs('http://amm.moe/ext/js/gelbooru.js');
});