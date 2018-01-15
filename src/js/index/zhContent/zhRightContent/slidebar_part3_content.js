define(['assets/js/common/model.js',
        'viewTpl/zhContent/zhRightContent/slidebar_part3_content'
    ],
function(modelApp, slidebarPart3ContentTpl){
    var slidebarPart3ContentApp = {
        init: function(){
            this.renderSlidebarPart3Content();
            this.event();
        },
        renderSlidebarPart3Content: function(){
            modelApp.getSlidebarPart3Info().then(function(res){
                if(res.meta.status == 200){
                    $('.index-right-slidebar-part3').html(slidebarPart3ContentTpl(res.data));
                }
            })
        },
        event: function(){

        }
    };
    return slidebarPart3ContentApp;
})