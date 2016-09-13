require('./lib/jquery.easing.1.3.js');
require('./lib/prism.js');
require('./lib/fastclick.js');
require('./lib/jquery.matchHeight.js');
require('./lib/picturefill.js');
require('./lib/slick.js');
require('./lib/jquery.flexslider.js');
require('./lib/jquery.swipebox.js');

console.log('deKai v.2');

//#region ScreensizeHandler
var ScreensizeHandler = function() {}

ScreensizeHandler.prototype = {
    screenSize: '',
    stateIndicator: null,
    isBigScreen: false,
    isSmallScreen: false,
    isLgOrSmaller: false,
    isMdOrSmaller: false,
    isSmOrSmaller: false,
    init: function() {
        this.stateIndicator = document.createElement('div');
        this.stateIndicator.className = 'state-indicator';
        document.body.appendChild(this.stateIndicator);
        this.screenSize = this.getDeviceState();

        $(window).resize(function() {
            var currentScreenSize = this.getDeviceState();
            if (currentScreenSize != this.screenSize) {
                this.screenSize = currentScreenSize;
            }
        }.bind(this));
    },
    getDeviceState: function() {
        var index = parseInt(window.getComputedStyle(this.stateIndicator).getPropertyValue('z-index'), 10);

        var states = {
            1: '',
            2: 'lg',
            3: 'md',
            4: 'sm'
        };

        var state = states[index];

        this.isBigScreen = false;
        this.isSmallScreen = false;
        this.isLgOrSmaller = false;
        this.isMdOrSmaller = false;
        this.isSmOrSmaler = false;

        switch (state) {
            case '':
                this.isBigScreen = true;
                break;
            case 'lg':
                this.isLgOrSmaller = true;
                this.isSmallScreen = true;
                break;
            case 'md':
                this.isLgOrSmaller = true;
                this.isMdOrSmaller = true;
                this.isSmallScreen = true;
                break;
            case 'sm':
                this.isLgOrSmaller = true;
                this.isMdOrSmaller = true;
                this.isSmOrSmaller = true;
                this.isSmallScreen = true;
                break;
        }

        return state;
    }

};
//#endregion

//#region MobilemenuHandler
var MobilemenuHandler = function() {}

MobilemenuHandler.prototype = {
    lastScrollPos: 0,
    init: function() {
        $('.menu-toggle').on('click', function(e) {
            var $this = $(this);
            $this.toggleClass('open');
            $this.find('.burger-container').toggleClass('active');
            var $target = $($this.data('target'));
            $target.toggleClass('open');
            var $main = $('main');
            $('body').toggleClass('no-scroll');
            e.stopPropagation();
            if ($target.hasClass('open') && screensizeHandler.isLgOrSmaller) {
                $target.on('click', function(e) {
                    e.stopPropagation();
                });

                $main.on('click', function(e) {
                    $this.trigger('click');
                    e.stopPropagation();
                });
                $main.on('touchmove', function(e) {
                    e.preventDefault();
                });
            } else {
                $main.off('click');
                $main.off('touchmove');
                $target.off('click');
            }
        });
    }

};
//#endregion

//#region AccordionHandler
var AccordionHandler = function() {}

AccordionHandler.prototype = {
    initialized: null,
    init: function() {
        if (this.initialized) return;
        this.initialized = true;

        $('.accordion-trigger').bind('click', function(e) {
            var $parent = $(this).parent();
            $parent.find('.submenu').slideToggle(300, 'easeOutSine');
            $parent.toggleClass('is-expanded');
            e.preventDefault();
            return false;
        });

    }
};
//#endregion

//#region ExpanderHandler
var ExpanderHandler = function() {}

