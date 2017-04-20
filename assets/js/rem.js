
/**
 * 设置 rem
 * 
 * width: number | false
 * height: number | false
 * max: <number>
 * 
 */
;(function(w, h, m){
	var docElem = document.documentElement,
		base = 100, design, client, onResize;

	if( typeof w === 'number' && h === false ){
		design = w;
	}

	if( w === false && typeof h === 'number' ){
		design = h;
	}

	onResize = function(){
		client = docElem[w ? 'clientWidth': 'clientHeight'];
		if( w && (m || (m = w)) && (client > m) ){
			client = m;
		}
		docElem.style.fontSize = (base / design) * client + 'px';
	};

	window.addEventListener('resize', onResize, false);

	onResize();
	
})(640, false);




