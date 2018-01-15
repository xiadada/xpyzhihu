<div class="close-operate revoke">撤销</div>
<div class="close-tip">已屏蔽该条。还不想看见以下哪些内容？</div>
<ul class="close-related-topics clearfix">
 	{{each $data.closeContent as value}}
 		<li class="related-topics-item" data-value="{{value.topicValue}}">{{value.relatedTopics}}</li>
 	{{/each}}
</ul>