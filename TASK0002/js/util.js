/**------------------- javascript helper -----------------------*/

// ------ Begin javascript basis data type helper ------//
// 判断arr是否为一个数组，返回一个bool值
function isArray ( arr ) {

	return Object.prototype.toString.call( arr ) === '[object Array]';
}

// 判断fn是否为一个函数，返回一个bool值
function isFunction ( fn ) {

	return Object.prototype.toString.call( fn ) === '[object Function]';
}
// 使用递归来实现一个深度克隆，可以复制一个目标对象，返回一个完整拷贝
// 被复制的对象类型会被限制为数字、字符串、布尔、日期、数组、Object对象。不会包含函数、正则对象等
function cloneObject( src ) {

	var o;// 创建复制对象

	if (!src
        || typeof src === 'string'
		|| typeof src === 'number'
		|| typeof src === 'boolean'
		|| src instanceof Date) {

		o = src;// src为字符串，数字，布尔值时和日期时，直接赋值
	}
	else {

		o = isArray( src ) ? [] : {};

		for( var key in src ) {

			if (src.hasOwnProperty( key )) {

				if( typeof key === 'object' ) {

					cloneObject( src );// 递归赋值
				}
				else {

					o[key] = src[key];
				}
			}
		}
	}

	return o;// 返回复制对象
}

// 扩展合并对象
function extend ( options, defalutOptions ) {

	if( typeof options !== 'object' ) {

		options = {};
	}

	for( var key in options ) {

		if( defalutOptions.hasOwnProperty(key) ) {

			defalutOptions[key] = options[key];
		}
	}

	return defalutOptions;
}

// 对数组进行去重操作，只考虑数组中元素为数字或字符串，返回一个去重后的数组
// 去除数组中的空白项
function uniqArray( arr ) {

	var obj = {};
	var result = [];// 建立新数组
	for (var i = 0,len = arr.length; i < len; i++) {
		var key = arr[i];
		if ( !obj[key] ) {
			result.push(key);
			obj[key] = true;// 将新数组中的项映射到obj中
		}
	}
	return result;// 返回去重后的数组
}

// 对字符串头尾进行空格字符的去除、包括全角半角空格、Tab等，返回一个字符串
// 尝试使用一行简洁的正则表达式完成该题目
function trim( str ) {

	var trim_left = /^[\s\xA0\uFEFF]+/,
        trim_right = /[\s\xA0\uFEFF]+$/;

	var result = str.replace(trim_left,'').replace(trim_right,'');

	return result;
}

// 实现一个遍历数组的方法，针对数组中每一个元素执行fn函数，并将数组索引和元素作为参数传递
function each( arr, fn ) {

	var i,
	    len = arr.length;

    for( i = 0;i < len; i++ ) {

    	fn( arr[i], i );
    }

}

// 获取一个对象里面第一层元素的数量，返回一个整数
function getObjectLength ( obj ) {

	var arr = [];

	for( var key in obj ) {
		if( obj.hasOwnProperty(key) ) {

			arr.push(arr[key]);
		}
	}

	return arr.length;
}

/* 正则判断邮箱以及手机号方法 */

// 判断是否为邮箱地址
function isEmail ( emailStr ) {

    var pattern = /^(\w+\.)*\w+@\w+(\.\w+)+$/;
    return pattern.test(emailStr);
}

// 判断是否为手机号
function isMobilePhone ( phone ) {

	var pattern = /^(\+\d{1,4})?\d{7,11}$/;
    return pattern.test(phone);
}
// ------ Begin javascript basis data type helper ------//

// ------ Begin javascript DOM helper ------//
// 为element增加一个样式名为newClassName的新样式
function addClass( element, newClassName ) {

	var class_arr;

	// 验证newClassName是不是字符串
	if (typeof newClassName === 'string') {

		// 去除newClassName中的空格
		newClassName = newClassName.replace(/\s+/g,'');

        // 验证element的类型以及判断newClassName是不是空字符串
		if( newClassName && element.nodeType === 1 ) {

			class_arr = element.className.trim().split(/\s+/);

			// 判断element的className中有没有newClassName
			for( var i = 0, len = class_arr.length; i < len; i++ ) {

				if( class_arr[i] === newClassName ) {

					return;// 如果存在则直接返回
				}
			}

			// 将newClassName推入数组中
			class_arr.push(newClassName);

			// 将所有类名拼成字符串，并重新设置className
			element.className = class_arr.join(' ');
		}
	}
}

// 移除element中的样式oldClassName
function removeClass( element, oldClassName ) {

	var class_arr;
	var pos;

	// 验证oldClassName是不是字符串
	if (typeof oldClassName === 'string') {

		// 去除oldClassName中的空格
		oldClassName = oldClassName.replace(/\s+/g,'');

		// 验证element的类型以及判断oldClassName是不是空字符串
		if ( oldClassName && element.nodeType === 1 ) {

			class_arr = uniqArray(element.className.trim().split(/s+/));// 去重

			// 判断element的className中有没有oldClassName
			for( var i = 0, len = class_arr.length; i < len; i++  ) {

				pos = len;

				if ( class_arr[i] === oldClassName ) {

					pos = i;
					break;
				}
			}

			// 删除oldClassName
			class_arr.splice(i, 1);

			// 将剩下的类名转换成字符串并重新数组
			element.className = class_arr.join(' ');
		}
	}
}

