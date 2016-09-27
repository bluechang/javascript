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
	function Tab(elem, options){
		var t = this;

		t.opts = $.extend(true, {}, Tab.defaultOpts, options || {});

		t.$container = $(elem);

		// tabNav
		t.$tabNav = getJq(t.opts.tabNav, t.$container);
		t.$navs = t.$tabNav.children();

		// tabMain
		t.$tabMain = getJq(t.opts.tabMain, t.$container);
		t.$mains = t.$tabMain.children();

		t.initEvents();
	}

	// 事件
	Tab.prototype.initEvents = function(){
		var t = this;

		t.$navs.on(t.opts.eventType, function(){
			var i = $(this).index();
			t.toIndex(i);
		}).eq(t.opts.defaultIndex).trigger(t.opts.eventType);
	}

	Tab.prototype.toIndex = function(index){
		var t = this;

		t.$navs.removeClass(t.opts.active)
				.eq(index).addClass(t.opts.active);

		t.$mains.hide().eq(index).show();
	}

	// 默认参数
	Tab.defaultOpts = {
		eventType: 'mouseover',
		tabNav: '.tab-nav',
		tabMain: '.tab-main',
		active: 'on',
		defaultIndex: 0
	};
	

	// 挂载到jQuery原型上
	$.fn.skyTab = function(options){ 
		// 只实例化第一个并返回
		if(this.length === 0){
			throw new Error('The elem is not exist!!!');
		}

		// 只实例化第一个并返回
		return new Tab(this[0], options);
	}

})(window, jQuery);



