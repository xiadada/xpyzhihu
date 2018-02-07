<div class="tab-detail-content approval-thanks-page">
    <ul class="approval-thanks-page-content">
        {{each $data as value}}
            <li class="approval-thanks-content-item">
                获得
                <a href="" class="approval-count">{{value.count}}</a>
                {{if value.type == 'approval'}}
                    次赞同
                {{else value.type == 'thanks'}}
                    次感谢
                {{/if}}
                <a href="" class="approval-topic colorSet">{{value.title}}</a>
                来自
                 {{each value.fromUser as item index}}
                    <a href="" class="approval-user-name colorSet">{{item}}</a>
                    {{if index != value.fromUser.length -1}}
                         <span class="split">、</span>
                    {{/if}}
                {{/each}}
            </li>
        {{/each}}
    </ul>
</div>