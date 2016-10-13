/**
 *
 * sky.pc:
 * 
 * 
 * @author: blue chang
 * @time: 2016-09-21
 * 
 */


;(function(window, $){     
	'use strict';

	// 添加jQuery库
	if( !(window.$ || window.jQuery) ){ 
		throw new Error('Please import the jQurey library!!!') 
	}; 

	// 常用BOM变量
	var document = window.document,
		location = window.location,
		navigator = window.navigator;

	// 常用jquery变量
	var $ = window.jQuery,
		$documemt = $(document),
		$window = $(window);

	// 常用js方法
	var hasOwn = Object.prototype.hasOwnProperty, 
		//查看变量类型
		toString = Object.prototype.toString,
		// 转类数组
		slice = Array.prototype.slice;	


	// 获取SKY副本
	var _SKY = window['SKY'] = window['SKY'] || {};





	// 浏览器支持
	var _SKY.support = {

	};

	// 工具
	var util = _SKY.Util = { 

		isFunction: function(obj){

		},

		// 滚动/滑动
		wheel: (function(){
			var eventName = 'wheel.wheel mousewheel.wheel DOMMouseScroll.wheel';

			// 滚轮处理函数 私有
			var callback = function(event){
				event.preventDefault();
			}

			return {	
				// 阻止滚动
				prevent: function(){
					$document.on(eventName, callback);
				},

				// 恢复滚动
				restore: function(){
					$document.off('.wheel', callback);
				}
			};
		})()
	};


	// 各页面
	_SKY.Page = {  
		// 初始化
		init: function(){ 
			$document.ready(function(){ 
				this.common.init();
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

			IEDetect: function(){
				// 是否ie8-
				var isIe8 = (function(){
					var ua = window.navigator.userAgent;
					var match = /;\s*MSIE (\d+).*?;/.exec(ua);  
					if(match && +match[1] < 9) return true;
					return false;
				})();

				// 兼容HTML
				var compatibleHTML = (function(){
					return [
							'<div class="compatible-wrap" id="js-compatible">',
							'<p class="tip"><i></i><span>您的浏览器版本过低。为保证最佳体验，</span><a href="http://browsehappy.com/">请点此更新高版本浏览器</a></p>',
							'<a href="javascript:;" class="no"><span>以后再说</span><i></i></a>',
							'<div>'
					].join('');
				})();

				if(isIe8){  
					$('body').prepend(compatibleHTML);
					$('#js-compatible .no').on('click', function(){
						$('#js-compatible').remove();
					});
				}
			}
		}
	};


	// 初始化页面
	_SKY.Page.init();

})(window, jQuery);


























