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

	// 添加jQuery库
	if( !(window.$ || window.jQuery || window.Zepto) ){ 
		throw new Error('Please import the jQurey/Zepto library!!!') 
	}; 

	// 常用BOM变量
	var document = window.document;

	// 常用jquery/zepto变量
	var $ = window.$ || window.jQuery || window.Zepto,
		$win = $(window),
		$doc = $(document),
		$body = $(document.body);

	// 常用js方法
	var hasOwn = Object.prototype.hasOwnProperty, 
		//查看变量类型
		toString = Object.prototype.toString,
		// 转类数组
		slice = Array.prototype.slice;	


	// 获取SKY副本
	var _SKY = window['SKY'] = window['SKY'] || {};


	// 浏览器支持
	_SKY.support = {
		// 是否是ie8-
		isIE8: (function(){
			var ua = window.navigator.userAgent,
				rie8 = /;\s*MSIE (\d+).*?;/,
				match = rie8.exec( ua );  

			if(match && +match[1] < 9) { 
				return true;
			}

			return false;
		})(),

		// 是否是空对象
		isEmptyObject: function(obj){
			for(var name in obj){
				// 能进入这里的说明 obj 中有数据
				return false;
			}

			return true;
		}
	};

	// 工具
	var util = _SKY.Util = { 

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
					$doc.on(eventName, callback);
				},

				// 恢复滚动
				restore: function(){
					$doc.off('.wheel', callback);
				}
			};
		})()
	};


	// 各页面
	_SKY.Page = {  
		// 初始化
		init: function(){ 
			var t = this;

			$doc.ready(function(){ 
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

			IEDetect: function(){

				// 兼容HTML
				var compatibleHTML = (function(){
					return [
							'<div class="compatible-wrap" id="js-compatible">',
							'<p class="tip"><i></i><span>您的浏览器版本过低。为保证最佳体验，</span><a href="http://browsehappy.com/">请点此更新高版本浏览器</a></p>',
							'<a href="javascript:;" class="no"><span>以后再说</span><i></i></a>',
							'<div>'
					].join('');
				})();

				if( _SKY.support.isIE8 ){  
					$('body').prepend( compatibleHTML );
					$('#js-compatible .no').on('click', function(){
						$('#js-compatible').remove();
					});
				}
			}
		}
	};


	// 初始化页面
	_SKY.Page.init();

})(window);


























