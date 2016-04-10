(function () {

	function outputHobbies ( e ) {

		var warn           = $('#warn');
		var button         = $('#submit-btn');
		var output_hobbies = $('#output-hobbies');
		var input_hobbies  = $('#input-hobbies');

		var initial_str;
		var result_arr;
		var len;
		var i;

		// 获取输入的字符串，并对其进行处理
		initial_str = input_hobbies.value.trim();// 去除前后空格
		result_arr = initial_str.split(/\s|\u3000|,|，|；|;|、/);// 转换为数组

		for (i = 0,len=result_arr.length; i < len; i++) {

			if( result_arr[i] === '' ) {

				result_arr.splice(i,1);// 去除空数组中值为空字符串的项
			}
		}
		uniqArray( result_arr );// 对结果数组去重


		// 判断用户输入爱好数量是否超过10或者没有输入
		if( initial_str === ''||len > 10 ) {

			warn.style.display = 'block';
			warn.style.color   = 'red';
			warn.innerHTML     = '输入数量不能超过10个或者什么都不输入';
		}
		else {

			warn.style.display = 'none';

			var hobbies = '';
			// 遍历数组，创建爱好复选框
			for (i = 0; i < len; i++) {

				hobbies += '<label>' + result_arr[i] +  '<input type="checkbox">' + '</label>';
			}

			output_hobbies.innerHTML = hobbies;

		}
	}

	$.click( 'button', outputHobbies );
}());

