 (function () {

 	// DOM相关变量
 	var text_box           = $('#textbox');
 	var warn_box           = $('#warn');
 	var time_container_box = $('#time-container');
 	var future_time_box     = $('.future-time');
 	var cont_time_box      = $('.cont-down-time');

    // 计算时差相关变量
 	var expire_time;
 	var gap_time;
 	var now_time;

 	// 未来时间变量
    var future_arr;
    var future_year;
    var future_month;
    var future_date;

    // 倒计时变量
 	var gap_date;
 	var gap_date_integer;
 	var gap_hour;
 	var gap_hour_integer;
 	var gap_minutes;
 	var gap_minutes_integer;
 	var gap_second;
 	var gap_second_integer;

 	function onClick () {

	 	// 对用户输入的字符串进行格式检测
	 	if(/^\d{4}-((0[1-9])|(1[0-2]))-((0[1-9])|(1[1-9])|(2[1-9])|(3[0-1]))$/.test( text_box.value )) {

	 		warn_box.style.display = 'none';

	 		// 到期时间毫秒数获取
	 		expire_time = Date.parse( text_box.value );

	 		future_arr   = text_box.value.split('-');
	 		future_year  = future_arr[0];
	 		future_month = future_arr[1];
	 		future_date  = future_arr[2];
	 		future_time_box.innerHTML =  '距离:' + future_year +'年' + future_month + '月' + future_date + '日';

	 		setTimeout( countDown, 0);

	 	} else {

	 		warn_box.style.display = 'block';
	 		warn_box.innerHTML = '日期格式输入不正确';
	 		time_container_box.innerHTML = '';
	 	}

		function countDown( time_bool ) {

		 	// 现在时间毫秒数获取
	 		now_time = Date.now();

		 	// 时间差=到期时间毫秒数-现在时间毫秒数
		 	gap_time = expire_time - now_time;

		 	// 如果时间差=0，则停止倒计时
		 	if( gap_time  <= 0 ) {

		 		cont_time_box.innerHTML = '倒计时结束';

		 	} else {

		 		// 开始倒计时
		 		gap_date            = gap_time/(1000*60*60*24);
		 		gap_date_integer    = Math.floor(gap_date);// 取得天数
		 		gap_hour            = (gap_date - gap_date_integer)*24;
		 		gap_hour_integer    = Math.floor(gap_hour);// 取得小时数
		 	    gap_minutes         = (gap_hour - gap_hour_integer)*60;
		 	    gap_minutes_integer = Math.floor(gap_minutes);// 取得分钟数
		 	    gap_second          = (gap_minutes - gap_minutes_integer)*60;
		 	    gap_second_integer  = Math.floor(gap_second);// 取得秒数

		 		cont_time_box.innerHTML = '还有:'
	 		                            + gap_date_integer    + '天'
	 		                            + gap_hour_integer    + '小时'
	 		                            + gap_minutes_integer + '分钟'
	 		                            + gap_second_integer  + '秒';
		 	}

			setTimeout(arguments.callee,0);
		}

 	}

 	$.click( 'button', onClick );
 }());






