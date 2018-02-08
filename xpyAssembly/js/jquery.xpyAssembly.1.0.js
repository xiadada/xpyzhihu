;(function(){
	carouselTimer = {};	
	var app = {
		init: function(){
			this.getStart();
			this.event();
		},
		getStart: function(){
			$.fn.extend({
				/*
				*JD轮播组件
				*/
				'carousel': function(param){
					var elem = this;
					return openCarousel(elem, param);
				},
				/*
				*JD滑动组件
				*/
				'slideMove': function(param){
					var elem = this;
					return openSlideMove(elem, param);
				},
				/*
				*JD联想搜索
				*/
				'associativeSearch': function(param){
					elem = this;
					return openAssociativeSearch(elem, param);
				},
				'associativeSearchFn': function(fnName, content){
					switch(fnName) {
						case 'data': 
							associativeSearchFnApp.data(content);
							break;
					}
				},
				/*
				*知乎点击元素出现下拉框组件
				*/
				'zhDropMenu': function(param){
					var elem = this;
					return openZhDropMenu(elem, param);
				},
				/*
				*知乎提示气泡
				*/
				'zhTipBubble': function(param){
					var elem = this;
					return openZhTipBubble(elem, param);
				},
				/*
				*下拉选择框
				*/
				'dropdown': function(param){
					var elem = this;
					console.log(elem);
					return dropdownMenu(elem, param);
				},
			})
			/*
			*弹出框
			*/
			$.extend({
				'open': function(param){
					return openDialog(param);
				},
				'close': function(param){
					closeDialog(param, 'current');
				},
				'msg': function(param){
					return dialogmessage(param);
				}				
			})
		},
		event: function(){
			//知乎的点击其他地方，下拉框消失
			$(document).on('click',function(e){
				$target = $(e.target);
				if($target.closest('.popover').length == 1){
					$('.popover').each(function(i, item){
						if($(item).context != $target.closest('.popover').context && $(item).hasClass('close')){
							$(item).removeClass('close').addClass('open');
						}
					})
					return;
				}
				if($('.xpy-zhdrop-menu-wrapper').length == 1){
					$('.xpy-zhdrop-menu-wrapper').remove();
				}
				$('.popover').removeClass('close').addClass('open');
			});

			$(window).resize(function(){
				resizeDialog();
			});

			//下拉框位置重置
			// $(window).resize(function(){
			// 	resizeDropPosition();
			// });
			//点击其他地方，下拉框消失
			$(document).on('click',function(e){
				$target = $(e.target);
				if($target.closest('.dropdown-textbox').length == 1){
					$('.dropdown-textbox').each(function(i, item){
						if($(item).context != $target.closest('.dropdown-textbox').context && $(item).hasClass('close')){
							$(item).removeClass('close').addClass('open');
						}
					})
					return;
				}
				if($('.drop-down-menu').length == 1){
					$('.drop-down-menu').remove();
				}
				$('.dropdown-textbox').removeClass('close').addClass('open');

			});

		}

	};
	app.init();
})($);

