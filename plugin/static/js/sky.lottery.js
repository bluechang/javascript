
/**
 *
 * lottery:
 * 
 * 
 * @author: blue chang
 * @time: 2017-03-14
 * @update: 2017-03-15
 * 
 */



;(function(window, $){ 
	'use strict';

	// 获取 jQuery 对象
	function getJq( selector, context ){
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
	 * 构造器
	 */
	function Lottery(elem, options){  
		var t = this;

		t.opts = $.extend( {}, Lottery.defaultOpts, options || {} );

		t.$container = $( elem );
		t.$btnStart = $()

		t.initialize();
	};

	Lottery.prototype.initialize = function(){
		var t = this;


	};

	// 默认参数
	Lottery.defaultOpts = {
		btnStart: null,
		target: null,
		cycle: 1,
		duration: 1000 
	};
	
	
	// 挂载到 jQuery 原型上
	$.fn.skyLottery = function( options ){
		if( this.length === 0 ){
			var msg = this.selector || 'popup';
			throw new Error( '\'' + msg + '\'' + ' is not exist！！！');
		}

		// 只实例化第一个并返回
		return new Lottery( this[0], options );
	}

})(window, jQuery);



