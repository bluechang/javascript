/**
 *
 * backtotop:
 * 
 * 
 * @author: blue chang
 * @time: 2016-09-25
 * 
 */

;(function(window, $){
	'use strict';

	var $win = $(window);
	
	/**
	 * 构造器函数
	 */
	function BackToTop(elem, options){
		var t = this;

		t.opts = $.extend( {}, BackToTop.defaultOpts, options || {} ); 

		t.$btn = $(elem);

		t.initialize();
	}

	BackToTop.prototype.initialize = function(){
		var t = this;

		t.isAnimate = false;
		t.max = $win.height() * ( t.opts.k || 1);		

		if( !t.opts.isAuto ){  
			t.$btn.show();
		}

		t.initEvents();
	}

	// 初始化事件
	BackToTop.prototype.initEvents = function(){
		var t = this;

		t.$btn.on(t.opts.event, function(){
			t.start();
		})
	
		if( !t.opts.isAuto ) {
			return;
		}
	
		$win.on('scroll', function(){   
			t.scroll();
		}).trigger('scroll');
	}

	// 滚动
	BackToTop.prototype.scroll = function(){  
		var t = this;

		var scrollTop = $win.scrollTop();

		scrollTop >= t.max ? t.$btn.fadeIn() : t.$btn.fadeOut();
	}

	// 开始
	BackToTop.prototype.start = function(){
		var t = this;

		var event = 'wheel.BackToTop mousewheel.BackToTop DOMMouseScroll.BackToTop';

		// 运动期间 禁用滚轮
		$win.on(event, function(e){   
			return false;
		});

		t.timer = window.setInterval(function(){
			t.tick();
		}, t.opts.time);
	}

	// 停止
	BackToTop.prototype.stop = function(){
		var t = this;

		window.clearInterval( t.timer );
	}

	// tick  
	// 核心算法和逻辑
	BackToTop.prototype.tick = function(){
		var t = this;

		var scrollTop = $win.scrollTop();
		// 速度
		var speed = scrollTop / t.opts.speed;

		if( scrollTop === 0 ){  
			// 恢复禁用滚轮
			$win.off('.BackToTop');
			
			t.stop();
		}else{
			// 滚动
			$win.scrollTop(scrollTop - speed);
		}
	}

	// 默认参数
	BackToTop.defaultOpts = {
		event: 'click',
		isAuto: true,			//是否自动显隐
		speed: 4,				//移动速度,越大速度越慢
		k: 1,					//系数，屏幕高的倍数
		time: 30				//定时器执行速度
	};
	

	// 挂载到jQuery原型上
	$.fn.skyBackToTop = function(options){ 
		if( this.length === 0 ){
			var msg = this.selector || 'backtotop';
			throw new Error( '\'' + msg + '\'' + ' is not exist！！！');
		}

		// 只实例化第一个并返回
		return new BackToTop( this[0], options );
	}

})(window, jQuery);



