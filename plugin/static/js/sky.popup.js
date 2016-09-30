
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

	// 转数组
	var slice = Array.prototype.slice;
	
	// 是否是函数
	var isFunction = function(obj){
		return Object.prototype.toString.call(obj) === '[object Function]';	
	}

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
	function Popup(elem, options){  
		var t = this;

		t.opts = $.extend(true, {}, Popup.defaultOpts, options || {});

		t.$container = $(elem);
		t.$btnTrigger = $(t.opts.btnTrigger);
		t.$btnClose  = getJq(t.opts.btnClose, t.$container);

		t.$mask = $(Popup.mask);

		t.onBeforeShow(t.opts.onBeforeShow);
		t.onAfterShow(t.opts.onAfterShow);
		t.onBeforeHide(t.opts.onBeforeHide);
		t.onAfterHide(t.opts.onAfterHide);

		t.initEvents();
	};

	// 初始化事件
	Popup.prototype.initEvents = function(){ 
		var t = this;

		if(t.$btnTrigger.length){
			// 显示按钮
			t.$btnTrigger.on('click', function(){

				t.target = this;

				// 显示前
				if(t.excuteStack(t.stackBeforeShow, t.target) === false){
					return;
				}

				// 显示
				t.show();

				// 显示后
				t.excuteStack(t.stackAfterShow, t.target);
			});
		}

		// 关闭按钮
		t.$btnClose.on('click', function(){
			// 隐藏前
			if(t.excuteStack(t.stackBeforeHide, t.target) === false){
				return;
			}
			
			// 隐藏
			t.hide();

			// 隐藏后
			t.excuteStack(t.stackAfterHide, t.target);
		});
	};

	// 添加遮罩
	Popup.prototype.appendMask = function(){
		var t = this;

		Popup.hasMask = true;

		$('body').append(t.$mask);

		t.$mask.css({
			backgroundColor: t.opts.mask.backgroundColor,
			opacity: t.opts.mask.opacity,
			position: 'fixed',
			left: 0,
			right: 0,
			top: 0,
			bottom: 0,
			zIndex: Popup.zIndex - 1
		});

		t.$mask.on('click', function(){
			//遮罩只添加一次，永远指向当前显示的弹窗
			var r = Popup.refer;

			// 隐藏前
			if(r.excuteStack(r.stackBeforeHide, r.target) === false){
				return;
			}

			// 隐藏
			r.hide();

			// 隐藏后
			r.excuteStack(r.stackAfterHide, r.target);
		});
	};

	// 居中
	Popup.prototype.centred = function(){
		var t = this;

		t.$container.css('position', 'fixed');

		var w = t.$container.outerWidth(),
			h = t.$container.outerHeight(),
			W = $(window).width(),
			H = $(window).height(),
			left = (W - w)/2,
			top = (H - h)/2;

		t.$container.css({
			left: left,
			top: top,
			zIndex: Popup.zIndex
		})
	};

	// 执行栈
	Popup.prototype.excuteStack = function(stack){
		var t = this;
		
		// 将需要的参数,传递到栈中
		var rest = slice.call(arguments).slice(1);
		for (var i = 0; i < stack.length; i++) {
			var value = stack[i].apply(t, rest);

			//返回false时，阻断向下执行
			if(value === false){
				return false;
			}
		}
	};

	// 显示前
	Popup.prototype.onBeforeShow = function(callback){
		var t = this;

		if(!t.stackBeforeShow){
			t.stackBeforeShow = [];
		}

		if(isFunction(callback)){
			t.stackBeforeShow.push(callback);
		}
	};

	// 显示后
	Popup.prototype.onAfterShow = function(callback){
		var t = this;
		
		if(!t.stackAfterShow){
			t.stackAfterShow = [];
		}

		if(isFunction(callback)){
			t.stackAfterShow.push(callback);
		}
	};

	// 隐藏前
	Popup.prototype.onBeforeHide = function(callback){
		var t = this;
		
		if(!t.stackBeforeHide){
			t.stackBeforeHide = [];
		}
		
		if(isFunction(callback)){
			t.stackBeforeHide.push(callback);
		}
	};

	// 隐藏后
	Popup.prototype.onAfterHide = function(callback){
		var t = this;
		
		if(!t.stackAfterHide){
			t.stackAfterHide = [];
		}
		
		if(isFunction(callback)){
			t.stackAfterHide.push(callback);
		}
	};

	// 显示
	Popup.prototype.show = function(){
		// 遮罩只添加一次，用挂载到构造函数上的静态变量refer，
		// 来引用当前显示的弹窗
		var t = Popup.refer = this;

		if(!Popup.hasMask){
			t.appendMask();
		}

		// 添加resize事件并执行
		$(window).on('resize.popup', function(){
			t.centred();
		}).trigger('resize');

		t.$container.fadeIn(t.opts.speed);
		t.$mask.fadeIn(t.opts.speed)
	};

	// 隐藏
	Popup.prototype.hide = function(){
		var t = this;

		// 移除resize事件
		$(window).off('.popup');

		t.$container.fadeOut(t.opts.speed);
		t.$mask.fadeOut(t.opts.speed);
	};

 
	// 显示哪个弹窗
	Popup.refer = null;

	// 是否有遮罩层
	Popup.hasMask = false;

	// 遮罩层DOM
	Popup.mask = document.createElement('div');

	Popup.zIndex = 99999;

	// 默认参数
	Popup.defaultOpts = {
		// 打开按钮
		btnTrigger: null,
		// 关闭按钮
		btnClose: '.popup-btn-close',
		// 动画时长
		speed: 400,
		// 遮罩层
		mask:{
			opacity: 0.7,
			backgroundColor: '#000'
		},
		// 显示前
		onBeforeShow: [],
		// 显示后
		onAfterShow: [],
		// 隐藏前
		onBeforeHide: [],
		// 隐藏后
		onAfterHide: []
	};
	

	// 挂载到jQuery原型上
	$.fn.skyPopup = function(options){ 
		// 只实例化第一个并返回
		if(this.length === 0){
			throw new Error('The elem is not exist!!!');
		}

		return new Popup(this[0], options);
	}

})(window, jQuery);



