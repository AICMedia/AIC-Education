//= ../vendor/bower_components/jquery/dist/jquery.min.js
//= ../vendor/bower_components/letteringjs/jquery.lettering.js
//= ../vendor/bower_components/textillate/jquery.textillate.js


$(document).ready(function(){
    var animation = {

        counter: function(){
            counterIncrement($(".b-counter_number > span:first-child"), 1000)
        },

        addActive: function($el) {
            $el.addClass("active")
        },

        fadein: function($el){
            $el.addClass("animated fadeInDown")
        },

        textillate: function($el) {
            $el.textillate({ in: { effect: 'rollIn' } });
        },

        params: {
            counterTimeToComplete: 1500
        }
    };

    try {
        $.browserSelector();
        if($("html").hasClass("chrome")) {
            $.smoothScroll();
        }
    } catch(err) {

    }

    animateElements ();

    $(document).on("scroll", animateElements);

    function animateElements () {

        if ($(window).width() <= 1200) {
            $(".scroll-animation").addClass("active")
            return;
        }

        var defaultDistanceFromBottom = 300;

        $(".scroll-animation").each(function(){
            var $this = $(this);
            var scrollFromBottom = $this.data("animation-distance") || defaultDistanceFromBottom;


            if ($(window).height() - this.getBoundingClientRect().top > scrollFromBottom) {

                setTimeout(function(){
                    // $this.css({"transition-duration": $this.data("animation-duration") || "0.5s"});
                    animation[$this.data("animation") || "addActive"]($this);
                    $this.removeClass("scroll-animation");
                }, $this.data("animation-delay") || 0)
            }
        });
    }



    $('.b-btn:not(.m-btn_load_more)')
        .on('mouseenter', function(e) {
            var parentOffset = $(this).offset(),
                relX = e.pageX - parentOffset.left,
                relY = e.pageY - parentOffset.top;
            $(this).find('span').css({top:relY, left:relX})
        })
        .on('mouseout', function(e) {
            var parentOffset = $(this).offset(),
                relX = e.pageX - parentOffset.left,
                relY = e.pageY - parentOffset.top;
            $(this).find('span').css({top:relY, left:relX})
        });

    $(window).on("resize", function(){
        $(".r-clip, .r-clip_bg").css({width: $(window).width(), height: $(window).height()});
    });

    $(".b-btn_play").on("click", function(){
        $(".r-clip").html('<iframe frameborder="0" webkitallowfullscreen="" mozallowfullscreen="" allowfullscreen="" src="https://player.vimeo.com/video/176744163?title=0&byline=0&portrait=0&autoplay=1" width="100%" height="150%" style="transform: translateX(-0%) translateY(-16%);"></iframe>')
        $(".r-clip").css({width: $(window).width(), height: $(window).height()});
        $("#b-showreel").addClass("m-show")
        return false;
    });

    $(".e-close").on("click", function(){
        setTimeout(function(){
            $(".r-clip").html("");
        },1000)
        $("#b-showreel").removeClass("m-show")
    })
})

$(function() {
    var vimeo_iframe = $('.r-clip_bg iframe')[0];
    var player = $f(vimeo_iframe);

    player.addEvent('ready', function() {
        player.api('setVolume', 0);
    });
});