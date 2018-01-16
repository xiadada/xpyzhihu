define(['assets/js/common/model.js',
		'assets/js/common/tool.js',
		'viewTpl/zhContent/zhLeftContent/zhStory_item',
		'viewTpl/zhContent/zhLeftContent/zhStory_item_comment',
		'viewTpl/zhContent/zhLeftContent/zhStory_item_answer_share',
		'viewTpl/zhContent/zhLeftContent/zhStory_item_answer_more_operate',
		'viewTpl/zhContent/zhLeftContent/zhStory_item_after_revocation',
		'viewTpl/zhContent/zhLeftContent/zhStory_close_item',
		'assets/js/lib/clamp.min.js'
	],
	function(modelApp, toolApp, zhStoryItemTpl, zhStoryItemCommentTpl, zhStoryItemAnswerShareTpl, zhStoryItemAnswerMoreOperateTpl, zhStoryItemAfterRevocationTpl, zhStoryCloseItemTpl){
	var zhStoryItemApp = {
		init: function(){
			this.renderZhStoryItem();
			this.event();
		},
		renderZhStoryItem: function(){
			modelApp.getZhStoryItemInfo().then(function(res){
				if(res.meta.status == 200){
					/*
					*赞数太多时，将单位转为“K”或“亿”
					*/
					for(var i = 0;i < res.data.zhStoryItem.length; i++){
						res.data.zhStoryItem[i].agreeCount = toolApp.format_num(res.data.zhStoryItem[i].agreeCount);
					}
					$('.left-main-content').html(zhStoryItemTpl(res.data));
					/*
					*clamp多行省略，节点需要是原生的
					*/
					/*var $textArea = document.querySelectorAll('.answer-item-content');
					for(var i = 0;i < $textArea.length;i++){
						$clamp($textArea[i],{
							clamp:2,
							useNativeClamp:false,
							truncationChar:' ',
							truncationHTML:'<span class="ellipsis">...</span><span class="readAll">阅读全文</span>'});
					}*/
					/*
					*渲染分享下拉框
					*/
					var data1 = {};
					$('.answer-share').zhDropMenu({
						'area': ['136px','240px'],
						'content': zhStoryItemAnswerShareTpl(data1)
					})
					/*
					*渲染回答操作的更多
					*/
					var data2 = {};
					$('.answer-more-operate').zhDropMenu({
						'area': ['96px','92px'],
						'content': zhStoryItemAnswerMoreOperateTpl(data2)
					})
					/*
					*渲染撤销的提示气泡
					*/
					$('.zhStory-item-close').zhTipBubble({
						'content': '不感兴趣'
					})
				}
			})
		},
		event: function(){
			/*
			*控制回答内容条目的关闭按钮的显隐
			*/
			$('.left-main-content').on('mouseenter','.zhStory-item',function(){
				$(this).find('.zhStory-item-close').show();
			}).on('mouseleave','.zhStory-item',function(){
				 $(this).find('.zhStory-item-close').hide();
			});
			/*
			*关闭回答内容
			*/
			$('.left-main-content').on('click','.zhStory-item-close',function(){
				var that = this;
				$('.xpy-zhtip-bubble-wrapper').remove();
				var currentAnswerItemId = parseInt($(that).closest('.zhStory-item').data('id'));
				modelApp.getZhStoryCloseItemInfo().then(function(res){
					if(res.meta.status == 200){
						$(that).closest('.zhStory-item').html(zhStoryCloseItemTpl(res.data[currentAnswerItemId]));
					}
				})
			});
			/*
			*点击选择具体要屏蔽的内容的相关话题
			*/
			$('.left-main-content').on('click','.related-topics-item',function(){
				if($(this).hasClass('action')){
					$(this).removeClass('action');
				}else{
					$(this).addClass('action');
				}
				var actionCount = $(this).closest('.close-related-topics').find('.action').length;
				if(actionCount == 0){
					$(this).closest('.close-related-topics').siblings('.close-operate').html('撤销').addClass('revoke').removeClass('submit');
				}else{
					$(this).closest('.close-related-topics').siblings('.close-operate').html('提交').addClass('submit').removeClass('revoke');
				}
			});
			/*
			*点击回答内容条的撤销按钮
			*/
			$('.left-main-content').on('click','.revoke',function(){
				var that = this;
				var currentAnswerItemId = parseInt($(that).closest('.zhStory-item').data('id'));
				var $currentZhStoryItem = $(that).closest('.zhStory-item');
				modelApp.getZhStoryItemInfo().then(function(res){
					if(res.meta.status == 200){
						for(var i = 0;i < res.data.zhStoryItem.length;i++){
							if(res.data.zhStoryItem[i].itemId == currentAnswerItemId){	
								res.data.zhStoryItem[i].agreeCount = toolApp.format_num(res.data.zhStoryItem[i].agreeCount);
								$(that).closest('.zhStory-item').html(zhStoryItemAfterRevocationTpl(res.data.zhStoryItem[i]));
								/*
								*重新渲染分享下拉框
								*/
								var data1 = {};
								$currentZhStoryItem.find('.answer-share').zhDropMenu({
									'area': ['136px','240px'],
									'content': zhStoryItemAnswerShareTpl(data1)
								})
								/*
								*重新渲染回答操作的更多
								*/
								var data2 = {};
								$currentZhStoryItem.find('.answer-more-operate').zhDropMenu({
									'area': ['96px','92px'],
									'content': zhStoryItemAnswerMoreOperateTpl(data2)
								})
								/*
								*重新渲染撤销的提示气泡
								*/
								$('.zhStory-item-close').zhTipBubble({
									'content': '不感兴趣'
								})
							}
						}
					}
				})
			});
			/*
			*点击回答内容条的提交按钮
			*/
			$('.left-main-content').on('click','.submit',function(){
				var that = this;
				$(that).closest('.zhStory-item').remove();
				var messageText = "已减少所选内容出现";
				var message = $.msg({
					message: messageText,
					icon: ''
				});
			});
			/*
			*点赞功能
			*/
			$('.left-main-content').on('click','.agree',function(){
				if($(this).hasClass('action')){
					$(this).removeClass('action');
				}else{
					$(this).addClass('action');
					$(this).next().removeClass('action');
				}
			})
			/*
			*踩的功能
			*/
			$('.left-main-content').on('click','.disagree',function(){
				if($(this).hasClass('action')){
					$(this).removeClass('action');
				}else{
					$(this).addClass('action');
					$(this).prev().removeClass('action');
				}
			})
			/*
			*点击评论
			*/
			$('.left-main-content').on('click','.comment',function(){
				var that = this;
				if($(that).hasClass('close')){
					$(that).removeClass('close').addClass('open');
					var currentAnswerItemId = $(that).closest('.zhStory-item').data('id');
					modelApp.getZhStoryItemCommentInfo().then(function(res){
						if(res.meta.status == 200){
							$(that).closest('.zhStory-item').append(zhStoryItemCommentTpl(res.data[currentAnswerItemId]));
						}
					})
				}else{
					$(that).removeClass('open').addClass('close');
					$(that).closest('.zhStory-item').find('.comment-content-wrapper').remove();
				}
			});
			/*
			*评论里的操作显隐
			*/
			$('.left-main-content').on('mouseenter','.comment-operate',function(){
				$(this).find('.comment-operate-item-hover').show();
			}).on('mouseleave','.comment-operate',function(){
				$(this).find('.comment-operate-item-hover').hide();
			})
		}
	};
	return zhStoryItemApp;
})