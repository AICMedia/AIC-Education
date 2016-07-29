$(document).on('ready', function() {
    var burger = document.getElementById("burger-button");
    var cover = document.querySelector(".b-main_cover")
    burger.addEventListener("click", function (e) {
        e.preventDefault();
        burger.classList.toggle("active");
        cover.classList.toggle("active");
    });

    $(".scroll-order").click(function() {
        $('html, body').animate({
            scrollTop: $(".b-order").offset().top
        }, 800);
        return false;
    });

    $("input[name='phone']").inputmask("+7 (999) 999-99-99");

    $('.b-slick_slider_master').slick({
        dots: true,
        infinite: true,
        arrows: true,
        fade: true,
        speed: 500,
        cssEase: 'linear'
    });

    $(".b-pseudo-button").on("click", function(){
        $(".b-screen-3 .slick-next").click();
    })
    
    $('.b-slick_opinion').slick({
        dots: true,
        infinite: true,
        arrows: false,
        fade: true,
        speed: 500,
        cssEase: 'linear'
    });

    $(".b-program_list").on("click", "li", function() {
        var $this = $(this)

        $this.toggleClass("active");

        if ($this.hasClass("active")) {
            $this.find(".b-program_main_content_header_descr").slideDown()

        } else {
            $this.find(".b-program_main_content_header_descr").slideUp()
        }
    })

    $(".b-target_list").on("click", ".b-target_item", openTargetPopup)

    function openTargetPopup (e) {
        if ($(window).width() > 1200) {
            var contentToShow = $(this).index();
            $(".b-popup_content .b-content_cover").eq(contentToShow).show();
            $(".b-target_list_popup").css({"position": "relative"}).fadeIn(500);
            $(".b-screen_cover.n1").css({"position": "absolute", "display": "none"});

            return false;
        }

        var contentToShow = $(this).index();

        $("body").css({overflow: "hidden"})
        $(".b-target_list_popup").fadeIn(500);
        $(".b-popup_content .b-content_cover").eq(contentToShow).show();
    }

    $(".b-target_list_popup").on("click", ".b-target_back_link", function()  {
        if ($(window).width() > 1200) {
            var contentToShow = $(this).index();
            $(".b-popup_content .b-content_cover").hide();
            $(".b-screen_cover.n1").css({"position": "relative", "display": "block"});
            $(".b-target_list_popup").css({"position": "absolute"}).fadeOut(500);
            return false;
        }

        $(".b-target_list_popup").fadeOut(500, function(){
            $(".b-popup_content .b-content_cover").hide();
            $("body").css({overflow: ""})
        })
    })


    $(function() {
        var vimeo_iframe = $('iframe')[0];
        var player = $f(vimeo_iframe);

        player.addEvent('ready', function() {
            player.api('setVolume', 0);
        });
    });
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

    var startScreenTop = $(".b-screen_top_body").offset().top;
    var startScreen5 = $(".b-screen-5").offset().top;
    var startScreen8 = $(".b-screen-8").offset().top;


    $(window).on("scroll", function(){

        if ($(window).width() <= 1200) return;

        var winScroll = window.pageYOffset;

        if (startScreenTop < winScroll) {
            $(".b-screen_top_body").css({transform: "translateY(" + (winScroll - startScreenTop) / 2 + "px"})
        }

        if (winScroll === 0) {
            $(".b-screen_top_body").css({transform: "translateY(0px)"})
        }

        if (startScreen5 < winScroll) {
            $(".b-screen-5").css({transform: "translateY(" + (winScroll - startScreen5) / 2 + "px"})
        }

        if (startScreen8 < winScroll) {
            $(".b-screen-8").css({transform: "translateY(" + (winScroll - startScreen8) / 2 + "px"})
        }


    });

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

    /*onscroll animation*/

    animateElements ();

    $(document).on("scroll", animateElements);

    function animateElements () {

        if ($(this).scrollTop() > 0) {
            $(".b-top_line").addClass("active")
        } else {
            $(".b-top_line").removeClass("active")
        }

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

    function counterIncrement($els, time){

        var iterationAmount = 100;

        $els.each(function(){

            var self = $(this),
                number = self.text(),
                count = 0;

            var timer = setInterval(function(){

                count += number / iterationAmount;

                self.html(spacesToNumber(Math.floor(count)));

                if (count >= number) {
                    self.html(spacesToNumber(number));
                    clearInterval(timer);
                }
            }, time/iterationAmount)
        })
    }

    function spacesToNumber(number) {
        return String(number).replace(/(\d{1,3}(?=(\d{3})+(?:\.\d|\b)))/g,"\$1 ")
    }
});