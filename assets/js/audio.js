


/**
 * 音频
 *
 * M.music(options)
 * options:
 * 		btn: 触发按钮，
 * 		audio: 音频
 * 		on: 打开类名
 * 		off: 关闭类名
 * 		autoplay: 是否自动播放
 *
 * 公开接口：
 * 	play: 播放
 * 	pause: 暂停
 */

;var M = (function($, wx){ 

	function music(options){
		var defaultOpts = {
			btn: null,
			audio: null,
			on: null,
			off: null,
			autoplay: false
		};
		var opts = $.extend({}, defaultOpts, options || {});
		var isWX = /micromessenger/ig.test(navigator.userAgent); 

		var $btn = $( opts.btn ),
			audio = opts.audio;

		if( typeof audio === 'string' ){
			audio = document.querySelector( audio );
		}

		if( audio instanceof jQuery ){
			audio = audio.get(0);
		}

		if( audio.nodeName.toLowerCase() !== 'audio' ){
			alert('请输入正确的 Audio');
			return;
		}

		music.play = function(){
			audio.play();
			$btn.addClass( opts.on ).removeClass( opts.off );
		}

		music.pause = function(){
			audio.pause();
			$btn.addClass( opts.off ).removeClass( opts.on );
		}

		$btn.on('click', function(){
			audio.paused ? music.play() : music.pause();
		});

		// 只能在微信中实现自动播放
		if( opts.autoplay && isWX && !wx ){  
			alert('请添加微信配置！');
			return;
		}

		if( opts.autoplay && isWX && wx ){
			wx.ready(function(){  
				music.play();
			})
		}

	};
	

	return {
		music: music
	}

})(jQuery, wx);