/*
*轮播组件部分
*/
var carouselMap = {};
function openCarousel(elem, param){
	//默认参数
	var defaults = {
		'data': ' ',
		'isInfinit': true,
		'isSlide': false,
		'isBtn': true,
		'skipBar':{
			'show': true,
			'trigger': 'hover'
		}
	};
	//合并参数
	var options = $.extend(true, defaults, param);
	var carouselCount = $('.xpy-carousel-img-hold').length;
	carouselMap['carousel-'+carouselCount] = {};
	carouselMap['carousel-'+carouselCount].flag = true;
	carouselMap['carousel-'+carouselCount].timer;
	carouselMap['carousel-'+carouselCount].index = 0;
	carouselMap['carousel-'+carouselCount].data = options.data;
	
	//图片容器html结构,和圈的结构
	carouselMap['carousel-'+carouselCount].imgItemHtml = '';
	carouselMap['carousel-'+carouselCount].circleHtml = '<div class="xpy-carousel-circle clearfix">';
	for(var i = 0; i < carouselMap['carousel-'+carouselCount].data.length; i++){
		carouselMap['carousel-'+carouselCount].imgItemHtml += '<li class="xpy-carousel-img-item"><img src="'+ carouselMap['carousel-'+carouselCount].data[i].url +'"></li>';
		carouselMap['carousel-'+carouselCount].circleHtml += '<span></span>'
	}
	
	//轮播总体html结构
	if(options.skipBar.show == true && options.isBtn == true){
		var carouselHtml = '<div class="xpy-carousel-wrapper" id="carousel-'+ carouselCount +'">'+
								'<ul class="xpy-carousel-img-hold clearfix">'+carouselMap['carousel-'+carouselCount].imgItemHtml+'</ul>'+					
								carouselMap['carousel-'+carouselCount].circleHtml+
								'</div>'+
								'<div class="xpy-btn xpy-btn-left" data-orient="left"><</div>'+
								'<div class="xpy-btn xpy-btn-right" data-orient="right">></div>'+
							'</div>';
	}else if(!options.skipBar.show && options.isBtn == true){
		var carouselHtml = '<div class="xpy-carousel-wrapper">'+
								'<ul class="xpy-carousel-img-hold clearfix">'+carouselMap['carousel-'+carouselCount].imgItemHtml+'</ul>'+
								'<div class="xpy-btn xpy-btn-left" data-orient="left"><</div>'+
								'<div class="xpy-btn xpy-btn-right" data-orient="right">></div>'+
							'</div>'; 
	}else if(options.skipBar.show == true && !options.isBtn){
		var carouselHtml = '<div class="xpy-carousel-wrapper" id="carousel-'+ carouselCount +'">'+
								'<ul class="xpy-carousel-img-hold clearfix">'+carouselMap['carousel-'+carouselCount].imgItemHtml+'</ul>'+					
								carouselMap['carousel-'+carouselCount].circleHtml+
								'</div>'+
							'</div>';

	}else if(!options.skipBar.show && !options.isBtn){
		var carouselHtml = '<div class="xpy-carousel-wrapper">'+
								'<ul class="xpy-carousel-img-hold clearfix">'+carouselMap['carousel-'+carouselCount].imgItemHtml+'</ul>'+
							'</div>'; 
	}
	$(elem).css({'overflow': 'hidden'});
	$(elem).append(carouselHtml);
	var items = $(elem).find('.xpy-carousel-img-item');
	var width = items.length*$(elem).width();
	$(elem).find('.xpy-carousel-img-hold').width(width);
	$(elem).find('.xpy-carousel-img-item').width(1 / items.length * 100 + '%');
	if(!options.isInfinit){
		$(elem).find('.xpy-btn-left').addClass('forbidden');
	}
	if(options.skipBar.show){
		$(elem).find('.xpy-carousel-circle span').eq(0).addClass('xpy-action');
	}
	//自动向右播放
	carouselMap['carousel-'+carouselCount].timer = setInterval(function(){
		rightMove(elem,options,carouselCount);
	},options.slideTime);
	//鼠标移入移出事件
	$(elem).find('.xpy-carousel-wrapper').on('mouseover',function(){
		var nowCarouselCount = $(this).attr('id').split('-')[1];
		clearInterval(carouselMap['carousel-'+nowCarouselCount].timer);
		$(elem).find('.xpy-btn').show();
	});
	$(elem).find('.xpy-carousel-wrapper').on('mouseout',function(){
		var nowCarouselCount = $(this).attr('id').split('-')[1];
		carouselMap['carousel-'+nowCarouselCount].timer = setInterval(function(){
			rightMove(elem,options,nowCarouselCount);
		},options.slideTime);
		$(elem).find('.xpy-btn').hide();
	});

	//左右键点击事件
	$(elem).find('.xpy-btn-right').on('click',function(){	
		var nowCarouselCount = $(this).closest('.xpy-carousel-wrapper').attr('id').split('-')[1];	
		if(options.isInfinit == true){
			rightMove(elem,options,nowCarouselCount);			
		}else{
			//为最后一张时，禁止循环轮播
			if($(elem).find('.xpy-carousel-img-hold').css('left') == 0-$(elem).find('.xpy-carousel-img-hold').outerWidth() + $(elem).width() + 'px'){
				return;
			}else{
				rightMove(elem,options,nowCarouselCount);
			}
		}
	});
	$(elem).find('.xpy-btn-left').on('click',function(){
		var nowCarouselCount = $(this).closest('.xpy-carousel-wrapper').attr('id').split('-')[1];
		if(options.isInfinit == true){
			leftMove(elem,options,nowCarouselCount);
		}else if(!options.isInfinit){
			//为第一张时禁止左轮播图片
			if($(elem).find('.xpy-carousel-img-hold').css('left') == '0px'){
				return;
			}else{
				leftMove(elem,options,nowCarouselCount);
			}	
		}					
	});


	//圆点hover触发形式
	if(options.skipBar.show){
		if(options.skipBar.trigger == 'hover'){
		$(elem).find('.xpy-carousel-circle').on('mouseover','span',function(){
			carouselMap['carousel-'+carouselCount].index = $(this).index();
			if(!options.isSlide){
				$(elem).find('.xpy-carousel-img-hold').fadeOut(200,function(){
					$(elem).find('.xpy-carousel-img-hold').animate({'left': 0-$(elem).width()*carouselMap['carousel-'+carouselCount].index + 'px'},0).fadeIn(300);	
				})				
			}else{
				$(elem).find('.xpy-carousel-img-hold').fadeOut(200,function(){
					$(elem).find('.xpy-carousel-img-hold').animate({'left': 0-$(elem).width()*carouselMap['carousel-'+carouselCount].index + 'px'}).fadeIn(300);
				})				
			}
			if($(elem).find('.xpy-carousel-img-hold').css('left') == 0-$(elem).find('.xpy-carousel-img-hold').outerWidth() + $(elem).width() + 'px' && !options.isInfinit){
				$(elem).find('.xpy-btn-right').addClass('forbidden');
			}else if($(elem).find('.xpy-carousel-img-hold').css('left') == '0px' && !options.isInfinit){
				$(elem).find('.xpy-btn-left').addClass('forbidden');
			}else{
				$(elem).find('.xpy-btn-right').removeClass('forbidden');
				$(elem).find('.xpy-btn-left').removeClass('forbidden');
			}
			if(options.skipBar.show){
				$(elem).find(this).addClass('xpy-action').siblings().removeClass('xpy-action');
			}			
		})
		//圆点click点击触发形式
		}else if(options.skipBar.trigger == 'click'){
			$(elem).find('.xpy-carousel-circle').on('click','span',function(){
				carouselMap['carousel-'+carouselCount].index = $(this).index();
				if(!options.isSlide){
					$(elem).find('.xpy-carousel-img-hold').fadeOut(200,function(){
						$(elem).find('.xpy-carousel-img-hold').animate({'left': 0-$(elem).width()*carouselMap['carousel-'+carouselCount].index + 'px'},0).fadeIn(300);	
					})
				}else{
					$(elem).find('.xpy-carousel-img-hold').fadeOut(200,function(){
						$(elem).find('.xpy-carousel-img-hold').animate({'left': 0-$(elem).width()*carouselMap['carousel-'+carouselCount].index + 'px'}).fadeIn(300);
					})
				}
				if($(elem).find('.xpy-carousel-img-hold').css('left') == 0-$(elem).find('.xpy-carousel-img-hold').outerWidth() + $(elem).width() + 'px' && !options.isInfinit){
					$(elem).find('.xpy-btn-right').addClass('forbidden');
				}else if($(elem).find('.xpy-carousel-img-hold').css('left') == '0px' && !options.isInfinit){
					$(elem).find('.xpy-btn-left').addClass('forbidden');
				}else{
					$(elem).find('.xpy-btn-right').removeClass('forbidden');
					$(elem).find('.xpy-btn-left').removeClass('forbidden');
				}
				if(options.skipBar.show){
					$(elem).find(this).addClass('xpy-action').siblings().removeClass('xpy-action');
				}		
			})
		}
	}	

}
function rightMove(elem,param,carouselCount){
	var items = $(elem).find('.xpy-carousel-img-item');
	var width = items.length*$(elem).width();
	if(carouselMap['carousel-'+carouselCount].flag){
		carouselMap['carousel-'+carouselCount].flag = false;
		var $picWrap =$(elem).find('.xpy-carousel-img-hold').eq(0),
			$picItems = $picWrap.find('.xpy-carousel-img-item');
		var left = -$(elem).width();
		if(!param.isSlide){
			$picWrap.fadeOut(200,function(){
				$picWrap.animate({
					'left': parseInt($picWrap.css('left')) + left
				},0,function(){
					if($picWrap.css('left') == '0px' && !param.isInfinit){
						$(elem).find('.xpy-btn-left').addClass('forbidden');
					}else if($picWrap.css('left') == 0 - $picWrap.width() + $(elem).width() + 'px' && !param.isInfinit){
						$(elem).find('.xpy-btn-right').addClass('forbidden');
					}else if($picWrap.css('left') == 0 - $picWrap.width() + 'px'){
						$picWrap.css({'left': '0px'});
					}else{
						$(elem).find('.xpy-btn-left').removeClass('forbidden');
						$(elem).find('.xpy-btn-right').removeClass('forbidden');
					}
					carouselMap['carousel-'+carouselCount].index ++;
					if(param.skipBar.show){
						$(elem).find('.xpy-carousel-circle span').eq(carouselMap['carousel-'+carouselCount].index % carouselMap['carousel-'+carouselCount].data.length).addClass('xpy-action').siblings().removeClass('xpy-action');	
					}
					carouselMap['carousel-'+carouselCount].flag = true;
				}).fadeIn(300);
			})
		}else{
			if($picWrap.css('left') == 0 - $picWrap.width() + $(elem).width() + 'px'){
				var circleHtml = '<ul class="xpy-carousel-img-hold clearfix" id ="carousel-'+carouselCount+'">'+carouselMap['carousel-'+carouselCount].imgItemHtml+'</ul>';
				$(elem).find('.xpy-carousel-wrapper').append(circleHtml);
				$(elem).find('.xpy-carousel-img-hold').eq(1).width(width).css({'left': $(elem).width()});
				$(elem).find('.xpy-carousel-img-item').width(1 / items.length * 100 + '%');
				$picWrap.animate({
					'left': parseInt($picWrap.css('left')) + left
				},function(){
					$picWrap.remove();
				})
				$(elem).find('.xpy-carousel-img-hold').eq(1).animate({
					'left': parseInt($(elem).find('.xpy-carousel-img-hold').eq(1).css('left')) + left
				},function(){
					carouselMap['carousel-'+carouselCount].index ++;
					carouselMap['carousel-'+carouselCount].index = carouselMap['carousel-'+carouselCount].index % carouselMap['carousel-'+carouselCount].data.length;
					if(param.skipBar.show){
						$(elem).find('.xpy-carousel-circle span').eq(carouselMap['carousel-'+carouselCount].index % carouselMap['carousel-'+carouselCount].data.length).addClass('xpy-action').siblings().removeClass('xpy-action');	
					}
					carouselMap['carousel-'+carouselCount].flag = true;
				})
				
			}
			$picWrap.animate({
				'left': parseInt($picWrap.css('left')) + left
			},function(){
				if($picWrap.css('left') == '0px' && !param.isInfinit){
					$(elem).find('.xpy-btn-left').addClass('forbidden');
				}else if($picWrap.css('left') == 0 - $picWrap.width() + $(elem).width() + 'px' && !param.isInfinit){
					$(elem).find('.xpy-btn-right').addClass('forbidden');
				}else{
					$(elem).find('.xpy-btn-left').removeClass('forbidden');
					$(elem).find('.xpy-btn-right').removeClass('forbidden');
				}
				carouselMap['carousel-'+carouselCount].index ++;
				if(param.skipBar.show){
					$(elem).find('.xpy-carousel-circle span').eq(carouselMap['carousel-'+carouselCount].index % carouselMap['carousel-'+carouselCount].data.length).addClass('xpy-action').siblings().removeClass('xpy-action');	
				}
				carouselMap['carousel-'+carouselCount].flag = true;
			})
		}
		
	}
}


