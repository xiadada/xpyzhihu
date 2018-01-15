define(['viewTpl/zhContent/zhLeftContent/content_header',
	'viewTpl/zhContent/zhLeftContent/content_header_put_question'
	],
	function(contentHeaderTpl, putQuestionToTpl){
	var contentHeaderApp = {
		init: function(){
			this.renderContentHeader();
			this.event();
		},
		renderContentHeader: function(){
			$('.content-header').html(contentHeaderTpl());
		},
		event: function(){
			$('.content-header').on('click','.put-questions-to',function(){
				var data = {};
				var html = putQuestionToTpl(data);
				var dia1 = $.open({
					'title': '<div class="first-title">写下你的问题</div><div class="second-title">描述精确的问题更易得到解答</div>',
					'content': html,
					'area': ['596px', '520px'],
					'btn': ['提交问题','取消'],
					'success': function(){
						$('.describe-bolder').zhTipBubble({
							'content': '加粗'
						})
						$('.insert-img').zhTipBubble({
							'content': '插入图片'
						})
						$('.insert-video').zhTipBubble({
							'content': '上传视频'
						})
					},
					'btn1': function(){
						alert('a');
						
					},
					'btn2': function(){
						$.close(dia1);
					}
				})
			});

		}
	};
	return contentHeaderApp;
})