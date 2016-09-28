/**
 *
 * tab:
 * 
 * 
 * @author: blue chang
 * @time: 2016-09-25
 * 
 */

;(function(window, $){
	'use strict';

	// 获取jQuery对象
	var getJq = function(selector, context){
		var jq = null;
		context = context || window.document;

		if(context === window.document){
			jq = $(selector);
			if(jq.length === 0){
				throw new Error('$("' + selector + '") is not exist!!!');
			}
		}else{
			jq = $(selector, context);
			if(jq.length === 0){
				getJq(selector, window.document);
			}
		}

		return jq;
	};
	
	// 构造器
	function Slider(elem, options){
		var t = this;

		t.opts = $.extend(true, {}, Slider.defaultOpts, options || {});

		t.$container = $(elem);
		t.$wrapper = getJq(t.opts.wrapper, t.$container);
		t.$btnPrev = t.$container.find(t.opts.btnPrev);
		t.$btnNext = t.$container.find(t.opts.btnNext);
		t.$indicator = t.$container.find(t.opts.indicator);
		
		t.$slides = t.$wrapper.children(t.opts.slide);

		t.initialize();
	}

	Slider.prototype.initialize = function(){
		var t = this;

		t.index = t.opts.defaultIndex;
		t.count = t.$slides.length;
		t.slideWidth = t.$container.width();
		t.slideHeight = t.$container.height();

		//是否正在执行动画
		t.isAnimate = false;						

		var upperName = t.opts.effect.charAt(0).toUpperCase() + t.opts.effect.substr(1);
		t.effectFn = t['changeBy' + upperName];

		t.$wrapper.css('position', 'relative');
		t.$slides.css({display: 'none', position: 'absolute'});
		t.$slides.eq(t.index).css('display', 'block');

		t.initIndicator();

		t.ininEvents();
	}

	Slider.prototype.initIndicator = function(){
		var t = this;

		var indicatorHTML = '',	
			dotClass = t.opts.dot.substr(1);
		for(var i = 0; i < t.count; i++){
			indicatorHTML += '<' + t.opts.indicatorChildTag + ' class="' + dotClass + '"></' + t.opts.indicatorChildTag + '>'
		}
		t.$indicator.html(indicatorHTML); 
		t.$dots = t.$indicator.children();  

		t.$dots.removeClass(t.opts.active)
			.eq(t.index).addClass(t.opts.active);
	}

	Slider.prototype.ininEvents = function(){
		var t = this;

		t.$btnPrev.on('click', function(){
			t.prev();
		})

		t.$btnNext.on('click', function(){
			t.next();
		})

		t.$dots.on(t.opts.eventType, function(){
			var i = $(this).index();
			t.setIndex(i);
		});

		t.$container.hover(function(){
			t.stop();
		},function(){
			t.play();
		});

		t.play();
	}

	// fade
	Slider.prototype.changeByFade = function(index){
		var t = this;

		t.$slides.fadeOut(t.opts.speed)
			.css('z-index', 2)
				.eq(index)
					.css('z-index', 5)
						.stop(true, true)
							.fadeIn(t.opts.speed);
	}

	// slide
	Slider.prototype.changeByScroll = function(index){ 
		var t = this;   console.log(index, t.index);

		var scrollWidth = (index > t.index) ? t.slideWidth : -t.slideWidth;  
		var itemNew = t.$slides.eq(index); 		
		var itemOld = t.$slides.eq(t.index);  	

		t.isAnimate = true;

		// 动画结束回调
		function doFinash() {  
			itemOld.css('display', 'none');
			t.isAnimate = false;
		}

		// 移除旧的元素
		itemOld.animate({left: -scrollWidth}, t.opts.speed);
		// 移入新的元素
		itemNew.css({ display: 'block', left: scrollWidth})
				.animate({left: 0}, t.opts.speed, doFinash);
	}

	Slider.prototype.play = function(){
		var t = this;

		t.timer = window.setInterval(function(){
			t.next();
		}, t.opts.autoDelay);
	}

	Slider.prototype.stop = function(){
		var t = this;

		window.clearInterval(t.timer);
	}

	// 上一个
	Slider.prototype.prev = function(){
		var t = this;

		t.setIndex(t.index - 1);
	}

	// 下一个
	Slider.prototype.next = function(){
		var t = this;

		t.setIndex(t.index + 1);
	}

	Slider.prototype.setIndex = function(index){ 
		var t = this;		

		if(index < 0){ index = t.count - 1; }
		if(index >= t.count){ index = 0; }

		t.changeTo(index);
	}

	Slider.prototype.changeTo = function(index){
		var t = this;

		if(t.index === index || t.isAnimate) { return; }

		t.effectFn.call(t, index);
		t.index = index;

		t.$dots.removeClass(t.opts.active)
				.eq(index).addClass(t.opts.active);
	}

	// 默认参数
	Slider.defaultOpts = {
		effect: 'fade',								//fade、slide
		eventType: 'mouseover',
		wrapper: '.slider-wrapper',					//slide容器
		slide: '.slider-slide',						//slide
		btnPrev: '.slider-btn-prev',				
		btnNext: '.slider-btn-next',
		indicator: '.slider-indicator',
		indicatorChildTag: 'a',
		dot: '.slider-dot',
		active: 'on',
		isArrowVisible: true,
		defaultIndex: 0,
		autoDelay: 2500,
		speed: 500
	};
	

	// 挂载到jQuery原型上
	$.fn.skySlider = function(options){ 
		// 只实例化第一个并返回
		if(this.length === 0){
			throw new Error('The elem is not exist!!!');
		}

		// 只实例化第一个并返回
		return new Slider(this[0], options);
	}

})(window, jQuery);