ExpanderHandler.prototype = {
    initialized: null,
    init: function() {
        if (this.initialized) return;
        this.initialized = true;

        $('.expander-trigger').bind('click', function(e) {
            var $expander = $(this).closest('.expander');
            $expander.find('.expander-content').slideToggle(400, 'easeOutSine'); // apply the toggle to the ul
            $expander.toggleClass('is-expanded');
            e.preventDefault();
            return false;
        });

    }
};
//#endregion

//#region CarouselHandler
var CarouselHandler = function() {}

CarouselHandler.prototype = {
    init: function() {
        var $carousel;
        var $this = this;

        $('.slick-carousel').each(function() {
            $carousel = $(this);
            var slidesToShow = $carousel.data('slidesToShow');
            var slidesToScroll = $carousel.data('slidesToScroll');
            var slidesLg = $carousel.data('slidesLg');
            var slidesMd = $carousel.data('slidesMd');
            var slidesSm = $carousel.data('slidesSm');

            if (!slidesLg) slidesLg = slidesToShow;
            if (!slidesMd) slidesMd = slidesLg;
            if (!slidesSm) slidesSm = slidesMd;

            $this.createSlickSlider($carousel, slidesToShow, slidesToScroll, slidesLg, slidesMd, slidesSm);
        });
    },
    createSlickSlider: function($carousel, slidesToShow, slidesToScroll, slidesLg, slidesMd, slidesSm) {
        $carousel.slick({
            dots: true,
            infinite: false,
            speed: 800,
            slidesToShow: slidesToShow,
            slidesToScroll: slidesToScroll,
            //easing: 'easeOutQuad',
            cssEsae: 'ease-out',
            useTransform: true,
            lazyLoad: 'progressive', //'ondemand',
            responsive: [{
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: slidesLg,
                        slidesToScroll: slidesLg
                            //infinite: true,
                            //dots: true
                    }
                }, {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: slidesMd,
                        slidesToScroll: slidesMd
                    }
                }, {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: slidesSm,
                        slidesToScroll: slidesSm
                    }
                }
                // You can unslick at a given breakpoint now by adding:
                // settings: "unslick"
                // instead of a settings object
            ]
        });
        //$carousel.slick('reinit');
    }
};
//#endregion

//#region FlexsliderHandler
var FlexsliderHandler = function() {}

FlexsliderHandler.prototype = {
    $flexslider: null,
    $figCaption: null,
    init: function() {
        this.$flexslider = $('.flexslider');
        this.$figCaption = this.$flexslider.find('.flexslider-figcaption');
        this.$flexslider.flexslider({
            directionNav: true,
            controlNav: true,
            animationLoop: true,
            slideshow: false,
            slideshowSpeed: 0,
            animation: 'slide',
            useCSS: true,
            startAt: 0,
            init: function(slider) {}.bind(this),
            start: function(slider) {
                this.setTopPadding();

                $(window).resize(function() {
                    this.setTopPadding();
                }.bind(this));

            }.bind(this),
            after: function(slider) {}
        });

    },
    setTopPadding: function() {
        if (screensizeHandler.isLgOrSmaller) {
            var height = 0;
            this.$figCaption.each(function() {
                var $this = $(this);
                var currentHeight = $this.height();
                if (currentHeight > height) height = currentHeight;
            });
            this.$figCaption.height(height);
            return;
        }
    }
};
//#endregion

//#region SwipeboxHandler
var SwipeboxHandler = function() {}

SwipeboxHandler.prototype = {
    $swipebox: null,
    init: function() {
        this.$swipebox = $('.swipebox');
        if (!this.$swipebox.length) return;

        this.$swipebox.swipebox({
            useCSS: true, // false will force the use of jQuery for animations
            useSVG: true, // false to force the use of png for buttons
            hideCloseButtonOnMobile: false, // true will hide the close button on mobile devices
            hideBarsDelay: 3000, // delay before hiding bars on desktop
            videoMaxWidth: 1024, // videos max width
            beforeOpen: function() { $('body').addClass('no-scroll') }, // called before opening
            afterOpen: null, // called after opening
            afterClose: function() { $('body').removeClass('no-scroll') }, // called after closing
            loopAtEnd: false, // true will return to the first image after the last image is reached
            removeBarsOnMobile: false
        });
    }
};
//#endregion

