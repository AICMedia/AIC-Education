//= ../vendor/bower_components/jquery/dist/jquery.min.js
//= ../vendor/bower_components/letteringjs/jquery.lettering.js
//= ../vendor/bower_components/textillate/jquery.textillate.js

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