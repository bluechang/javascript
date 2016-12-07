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
			if(jq.length === 0){
				jq = getJq(selector, window.document);
			}
		}

		return jq;
	};
	
	// 构造器
	function Select(elem, options){
		var t = this;

		t.opts = $.extend(true, {}, Select.defaultOpts, options || {});

		t.$container = $(elem);
		t.$checked = getJq(t.opts.checked, t.$container);
		t.$listWrap = getJq(t.opts.listWrap, t.$container);
		t.$list = getJq(t.opts.listTag, t.$listWrap);

		t.listWrapElem = t.$listWrap.get(0);

		t.initialize();
	}

	Select.prototype.initialize = function(){ 
		var t = this;

		t.initEvents();
	}

	Select.prototype.initEvents = function(){
		var t = this;

		t.checkedClickEvent();
		t.listScrollEvent();
		t.listClickEvent();
		t.docClickEvent();
	}

	// 选中框点击事件
	Select.prototype.checkedClickEvent = function(){
		var t = this;

		// 选中框事件
		t.$checked.on('click', function(){
			t.$listWrap.stop(true).toggle();
		});

		// 选中框禁止选取
		t.$checked.on('selectstart', function(){
			return false;
		})
	}

	// 列表点击事件
	Select.prototype.listClickEvent = function(){
		var t = this;

		var txt;
		var fn = function(){
			txt = $(this).text();  
			t.$checked.text(txt);
			t.$listWrap.stop(true).hide();
		}

		if(t.opts.listTag === 'ul'){
			t.$list.on('click', 'li', function(){  
				fn.call(this);
			})
		}else{
			t.$list.on('click', function(){  
				fn.call(this);
			})
		}
		
	}

	// 滚轮事件
	Select.prototype.listScrollEvent = function(){
		var t = this;
		
		var k, delta;
		var startY = 0, endY = 0;							

		t.$listWrap.on('touchstart mousedown', function(e){   

			startY = e.touches[0].clientY || e.clientY;		 

			// 滑动事件
			$doc.on('touchmove.Select mousemove.Select', function(e){  

				endY = e.touches[0].clientY || e.clientY;                
				delta = endY - startY;
				delta >= 0 ? k = -1 : k = 1; 

				t.listWrapElem.scrollTop += k*t.opts.speed;

				// 阻止默认行为
				return false;
			})	

			$doc.on('touchend.Select mouseup.Select', function(){
				$doc.off('.Select');
			})
		})
	}

	// 文档点击事件
	Select.prototype.docClickEvent = function(){
		var t = this;

		var flag = false;

		$doc.on('click', function(e){  			
			flag = !!t.$container.has(e.target).length;  

			if(!flag){
				t.$listWrap.stop(true).hide();
			}
		})
	}

	// 默认参数
	Select.defaultOpts = {
		// 选中框
		checked: null,
		// 列表容器
		listWrap: null,
		// 列表标签
		listTag: 'ul',
		// 滚动速度
		speed: 5
	};
	

	// 挂载到jQuery原型上
	$.fn.skySelect = function(options){   
		// 只实例化第一个并返回
		if(this.length === 0){
			throw new Error('The elem is not exist!!!');
		}

		// 只实例化第一个并返回
		return new Select(this[0], options);
	}

})(window, jQuery);



