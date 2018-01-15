define(['assets/js/common/model.js',
	'assets/js/index/zhHead/zh_head.js',
	'assets/js/index/zhContent/zhLeftContent/content_header.js',
	'assets/js/index/zhContent/zhLeftContent/zhStory_item.js',
	'assets/js/index/zhContent/zhRightContent/zh_right_content.js'
	],
	function(modelApp, zhHeadApp, contentHeaderApp, zhStoryItemApp, zhRightContentApp){
	var app = {
		init: function(){
			zhHeadApp.init();
			contentHeaderApp.init();
			zhStoryItemApp.init();
			zhRightContentApp.init();
			this.getStart();
			this.event();
		},
		getStart: function(){
			
		},
		event: function(){
			$(window).on('scroll',function(){
				var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
				if(scrollTop > 186){
					$('.fixed-part').css({'position': 'fixed','top': '62px'});
				}else{
					$('.fixed-part').css({'position': ''});
				}
			})
		}

	};
	return app;
})