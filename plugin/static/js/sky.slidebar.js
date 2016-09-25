/**
 *
 * slidebar:
 * 
 * 
 * @author: blue chang
 * @time: 2016-09-21
 * 
 */


;(function(window, $){

	//构造器
	function Slidebar(elem, options){
		var t = this;

		t.opts = $.extend({}, Slidebar.defaultOpts, options || {});
		t.$container = $(elem);

		//开关
		t.$switch = $( t.opts.switch );
		//父容器宽度,即展开和收起的宽度
		t.containerWidth = t.opts.hasPadding ? t.$container.outerWidth() : t.$container.width(); 
		//是否显示内容	
		t.isShow = t.opts.isShow;						

		//获取方位
		t.direction = t.getDirection();				
		//判定调用的事件函数
		t.effectFn = t.opts.eventType === 'click' ? t.clickDelegete : t.hoverDelegete; 

		t.initialize();
	}

	//初始化
	Slidebar.prototype.initialize = function(){ 
		this.initStyle();
		this.initEvents();
	}

	//初始化样式
	Slidebar.prototype.initStyle = function(){
		var t = this;   

		if( t.isShow ){
			t.$container.css( t.direction, 0 );
			t.open();
		}else{
			t.$container.css( t.direction, -t.containerWidth );
			t.close();
		}
	}

	//初始化事件
	Slidebar.prototype.initEvents = function(){
		this.effectFn();
	}

	//获取方位
	Slidebar.prototype.getDirection = function(){  
		var t = this;

		var offsetLeft = t.$container.offset().left;

		if( offsetLeft >= t.containerWidth ) 		//判断左偏移是否大于父容器宽度
			return 'right';
		else
			return 'left';
	}

	//click事件
	Slidebar.prototype.clickDelegete = function(){
		var t = this;

		t.$switch.on('click', function(){
			t.isShow ? t.close() : t.open();
		});
	}

	//hover事件
	Slidebar.prototype.hoverDelegete = function(){
		var t = this;

		t.$container.hover(function(){
			t.open();
		}, function(){
			t.close();
		});
	}

	//打开
	Slidebar.prototype.open = function(){ 
 		var t = this;

 		t.isShow = true;
 		t.$switch.removeClass(t.opts.switchOff).addClass(t.opts.switchOn);
		t.$container.stop(true).animate( 
			t.direction == 'right' ? { right: 0 } : { left: 0 }, 
			t.opts.speed 
		);
	}

	//关闭
	Slidebar.prototype.close = function(){
		var t = this;

		t.isShow = false;
		t.$switch.removeClass(t.opts.switchOn).addClass(t.opts.switchOff);
		t.$container.stop(true).animate( 
			t.direction == 'right' ? { right: -t.containerWidth } : { left: -t.containerWidth }, 
			t.opts.speed 
		);
	}



	// 默认参数
	Slidebar.defaultOpts = {
		eventType: 'click',			//事件类型	[hover, click]
		switch: '.switch',			//开关选择器
		switchOn: 'switch-off', 	//开关打开时状态
		switchOff: 'switch-on', 	//开关关闭时状态
		hasPadding: true, 			//切换时, 移动的距离是否包含内边距和边框
		isShow: false,				//是否显示
		speed: 300					//动画时长
	}

	//挂载到jquery对象
	$.fn.slidebar = function(options){
		if(this.length === 0){
			throw new Error('The elem is not exist!!!');
		}

		// 只实例化第一个elem
		return new Slidebar(this[0], options);
	}

})(window, jQuery);