function leftMove(elem,param,carouselCount){
	var items = $(elem).find('.xpy-carousel-img-item');
	var width = items.length*$(elem).width();
	if(carouselMap['carousel-'+carouselCount].flag){
		carouselMap['carousel-'+carouselCount].flag = false;
		var $picWrap =$(elem).find('.xpy-carousel-img-hold').eq(0),
			$picItems = $picWrap.find('.xpy-carousel-img-item');
		var left = $(elem).width();

		if(!param.isSlide){
			$picWrap.fadeOut(200,function(){
				$picWrap.animate({
					'left': parseInt($picWrap.css('left')) + left
				},0,function(){
					if($picWrap.css('left') == '0px' && !param.isInfinit){
						//禁止轮播的情况
						$(elem).find('.xpy-btn-left').addClass('forbidden');
					}else if($picWrap.css('left') == $(elem).width() + 'px'){
						//循环轮播的情况
						$picWrap.css({'left': 0 - $(elem).find('.xpy-carousel-img-hold').width() + $(elem).width() + 'px'});
					}else if($picWrap.css('left') == 0 - $(elem).find('.xpy-carousel-img-hold').width() + $(elem).width() + 'px' && !param.isInfinit){
						//禁止轮播的情况
						$(elem).find('.xpy-btn-right').addClass('forbidden');						
					}else{
						$(elem).find('.xpy-btn-left').removeClass('forbidden');
						$(elem).find('.xpy-btn-right').removeClass('forbidden');
					}
					carouselMap['carousel-'+carouselCount].index --;
					if(param.skipBar.show){
						$(elem).find('.xpy-carousel-circle span').eq(carouselMap['carousel-'+carouselCount].index % carouselMap['carousel-'+carouselCount].data.length).addClass('xpy-action').siblings().removeClass('xpy-action');	
					}
					carouselMap['carousel-'+carouselCount].flag = true;
				}).fadeIn(300);
			})			
		}else{
			if($picWrap.css('left') == '0px'){
				var circleHtml = '<ul class="xpy-carousel-img-hold clearfix" id ="carousel-'+carouselCount+'">'+carouselMap['carousel-'+carouselCount].imgItemHtml+'</ul>';
				$(elem).find('.xpy-carousel-wrapper').append(circleHtml);
				$(elem).find('.xpy-carousel-img-hold').eq(1).width(width).css({'left': -$picWrap.width()});
				$(elem).find('.xpy-carousel-img-item').width(1 / items.length * 100 + '%');
				$picWrap.animate({
					'left': parseInt($picWrap.css('left')) + left
				},function(){
					$picWrap.remove();
				})
				$(elem).find('.xpy-carousel-img-hold').eq(1).animate({
					'left': parseInt($(elem).find('.xpy-carousel-img-hold').eq(1).css('left')) + left
				},function(){
					carouselMap['carousel-'+carouselCount].index --;
					carouselMap['carousel-'+carouselCount].index = carouselMap['carousel-'+carouselCount].index % carouselMap['carousel-'+carouselCount].data.length;
					if(param.skipBar.show){
						$(elem).find('.xpy-carousel-circle span').eq(carouselMap['carousel-'+carouselCount].index % carouselMap['carousel-'+carouselCount].data.length).addClass('xpy-action').siblings().removeClass('xpy-action');	
					}
					carouselMap['carousel-'+carouselCount].flag = true;
				})
				
			}
			$picWrap.animate({
				'left': parseInt($picWrap.css('left')) + left
			},function(){
				if($picWrap.css('left') == '0px' && !param.isInfinit){
					$(elem).find('.xpy-btn-left').addClass('forbidden');
				}else if($picWrap.css('left') == 0 - $picWrap.width() + $(elem).width() + 'px' && !param.isInfinit){
					$(elem).find('.xpy-btn-right').addClass('forbidden');
				}else{
					$(elem).find('.xpy-btn-left').removeClass('forbidden');
					$(elem).find('.xpy-btn-right').removeClass('forbidden');
				}
				carouselMap['carousel-'+carouselCount].index --;
				if(param.skipBar.show){
					$(elem).find('.xpy-carousel-circle span').eq(carouselMap['carousel-'+carouselCount].index % carouselMap['carousel-'+carouselCount].data.length).addClass('xpy-action').siblings().removeClass('xpy-action');	
				}
				carouselMap['carousel-'+carouselCount].flag = true;
			})
		}
		
	}
}
/*
*滑动组件部分
*/
function openSlideMove(elem, param){
	//默认参数
	var defaults = {
		'data': ' ',
		'isInfinit': true,
		'slideLength': 5,
		'showLength': 5,
		'showImgContentWidth': 200
	};
	//合并参数
	var options = $.extend(true, defaults, param);
	var SlideMoveCount = $('.xpy-slide-img-hold').length;
	imgItemHtml = '';

	//图片容器html结构
	for(var i = 0; i < options.data.length; i++){
		if(options.data[i].text){
			imgItemHtml += '<li class="xpy-slide-img-item">'+
								'<div class="xpy-slide-img-content">'+
									'<img src="'+ options.data[i].url +'">'+
								'</div>'+
								'<div class="xpy-slide-textholder style=height:26%">'+
									'<div class="xpy-slide-text-title">' + options.data[i].text + '</div>'+
									'<div class="xpy-slide-text-price">'+
										'<span class="xpy-slide-text-promotion-price"><i>￥</i><span>' + options.data[i].promotionPrice + '</span></span>'+
										'<span class="xpy-slide-text-original-price"><i>￥</i><del>' + options.data[i].originalPrice + '</del></span>'+
									'</div>'+
								'</div>'+
						'</li>';
		}else{
			imgItemHtml += '<li class="xpy-slide-img-item"><div class="xpy-slide-img-content"><img src="'+ options.data[i].url +'"></div></li>';
		}
	}	
	//滑动组件总体html结构
		var slideMoveHtml = '<div class="xpy-slide-wrapper" id="xpy-slide-wrapper'+SlideMoveCount+'">'+
								'<ul class="xpy-slide-img-hold clearfix">'
									+imgItemHtml+
								'</ul>'+							
								'<div class="xpy-slide-btn xpy-slide-btn-left"><</div>'+
								'<div class="xpy-slide-btn xpy-slide-btn-right">></div>'+
							'</div>'
	
	$(elem).append(slideMoveHtml);
	var items = $(elem).find('.xpy-slide-img-item');
	$(elem).width(options.showLength*options.showImgContentWidth);
	$(elem).find('.xpy-slide-img-hold').width(items.length*options.showImgContentWidth);
	$(elem).find('.xpy-slide-img-item').width(options.showImgContentWidth-1);
	if(!options.isInfinit){
		$(elem).find('.xpy-slide-btn-left').addClass('forbidden');
	}
	if(options.rubberBanding){
		// $(elem).find('.img')
	}
	$(elem).on('mouseenter',function(){
		$(elem).find('.xpy-slide-btn').show();
	}).on('mouseleave',function(){
		$(elem).find('.xpy-slide-btn').hide();
	})
	//左右键点击事件
	$(elem).find('.xpy-slide-btn-right').on('click',function(){
		var $currentSlideWrapper = $(this).closest('.xpy-slide-wrapper');
		var nowSlideCount = $currentSlideWrapper.attr('id').substr($currentSlideWrapper.attr('id').length-1);
		if(options.isInfinit == true){
			slideRightMove(elem,options,nowSlideCount);			
		}else{
			//为最后显示的几张时，禁止循环轮播
			if($(elem).find('.xpy-slide-img-hold').css('left') == 0-$(elem).find('.xpy-slide-img-hold').outerWidth() + $(elem).width() + 'px'){
				return;
			}else{
				slideRightMove(elem,options,nowSlideCount);
			}
		}
	});
	$(elem).find('.xpy-slide-btn-left').on('click',function(){
		var $currentSlideWrapper = $(this).closest('.xpy-slide-wrapper');
		var nowSlideCount = $currentSlideWrapper.attr('id').substr($currentSlideWrapper.attr('id').length-1);
		if(options.isInfinit == true){
			slideLeftMove(elem,options,nowSlideCount);
		}else if(!options.isInfinit){
			//为第一张时禁止左轮播图片
			if($(elem).find('.xpy-slide-img-hold').css('left') == '0px'){
				return;
			}else{
				slideLeftMove(elem,options,nowSlideCount);
			}	
		}					
	});
}
function slideRightMove(elem,param,SlideMoveCount){
	var items = $(elem).find('.xpy-slide-img-item');
	var width = items.length*param.showImgContentWidth;
	var $picWrap =$(elem).find('.xpy-slide-img-hold').eq(0),
		$picItems = $picWrap.find('.xpy-slide-img-item');
	var left = -param.slideLength*param.showImgContentWidth;
	if($picWrap.css('left') == 0 - $picWrap.width() + $(elem).width() + 'px'){
		var circleHtml = '<ul class="xpy-slide-img-hold clearfix" id="xpy-slide-wrapper'+SlideMoveCount+'">'+imgItemHtml+'</ul>';
		$(elem).find('.xpy-slide-wrapper').append(circleHtml);
		$(elem).find('.xpy-slide-img-hold').eq(1).width(width).css({'left': $(elem).width()});
		$(elem).find('.xpy-slide-img-item').width(param.showImgContentWidth-1);
		$picWrap.animate({
			'left': parseInt($picWrap.css('left')) + left
		},function(){
			$picWrap.remove();
		})
		$(elem).find('.xpy-slide-img-hold').eq(1).animate({
			'left': parseInt($(elem).find('.xpy-slide-img-hold').eq(1).css('left')) + left
		})
		
	}
	$picWrap.animate({
		'left': parseInt($picWrap.css('left')) + left
	},function(){
		if($picWrap.css('left') == '0px' && !param.isInfinit){
			$(elem).find('.xpy-slide-btn-left').addClass('forbidden');
		}else if($picWrap.css('left') == 0 - $picWrap.width() + $(elem).width() + 'px' && !param.isInfinit){
			$(elem).find('.xpy-slide-btn-right').addClass('forbidden');
		}else{
			$(elem).find('.xpy-slide-btn-left').removeClass('forbidden');
			$(elem).find('.xpy-slide-btn-right').removeClass('forbidden');
		}
	})		
}