//#region Dekai
var Dekai = function() {}

Dekai.prototype = {
    //check if IE
    checkOS: function() {
        var isIE = this.detectIE();
        if (isIE && isIE > 9) $('body').addClass('ie');
    },

    detectIE: function() {
        var ua = window.navigator.userAgent;

        var msie = ua.indexOf('MSIE ');
        if (msie > 0) {
            // IE 10 or older => return version number
            return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
        }

        var trident = ua.indexOf('Trident/');
        if (trident > 0) {
            // IE 11 => return version number
            var rv = ua.indexOf('rv:');
            return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
        }

        var edge = ua.indexOf('Edge/');
        if (edge > 0) {
            // IE 12 => return version number
            return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
        }

        // other browser
        return false;
    },

    checkDevice: function() {
        var isMobile = this.detectMobile();
        (isMobile) ? $('body').addClass('has-touch'): $('body').addClass('no-touch');
    },

    detectMobile: function() {
        var check = false;
        (function(a) {
            if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true;
        })(navigator.userAgent || navigator.vendor || window.opera);
        return check;
        //return navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)|(Android)|(PlayBook)|(BB10)|(BlackBerry)|(Opera Mini)|(IEMobile)|(webOS)|(MeeGo)/i);
    },

    addFastclick: function() {
        if ('addEventListener' in document) {
            document.addEventListener('DOMContentLoaded', function() {
                FastClick.attach(document.body);
            }, false);
        }
    },

    hideOverlay: function() {
        $('#page-wrapper').removeClass('visibility-hidden');
        $('.overlay').delay(200).fadeOut(200);
    }
};
//#endregion

//#region InformationHandler
var InformationHandler = function() {}

InformationHandler.prototype = {
    init: function() {
        this.headingsInfo();
        this.paragraphInfo();
        this.colorsInfo();
        this.logoInfo();
    },

    logoInfo: function() {
        var $logo = $('#logo');
        $logo.find('.logo-path').text($logo.find('.default > img').attr('src'));
        $logo.find('.logo-inverted-path').text($logo.find('.inverted > img').attr('src'));
    },

    headingsInfo: function() {
        var $headings = $('#headings');
        var $info = $headings.find('.information');
        var $content = $headings.find('.content');

        var $h1 = $content.find('h1').first();

        $info.find('.font-family').text(this.getCSSValue($h1, 'font-family'));
        $info.find('.font-weight').text(this.getCSSValue($h1, 'font-weight'));

        $('.h1-font-size').text(this.getCSSValue($h1, 'font-size'));
        $('.h2-font-size').text(this.getCSSValue($content.find('h2').first(), 'font-size'));
        $('.h3-font-size').text(this.getCSSValue($content.find('h3').first(), 'font-size'));
        $('.h4-font-size').text(this.getCSSValue($content.find('h4').first(), 'font-size'));
        $('.h5-font-size').text(this.getCSSValue($content.find('h5').first(), 'font-size'));
        $('.h6-font-size').text(this.getCSSValue($content.find('h6').first(), 'font-size'));
    },

    paragraphInfo: function() {
        var $paragraph = $('#paragraph');
        var $info = $paragraph.find('.information');

        var $p = $('p').first();
        $info.find('.font-family').text(this.getCSSValue($p, 'font-family'));
        $info.find('.font-size').text(this.getCSSValue($p, 'font-size'));
        $info.find('.font-weight').text(this.getCSSValue($p, 'font-weight'));
    },

    colorsInfo: function() {
        var $colors = $('#colors');

        this.setColorsInfo($colors.find('.primary-color'));
        this.setColorsInfo($colors.find('.secondary-color'));
        this.setColorsInfo($colors.find('.tertiary-color'));
        this.setColorsInfo($colors.find('.primary-background-color'));
        this.setColorsInfo($colors.find('.secondary-background-color'));
        this.setColorsInfo($colors.find('.tertiary-background-color'));
        this.setColorsInfo($colors.find('.primary-font-color'));
        this.setColorsInfo($colors.find('.secondary-font-color'));
    },

    setColorsInfo: function($color) {
        var $colorBg = this.getCSSValue($color.siblings('.color'), 'background-color');
        $color.find('.color-rgb').text($colorBg.replace('rgb(', '').replace(')', ''));
        $color.find('.color-hex').text(this.rgbToHex($colorBg));
    },

    getCSSValue: function($elem, $value) {
        return $elem.css($value);
    },

    rgbToHex: function(color) {
        if (color.charAt(0) === "#") {
            return color;
        }

        var nums = /(.*?)rgb\((\d+),\s*(\d+),\s*(\d+)\)/i.exec(color),
            r = parseInt(nums[2], 10).toString(16),
            g = parseInt(nums[3], 10).toString(16),
            b = parseInt(nums[4], 10).toString(16);

        return "#" + (
            (r.length == 1 ? "0" + r : r) +
            (g.length == 1 ? "0" + g : g) +
            (b.length == 1 ? "0" + b : b)
        );
    }

};
//#endregion

