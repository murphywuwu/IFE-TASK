(function () {

	var suggestData = ['abc', 'abord', 'apply', 'assume', 'analysis'];
	// DOM相关变量
	var msg = $('#msg');
	var msg_list = $('#msg-list');
	var msg_item;

	// 搜索结果校验显示
	addEvent( msg, 'input', function () {

		// 对用户输入字符串进行去除前后空格处理
		msg_value = trim(msg.value);

		if ( msg_value === '' ) {

			msg_list.style.display = 'none';
		}
		else {
			var pattern = new RegExp( '^' + msg_value, 'i' );

			msg_item = '';

			// 判断用户输入字符串与数据是否匹配
			for (var i = 0, len = suggestData.length; i < len; i++) {

				if( suggestData[i].match(pattern) ) {

					msg_item += '<li>' + suggestData[i] + '</li>';// 将匹配数据拼接成html字符串
				}
			}
			msg_list.innerHTML = msg_item;// 插入msg_list结果中

			msg_list.style.display = 'block';
		}
	});

	// 允许用户点击选中的元素
	delegateEvent(msg_list, 'li', 'mouseover', function( ev ) {// 鼠标移进

		var event = ev || window.event;
		var target = event.target || event.srcElement;

		addClass( target, 'active' );

		addEvent( target, 'mouseout', function () {// 鼠标移除

			removeClass(target, 'active');
		} );

		// 鼠标点击输入信息
		addEvent( target, 'click', function () {

			inputMsg( this );
		} );

	});

	// 允许用户使用键盘上下键选中提示栏中的选项
	addEvent( msg, 'keydown', function ( ev ) {

		var event = ev || window.event;
		var keyCode = event.which || event.keyCode;

		var msg_item_current = $('.active');

		// 向下
		if( keyCode === 40 ) {

			if(msg_item_current) {
				var msg_item_next = msg_item_current.nextSibling;

				removeClass( msg_item_current, 'active' );
				if( msg_item_next ) {

					addClass( msg_item_next, 'active' );
				}
			}
			else {

				// 第一次按下键，且并没有活动的li元素时
				addClass( msg_list.children[0], 'active' );
			}
		}

		// 向上
		if ( keyCode === 38 ) {

			if(msg_item_current) {

				var msg_item_pre = msg_item_current.previousSibling;
				removeClass( msg_item_current, 'active' );
				if ( msg_item_pre ) {

					addClass( msg_item_pre, 'active' );

				}
			}
		}

		// 回车输入信息
		if( keyCode === 13 ) {

			inputMsg( $('.active') );
		}
	} );

	// 输入选中信息到文本框
	function inputMsg ( target ) {

		msg.value = target.innerHTML;
		msg_list.style.display = 'none';
	}
})();
