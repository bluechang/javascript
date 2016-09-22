
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
	
	// 是否是函数
	var isFunction = function(obj){
		return Object.prototype.toString.call(obj) === '[object Function]';	
	}

	// 获取jQuery对象
	var getJq = function(name, options){
		var jq = $(options[name]);
		if(jq.length === 0){
			throw new Error('The' + name + ' is not exist！！！');
		}
		return jq;
	};

	// 构造器
	function Popup(elem, options){  
		var t = this;

		t.opts = $.extend(true, {}, Popup.defaultOpts, options || {});

		t.$parent = $(elem);

		t.$btnTrigger = getJq('btnTrigger', t.opts);

		// 关闭按钮是否是当前容器的子元素
		t.$btnClose  = t.$parent.find(t.opts.btnClose).length !== 0 ? 
							t.$parent.find(t.opts.btnClose) : 
							getJq('btnClose', t.opts);

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

		// 显示按钮
		t.$btnTrigger.on('click', function(){
			// 显示前
			if(t.excuteStack(t.stackBeforeShow) === false){
				return;
			}

			// 显示
			t.show();

			// 显示后
			t.excuteStack(t.stackAfterShow);
		});

		// 关闭按钮
		t.$btnClose.on('click', function(){
			// 隐藏前
			if(t.excuteStack(t.stackBeforeHide) === false){
				return;
			}
			
			// 隐藏
			t.hide();

			// 隐藏后
			t.excuteStack(t.stackAfterHide);
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
			//遮罩只添加一次，需要先确定当前显示的弹窗
			var r = Popup.refer;

			// 隐藏前
			if(r.excuteStack(r.stackBeforeHide) === false){
				return;
			}

			// 始终隐藏当前的弹窗
			r.hide();

			// 隐藏后
			r.excuteStack(r.stackAfterHide);
		});
	};

	// 居中
	Popup.prototype.centred = function(){
		var t = this;

		t.$parent.css({
			position: 'fixed',
			left: '50%',
			top: '50%',
			zIndex: Popup.zIndex,
			transform: 'translate3d(-50%, -50%, 0)'
		})
	};

	// 执行栈
	Popup.prototype.excuteStack = function(stack){
		var t = this;
		
		for (var i = 0; i < stack.length; i++) {
			var value = stack[i].call(t);

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

		t.centred();
		t.$parent.fadeIn(t.opts.speed);
		t.$mask.fadeIn(t.opts.speed)
	};

	// 隐藏
	Popup.prototype.hide = function(){
		var t = this;

		t.$parent.fadeOut(t.opts.speed);
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
		onBeforeShow: [],
		onAfterShow: [],
		onBeforeHide: [],
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



