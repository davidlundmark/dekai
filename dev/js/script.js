//var $ = require('jquery');
require('./lib/jquery.easing.1.3.js');
require('./lib/prism.js');
require('./lib/fastclick.js');

console.log('deKai v.1');


//#region AccordionHandler
var AccordionHandler = function() {}

AccordionHandler.prototype = {
    initialized: null,
    init: function() {
        if (this.initialized) return;
        this.initialized = true;

        $('.accordion-trigger').bind('click', function(e) {
            var $parent = $(this).parent();
            $parent.find('.submenu').slideToggle(200, 'easeOutSine'); // apply the toggle to the ul
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

//#region DekaiHandler
var DekaiHandler = function() {}

DekaiHandler.prototype = {
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
    }
};
//#endregion

//#region InformationHandler
var InformationHandler = function() {}

InformationHandler.prototype = {
    init: function() {
        this.headingsInfo();
        this.paragraphInfo();
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
        var $content = $paragraph.find('.content');

        var $p = $('p').first();
        $info.find('.font-family').text(this.getCSSValue($p, 'font-family'));
        $info.find('.font-size').text(this.getCSSValue($p, 'font-size'));
        $info.find('.font-weight').text(this.getCSSValue($p, 'font-weight'));
    },

    getCSSValue($elem, $value) {
        return $elem.css($value);
    }
};
//#endregion

var dekaiHandler = new DekaiHandler();
var informationHandler = new InformationHandler();
var accordionHandler;
var expanderHandler;

$(document).ready(function() {
    dekaiHandler.checkOS();
    dekaiHandler.checkDevice();
    dekaiHandler.addFastclick();

    //Information
    informationHandler.init();

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
});


/*
$(document).ready(function () {
  $('.accordion-tabs').each(function(index) {
    $(this).children('li').first().children('a').addClass('is-active').next().addClass('is-open').show();
  });
  $('.accordion-tabs').on('click', 'li > a.tab-link', function(event) {
    if (!$(this).hasClass('is-active')) {
      event.preventDefault();
      var accordionTabs = $(this).closest('.accordion-tabs');
      accordionTabs.find('.is-open').removeClass('is-open').hide();

      $(this).next().toggleClass('is-open').toggle();
      accordionTabs.find('.is-active').removeClass('is-active');
      $(this).addClass('is-active');
    } else {
      event.preventDefault();
    }
  });
});

$(document).ready(function(){
  $('.js-menu-trigger').on('click touchstart',function (e) {
    $('.side-nav').toggleClass('is-visible');
    e.preventDefault();
    return false;
  });
});
*/
