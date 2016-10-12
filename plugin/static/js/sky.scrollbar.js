
/**
 *
 * scrollBar:
 * 
 * 
 * 
 * @author: blue chang
 * @time: 2016-10-10
 * 
 */



;(function(window, $){
	'use strict';

	var $doc = $(document);

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
		t.$scrollbar = getJq(t.opts.scrollbar, t.$container);
		t.$panel = getJq(t.opts.panel, t.$container);
		t.$bar = t.$scrollbar.children(t.opts.bar);

		t.initialize();
	};

	ScrollBar.prototype.initialize = function(){
		var t = this;

		t.panelElem = t.$panel.get(0);
		t.barElem = t.$bar.get(0);  

		t.contianerWidth = t.$container.width();
		t.contianerHeight = t.$container.height();
		t.scrollbarWidth = t.$scrollbar.width();
		t.scrollbarHeight = t.$scrollbar.height();

		t.updateLayout();
		t.initEvents();
	};

	// 设置比率
	ScrollBar.prototype.setAspect = function(){
		var t = this;

		// 最大滚动距离
		t.maxScrollTop = t.panelElem.scrollHeight - t.contianerHeight;

		if(t.scrollTop < 0){
			t.scrollTop = 0;
		}

		if(t.scrollTop > t.maxScrollTop){
			t.scrollTop = t.maxScrollTop;
		}

		// 距顶比
		t.aspectTop = t.scrollTop / t.panelElem.scrollHeight;
		// 高度比
		t.aspectHeight = t.contianerHeight / t.panelElem.scrollHeight; 
	}

	// 更新布局
	ScrollBar.prototype.updateLayout = function(){
		var t = this;

		// 更新比率
		t.setAspect();

		// 更新panel
		t.$panel.scrollTop(t.scrollTop);

		// 更新scrollBar
		t.contianerHeight >= t.panelElem.scrollHeight ? t.$scrollbar.hide() : t.$scrollbar.show();

		// 更新bar
		t.$bar.css('height', t.aspectHeight * t.scrollbarHeight)
				.stop(true, true)
				.animate({top: t.aspectTop * t.scrollbarHeight}, t.opts.time);
	}

	// 初始化事件
	ScrollBar.prototype.initEvents = function(){
		var t = this;

		t.wheelEvent();
		t.scrollbarEvent();
		t.barEvent();
	}

	// 滚轮事件
	ScrollBar.prototype.wheelEvent = function(){
		var t = this;

		var k;		// 系数
		var wheelEvent = 'wheel mousewheel DOMMouseScroll';

		t.$container.on(wheelEvent, function(e){		

			e = e.originalEvent;								
			k = (e.deltaY || -e.wheelDelta || e.detail) > 0 ? 1 : -1;

			t.scrollTop = t.$panel.scrollTop() + k*t.opts.speed;
			t.updateLayout();
		});
	}

	// 获取相对于scrollbar的鼠标坐标
	ScrollBar.prototype.getPos = function(event){
		var t = this;

		return {
			x: event.clientX - t.$scrollbar.offset().left,
			y: event.clientY - t.$scrollbar.offset().top
		};
	}

	// scrollbar事件
	ScrollBar.prototype.scrollbarEvent = function(){
		var t = this;

		t.$scrollbar.on('click', function(e){
			t.setScrollbar(e);
		});
	}

	ScrollBar.prototype.setScrollbar = function(e){
		var t = this;

		var pos = t.getPos(e);

		// bar的位移 转成 panel的scrollTop,  且鼠标居于滑块中心
		t.scrollTop = (pos.y - t.barElem.offsetHeight/2) / t.scrollbarHeight * t.panelElem.scrollHeight;
		t.updateLayout();
	}

	// bar事件
	ScrollBar.prototype.barEvent = function(){
		var t = this;

		// 阻止冒泡到scrollBar上
		t.$bar.on('click', function(e){
			return false;
		});

		// 按下
		t.$bar.on('mousedown', function(e){
			var pos = t.getPos(e);

			var disY = pos.y - t.$bar.position().top;

			// 移动
			$doc.on('mousemove.ScrollBar', function(e){
				t.setBar(e, disY);	
			})

			// 移动期间,禁用选取
			$doc.on('selectstart.ScrollBar', function(){
				return false;
			})

			// 松开时, 删除ScrollBar域中的所有事件
			$doc.on('mouseup.ScrollBar', function(){
				$doc.off('.ScrollBar');
			});
		});
	}

	ScrollBar.prototype.setBar = function(event, distance){
		var t = this;

		var pos = t.getPos(event);    

		// bar的位移 转 panel的scrollTop
		t.scrollTop = (pos.y - distance) / t.scrollbarHeight * t.panelElem.scrollHeight;
		t.updateLayout();
	}

	// 调到具体位置
	ScrollBar.prototype.jump = function(number){
		var t = this;

		t.scrollTop = parseFloat(number);
		t.updateLayout();
	}

	// 默认参数
	ScrollBar.defaultOpts = {
		scrollbar: '.scrollbar',			//滚动条
		bar: '.bar',						//滑块
		panel: '.scrollbar-panel',			//内容面板
		speed: 30,							//滚轮每次滚动距离
		time: 100							//滑块滚动时间
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



