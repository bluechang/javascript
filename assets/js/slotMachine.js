
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
    function slot( options ){
        var defaultOps = {
            BaseURL: '',
            event: 'click',
            btnStart: null,
            btnOn: null,
            btnOff: null,
            target: null,
            defaultIndex: 1,
            numOfPrize: 4,
            cycle: 80,
            duration: 5000,
            interval: 400,
            onStart: null
        };

        var opts = $.extend( {}, defaultOps, options || {} );
        var $btnStart = $(opts.btnStart),
            $target = $(opts.target),
            $items = $target.children(),
            itemSize = $items.size(),
            itemHeight = $items.height() / opts.numOfPrize,
            isBegin = false;

        if( opts.defaultIndex > opts.numOfPrize || opts.defaultIndex < 0 ){
            alert('The default index is error!');
            return;
        }
        $items.css('backgroundPositionY', -itemHeight * (opts.defaultIndex - 1)); 
    
        // 开始
        slot.play = function(indexArr, callback){   
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

            // 跳转
            slot.toIndex( indexArr, callback );
        };

        // 转到 indexArr
        slot.toIndex = function(indexArr, callback){
            var itemHeight = $items.height() / opts.numOfPrize; 

            $items.css('backgroundPositionY', -itemHeight * (opts.defaultIndex - 1));
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
                                // 解屏
                                lockScreen( false );

                                typeof callback === 'function' && callback();
                            }
                        }
                    })
                }, index * opts.interval);
            });
        };

        // 锁住开始按钮
        slot.lockBtnStart = function( isLock ){
            
            if( isLock ){ 
                return;
            }

            $btnStart.find('img').hide();
            $btnStart.toggleClass( opts.btnOn ).delay(100)
                    .queue(function( next ){
                        $(this).toggleClass( opts.btnOn )
                        next();
                    });
        };

        slot.onStart = function( fn ){
            slot.addEvent( fn );
        };

        slot.addEvent = function( fn ){

            if( !fn || typeof fn !== 'function' || !$btnStart.size() ) {
                return;
            }

            // onStart 只添加一次
            if( opts.onStart && typeof opts.onStart === 'function' ){
                fn = opts.onStart;
            }

            // 添加事件
            $btnStart.on( opts.event, function(e){
                e.preventDefault();

                // 锁住开始按钮
                if( isBegin ){  
                    slot.lockBtnStart( true );
                    return;
                };
                
                // 开始
                isBegin = true;
                //开启开始按钮       
                slot.lockBtnStart( false );

                fn.call(null, isBegin );
            } )
        }; 

        slot.audio = function( src ){
            var audio = document.createElement('audio'),
                handler = function(){   
                    document.body.removeChild( audio );
                    audio = null;
                };

            audio.style.display = 'none';
            audio.autoplay = true;
            audio.src = opts.baseURL + src;

            audio.addEventListener('ended', handler, false);
            audio.addEventListener('error', handler, false); 

            document.body.appendChild( audio );
            audio.play();
        }

        slot.addEvent( opts.onStart );

    };

    return {
        slot: slot
    }

})(jQuery);