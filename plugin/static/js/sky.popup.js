
/**
 *
 * popup:
 * 
 * 
 * @author: blue chang
 * @time: 2016-11-28
 * 
 */



;(function(window, $){ 
	'use strict';

	// 转类数组
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
		}else{
			jq = $(selector, context);
			if(jq.length === 0){
				// 递归
				jq = getJq(selector, window.document);    
			}
		}

		return jq;
	};


	/**
	 * [效果对象]
	 * @param {[type]} popup [弹窗对象]
	 */
	function Effect(popup){
		this.popup = popup;
		this.opts = popup.opts;
		this.$container = popup.$container;
		this.$mask = popup.$mask;
	}


	/**
	 * [淡入淡出效果]
	 * @param {[type]} popup [弹窗对象]
	 */
	function Fade(popup){
		// 继承
		Effect.call(this, popup);
	}

	// 显示
	Fade.prototype.show = function(){
		var t = this;

		t.$container.fadeIn(t.opts.speed);
		t.$mask.stop(true).fadeIn(t.opts.speed);
	}

	// 隐藏
	Fade.prototype.hide = function(){
		var t = this;

		t.$container.fadeOut(t.opts.speed);
		t.$mask.stop(true).fadeOut(t.opts.speed);
	}


	/**
	 * [弹窗构造器]
	 * @param {[type]} elem    [元素节点]
	 * @param {[type]} options [可选参数]
	 */
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

		t.initialize();
	};

	Popup.prototype.initialize = function(){
		var t = this;

		// 显示效果
		switch(t.opts.effect){
			case 'fade': 
				t.effect = new Fade(t);
				break;
			default: 
				t.effect = new Fade(t);
		}

		t.initEvents();
	}

	// 初始化事件
	Popup.prototype.initEvents = function(){ 
		var t = this;

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

	// 显示
	Popup.prototype.show = function(){
		// 先隐藏前一个,一次只显示一个弹窗
		if(Popup.refer){
			Popup.refer.hide(); 
		}

		// 遮罩只添加一次，用挂载到构造函数上的静态变量refer，
		// 来引用当前显示的弹窗
		var t = Popup.refer = this;

		if(!Popup.hasMask){
			t.appendMask();
		}

		// 显示的时候，添加resize事件并执行
		$(window).on('resize.Popup', function(){
			t.centred();
		}).trigger('resize.Popup');

		// 显示
		t.effect.show();
	};

	// 隐藏
	Popup.prototype.hide = function(){
		var t = this;

		// 移除resize事件
		$(window).off('.Popup');

		// 隐藏
		t.effect.hide();
	};

	// 添加遮罩   只添加一次  需初始化好事件
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

 
	// 显示哪个弹窗
	Popup.refer = null;

	// 是否有遮罩层
	Popup.hasMask = false;

	// 遮罩层DOM
	Popup.mask = document.createElement('div');

	Popup.zIndex = 9999999;

	// 默认参数
	Popup.defaultOpts = {
		// 显示效果
		effect: 'fade',
		// 打开按钮
		btnTrigger: null,
		// 关闭按钮
		btnClose: null,
		// 动画时长
		speed: 400,
		// 遮罩层
		mask:{
			opacity: 0.7,
			backgroundColor: '#000'
		},
		// 显示前
		onBeforeShow: null,
		// 显示后
		onAfterShow: null,
		// 隐藏前
		onBeforeHide: null,
		// 隐藏后
		onAfterHide: null
	};
	


	/**
	 * 挂载到jQuery原型上
	 * @param  {[type]} options [可选参数]
	 * @return {[type]}         [弹窗对象]
	 */
	$.fn.skyPopup = function(options){ 
		// 只实例化第一个并返回
		if(this.length === 0){
			throw new Error('The elem is not exist!!!');
		}

		return new Popup(this[0], options);
	}

})(window, jQuery);



