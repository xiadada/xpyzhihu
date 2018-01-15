define([], function(){
	format = function(e){
		e = e || "yyyy-MM-dd HH:mm:ss";
		var t = {
			"M+": this.getMonth()+1,
			"d+": this.getDate(),
			"H+": this.getHours(),
			"m+": this.getMinutes(),
			"s+": this.getSeconds(),
			"q+": Math.floor((this.getMonth() + 3)/3),
			s: this.getMilliseconds()
		};
		/(y+)/.test(e) && (e = e.replace(RegExp.$1,(this.getFullYear()+"").substr(4 - RegExp.$1.length)));
		for(var n in t){
			(new RegExp("(" + n + ")")).test(e) && (e = e.replace(RegExp.$1,RegExp.$1.length == 1 ? t[n]:("00" + t[n]).substr(("" + t[n]).length)));
		}
		return e;
	}
	var toolApp = {
		/*
		* 将个位数转换为0开头的两位数组合，如：9-->09
		*/
		_formatSingleDigit: function(num){
			var num = parseInt(num, 10);
			if(typeof num != 'number'){
				throw new Error('Please input a correct type---number');
			}
			if(num < 10){
				return '0' + num;
			}else{
				return num;
			}
		},
		/*
		* 转化日期
		*/
		format_time: function(str,type){
			var _time;
			if(type == 'seconds'){
				_time = new Date(parseInt(str)*1000).format('yyyy-MM-dd HH:mm:ss');
			}else if(type == 'days'){
				_time = new Date(parseInt(str)*1000).format('yyyy-MM-dd');
			}
			return _time;
		},
		/*
		* 转化数字
		*/
		format_num: function(num){
			if(num > 99999999){
				var a = num / 100000000;
				return a.toFixed(2) + "亿";
			}else if(num > 9999){
				var a = num / 10000;
				return a.toFixed(1) + "K";
			}
			return num;
		},
		/*
		*匹配数组对象中，查询某个字段的值为给定值的方法
		*@param
		*arr:数组
		*segement:字段名称
		*key:需要查询的值
		*return:该元素所在的位置，若不存在该元素，返回-1
		*/
		getValInobj: function(arr,segement,key){
			for(var i = 0;i < arr.length;i++){
				if(arr[i][segement] == key){
					return i;
					break;
				}
			}
			return -1;
		}
	};
	return toolApp;
})