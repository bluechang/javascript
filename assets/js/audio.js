

//音频
;var M = (function($, w){ 

	function player(options){
		var defaultOpts = {
			btn: null,
			audio: null,
			on: null,
			off: null,
			autoPlay: false
		};
		var opts = $.extend({}, defaultOpts, options || {});
		var $btn = $( opts.btn );
		var audio = opts.audio;
		var that = this;

		if( typeof audio === 'string' ){
			audio = document.querySelector( audio );
		}

		if( audio instanceof jQuery ){
			audio = audio.get(0);
		}

		if( audio.nodeType !== 1 ){
			alert('请输入正确的 DOM Audio');
			return;
		}

		// 播放
		this.play = function(){
			audio.play();
			$btn.removeClass( opts.off ).addClass( opts.on );
		}

		// 暂停
		this.pause = function(){
			audio.pause();
			$btn.removeClass( opts.on ).addClass( opts.off );
		}

		// 添加事件
		$btn.on('click', function(){
			audio.paused ? that.play() : that.pause();
		});

		if( !opts.autoPlay ){
			this.pause(); 
		}

		// 只能在微信中实现自动播放
		if( opts.autoPlay && !w ){  
			alert('请添加微信配置！');
			return;
		}

		if( opts.autoPlay && w ){
			w.ready(function(){  
				that.play();
			})
		}

	};

	return {
		player: player
	}

})(jQuery, wx);