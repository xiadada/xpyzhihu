<div class="news-notice-content">
	<!--私信头部-->
	<div class="content-header">我的私信</div>
    <!--中间的内容消息-->
    <div class="content-detail-hold">
    	{{each $data.privateLetter as value}}
			<a href="" class="content-detail-item clearfix">
				<div class="left-icon">
					<img src="{{value.imgUrl}}" alt="" class="left-icon-img">
				</div>
				<div class="right-detail-content">
					<p class="right-detail-content-title">{{value.title}}</p>
					<p class="right-detail-content-text">{{value.letterContent}}</p>
				</div>
			</a>
		{{/each}}
    </div>
	<!--尾部-->
	<div class="news-notice-footer clearfix">
		<a href="" class="footer-operate write-new-letter">写新私信</a>
		<a href="" class="footer-operate check-all-letter">查看全部私信</a>
	</div>
</div>