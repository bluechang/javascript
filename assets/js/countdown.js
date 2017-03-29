
;Z = (function($){

	function covertToStr(val) {
		return (parseInt(val) < 10) ? '0' + val : '' + val;
	};

	function countdown(options){
		var defaultOpts = {
			type: 'server',
			time: null,
			onTick: null,
			onEnd: null,
			delay: 1000
		};

		var opts = $.extend({}, defaultOpts, options || {}),
			ret = opts.time.split(/\s+\-+(?:\s+)/g),
			nowTime, endTime, difTime, timer;

			if(!ret || !ret.length){
				return;
			}

			if(ret.length === 1){
				nowTime = new Date();
				endTime = new Date(ret[0]);
			};

			if(ret.length === 2){
				nowTime = new Date(ret[0]);
				endTime = new Date(ret[1]);
			};

			difTime = endTime -nowTime;

			// 一次 interval
			function tick(){
				//首先判断 是否结束，避免不必要的执行
				if(difTime <= 0){
					typeof opts.onTick === 'function' && opts.onTick('00', '00', '00', '00', true);
					typeof opts.onEnd === 'function' && opts.onEnd();
					clearInterval(timer);
					return false;
				}

				var day 	= Math.floor( difTime / 1000 / 60 / 60 / 24 ),
					hour 	= Math.floor( difTime / 1000 / 60 / 60 % 24 ),
					minute 	= Math.floor( difTime / 1000 / 60 % 60  ),
					second 	= Math.floor( difTime / 1000 % 60 );

				typeof opts.onTick === 'function' && opts.onTick(covertToStr(day), covertToStr(hour), covertToStr(minute), covertToStr(second), false);
			};

			// 服务器时间
			function serverTime(){
				timer = setInterval(function(){
					difTime -= opts.delay;
					tick();
				}, opts.delay);
			};

			// 本地时间
			function localTime(){
				timer = setInterval(function(){
					var now = new Date();
					difTime -= now;
					tick();
				}, opts.delay);
			}

			opts.type === 'server' ? serverTime() : localTime();

			tick();
	};

	return {
		countdown: countdown
	};
})(jQuery);