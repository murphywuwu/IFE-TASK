(function () {

    // --------------- BEGIN LOCAL VARIABLE ---------------//
    // DOM元素
    var drag_container = $('#drag-container');
    var drag_left = $('#drag-left');
    var drag_right = $('#drag-right');

    // 移动变量
    var dis_x = 0;
    var dis_y = 0;

    // --------------- END LOCAL VARIABLE ---------------//

    // --------------- BEGIN DOM HANDLER ---------------//
    function initPos ( drag_block_cont ) {

        var i;
        var len = drag_block_cont.children.length;
        for( i = 0; i < len; i++ ) {

            drag_block_cont.children[i].style.top = i * drag_block_cont.children[0].offsetHeight + 'px';
        }
    }
    // --------------- END DOM HANDLER ---------------//

    // --------------- BEGIN EVENT  HANDLER ---------------//
    function onMouseDown ( ev ) {

        console.log(123);
        var event = ev || window.event;
        var target = event.target || event.srcElement;

        // 目标元素只能为能被拖曳的块元素
        if( target.className !== 'drag-block') {
            return;
        }

        // 拖曳小块透明
        this.style.opacity = 0.8;

        // 获取鼠标点击时，鼠标相对于拖曳小块的位置
        dis_x = event.clientX - drag_container.offsetLeft - target.offsetLeft;
        dis_y = event.clientY - drag_container.offsetTop - target.offsetTop;

        var target_block = this;

        document.onmousemove = function () {

            dragBlock( target_block );
        };
        addEvent( target, 'mouseup', onMouseUp );
    }

    function dragBlock ( target_block ) {

        console.log(345);

        // 拖曳块随鼠标移动
        target_block.style.left = event.clientX - drag_container.offsetLeft - dis_x + 'px';
        target_block.style.top = event.clientY - drag_container.offsetTop - dis_y + 'px';

        // 拖曳块被移动时，重排其他元素
        var parent = target_block.parentNode;
        parent.appendChild( target_block );

        for (var i = 0, len = parent.children.length; i < len-1; i++) {

            parent.children[i].style.top = i * target_block.offsetHeight + 'px';
        }

     }

    function onMouseUp ( ev ) {

        console.log(567);
        // 取消mousemove和mousedown事件
        removeEvent( document, 'mousedown', onMouseDown );
        document.onmousemove = null;

        var pos_x = this.offsetLeft;
        var set_dis_x = drag_left.offsetWidth;

        if( pos_x < 0 || (pos_x > 0 && pos_x < set_dis_x )) {

            this.style.left = 0;
            drag_left.appendChild(this);
            this.style.top = (drag_left.children.length-1) * (this.offsetHeight) + 'px';
        }
        else {

            this.style.left = (drag_container.offsetWidth - drag_right.offsetWidth) + 'px';
            drag_right.appendChild(this);
            this.style.top = (drag_right.children.length-1) * (this.offsetHeight) + 'px';
        }
        this.style.opacity = 1;
    }
    // --------------- BEGIN EVENT HANDLER----------------//


    // --------------- BEGIN PUBLIC MODULES ---------------//
    function init () {

        // 初始化drag-block位置
        initPos( drag_left );
        initPos( drag_right );

        // 事件绑定
        delegateEvent( document, 'div', 'mousedown', onMouseDown );
    }
    // --------------- END PUBLIC MODULES ---------------//

    // API
    drag = {

        init : init
    };
}());