var dekai = new Dekai();
var informationHandler = new InformationHandler();
var accordionHandler;
var expanderHandler;
var carouselHandler;
var flexsliderHandler;
var swipeboxHandler;
var mobilemenuHandler;
var screensizeHandler = new ScreensizeHandler();

$(document).ready(function() {
    dekai.checkOS();
    dekai.checkDevice();
    dekai.addFastclick();

    //Information
    informationHandler.init();

    //Screen sizes
    screensizeHandler.init();

    //Accordion
    if (typeof useAccordion !== 'undefined' && useAccordion) {
        accordionHandler = new AccordionHandler();
        accordionHandler.init();
    }

    //Expander
    if (typeof useExpander !== 'undefined' && useExpander) {
        expanderHandler = new ExpanderHandler();
        expanderHandler.init();
    }

    //Grid same height
    if (typeof useGridSameHeight !== 'undefined' && useGridSameHeight) {
        $('.same-height > .column').matchHeight();
    }

    //Anchor card
    if (typeof useAnchorCard !== 'undefined' && useAnchorCard) {
        $('.card.card-anchor').hover(function() {
            var $this = $(this);
            $this.toggleClass('hover');
            $this.find('.link').toggleClass('hover');
            //$this.find('.carousel-item-overlay').toggleClass('hover');
        });
    }

    //Slick carousel
    if (typeof useCarousel !== 'undefined' && useCarousel) {
        carouselHandler = new CarouselHandler();
        carouselHandler.init();
    }

    //Flex slider
    if (typeof useSlider !== 'undefined' && useSlider) {
        flexsliderHandler = new FlexsliderHandler();
        flexsliderHandler.init();
    }

    //Lightbox
    if (typeof useLightbox !== 'undefined' && useLightbox) {
        swipeboxHandler = new SwipeboxHandler();
        swipeboxHandler.init();
    }

    //Header
    if (typeof useMenuToggle !== 'undefined' && useMenuToggle) {
        mobilemenuHandler = new MobilemenuHandler();
        mobilemenuHandler.init();
    }
    if (typeof useSubMenus !== 'undefined' && useSubMenus) {
        var $subMenus = $('.header li.has-child');
        $subMenus.each(function() {
            var $this = $(this);
            var $subMenu = $this.find('.sub-menu');
            var marginLeft = $subMenu.width() * 0.5;
            marginLeft -= $this.width() * 0.5;
            $subMenu.css({ 'left': -(marginLeft) });
        });
    }
});

$(window).on('load', function() {
    dekai.hideOverlay();
});
