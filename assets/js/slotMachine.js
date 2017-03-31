
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
    var docElem = document.documentElement
        isMobile = 'ontouchstart' in docElem ? true : false,
        resizeEvent = isMobile ? 'orientationchange' : 'resize';
        
    var $panel = $('.panel'),
        $popup = $('.popup .main');

    $popup.css('overflow-y', isMobile ? 'scroll' : 'initial');


    // 设置rem
    function rem(width, height, max, callback){
        var base = 100, minWidth = 320,
            design, client, isLandscape = false;

        client = docElem[width ? 'clientWidth' : 'clientHeight'];

        if( typeof width === 'number' && height === false ){
            design = width;
        }

        if( width === false && typeof height === 'number' ){
            design = height;
        }

        if(!isMobile || isMobile && window.orientation === 0){
            if( width && (max || (max = width)) && (client > max) ){
                client = max;
            }
            isLandscape = false;
        }

        if(isMobile && window.orientation !== 0){
            client = minWidth;
            isLandscape = true;
        }

        docElem.style.fontSize = (base / design) * client + 'px';

        typeof callback === 'function' && callback( isLandscape );
    };


    // 入口
    function slot( options ){
        var defaultOps = {
            BaseURL: '',
            event: 'click',
            target: null,
            chance: null,
            btnStart: null,
            btnStartOn: null,
            btnStartOff: null,
            defaultIndex: 1,
            numOfPrize: 4,
            onInit: null,
            cycle: 80,
            duration: 5000,
            interval: 200
        };

        var opts = $.extend( {}, defaultOps, options || {} );
        var $btnStart = $(opts.btnStart),
            $hand = $btnStart.find('img'),
            $target = $(opts.target),
            $chance = $(opts.chance),
            $items = $target.children(),
            $win = $(window),
            itemSize = $items.size(),
            itemHeight,
            rnum = /\d/i,
            isBegin = false;

        // defaultIndex
        if( opts.defaultIndex > opts.numOfPrize || opts.defaultIndex < 0 ){
            alert('The default index is error!');
            return;
        } 

        function onInit(){
            // 设置rem
            rem(640, false, 640, function( isLandscape ){  
                $panel.css('max-width', isLandscape ? 320 : 640); 
            });

            // 锁住按钮
            slot.lockBtnStart(true);

            itemHeight = $items.height() / opts.numOfPrize,
            $items.css('backgroundPositionY', -itemHeight * (opts.defaultIndex - 1));
        }

        // 初始化
        slot.init = function(){
            $win.on(resizeEvent, onInit).trigger(resizeEvent);
        };

        // 获取剩余机会
        slot.getChance = function(){
            var classname = $chance.attr('class'),
                n = parseInt( rnum.exec(classname)[0] );

            if(isNaN(n)){
                alert('The chance is error !');
                return;
            }

            return n;
        };
        
        // 锁住开始按钮
        slot.lockBtnStart = function( isLock ){
            
            if( isLock ){ 
                slot.getChance() === 0 ? $hand.hide() : $hand.show();
                return;
            }
            
            $hand.hide();
            $btnStart.toggleClass( opts.btnStartOn ).delay(100)
                    .queue(function( next ){
                        $(this).toggleClass( opts.btnStartOn )
                        next();
                    });
        };

        // 播放音频
        slot.audio = function(src){
            var audio = document.createElement('audio'),
                handler = function(){   
                    document.body.removeChild( audio );
                    audio = null;
                };

            audio.style.display = 'none';
            audio.autoplay = true;
            audio.src = opts.BaseURL + src;

            audio.addEventListener('ended', handler, false);
            audio.addEventListener('error', handler, false); 

            document.body.appendChild( audio );
        }

        // 开始
        slot.play = function(indexArr, callback){   
            if( indexArr == null ){
                alert('indexArr is null！');
                return;
            }

            if( indexArr.length !== itemSize ){
                alert( 'The size of indexArr is error!' );
                return;
            }

            for(var i = 0; i < indexArr.length; i++){
                if( indexArr[i] > opts.numOfPrize || indexArr[i] <= 0 ){
                    alert('The index of indexArr ' + indexArr[i] +' is error !');
                    return;
                } 
            }

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
                                
                                slot.lockBtnStart(true);

                                typeof callback === 'function' && callback();
                            }
                        }
                    })
                }, index * opts.interval);
            });
        };

        slot.onStart = function( fn ){
            opts.onInit = fn;
        };

        // 添加事件
        $btnStart.on('click', function(){   
            // 正在抽奖 或 机会为 0
            if(isBegin || slot.getChance() === 0){
                return;
            }

            isBegin = true;
            slot.lockBtnStart(false); 

            typeof opts.onInit === 'function' && opts.onInit(isBegin); 
        })


        slot.init();
    };

    return {
        slot: slot
    }

})(jQuery);