define(['viewTpl/zhContent/zhRightContent/zh_right_content',
		'assets/js/index/zhContent/zhRightContent/zh_right_ad.js',
		'assets/js/index/zhContent/zhRightContent/slidebar_part3_content.js'
	],
	function(zhRightContentTpl, zhRightAdApp, slidebarPart3ContentApp){
	var zhRightContentApp = {
		init: function(){
			this.renderZhRightContent();
			zhRightAdApp.init();
			slidebarPart3ContentApp.init();
			this.event();
		},
		renderZhRightContent: function(){
			var data = {};
			$('.index-right-slidebar').html(zhRightContentTpl(data));
		},
		event: function(){

		}
	};
	return zhRightContentApp;
})