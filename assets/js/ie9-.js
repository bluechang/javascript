
/**
 * 检测IE：
 * 1、userAgent
 * 2、特殊标签
 * 	<!--[if lte IE 9]>
 *       console.log('IE9-');
 *  <![endif]-->
 * 3、jQuery
 * 注意使用 jQuery 的版本，有的版本不支持。
 * 不支持的话，可以去 https://plugins.jquery.com,下载 jQuery migrate 插件。
 * 
 */


// ie9-
;(function($){
	var msie = $.browser.msie,
		version = parseInt( $.browser.version );

	if(msie && version < 9){
		alert('您使用的浏览器版本过低，可能有安全风险，请升级或使用其它的浏览器。');
	}
})(jQuery);