function slideLeftMove(elem,param,SlideMoveCount){
	var items = $(elem).find('.xpy-slide-img-item');
	var width = items.length*param.showImgContentWidth;
	var $picWrap =$(elem).find('.xpy-slide-img-hold').eq(0),
		$picItems = $picWrap.find('.xpy-slide-img-item');
	var left = param.slideLength*param.showImgContentWidth;

	if($picWrap.css('left') == '0px'){
		var circleHtml = '<ul class="xpy-slide-img-hold clearfix" id="xpy-slide-wrapper'+SlideMoveCount+'">'+imgItemHtml+'</ul>';
		$(elem).find('.xpy-slide-wrapper').append(circleHtml);
		$(elem).find('.xpy-slide-img-hold').eq(1).width(width).css({'left': -$picWrap.width()});
		$(elem).find('.xpy-slide-img-item').width(param.showImgContentWidth-1);
		$picWrap.animate({
			'left': parseInt($picWrap.css('left')) + left
		},function(){
			$picWrap.remove();
		})
		$(elem).find('.xpy-slide-img-hold').eq(1).animate({
			'left': parseInt($(elem).find('.xpy-slide-img-hold').eq(1).css('left')) + left
		})
		
	}
	$picWrap.animate({
		'left': parseInt($picWrap.css('left')) + left
	},function(){
		if($picWrap.css('left') == '0px' && !param.isInfinit){
			$(elem).find('.xpy-slide-btn-left').addClass('forbidden');
		}else if($picWrap.css('left') == 0 - $picWrap.width() + $(elem).width() + 'px' && !param.isInfinit){
			$(elem).find('.xpy-slide-btn-right').addClass('forbidden');
		}else{
			$(elem).find('.xpy-slide-btn-left').removeClass('forbidden');
			$(elem).find('.xpy-slide-btn-right').removeClass('forbidden');
		}
	})		
}

