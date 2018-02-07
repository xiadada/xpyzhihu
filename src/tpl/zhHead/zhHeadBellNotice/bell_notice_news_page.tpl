<div class="tab-detail-content news-page">
    <ul class="news-page-content">
        {{each $data as value}}
            <li class="news-page-content-item">
                {{each value.name as item index}}
                    <a href="" class="user-name colorSet">{{item}}</a>
                    {{if index != value.name.length -1}}                      
                        <span class="split">、</span>
                    {{/if}}
                {{/each}}
                {{if value.type == 'question'}}
                    的提问等你来答
                {{else value.type == 'answer'}}
                     回答了
                {{/if}}
                <a href="" class="question-topic colorSet">{{value.topic}}</a>
            </li>
        {{/each}}
    </ul>
</div>