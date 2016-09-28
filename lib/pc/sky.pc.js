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
	if(!($ || window.jQuery)){ 
		throw new Error('Please import the jQurey library!!!') 
	}; 

	// 变量
	var document = window.document;  

	// 方法
	var toString = Object.prototype.toString,
		hasOwn = Object.prototype.hasOwnProperty,
		slice = Array.prototype.slice;	

	// 判断类型
	var isType = function(type){
		return function(obj){
			return toString.call(obj) === '[object ' + type + ']';
		};
	};

	// 获取SKY副本
	var _SKY = window['SKY'] = window['SKY'] || {};

	// 添加 工具
	var util = _SKY.Util = { 

		// 滚动/滑动
		wheel: (function(){
			// 滚轮处理函数 私有
			var wheelHandler = function(event){
				event.preventDefault();
			}

			return {	
				// 阻止滚动
				prevent: function(){
					$doc.on('wheel mousewheel DOMMouseScroll', wheelHandler);
				},

				// 恢复滚动
				restore: function(){
					$doc.off('wheel mousewheel DOMMouseScroll', wheelHandler);
				}
			};
		})()
	};


	// 添加 通用UI
	_SKY.CommonUI = {
		
	};

	
	// 添加 UI (针对具体的需求)
	_SKY.UI = { 
		
	};


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
			},

			// 回顶
			backToTop: function(){
				var $back = $('.back-to-top'),
					$win = $(window),
					max = $win.height() / 3,
					timer = null,
					onScroll = function(){
						var scrollTop = $win.scrollTop();
						if(scrollTop >= max){
							$back.fadeIn();
						}else{
							$back.fadeOut();
						}
					},
					onResize = function(){
						max = $win.height() / 3;
					},
					onClick = function(){
						timer = window.setInterval(function(){
							var scrollTop = $win.scrollTop(),
								speed = scrollTop / 4;

							if(scrollTop === 0){
								clearInterval(timer);
							}else{
								$win.scrollTop(scrollTop - speed);
							}
						}, 30);
					};

				$win.on('resize', onResize);
				$win.on('scroll', onScroll);
				$back.on('click', onClick);
			}
		}
	};


	// 初始化页面
	_SKY.Page.init();

})(window, jQuery);


