/*
*渲染联想搜索框结构
*/
function openAssociativeSearch(elem, param){
	//默认参数
	var defaults = {
		'data': [],
		"cameraIcon": "",
		"searchIcon": "",
		"placeholder": ""
	};
	//合并参数
	options = $.extend(true, defaults, param);
	//获取各种参数
	// data = options.data;
	//联想搜索框的个数
	associativeSearchCount = $('.xpy-associative-search-hold').length;
	//联想搜索html结构
	var associativeSearchHtml = '<div class="xpy-associative-search-hold" id="xpy-associative-search-hold-'+associativeSearchCount+'">'+
									'<input type="text" class="xpy-associative-search" placeholder="'+options.placeholder+'">'+
									'<div class="xpy-associative-camera">'+
										'<input type="file" title="未选择任何文件">'+
									'</div>'+
									'<div class="xpy-associative-search-icon">'+options.searchIcon+'</div>'+
									'<ul class="xpy-associative-search-result"></ul>'+
								'</div>'
	$(elem).append(associativeSearchHtml);
	var searchHoldTop = $(elem).find('.xpy-associative-search-hold').outerHeight() - 1 + 'px';
	$(elem).find('.xpy-associative-search-result').css({'top': searchHoldTop});
	$('.xpy-associative-camera').css({'background': 'url("'+options.cameraIcon+'") 0 no-repeat'});
	$('.xpy-associative-search-icon').css({'background': '#f10215 url("'+options.searchIcon+'") center no-repeat'})
}
var associativeSearchFnApp = {
	data: function(content){
		options.data = content;
		searchKeywords(elem, options);
		allEvent(elem,options);
	}
}
/*
*输入关键字联想搜索
*/
function searchKeywords(elem, param){
	$(elem).find('.xpy-associative-search-result').empty().hide();
	value = $.trim($('input[type="text"]').val());
	if(value){
		for(var i = 0; i < param.data.length; i++){
			var resultLi = '<li class="xpy-associative-result-item">'+param.data[i]+'</li>';
			$(elem).find('.xpy-associative-search-result').append(resultLi);
		}
		if($(elem).find('.xpy-associative-result-item').length != 0){
			$(elem).find('.xpy-associative-search-result').show();
		}
	}else{
		$(elem).find('.xpy-associative-search-result').empty().hide;
	}	
}
//各种事件
function allEvent(elem,param){
	$(elem).on('focus','.xpy-associative-search-hold input',function(){
		$(elem).find('.xpy-associative-search-result').empty().hide();
		var value = $.trim($(this).val());
		if(value){
			for(var i = 0; i < param.data.length; i++){
				var resultLi = '<li class="xpy-associative-result-item">'+param.data[i]+'</li>';
				$(elem).find('.xpy-associative-search-result').append(resultLi);
			}
			if($(elem).find('.xpy-associative-result-item').length != 0){
				$(elem).find('.xpy-associative-search-result').show();
			}
		}else{
			$(elem).find('.xpy-associative-search-result').empty().hide;
		}
	})
	
	$(elem).on('click','.xpy-associative-search-result .xpy-associative-result-item',function(){
		$(this).closest('.xpy-associative-search-hold').find('input').eq(0).val($(this).html());
		$(this).closest('.xpy-associative-search-result').empty().hide();
	})
	$(document).on('click',function(e){
		var $target = e.target;
		if(!$target.closest('.xpy-associative-search-hold')){
			$(elem).find('.xpy-associative-search-result').empty().hide();
		}
	})
}
/*function openAssociativeSearch(elem, param){
	//默认参数
	var defaults = {
		'data': ' ',
	};
	//合并参数
	options = $.extend(true, defaults, param);
	//获取各种参数
	data = options.data;
	//联想搜索框的个数
	associativeSearchCount = $('.xpy-associative-search-hold').length;
	//联想搜索html结构
	var associativeSearchHtml = '<div class="xpy-associative-search-hold" id="xpy-associative-search-hold-'+associativeSearchCount+'">'+
									'<input type="text" class="xpy-associative-search" placeholder="'+options.placeholder+'">'+
									'<div class="xpy-associative-camera">'+
										'<input type="file" title="未选择任何文件">'+
									'</div>'+
									'<div class="xpy-associative-search-icon"></div>'+
									'<ul class="xpy-associative-search-result"></ul>'+
								'</div>'
	$(elem).append(associativeSearchHtml);
	var searchHoldTop = $(elem).outerHeight() - 1 + 'px';
	$(elem).find('.xpy-associative-search-result').css({'top': searchHoldTop});
	$(elem).find('.xpy-associative-camera').css({'background': 'url('+options.cameraIcon+') 0 no-repeat'});
	$(elem).find('.xpy-associative-search-icon').css({'background': '#f10215 url('+options.searchIcon+') center no-repeat'});
	searchKeywords(elem, param);
}*/
/*
*输入关键字联想搜索
*/
/*function searchKeywords(elem, param){
	$(elem).on('input','.xpy-associative-search-hold input',function(){
		$(elem).find('.xpy-associative-search-result').empty().hide();
		var value = $.trim($(this).val());
		if(value){
			//以输入值为开头的正则表达式
			var reg = new RegExp('^'+value);
			for(var i = 0; i < param.data.length; i++){
				if(reg.test(param.data[i].text)){
					var resultLi = '<li class="xpy-associative-result-item">'+param.data[i].text+'</li>';
					$(elem).find('.xpy-associative-search-result').append(resultLi);
				}
			}
			if($(elem).find('.xpy-associative-result-item').length != 0){
				$(elem).find('.xpy-associative-search-result').show();
			}
		}else{
			$(elem).find('.xpy-associative-search-result').empty().hide;
		}
	}).on('focus','.xpy-associative-search-hold input',function(){
		$(elem).find('.xpy-associative-search-result').empty().hide();
		var value = $.trim($(this).val());
		if(value){
			//以输入值为开头的正则表达式
			var reg = new RegExp('^'+value);
			for(var i = 0; i < param.data.length; i++){
				if(reg.test(param.data[i].text)){
					var resultLi = '<li class="xpy-associative-result-item">'+param.data[i].text+'</li>';
					$(elem).find('.xpy-associative-search-result').append(resultLi);
				}
			}
			if($(elem).find('.xpy-associative-result-item').length != 0){
				$(elem).find('.xpy-associative-search-result').show();
			}
		}else{
			$(elem).find('.xpy-associative-search-result').empty().hide;
		}
	})
	
	$(elem).on('click','.xpy-associative-search-result .xpy-associative-result-item',function(){
		$(this).closest('.xpy-associative-search-hold').find('input').eq(0).val($(this).html());
		$(this).closest('.xpy-associative-search-result').empty().hide();
	})
	$(document).on('click',function(e){
		var $target = e.target;
		if(!$target.closest('.xpy-associative-search-hold')){
			$(elem).find('.xpy-associative-search-result').empty().hide();
		}
	})
}*/
/*
*渲染知乎点击元素出现下拉框结构
*/
function openZhDropMenu(elem, param){
	//默认参数
	var defaults = {
	};
	//合并参数
	var options = $.extend(true, defaults, param);
	//获取各种参数
	var area = options.area;
	//知乎弹出框的个数
	zhDropMenuCount = $('.xpy-zhdrop-menu-wrapper').length;
	//知乎弹出框html结构
	var zhDropMenuHtml = '<div class="xpy-zhdrop-menu-wrapper xpy-zhdrop-menu-wrapper'+zhDropMenuCount+'">'+
							'<div class="xpy-zhdrop-menu-dot"></div>'+
							'<div class="xpy-zhdrop-menu-content">'+options.content+'</div>'+
						'</div>'
	$(elem).addClass('open').addClass('popover');
	$(elem).on('click',function(){
		var that = this;
		if($(that).hasClass('open')){
			$(that).removeClass('open').addClass('close');
			$('.xpy-zhdrop-menu-wrapper').remove();
			$('body').append(zhDropMenuHtml);
			$('.xpy-zhdrop-menu-wrapper').width(options.area[0]);
			$('.xpy-zhdrop-menu-wrapper').height(options.area[1]);
			var top = $(that).offset().top +$(that).outerHeight(),
			left = $(that).offset().left- ($('.xpy-zhdrop-menu-wrapper').outerWidth() -$(that).outerWidth()) / 2;
			$('.xpy-zhdrop-menu-wrapper').css({
				'top': top,
				'left': left
			})	
			$(window).resize(function() {
				var top = $(that).offset().top +$(that).outerHeight(),
				left = $(that).offset().left- ($('.xpy-zhdrop-menu-wrapper').outerWidth() -$(that).outerWidth()) / 2;
				$('.xpy-zhdrop-menu-wrapper').css({
					'top': top,
					'left': left
				})	
			});
			options.success && options.success();
			//点击下拉框，下拉框不消失
			$('.xpy-zhdrop-menu-wrapper').on('click',function(e){
				e.stopPropagation();
			})
		}else{
			$(that).removeClass('close').addClass('open');
			$('.xpy-zhdrop-menu-wrapper').remove();
			options.success && options.success();
		}

	})
}

