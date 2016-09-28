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
		t.$slides = t.$wrapper.children(t.opts.slide);
		t.$pagination = getJq(t.opts.pagination, t.$container);
		t.$btnPrev = getJq(t.opts.btnPrev, t.$container);
		t.$btnNext = getJq(t.opts.btnNext, t.$container);

		t.initialize();
	}

	Slider.prototype.initialize = function(){
		var t = this;

		t.index = t.opts.defaultIndex;
		t.length = t.$slides.length;
		t.slideWidth = t.$container.width();

		var upperName = t.opts.effect.charAt(0).toUpperCase() + t.opts.effect.substr(1);
		t.effectFn = t['effect' + upperName];

		t.initPagination();

		t.initStyle();
		t.effectFn();
	}

	Slider.prototype.initStyle = function(){
		var t = this;

		if(t.opts.effect === 'slide'){
			t.$wrapper.append(t.$slides.eq(0).clone());
			t.$slides = t.$wrapper.children(t.opts.slide);

			t.$wrapper.css({
				width: t.slideWidth * t.length,
				postion: 'absolute',
				left: 0
			});
			t.$slides.each(function(i){
				$(this).css({
					width: t.slideWidth,
					position: 'absolute',
					left: i * t.slideWidth
				})
			});

			t.length += 1;
		}
		
	}

	Slider.prototype.initPagination = function(){
		var t = this;

		var paginationHTML = '',	
			bulletClass = t.opts.bullet.substr(1);
		for(var i = 0; i < t.length; i++){
			paginationHTML += '<' + t.opts.paginationElem + ' class="' + bulletClass + '"></' + t.opts.paginationElem + '>'
		}
		t.$pagination.html(paginationHTML);
		t.$bullets = t.$pagination.children(t.opts.bullet);
	}

	// fade
	Slider.prototype.effectFade = function(){

	}

	// slide
	Slider.prototype.effectSlide = function(){
		var t = this;
	}

	Slider.prototype.prev = function(){
		var t = this;

		t.index -= 1;
	}

	Slider.prototype.next = function(){
		var t = this;

		t.index += 1;
	}

	Slider.prototype.setIndex = function(index){
		var t = this;

		
	}

	// 默认参数
	Slider.defaultOpts = {
		effect: 'fade',								//fade、slide
		wrapper: '.slider-wrapper',					//slide容器
		slide: '.slider-slide',						//slide
		btnPrev: '.slider-btn-prev',				
		btnNext: '.slider-btn-next',
		pagination: '.slider-pagination',
		bullet: '.slider-bullet',
		paginationElem: 'span',
		defaultIndex: 0,
		speed: 600
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