// 判断siblingNode和element是否为同一个父元素下的同一级的元素，返回bool值
function isSiblingNode( element, siblingNode ) {
	return element.parentNode === siblingNode.parentNode;
}

// 获取element相对于浏览器窗口的位置，返回一个对象{x, y}
function getPosition( element ) {

	var pos = {};

	var scrollLeft = document.body.scrollLeft + document.documentElement.scrollLeft;
	var scrollTop = document.body.scrollTop + document.documentElement.scrollTop;

	pos.x = element.getBoundingClientRect().left + scrollLeft;
    pos.y = element.getBoundingClientRect().top + scrollTop;

	return pos;
}

// 实现一个简单的Query
function $( selector ) {
	return document.querySelector(selector);// IE8及以上浏览器支持
}
// ------ End javascript DOM helper ------//

// ------ Begin javascript Event helper ------//
// 给一个element绑定一个针对event事件的响应，响应函数为listener
function addEvent( element, event, listener ) {

	if ( element.addEventListener ) {
		element.addEventListener( event, listener, false );
	}
	else if ( element.attachEvent ) {
		element.attachEvent( event, listener );// IE6/7/8
	} else {
		element['on' + event] = listener;
	}
}
// 移除element对象对于event事件发生时执行listener的响应
function removeEvent( element, event, listener ) {

	if ( element.removeEventListener ) {
		element.removeEventListener( event, listener, false );
	}
	else
	{
		element.detachEvent( 'on' + event, listener );// IE6/7/8
	}
}
// 实现对click事件的绑定
function addClickEvent( element, listener ) {

	addEvent( element, 'click', listener );
}
// 实现对于按Enter键时的事件绑定
function addEnterEvent( element, listener ) {

	addEvent( element, 'keydown', function ( ev ) {

		var event = event || window.event;// 兼容IE6-8
		var keyCode = event.which || event.keyCode;
		if( ev.keyCode === 13 ) {

			listener();
		}
	});
}

// 事件委托
function delegateEvent(element, tag, eventName, listener) {

	addEvent( element, eventName, function ( ev ) {

		var event = ev || window.event;

		var target = event.target || event.srcElement;
		if( target.tagName.toLowerCase() === tag.toLowerCase() ) {

			listener.call( target );
		}

	} );
}

$.on = function( selector, event, listener ) {


	addEvent( $(selector), event, listener );
};
$.un = function( selector, event, listener ) {

	removeEvent( $(selector), event, listener );
};
$.click = function( selector, listener ) {

	addClickEvent( $(selector), listener );
};
$.delegate = function( selector, tag, event, listener ) {

	delegateEvent( $(selector), tag, event, listener );
};
// ------ End javascript Event helper ------//

// ------ Begin javascript BOM helper ------//
// 判断是否为IE浏览器，返回-1或者版本号
function isIE() {

    if(/msie (\d+\.\d+)/i.test(navigator.userAgent) || /rv:(\d+\.\d+)/i.test(navigator.userAgent)) {

        return document.documentMode;
    }
    else {

        return -1;
    }
}


// 设置cookie
function setCookie(cookieName, cookieValue, expiredays) {

	var cookie_str = encodeURIComponent( cookieName ) + '=' + encodeURIComponent( cookieValue );

	if( expiredays instanceof Date ) {

		cookie_str += '; expires=' + expiredays.toGMTString(expiredays);
	}

	document.cookie = cookie_str;// 写入cookie
}

// 获取cookie值
function getCookie(cookieName) {

	var cookie_name  = encodeURIComponent(cookieName),
	    cookie_start = document.cookie.indexOf( name ),
	    cookie_value = null;// 设置cookie_value值

	if( cookie_start > -1 ) {

		var cookie_end = document.cookie.indexOf( cookie_start, ';' );

		if( cookie_end === -1 ) {

			cookie_end = document.cookie.length;
		}

		cookie_value = document.cookie.substring( cookie_start + cookie_name.length, cookie_end );// 通过substring获取cookie_value值
	}

	// 解码cookie值
	decodeURIComponent( cookie_value );

	return cookie_value;
}
// ------ End javascript BOM helper ------//

// ------ Begin javascript Ajax helper ------//
function ajax ( url, options ) {

	var xhr   = new XMLHttpRequest();

	    options = options || {};
    var type      = (options.type || 'GET').toUpperCase();
    var data      = options.data || {};

    // 处理data
    if ( data ) {

    	var data_arr = [];

    	for(var key in data) {
    		if( data.hasOwnProperty(key) ) {

    			data_arr.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
    		}
    	}

    	data = data_arr.join('&');
    }

	// 初始化请求
	xhr.open( type, url);

	// 发送请求
	if( type === 'GET' ) {

		xhr.send( null );
	}
	else {

		xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
		xhr.send( data );
	}

	// readyState
	xhr.onreadystatechange = function () {

		if(xhr.readyState === 4) {
			var status = xhr.status;

			if (status >= 200 && status < 300 || status === 304 || status === 1223 ) {

				if ( isFunction(options.onsuccess ) ) {

					options.onsuccess(responseText);
				}
			}
			else {

				if( isFunction(options.onfail) ) {

					options.onfail();
				}
			}
		}
	};
}
// ------ End javascript Ajax helper ------//
