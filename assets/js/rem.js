
/**
 * 设置 rem
 * 
 * (function(w, h, m){....})(width, height, max);
 *
 * width: number | false, 	设计图宽 
 * height: number | false, 	设计图高
 * max: <number>		最大值
 *
 * 注：
 * 1、以宽为标准时，max = width。 以高为标准时没限制。
 * 2、以宽为标准时，可以在 CSS 中设置 HTML 的宽为 max 时，不再变化。也可以不设置
 * 
 */


;(function(w, h, m){
	
	var docElem = document.documentElement,
		base = 100, design, client, 
		onResize, insertStyle, style;

	if( typeof w === 'number' && h === false ){
		design = w;
	}

	if( w === false && typeof h === 'number' ){
		design = h;
	}


	// insertStyle
	insertStyle = function(){
		var head = document.getElementsByTagName('head')[0],
			firstStyle = head.getElementsByTagName('link')[0] || head.getElementsByTagName('style')[0];

		style = document.createElement('style'); 
		style.type = 'text/css';

		firstStyle ? 
					head.insertBefore(style, firstStyle) :
					head.appendChild(style);

		onResize();
	};

	// resize 事件
	onResize = function(){
		client = docElem[w ? 'clientWidth': 'clientHeight'];

		if( w && (m || (m = w)) && (client > m) ){
			client = m;
		}

		style.innerHTML = 'html{ font-size: ' + (base / design) * client + 'px; }';
	};

	window.addEventListener('resize', onResize, false);

	insertStyle();
	
})(640, false);




