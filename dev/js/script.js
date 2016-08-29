//var $ = require('jquery');
//require('./lib/jquery.easing.1.3.js');
require('./lib/jquery.easing.1.3.js');
require('./lib/prism.js'); 

//hljs.initHighlightingOnLoad(); 

console.log('deKai v.1');

//#region TouchHandler
var TouchHandler = function() {}

TouchHandler.prototype = {
    isMobile: null,
    isTouch: null,
    init: function() {
        this.checkDevice();
        (this.isMobile) ? $('body').addClass('has-touch'): $('body').addClass('no-touch');
    },

    checkDevice: function() {
        this.isMobile = navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)|(Android)|(PlayBook)|(BB10)|(BlackBerry)|(Opera Mini)|(IEMobile)|(webOS)|(MeeGo)/i);
        this.isTouch = this.isMobile !== null || document.createTouch !== undefined || 'ontouchstart' in window || 'onmsgesturechange' in window || navigator.msMaxTouchPoints;
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
            $parent.find('.submenu').slideToggle(200,'easeOutSine'); // apply the toggle to the ul
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
            var $parent = $(this).parent();
            $parent.find('.expander-content').slideToggle(400,'easeOutSine'); // apply the toggle to the ul
            $parent.toggleClass('is-expanded');
            e.preventDefault();
            return false;
        });

    }
};
//#endregion

var touchHandler = new TouchHandler();
var accordionHandler;
var expanderHandler;

$(document).ready(function() {
    touchHandler.init();

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
