/**
 *
 * sky.pc:
 * 
 * 
 * @author: blue chang
 * @time: 2016-09-21
 * 
 */


;(function(window, undefined){
	'use strict';

	// 引入jQuery
	if( !(window.jQuery || window.$) ){
		throw new Error('jQuery is not exist!!!');
	}

	// 常用变量
	var $ = window.jQuery,

		document = window.document,
		location = window.location,
		navigator = window.navigator;

	// 引用核心
	var hasOwn = Object.prototype.hasOwnProperty;


	// 获取SKY副本
	var _SKY = window.SKY = window.SKY || {};


	// 各页面
	 _SKY.Page = {
	 	// 初始化
	 	init: function(){
	 		var t = this;

	 		$(document).ready(function(){
	 			t.common.init();
	 		});
	 	},

	 	// 公共
	 	common: {
	 		init: function(){
	 			for(var name in this){
	 				if(name === 'init') continue;
	 				this[name]();
	 			}
	 		},

	 		// 检测IE8-
	 		IEDetect: function(){
	 			
	 			// ie8-正则
	 			var rie = /;\sMSIE\s(\d+)\.\d;/g;

	 			// 是否IE8-
	 			var isIe8 = function(){
	 				var ua = navigator.userAgent;
	 				var match = rie.exec(ua);
	 				if(match && +match[1] < 9){
	 					return true;
	 				}
	 				return false;
	 			}；

	 			// 兼容提示 HTML
	 			var compatibleHTML = (function(){
	 				return [
	 					‘<div class="compatible-wrap" id="js-compatible">’,
	 						'<p class="tip"><i></i>您的浏览器版本过低，为保证最佳体验，<a href="http://www.browsehappy.com">请点击更新你的的浏览器</a></p>',
	 						‘<a href="javascript:;" class="no">以后再说<i></i></a>’,
	 					'</div>'
	 				].join('');
	 			})();

	 			if(isIe8){
	 				$('body').prepend(compatibleHTML);
	 				$('#js-compatible .no').on('click', function(){
	 					$('#js-compatible').remove();
	 				})
	 			}
	 		}
	 	}
	 }


})(window);


























