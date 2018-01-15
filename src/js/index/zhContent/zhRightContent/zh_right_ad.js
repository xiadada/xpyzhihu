define(['assets/js/common/model.js',
	'viewTpl/zhContent/zhRightContent/zh_right_ad'
	],
	function(modelApp, zhRightAdTpl){
	var zhRightAdApp = {
		init: function(){
			this.renderZhRightAd();
			this.event();
		},
		renderZhRightAd: function(){
			modelApp.getzhRightAdInfo().then(function(res){
				if(res.meta.status == 200){
					$('.index-right-slidebar-part2').html(zhRightAdTpl(res.data));
				}
			})
		},
		event: function(){
			$('.index-right-slidebar-part2').on('mouseenter',function(){
				$('.zh-ad-close').show()
			}).on('mouseleave',function(){
				$('.zh-ad-close').hide()
			})
			$('.index-right-slidebar-part2').on('click','.zh-ad-close',function(){
				$('.index-right-slidebar-part2').hide();
			})
		}
	};
	return zhRightAdApp;
})