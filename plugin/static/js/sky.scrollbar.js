
/**
 *
 * scrollBar:
 *
 * 滚动条是：滑块移动，滚动条不动
 * 窗口是：  整个内容移动，窗口不动
 *
 * 窗口滚动 等价于 滑块的top在移动
 * 窗口高度 等价于 滑块的高度
 *
 * 位移、高度不同，但比率相同
 *
 * 核心算法：
 * 滚动比：
 * panel.scrollTop / panel.scrollHeight == bar.top / scrollbar.height
 * 高度比：
 * container.height / panel.scrollHeight == bar.offsetHeight / scrollbar.height
 * 
 * 注：
 * 1、panel的高度会变化且overflow:hidden时, jquery不能获取滚动的总大小，必须使用panel.scrollHeight来获取panel的总高度
 * 2、由于panel的变化，所以bar的高度也会跟着变化，所以使用bar.offsetHeight
 * 3、其它变量初始化确定
 *
 *
 * 
 * 
 * @author: blue chang
 * @time: 2016-10-10
 * 
 */



;(function(window, $){
	'use strict';

	var $doc = $(window.document);

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
			// 递归
			if(jq.length === 0){
				jq = getJq(selector, window.document);
			}
		}

		return jq;
	};


	// 构造器
	function ScrollBar(elem, options){  
		var t = this;

		t.opts = $.extend(true, {}, ScrollBar.defaultOpts, options || {});

		t.$container = $(elem);
		t.$panel = getJq(t.opts.panel, t.$container);
		t.$scrollbar = getJq(t.opts.scrollbar, t.$container);
		t.$bar = t.$scrollbar.children(t.opts.bar);

		t.initialize();
	};

	ScrollBar.prototype.initialize = function(){
		var t = this;

		t.panelElem = t.$panel.get(0);
		t.barElem = t.$bar.get(0);  

		t.scrollVal = 0;

		if(t.opts.direction === 'vertical'){
			t.containerSize = t.$container.height();					// 确定需要的容器大小
			t.scrollbarSize = t.$scrollbar.height();					// 确定需要的滚动条大小
			t.scrollTotalProp = 'scrollHeight';							// 确定需要滚动总大小的属性
			t.scrollAspect = 'scrollTop';								// 确定滚动方位

			t.barSizeCss = 'height';									// 确定bar大小的css属性
			t.barPosCss = 'top';										// 确定bar方位的css属性
		}

		if(t.opts.direction === 'horizontal'){
			t.containerSize = t.$container.width();
			t.scrollbarSize = t.$scrollbar.width();
			t.scrollTotalProp = 'scrollWidth';
			t.scrollAspect = 'scrollLeft';

			t.barSizeCss = 'width';
			t.barPosCss = 'left';
		}

		t.updateLayout();    
		t.initEvents();
	};

	// 设置比率
	ScrollBar.prototype.setAspectRatio = function(){
		var t = this;

		// 最大滚动距离
		t.maxScrollVal = t.panelElem[t.scrollTotalProp] - t.containerSize; 
		
		if(t.scrollVal < 0){
			t.scrollVal = 0;
		}

		if(t.scrollVal > t.maxScrollVal){
			t.scrollVal = t.maxScrollVal;
		}

		// 距顶/左比
		t.aspectTop = t.scrollVal / t.panelElem[t.scrollTotalProp];
		// 大小比
		t.aspectSize = t.containerSize / t.panelElem[t.scrollTotalProp];
	}

	// 更新布局
	// 核心逻辑
	ScrollBar.prototype.updateLayout = function(){    
		var t = this;

		// 更新比率
		t.setAspectRatio();		

		// 更新panel
		t.$panel[t.scrollAspect]( t.scrollVal );   

		// 更新scrollBar
		t.containerSize >= t.panelElem[t.scrollTotalProp] ? t.$scrollbar.hide() : t.$scrollbar.show(); 

		// 更新bar
		// JSON字符串转JSON对象
		t.$bar.css(t.barSizeCss, t.aspectSize * t.scrollbarSize)
				.stop(true, true)
				.animate($.parseJSON('{"' + t.barPosCss + '":' + Math.ceil(t.aspectTop * t.scrollbarSize) + '}'), t.opts.time);
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
		var docWheelEvent = 'wheel.DocWheel mousewheel.DocWheel DOMMouseScroll.DocWheel';

		t.$container.on(wheelEvent, function(e){		

			e = e.originalEvent;								
			k = (e.deltaY || -e.wheelDelta || e.detail) > 0 ? 1 : -1;

			t.scrollVal = t.panelElem[t.scrollAspect] + k*t.opts.speed;
			t.updateLayout();
		});

		// 禁止浏览器滚动
		t.$container.hover(function(){
			$doc.on(docWheelEvent, function(){
				return false;
			})
		}, function(){
			$doc.off('.DocWheel');
		});
	}

	// 获取相对于scrollbar的鼠标坐标
	ScrollBar.prototype.getPos = function(event){
		var t = this;				

		// 出现滚动条时需加上文档滚动距离
		// offset是相对当前文档的
		if(t.opts.direction === 'vertical'){
			return $doc.scrollTop() + event.clientY - t.$scrollbar.offset().top;
		}else{
			return $doc.scrollLeft() + event.clientX - t.$scrollbar.offset().left;
		}
	}

	// scrollbar事件
	ScrollBar.prototype.scrollbarEvent = function(){
		var t = this;

		t.$scrollbar.on('click', function(e){
			t.setScrollbar(e);
		});
	}

	ScrollBar.prototype.setScrollbar = function(event){     
		var t = this;									

		var pos = t.getPos(event); 		

		// bar的位移 转成 panel的scrollTop,  且鼠标居于滑块中心
		t.scrollVal = (pos - t.$bar[t.barSizeCss]()/2) / t.scrollbarSize * t.panelElem[t.scrollTotalProp];
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

			var distance = pos - t.$bar.position()[t.barPosCss];

			// 移动
			$doc.on('mousemove.ScrollBar', function(e){
				t.setBar(e, distance);	
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
		t.scrollVal = (pos - distance) / t.scrollbarSize * t.panelElem[t.scrollTotalProp];
		t.updateLayout();
	}

	// 调到具体位置
	ScrollBar.prototype.jump = function(number){
		var t = this;

		t.scrollVal = parseFloat(number);
		t.updateLayout();
	}

	// 默认参数
	ScrollBar.defaultOpts = {
		direction: 'vertical',							//方向：horizontal | vertical
		panel: '.scrollbar-panel',						//内容面板
		scrollbar: '.scrollbar',						//滚动条
		bar: '.bar',									//滑块
		speed: 30,										//滚轮每次滚动距离
		time: 100										//滑块滚动时间
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



