define(['assets/js/common/model.js',
	'viewTpl/zhHead/zh_head',
	'viewTpl/zhHead/zhHeadBellNotice/zh_head_bell_notice',
	'viewTpl/zhHead/zhHeadBellNotice/bell_notice_news_page',
	'viewTpl/zhHead/zhHeadBellNotice/bell_notice_user_page',
	'viewTpl/zhHead/zhHeadBellNotice/bell_notice_approval_thanks_page',
	'viewTpl/zhHead/zh_head_news_notice',
	'viewTpl/zhHead/zh_head_user_notice',
	],
	function(modelApp, zhHeadTpl, zhHeadBellNoticeTpl, bellNoticeNewsPageTpl, bellNoticeUserPageTpl, bellNoticeApprovalThanksPageTpl, zhHeadNewsNoticeTpl, zhHeadUserNoticeTpl){
	var zhHeadApp = {
		init: function(){
			this.renderZhHead();
			// this.event();
		},
		/*
		*渲染头部内容
		*/
		renderZhHead: function(){
			modelApp.getZhHeadInfo().then(function(res){
				if(res.meta.status == 200){
					$('.header').html(zhHeadTpl(res.data));
					/*
					*渲染头部搜索框
					*/
					$('.search-area').associativeSearch({
						"data": [],
						"cameraIcon": "/assets/images/index/search.png",
						"searchIcon": "提问",
						"placeholder": "搜索你感兴趣的内容..."
					})
					$('input[type="text"]').on('input propertychange', function(){
						var currentValue = $.trim($(this).val());
						var $script = $('#jsonpScript');
						if($script.length != 0) $script.remove();
		
						var scriptHtml = '<script id="jsonpScript" src="http://suggestion.baidu.com/su?wd=' + currentValue + '&cb=func&qq-pf-to=pcqq.c2c"><\/script>';
						$(scriptHtml).appendTo('body');
					})
					/*
					*渲染头部三种消息的下拉框
					*/
					var data1 = {};
					$('.bell-notice-hold').zhDropMenu({
						'area': ['360px','439px'],
						'content': zhHeadBellNoticeTpl(data1),
						'success': function(){
							if($('.bell-notice-hold').hasClass('opened')){
								$('.tab-detail-content-hold').empty().append(bellNoticeNewsPageTpl(bellNoticeItem));
								zhHeadApp.event();
							}else{
								/*
								*默认铃铛消息的下拉框内容为tab的第一个消息内容
								*/
								$('.bell-notice-hold').addClass('opened')
								modelApp.getZhHeadBellNoticeInfo().then(function(res){
									if(res.meta.status == 200){
										bellNoticeItem = res.data.bellNoticeItem;
										if(res.data.bellNoticeItem == null){
											var html = '<div class="no-data">还没有消息</div>';
											$('.tab-detail-content-hold').empty().append(html);
										}else{
											$('.tab-detail-content-hold').empty().append(bellNoticeNewsPageTpl(res.data.bellNoticeItem));
										}
									}
								})
								/*
								*点击tab切换内容
								*/
								zhHeadApp.event();
							}
						}
					})
					/*modelApp.getZhHeadNewsNoticeInfo().then(function(res){
						if(res.meta.status == 200){
							var data2 = res.data;
							$('.news-notice-hold').zhDropMenu({
							'area': ['360px','439px'],
							'content': zhHeadNewsNoticeTpl(data2)
							})
						}
					})*/
					/*
					*先渲染结构，再请求数据方法
					*/
					$('.news-notice-hold').zhDropMenu({
						'area': ['360px','439px'],
						'content': '',
						'success': function(){
							if($('.news-notice-hold').hasClass('opened')){
								$('.xpy-zhdrop-menu-content').html(zhHeadNewsNoticeTpl(data2));
							}else{
								$('.news-notice-hold').addClass('opened')
								modelApp.getZhHeadNewsNoticeInfo().then(function(res){
									if(res.meta.status == 200){
										data2 = res.data;
										$('.xpy-zhdrop-menu-content').html(zhHeadNewsNoticeTpl(data2));
									}
								})
							}
						}
					})
					var data3 = {};
					$('.user-notice img').zhDropMenu({
						'area': ['118px','122px'],
						'content': zhHeadUserNoticeTpl(data3)
					})
				}
			})			
		},
		event: function(){
			/*
			*铃铛提醒的tab内容切换
			*/
			$('.bell-notice-content').on('click','.nav-tab-item',function(){
				if($(this).data('action') == 'news-page'){
					$(this).addClass('action').siblings().removeClass('action');
					modelApp.getZhHeadBellNoticeInfo().then(function(res){
						if(res.meta.status == 200){
							if(res.data.bellNoticeItem == null){
								var html = '<div class="no-data">还没有消息</div>';
								$('.tab-detail-content-hold').empty().append(html);
							}else{
								$('.tab-detail-content-hold').empty().append(bellNoticeNewsPageTpl(res.data.bellNoticeItem));
							}
						}
					})
				}else if($(this).data('action') == 'user-page'){
					$(this).addClass('action').siblings().removeClass('action');
					modelApp.getZhHeadBellNoticeInfo().then(function(res){
						if(res.meta.status == 200){
							if(res.data.userNewsItem == null){
								var html = '<div class="no-data">还没有消息</div>';
								$('.tab-detail-content-hold').empty().append(html);
							}else{
								$('.tab-detail-content-hold').empty().append(bellNoticeUserPageTpl(res.data.userNewsItem));
							}
						}
					})
				}else if($(this).data('action') == 'approval-thanks-page'){
					$(this).addClass('action').siblings().removeClass('action');
					modelApp.getZhHeadBellNoticeInfo().then(function(res){
						if(res.meta.status == 200){
							if(res.data.userNewsItem == null){
								var html = '<div class="no-data">还没有消息</div>';
								$('.tab-detail-content-hold').empty().append(html);
							}else{
								$('.tab-detail-content-hold').empty().append(bellNoticeApprovalThanksPageTpl(res.data.approvalAndThanks));
							}
						}
					})
				}
			})
		}
	};
	return zhHeadApp;
})
function func(res){
	data = [];
	data = res.s;
	$('.search-area').associativeSearchFn('data',data);
}