/*
*渲染知乎提示气泡结构
*/
function openZhTipBubble(elem, param){
	//默认参数
	var defaults = {
	};
	//合并参数
	options = $.extend(true, defaults, param);
	//知乎提示气泡的个数
	zhTipBubbleCount = $('.xpy-zhtip-bubble-wrapper').length;
	//知乎提示气泡html结构
	var zhTipBubbleHtml = '<div class="xpy-zhtip-bubble-wrapper xpy-zhtip-bubble-wrapper'+zhTipBubbleCount+'">'+
								'<div class="xpy-zhtip-bubble-dot"></div>'+
								'<div class="xpy-zhtip-bubble-content">'+options.content+'</div>'+
						'</div>';
	$(elem).on('mouseenter',function(){
		var that = this;
		$('body').append(zhTipBubbleHtml);
		var top = $(that).offset().top +$(that).outerHeight(),
			left = $(that).offset().left- ($('.xpy-zhtip-bubble-wrapper').outerWidth() -$(that).outerWidth()) / 2;
		$('.xpy-zhtip-bubble-wrapper').css({
			'top': top,
			'left': left
		})	
		$(window).resize(function() {
			var top = $(that).offset().top +$(that).outerHeight(),
			left = $(that).offset().left- ($('.xpy-zhtip-bubble-wrapper').outerWidth() -$(that).outerWidth()) / 2;
			$('xpy-zhtip-bubble-wrapper').css({
				'top': top,
				'left': left
			})	
		});			
	}).on('mouseleave',function(){
		$('.xpy-zhtip-bubble-wrapper').remove();
	})
}
/*
*下拉选择框组件
*/
function dropdownMenu(elem, param){
	//默认参数
	var defaults = {
		'data': [],
		'placeholder': '',
		'width': 'auto'
	}
	//合并参数
	var option = $.extend(true, defaults, param);
	//获取到各种参数
	var data = option.data,
		placeholder = option.placeholder,
		width = option.width;
	//触发框的个数
	var dropdownCount = $('.dropdown-textbox').length;
	//下拉触发的文本框
	var dropDownTextBoxhtml = "";
	//文本选择内容框
	var itemHtml = '';
	var listItemHtml = '';
	var selectedText,
		selectedVal =placeholder,
		selectedComment;
	var _selectedFlag = true;
	for(var i = 0; i < data.length; i++){
		if(data[i].selected && _selectedFlag){
			selectedText = data[i].text;
			selectedVal = data[i].value;
			selectedComment = data[i].comment;
			_selectedFlag = false;
		}
		itemHtml += '<li class = "drop-down-item" data-value = "'+data[i].value+'" data-comment = "'+data[i].comment+'" >'+data[i].text+'</li>';
	}
	// $(listItemHtml).append(itemHtml);
	dropDownTextBoxhtml = '<div class="dropdown-textbox'+dropdownCount+' dropdown-textbox open" style="width: '+width+'">'+
								'<span class="select-value">'+selectedVal+'</span>'+
								'<span class="drop-icon"></span>'+
					       '</div>';
	$(elem).append(dropDownTextBoxhtml);
	$triggerArea = $(elem).children('.dropdown-textbox');
	listItemHtml = '<ul class="drop-down-menu'+dropdownCount+' drop-down-menu" style = "width: '+($('.dropdown-textbox').width()+12)+'px">'+itemHtml+'</ul>';
	//下拉框展示收起
	$triggerArea.on('click',function(e){
		var that = this;
		if($(that).hasClass('open')){
			$(that).removeClass('open').addClass('close');
			$('.drop-down-menu').remove();
			$('body').append(listItemHtml);
			// resizeDropPosition();
			var top = $(that).offset().top +$(that).outerHeight(),
			left = $(that).offset().left;
			$('.drop-down-menu').css({
				'top': top,
				'left': left
			})	
			$(window).resize(function() {
				var top = $(that).offset().top +$(that).outerHeight(),
				left = $(that).offset().left;
				$('.drop-down-menu').css({
					'top': top,
					'left': left
				})	
			});			
			//下拉框选择
			$('.drop-down-item').on('click',function(e){
				e.stopPropagation();
				var selectValue = $(this).data('value');
				$(that).find('.select-value').html(selectValue);
				$('.drop-down-menu').remove();
				$(that).removeClass('close').addClass('open');
			})
		}else{
			$(that).removeClass('close').addClass('open');
			$('.drop-down-menu').remove();
		}
	});		
}
/*
*弹窗组件
*/
function openDialog(param){
	// 默认参数
	var defaults = {
		'title': '弹窗',
		'area': 'auto',
		'btn': '确认',
		'content': ''
	}

	// 合并参数
	var options = $.extend(true, defaults, param);
	// 拿到这种参数
	var title = options.title,
		area = options.area,
		btn = options.btn,
		content = options.content;
	//得到弹窗的总的数量
	var dialogCount = $('.xpy-dialog').length;
	// 弹出遮罩层
	var shadeHtml = '<div id="xpyui-layer-shade'+dialogCount+'" class="xpyui-layer-shade" style="z-index:100; background-color:rgba(0,0,0,.6);filter:alpha(opacity=30);"></div>';
	//弹窗按钮
	var btnHtml = '';
	for(var i = 0; i < param.btn.length; i++){
		btnHtml += '<button class="btn btn' + i +'">'+btn[i]+'</button>'
	}
	//计算弹窗的位置和内容区域的高度，弹窗居中放置
	var clientWidth = document.documentElement.clientWidth||document.body.clientWidth,
		clientHeight = document.documentElement.clientHeight||document.body.clientHeight;
	var top = (clientHeight - parseInt(area[0])) / 2 + 'px',
		left = (clientWidth - parseInt(area[1])) / 2 + 'px';
	var contentHeight = (parseInt(area[1]) - 60) + 'px'; 
	// 弹出弹窗
	var dialogHtml = '';
	dialogHtml +='<div class="xpy-dialog" id="xpy-dialog'+dialogCount+'" style="z-index: 1000; width: '+area[0]+'; height: '+area[1]+'; top: '+ top +'; left: '+ left +'">'+
					'<div class="dialog-title">'+ title +'</div>'+
					'<div class="dialog-content" style = "height: '+contentHeight+'">'+content+'</div>'+
					'<div class="dialog-btn">'+ btnHtml +'</div>'+ 	
	 			'</div>';
	$('body').append(shadeHtml).append(dialogHtml);
	//弹窗位置	
	resizeDialog();
	param.success && param.success(dialogCount);

	//禁止页面向下滚动
	$('body').css({'position': 'fixed','overflow': 'hidden'})
	$('body').on('scroll',function(event){
        event.preventDefault;
    }, false)
	
	// 绑定按钮事件
	$('.dialog-btn').on('click', 'button', function(){
		var _index = $(this).index()+1;
		var btn = 'btn' + _index;
		if(typeof options[btn] == 'function'){
			options[btn]();
		}else{
			if(_index === 1 || _index === 2){
			
			}
		}
	})
	return dialogCount;
}
//关闭弹窗事件
function closeDialog(index, type){
	if(type == 'current'){
		$('#xpy-dialog'+index).remove();
		$('#xpyui-layer-shade'+index).remove();
	}else if(type == 'all'){
		$('.xpy-dialog').remove();
		$('.xpyui-layer-shade').remove();
	}
	//页面恢复滚动事件
	$('body').css({'position': '','overflow': ''});
	$('body').off('scroll');
}

