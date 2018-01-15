<div class="header-wrap zh-wrap clearfix">
    <a href="" class="zh-text-logo">知乎</a>
    <div class="header-nav">
        <a href="" class="index">首页</a>
        <a href="" class="found nav-item">发现</a>
        <a href="" class="topic nav-item">话题</a>
    </div>
    <div class="search-area"></div>
    <div class="notice-tool clearfix">
        <div class="notice-hold bell-notice-hold">
            <div class="notice bell-notice">
                {{if $data.bellNoticeCount != 0}}
                    <div class="notice-count bell-notice-count">{{$data.bellNoticeCount}}</div>
                {{/if}}
            </div>
        </div>
        <div class="notice-hold news-notice-hold">
            <div class="notice news-notice">
                {{if $data.newsNoticeCount != 0}}
                    <div class="notice-count news-notice-count">{{$data.newsNoticeCount}}</div>
                {{/if}}
            </div>
        </div>
        <div class="user-notice">
            <img src="{{$data.userPhotoUrl}}" alt="">
        </div>
    </div>
</div>