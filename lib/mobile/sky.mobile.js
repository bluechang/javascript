/**
 *
 * sky.mobile:
 * 
 * 
 * @author: blue chang
 * @time: 2016-09-21
 * 
 */


;(function(window, undefined){
	'use strict';

	// 引入jQuery
	if( !(window.$ || window.jQuery) ){
		throw new Error('Please import the jQurey library!!!');
	}

	// 常用jquery变量
	var $ = window.jQuery,
		$documemt = $(document),
		$window = $(window);

	// 常用BOM变量
	var document = window.document,
		docEle = document.documentElement,
		location = window.location,
		navigator = window.navigator;

	// 常用js方法
	var hasOwn = Object.prototype.hasOwnProperty;


	// 获取SKY副本
	var _SKY = window.SKY = window.SKY || {};


	// 浏览器支持
	_SKY.support = {
		
	};

	// 工具
	var util = _SKY.util = {
		// 动态rem
		// 问题：已知总宽，求缩放后的宽度
		// 算法: baseWidth/originalWidth = rem/currentWidth
		// 
		// 
		dynamicRem: function(designWidth, maxWidth, baseWidth){
			//设计图宽度
			designWidth = designWidth || 640;         
			//最大宽度         			
			maxWidth = maxWidth || 640;
			//基准宽度                     			
			baseWidth = baseWidth || 100;								

			//回调
			var callback = function(){ 									
	            var pageWidth = docEle.clientWidth;
	            if( maxWidth && (pageWidth > maxWidth) ){
	                pageWidth = maxWidth;
	            }
	            
	            // 算法 
	            docEle.style.fontSize = baseWidth * ( pageWidth / designWidth ) + 'px';
	        };

		    window.addEventListener('resize', callback);
		    // window.addEventListener('DOMContentLoaded', callback);
		    callback();
		}
	};

	// 各页面
	 _SKY.Page = {
	 	// 初始化
	 	init: function(){
	 		var t = this;

	 		$document.ready(function(){
	 			t.common['init']();
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

	 		// 动态rem
	 		dynamicRem: function(){
 				util.dynamicRem(640, 640);
	 		}
	 	}
	 }

	 _SKY.Page.init();

})(window);


























