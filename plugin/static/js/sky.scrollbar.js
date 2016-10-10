
/**
 *
 * popup:
 * 
 * 
 * @author: blue chang
 * @time: 2016-09-21
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
	function ScrollBar(elem, options){  
		var t = this;

		t.opts = $.extend(true, {}, ScrollBar.defaultOpts, options || {});

		t.$container = $(elem);
		t.$scrollbar = getJq(t.opts.scrollbar);
		t.$panel = getJq(t.opts.panel);
		t.$bar = t.$scrollbar.children(t.opts.bar);

		t.initialize();
	};

	ScrollBar.prototype.initialize = function(){
		var t = this;

		t.panelElem = t.$panel.get(0);

		t.contianerWidth = t.$container.width();
		t.contianerHeight = t.$container.height();
		t.scrollbarWidth = t.$scrollbar.width();
		t.scrollbarHeight = t.$scrollbar.height();
		t.panelWidth = t.panelElem.scrollWidth;
		t.panelHeight = t.panelElem.scrollHeight;

		if(t.contianerHeight >= t.panelHeight){
			t.$scrollbar.hide();
			return;
		}

		t.initLayout();
		t.initEvents();
	};

	ScrollBar.prototype.initLayout = function(){ 
		var t = this;

		t.$panel.css({
			width: '100%',
			height: '100%',
			overflow: 'hidden'
		});

		t.updateLayout();
	}

	// 更新布局
	ScrollBar.prototype.updateLayout = function(){
		var t = this;

		t.setAspect();

		t.$panel.scrollTop(t.scrollTop);

		t.$bar.css('height', t.aspectHeight * t.scrollbarHeight)
				.stop(true, true)
				.animate({top: t.aspectTop * t.scrollbarHeight}, t.opts.time);
	}

	// 设置比率
	ScrollBar.prototype.setAspect = function(){
		var t = this;

		t.maxScrollTop = t.panelElem.scrollHeight - t.contianerHeight;
		t.maxBarTop = t.scrollbarHeight - parseFloat(t.$bar.height()) / 2;

		if(t.scrollTop < 0){
			t.scrollTop = 0;
		}

		if(t.scrollTop > t.maxScrollTop){
			t.scrollTop = t.maxScrollTop;
		}

		if(t.barTop < 0){
			t.barTop = 0
		}

		if(t.barTop > t.maxBarTop){
			t.barTop = t.maxBarTop;
		}

		t.aspectTop = t.scrollTop / t.panelElem.scrollHeight;
		t.aspectHeight = t.contianerHeight / t.panelElem.scrollHeight; 
	}

	ScrollBar.prototype.initEvents = function(){
		var t = this;

		t.wheelEvent();
		t.scrollbarEvent();
		t.barEvent();
	}

	// 滚轮事件
	ScrollBar.prototype.wheelEvent = function(){
		var t = this;

		var k;
		var wheelEvent = 'wheel.ScrollBar mousewheel.ScrollBar DOMMouseScroll.ScrollBar';

		t.$container.on(wheelEvent, function(e){		

			e = e.originalEvent;								
			k = (e.deltaY || -e.wheelDelta || e.detail) > 0 ? 1 : -1;

			t.scrollTop = t.$panel.scrollTop() + k*t.opts.speed;

			t.updateLayout();
		});
	}

	// scrollbar事件
	ScrollBar.prototype.scrollbarEvent = function(){
		var t = this;

		function getPos(){
			var top;

			return top;
		};

		t.$scrollbar.on('click', function(e){

		});
	}

	// bar事件
	ScrollBar.prototype.barEvent = function(){
		var t = this;


	}

	// 默认参数
	ScrollBar.defaultOpts = {
		scrollbar: '.scrollbar',
		bar: '.bar',
		panel: '.scrollbar-panel',
		speed: 30,
		time: 60
	};
	

	// 挂载到jQuery原型上
	$.fn.skyScrollBar = function(options){  
		// 只实例化第一个并返回
		if(this.length === 0){
			throw new Error('The elem is not exist!!!');
		}

		return new ScrollBar(this[0], options);
	}

})(window, jQuery);



