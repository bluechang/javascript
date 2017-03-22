
// easing
;(function($){
    $.extend(jQuery.easing, {
        easeInOutCirc: function (x, t, b, c, d) {
            if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
            return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
        }
    });
})(jQuery);



// slotMachine
;var Z = (function($){

    // 锁屏
    function lockHandler( event ){
        event.preventDefault();
    };
    function lockScreen( islock ){   
        window[ islock ? 'addEventListener' : 'removeEventListener' ]('touchmove', lockHandler, { passive: false });
    };


    // 初始化
    function init( options ){
        var defaultOps = {
            event: 'click',
            btnStart: null,
            target: null,
            numOfPrize: 4,
            cycle: 80,
            duration: 5000,
            interval: 400,
            onStart: null
        };

        var opts = $.extend({}, defaultOps, options || {});  
        var $btnStart = $(opts.btnStart),
            $target = $(opts.target),
            $items = $target.children(),
            itemSize = $items.size();

        var isBegin = false;  

        // 是否开始
        this.isBegin = isBegin;
    
        // 开始
        this.play = function(indexArr, callback){   
            if( isBegin ) return;

            if( indexArr == null ){
                alert('indexArr is null！');
                return;
            }

            if( indexArr.length !== itemSize ){
                alert( 'The num of indexArr is error!' );
                return;
            }

            for(var i = 0; i < indexArr.length; i++){  
                if( indexArr[i] > opts.numOfPrize || indexArr[i] <= 0 ){
                    alert('The index of indexArr ' + indexArr[i] +' is error');
                    return;
                } 
            }

            // 锁屏
            lockScreen( true );

            isBegin = true;

            var itemHeight = $items.height() / opts.numOfPrize;   

            $items.css('backgroundPositionY', 0);
            $items.each(function( index ){ 
                var _this = this;
                window.setTimeout(function(){
                    $(_this).animate({ 'backgroundPositionY': opts.cycle * itemHeight - itemHeight * (indexArr[index] - 1) }, {
                        // duration: opts.duration + (index / size) * 2000,
                        duration: opts.duration,
                        easing: 'easeInOutCirc',
                        complete: function(){
                            if( index === itemSize - 1 ){
                                isBegin = false;
                                // 截屏
                                lockScreen( false );

                                typeof callback === 'function' && callback();
                            }
                        }
                    })
                }, index * opts.interval);
            });

            return this;
        };

        this.onStart = function( fn ){
            
            this.addEventListener( fn );

            return this;
        };

        this.addEventListener = function( fn ){
            if( !fn || typeof fn !== 'function' || !$btnStart.size() ) return;

            $btnStart.on( opts.event, function(e){
                e.preventDefault();
                fn.call(Z, isBegin );
            } )

            return this;
        }; 

        this.addEventListener( opts.onStart );

    };

    return {
        init: init
    }

})(jQuery);