//信息弹出框
function dialogmessage(param){
	//默认参数
	var defaults = ({
		message: '恭喜，创建成功',
		icon: ''
	});
	//合并参数
	var options = $.extend(true, defaults, param);
	//获取到参数
	var messageText = options.message,
		icon = options.icon;
	//弹出信息
	var messageHtml = '';
	messageHtml = '<div class="message-container">'+
					  '<div class="icon-detail">'+options.icon+'</div>'+
					  '<div class="text-detail">'+messageText+'</div>'+
				  '</div>';
	$('body').append(messageHtml);	
	//弹出信息居中放置
	resizeDialog();
	setTimeout(function(){
		$('.message-container').remove();
	},2000)
}
//弹窗位置
function resizeDialog(){
	var clientHeight = document.documentElement.clientHeight,
		clientWidth = document.documentElement.clientWidth;
	var $dialogArea = $('.xpy-dialog');
	$.each($dialogArea, function(i, item){
		var $currentDialog = $dialogArea.eq(i);
		$currentDialog.css({
			'top': (clientHeight - $currentDialog.height()) / 2 + 'px',
			'left': (clientWidth - $currentDialog.width()) / 2 + 'px'
		})
	})
	$('.message-container').css({
		'top': (clientHeight - $('.message-container').outerHeight()) / 2 + 'px',
		'left': (clientWidth - $('.message-container').outerWidth()) /2 + 'px'
	})
}
