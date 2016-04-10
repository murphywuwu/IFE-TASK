(function () {


	// --------------- BEGIN LOCAL VARIABLE ---------------//
	// 初始配置
	var originals;

	// DOM元素
	var container;
	var slider_content;
	var slider_dot;
    var slider_control;

	// 运动相关变量
	var move_num;
	var move_ele_size;
	var move_distance;
	var move_timer;
	var move_index;
    var init_pos;

    // --------------- END LOCAL VARIABLE ---------------//

	// --------------- BEGIN DOM HANDLER ---------------//
	function init ( container ) {

		// 初始化元素获取
		container = container;
		slider_content = container.children[0];
		slider_dot = container.children[1];
        slider_control = container.children[2];

		// 初始化位置信息
	    move_num = slider_content.children.length;
	    move_ele_size = slider_content.children[0].offsetWidth;
	    move_distance = (move_num-1)*move_ele_size;

        move_index = originals.is_positive_order ? 0 : (move_num-1);
        init_pos = originals.is_positive_order ? 0 : move_distance;


	    // 判断是否循环播放
       	if( originals.is_circulation ) {

            var timer = null;
            clearInterval(timer);
            setInterval(rotateImg, originals.interval_time);
        }

		// 利用事件委托给小圆点绑定点击事件
		delegateEvent( slider_dot, 'li', 'click', onClick);

	}

	function sliderImg ( index ) {

	    // 切换图片
	    var target_distance = index*move_ele_size;

	    clearInterval( move_timer );

		move_timer = setInterval( function () {

			var speed = (target_distance + slider_content.offsetLeft)/6;

			speed = speed > 0 ? Math.ceil( speed ) : Math.floor( speed );

			slider_content.style.left = slider_content.offsetLeft - speed + 'px';

		}, 30);
	}

    function rotateImg () {

        // 判断是正序播放还是逆序播放
        if( originals.is_positive_order ) {

            // 正序播放，move_index从0-1-2-3-0
            move_index++;
            if( move_index > (move_num - 1) ) {
                move_index = 0;
            }
        }
        else {

            // 逆序播放，move_index从3-2-1-0-3
            move_index--;
            if( move_index < 0 ) {
                move_index = 3;
            }
         }

         changeDot(slider_dot.children[move_index]);
         sliderImg(move_index);
    }

    function changeDot ( current_dot ) {

        // 为小圆点添加active属性
        for( var i = 0; i < move_num; i++ ) {

            slider_dot.children[i].index = i;
            removeClass( slider_dot.children[i], 'active' );
        }

        addClass( current_dot, 'active' );

    }

    // --------------- END DOM HANDLER ---------------//

    // --------------- BEGIN EVENT HANDLER ---------------//
    function onClick ( ev ) {

        var event = ev || window.event;
        var target = event.target || event.srcElement;

        changeDot( target );

    	sliderImg( target.index );
    }
    // --------------- END EVENT HANDLER ---------------//

    // --------------- BEGIN PUBLIC MODULES ---------------//
	function initialize ( selector, customOptions ) {

		var defaluts  = {
			is_positive_order : true,
			is_circulation    : false,
			interval_time     : 30
		};

		var options = extend( customOptions, defaluts );

		originals = cloneObject( options );

		container = $(selector);

		init( container );
	}
	// --------------- END PUBLIC MODULES ---------------//

	// API
	slider = {

		initialize : initialize
	};
}());

