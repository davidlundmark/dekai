var $ = require('jquery');

console.log('deKai v.1');

//#region TouchHandler
var TouchHandler = function () { }

TouchHandler.prototype = {
    isMobile: null,
    isTouch: null,
    init: function () {
        this.checkDevice();
        (this.isMobile) ? $('body').addClass('has-touch') : $('body').addClass('no-touch');
    },

    checkDevice: function () {
        this.isMobile = navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)|(Android)|(PlayBook)|(BB10)|(BlackBerry)|(Opera Mini)|(IEMobile)|(webOS)|(MeeGo)/i);
        this.isTouch = this.isMobile !== null || document.createTouch !== undefined || 'ontouchstart' in window || 'onmsgesturechange' in window || navigator.msMaxTouchPoints;
    }
};

var touchHandler = new TouchHandler();

$(document).ready(function () {
    touchHandler.init();
});
//#endregion

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
*/
$(document).ready(function(){
  $('.js-menu-trigger').on('click touchstart',function (e) {
    $('.side-nav').toggleClass('is-visible');
    e.preventDefault();
    return false;
  });
});

$('.js-accordion-trigger').bind('click', function(e){
  $(this).parent().find('.submenu').slideToggle('fast');  // apply the toggle to the ul
  $(this).parent().toggleClass('is-expanded');
  e.preventDefault();
  return false;
});


