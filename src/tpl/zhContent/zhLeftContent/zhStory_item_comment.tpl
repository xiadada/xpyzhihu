<div class="comment-content-wrapper">
	<div class="comment-header clearfix">
		<div class="comment-item-count">{{$data.commentContent.length}}条评论</div>
		<div class="sort-switching">切换为时间排序</div>
	</div>
	<ul class="comment-content">
		{{each $data.commentContent as value}}
			<li class="comment-content-item">
				<div class="comment-user-time-info clearfix">
					<div class="comment-user-info">
						<img src="{{value.userPhotoUrl}}" alt="">
						<a href="" class="comment-user-name">{{value.userName}}</a>
						{{if value.type == "reply"}}
							<span class="reply-text">回复</span>
							<a href="" class="comment-reply-name">{{value.replyName}}</a>
						{{/if}}
					</div>
					<div class="comment-time-info">{{value.commentTime}}</div>
				</div>
				<div class="comment-text">{{value.commentDetail}}</div>
				<div class="comment-operate clearfix">
					<div class="comment-operate-item comment-agree">
						{{if value.commentAgreeCount != 0}}
						  {{ value.commentAgreeCount}}
						{{else}}
							赞
						{{/if}}
					</div>
					{{if value.type == "reply"}}
						<div class="comment-operate-item check-communication">查看对话</div>
					{{/if}}
					<div class="comment-operate-item comment-operate-item-hover reply">回复</div>
					<div class="comment-operate-item comment-operate-item-hover step-on">踩</div>
					<div class="comment-operate-item comment-operate-item-hover report">举报</div>
				</div>
			</li>
		{{/each}}
	</ul>
	<div class="login-user-add-comment">
		<input type="text" placeholder="写下你的评论..." class="add-comment-text">
		<div class="comment-btn">评论</div>
	</div>
</div>