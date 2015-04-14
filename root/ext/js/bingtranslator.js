// ==UserScript==
// @name         bing翻译Widget
// @namespace    http://amm.moe/MicrosoftTranslatorWidget/By/AMing
// @version      1.0
// @description  bing翻译Widget
// @author       AMing
// @match        http://kancolle.aemedia.org/*
// @match        http://kan.aemedia.org/*
// @grant        none
// ==/UserScript==

var appendBingTranslator = function() {
	var div = document.createElement('div');
	div.id = 'MicrosoftTranslatorWidget';
	div.className = 'Dark';
	div.style.position = 'fixed';
	div.style.top = 0;
	div.style.left = 0;
	div.style.color = 'white';
	div.style.backgroundColor = '#555555';
	document.body.appendChild(div);

	var s = document.createElement('script');
	s.type = 'text/javascript';
	s.charset = 'UTF-8';
	s.src = ((location && location.href && location.href.indexOf('https') == 0) ? 'https://ssl.microsofttranslator.com' : 'http://www.microsofttranslator.com') + '/ajax/v3/WidgetV3.ashx?siteData=ueOIGRSKkd965FeEGM5JtQ**&ctf=False&ui=true&settings=Manual&from=';
	var p = document.getElementsByTagName('head')[0] || document.documentElement;
	p.insertBefore(s, p.firstChild);

};

appendBingTranslator();