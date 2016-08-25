var $ = require('jquery');
//$('p').html('New text');

console.log('Module log');

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
  });
});

$('.js-accordion-trigger').bind('click', function(e){
  $(this).parent().find('.submenu').slideToggle('fast');  // apply the toggle to the ul
  $(this).parent().toggleClass('is-expanded');
  e.preventDefault();
});

