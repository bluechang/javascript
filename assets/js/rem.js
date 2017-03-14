

// 设置 rem
;(function(isWidth, designWidth){
	var docElem = document.documentElement, 
		clientWidth, callback,
		baseWidth = 100;

	if( typeof isWidth === 'number' || arguments.length === 0 ){
		designWidth = designWidth || 640;
		isWidth = true;
	}
		
	callback = function(){
		clientWidth = isWidth ? docElem.clientWidth : docElem.clientHeight;
		docElem.style.fontSize = (baseWidth / designWidth) * clientWidth + 'px';
	};

	window.addEventListener('resize', callback, false);
	callback();
})();