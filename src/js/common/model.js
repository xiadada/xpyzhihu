define([],function(){
	var baseUrl = '/assets/js/data/';
	var modelApp = {
		/*
		*获取知乎头部的信息
		*/
		getZhHeadInfo: function(){
			return $.ajax({
				url: baseUrl + 'index/zhHead/zh_head.json'
			})
		},
		/*
		*获取知乎头部铃铛消息信息
		*/
		getZhHeadBellNoticeInfo: function(){
			return $.ajax({
				url: baseUrl + 'index/zhHead/zh_head_bell_notice.json'
			})
		},
		/*
		*获取知乎头部私信消息信息
		*/
		getZhHeadNewsNoticeInfo: function(){
			return $.ajax({
				url: baseUrl + 'index/zhHead/zh_head_News_notice.json'
			})
		},
		/*
		*获取知乎内容回答内容条
		*/
		getZhStoryItemInfo: function(){
			return $.ajax({
				url: baseUrl + 'index/zhContent/zhStory_item.json'
			})
		},
		/*
		*获取知乎内容条关闭的内容
		*/
		getZhStoryCloseItemInfo: function(){
			return $.ajax({
				url: baseUrl + 'index/zhContent/zhStory_close_item.json'
			})
		},
		/*
		*获取知乎回答内容条评论里的内容
		*/
		getZhStoryItemCommentInfo: function(){
			return $.ajax({
				url: baseUrl + 'index/zhContent/zhStory_item_comment.json'
			})
		},
		/*
		*获取到知乎右侧的广告内容
		*/
		getzhRightAdInfo: function(){
			return $.ajax({
				url: baseUrl + 'index/zhContent/zh_right_ad.json'
			})
		},
		/*
		*获取到知乎右侧的第三部分内容，我的收藏、我关注的问题、我的邀请...
		*/
		getSlidebarPart3Info: function(){
			return $.ajax({
				url: baseUrl + 'index/zhContent/slidebar_part3_content.json'
			})
		}		
	};
	return modelApp;
})