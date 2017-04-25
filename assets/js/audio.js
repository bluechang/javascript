


/**
 * 音频
 *
 * M.audio(options)
 * options:
 * 		btn: 触发按钮，
 * 		audio: 音频
 * 		on: 打开类名
 * 		off: 关闭类名
 * 		autoplay: 是否自动播放, true | false(default)
 *
 * 公开接口：
 * 		play: 播放
 * 	 	pause: 暂停
 *
 * 例子：
 * 		M.audio({
 * 	 		btn: '.btn',
 * 			audio: '.audio',
 * 			on: 'btn-on',
 * 			off: 'btn-off',
 * 			autoplay: true
 * 		})
 */

;var M = (function($){ 

	function audio(options){
		var defaultOpts = {
			btn: null,
			audio: null,
			on: null,
			off: null,
			autoplay: false
		};

		var opts = $.extend({}, defaultOpts, options || {});
		var isWX = /micromessenger/ig.test(navigator.userAgent); 

		var $btn = $(opts.btn),
			audioElem = opts.audio;

		// 字符串
		if( typeof audioElem === 'string' ){
			audioElem = document.querySelector( audioElem );
		}

		// jQuery
		if( audioElem instanceof $ ){
			audioElem = audioElem.get(0);
		}

		if( audioElem.nodeName.toLowerCase() !== 'audio' ){
			alert('请输入正确的 Audio');
			return;
		}

		// 播放
		audio.play = function(){
			audioElem.play();
			$btn.addClass( opts.on ).removeClass( opts.off );
			
			if(audioElem.paused){
				audio.pause();
				audio.warn('The current environment does not support autoplay !!!');
			}
		}

		// 暂停
		audio.pause = function(){
			audioElem.pause();
			$btn.addClass( opts.off ).removeClass( opts.on );
		}

		// 警告
		audio.warn = function(msg){
			console.warn(msg);
		}

		// 按钮事件
		$btn.on('click', function(){
			audioElem.paused ? audio.play() : audio.pause();
		});

		// 是否自动播放
		if(opts.autoplay){
			// 微信
			if(isWX && wx){
				wx.ready(function(){  
					audio.play();
				});
			}else{
				audio.play();
				audio.warn('The current environment is not in the weixin or the object of wx is not exist !!!');
			}
		}else{
			audio.pause();
		}
	};

	return {
		audio: audio
	}

})(jQuery);