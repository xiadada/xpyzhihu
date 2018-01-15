<ul class="slidebar-part3-content">
    {{each $data.itemCount as value}}
        <li class="part3-content-item clearfix">
            <a href="{{value.href}}">
                <span class="item-describe {{value.itemDescribeClass}}">{{value.itemDescribe}}</span>
                <span class="item-count {{value.itemCountClass}}">{{value.itemCount}}</span>
            </a>									
        </li>
    {{/each}}
</ul>