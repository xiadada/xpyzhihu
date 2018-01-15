{{each $data.zhStoryItem as value}}
	<div class="zhStory-item" data-id="{{value.itemId}}">
		<div class="zhStory-item-close"></div>
		<div class="zhStory-item-content">

			<div class="feed-title">
				<span class="Feed-meta-item">来自话题:
					<span><a href="" class="topicLink">{{value.topicLink}}</a></span>
				</span>
			</div>

			<div class="feed-meta-author">
				<div class="author-portrait"><a href=""><img src="{{value.answerUserPhotoUrl}}" alt=""></a></div>
				<div class="author-describe">
					<span class="author-name">{{value.authorName}}</span>
					，{{value.authorDescribe}}
				</div>
			</div>

			<div class="answer-item">
				<h2><a href="" class="answer-item-topic">{{value.answerItemTopic}}</a></h2>
				<div class="answer-item-content">
					{{value.answerItemContent}}
					<span class="readAll">阅读全文</span>
				</div>
				<div class="answer-item-operate clearfix">
					<div class="attitude agree">
						<span class="agree-count">{{value.agreeCount}}</span>
					</div>
					<div class="attitude disagree"></div>
					<div class="operate-detail comment close">{{value.commentCount}}条评论</div>
					<div class="operate-detail answer-share">分享</div>
					<div class="operate-detail collection">收藏</div>
					<div class="operate-detail thank">感谢</div>
					<div class="operate-detail answer-more-operate">...</div>
				</div>
			</div>
		</div>
	</div>
{{/each}}