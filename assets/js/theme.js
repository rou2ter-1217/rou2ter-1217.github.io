/* =================================================================
* Template JS
* 
* Template:    Asso - One Page HTML5 Website Template
* Author:      Themetorium
* URL:         http://themetorium.net
*
================================================================= */



//=======================
// Display loading animation while page loads
//=======================

// Wait for window load
$(window).on('load',function() {
    // Animate loader off screen
    $("#preloader").fadeOut("slow");
  });
  
  
  
  //=======================
  // Window resize 
  //=======================
  
  $(window).resize(function() {
  
    // Make ".intro-inner" margin-top equal to "#header" height
    $('.intro-inner').css( 'margin-top', $('#header').css('height'));
  
    // Full height page 
    $('.full-height').innerHeight($(window).height()); 
  
  }).resize();
  
  
  
  //=======================
  // Bootstrap Menu/nav
  //=======================
  
  // Keeping dropdown submenu inside screen. 
  // More info: http://stackoverflow.com/questions/17985334/jquery-solution-for-keeping-dropdown-submenu-inside-screen
  $('.dropdown-toggle').parent().hover(function() {
      var menu = $('> .dropdown-menu',this);
      var menupos = $(menu).offset();
  
      if (menupos.left + menu.width() > $(window).width()) {
          var newpos = -$(menu).width();
          menu.css({ left: newpos });    
      }
  });
  
  
  // Close mobile menu when click menu link (use class ".mlc")
  $(document).ready(function () {
      $(".mlc").on('click',function(event) {
          $(".navbar-collapse").collapse('hide');
      });
  });
  
  
  
  //=========================================================
  // Bootstrap submenu 
  // More info: (http://vsn4ik.github.io/bootstrap-submenu)
  //=========================================================
  
  'use strict';
  
  (function(factory) {
    if (typeof define == 'function' && define.amd) {
       // AMD. Register as an anonymous module
       define(['jquery'], factory);
    }
    else if (typeof exports == 'object') {
       // Node/CommonJS
       module.exports = factory(require('jquery'));
    }
    else {
       // Browser globals
       factory(jQuery);
    }
  })(function($) {
    // Or ':not(.disabled):has(a)' or ':not(.disabled):parent';
    var desc = ':not(.disabled, .divider, .dropdown-header)';
  
    function Submenupicker(element) {
       this.$element = $(element);
       this.$main = this.$element.closest('.dropdown, .dropup, .btn-group');
       this.$menu = this.$element.parent();
       this.$drop = this.$menu.parent().parent();
       this.$menus = this.$menu.siblings('.dropdown-submenu');
  
       var $children = this.$menu.find('> .dropdown-menu > ' + desc);
  
       this.$submenus = $children.filter('.dropdown-submenu');
       this.$items = $children.not('.dropdown-submenu');
  
       this.init();
    }
  
    Submenupicker.prototype = {
       init: function() {
          this.$element.on({
            'click.bs.dropdown': $.proxy(this.click, this),
            keydown: $.proxy(this.keydown, this)
          });
  
          this.$menu.on('hide.bs.submenu', $.proxy(this.hide, this));
          this.$items.on('keydown', $.proxy(this.item_keydown, this));
  
          // Bootstrap fix
          this.$menu.nextAll(desc + ':first:not(.dropdown-submenu)').children('a').on('keydown', $.proxy(this.next_keydown, this));
       },
       click: function(event) {
          event.stopPropagation();
  
          this.toggle();
       },
       toggle: function() {
          if (this.$menu.hasClass('open')) {
            this.close();
          }
          else {
            this.$menu.addClass('open');
            this.$menus.trigger('hide.bs.submenu');
          }
       },
       hide: function(event) {
          // Stop event bubbling
          event.stopPropagation();
  
          this.close();
       },
       close: function() {
          this.$menu.removeClass('open');
          this.$submenus.trigger('hide.bs.submenu');
       },
       keydown: function(event) {
          // 13: Return, 27: Esc, 32: Spacebar
          // 38: Arrow up, 40: Arrow down
  
          // Off vertical scrolling
          if ($.inArray(event.keyCode, [32, 38, 40]) != -1) {
            event.preventDefault();
          }
  
          if ($.inArray(event.keyCode, [13, 32]) != -1) {
            this.toggle();
          }
          else if ($.inArray(event.keyCode, [27, 38, 40]) != -1) {
            event.stopPropagation();
  
            if (event.keyCode == 27) {
               if (this.$menu.hasClass('open')) {
                  this.close();
               }
               else {
                  this.$menus.trigger('hide.bs.submenu');
                  this.$drop.removeClass('open').children('a').trigger('focus');
               }
            }
            else {
               var $items = this.$main.find('li:not(.disabled):visible > a');
  
               var index = $items.index(event.target);
  
               if (event.keyCode == 38 && index !== 0) {
                  index--;
               }
               else if (event.keyCode == 40 && index !== $items.length - 1) {
                  index++;
               }
               else {
                  return;
               }
  
               $items.eq(index).trigger('focus');
            }
          }
       },
       item_keydown: function(event) {
          // 27: Esc
  
          if (event.keyCode != 27) {
            return;
          }
  
          event.stopPropagation();
  
          this.close();
          this.$element.trigger('focus');
       },
       next_keydown: function(event) {
          // 38: Arrow up
  
          if (event.keyCode != 38) {
            return;
          }
  
          // Off vertical scrolling
          event.preventDefault();
  
          event.stopPropagation();
  
          // Use this.$drop instead this.$main (optimally)
          var $items = this.$drop.find('li:not(.disabled):visible > a');
  
          var index = $items.index(event.target);
  
          $items.eq(index - 1).trigger('focus');
       }
    };
  
    // For AMD/Node/CommonJS used elements (optional)
    // http://learn.jquery.com/jquery-ui/environments/amd/
    return $.fn.submenupicker = function(elements) {
       var $elements = this instanceof $ ? this : $(elements);
  
       return $elements.each(function() {
          var data = $.data(this, 'bs.submenu');
  
          if (!data) {
            data = new Submenupicker(this);
  
            $.data(this, 'bs.submenu', data);
          }
       });
    };
  
  });
  
  // Bootstrap Sub-Menus trigger
  $('.dropdown-submenu > a').submenupicker();
  
  
  //==========================================================
  // Fullscreen overlay menu 
  // More info: (http://www.jqueryscript.net/menu/Responsive-Fullscreen-Navigation-Menu-with-jQuery-CSS3.html)
  //==========================================================
  
  // menu button
  $(".fullscreen-menu .menu-button").on('click',function () {
      // menu open fade effect
      $(".fullscreen-menu .menu-nav").fadeToggle(400);
  
      // button animate
      $(".hamburger .top-menu").toggleClass("top-animate");
      $(".hamburger .mid-menu").toggleClass("mid-animate");
      $(".hamburger .bottom-menu").toggleClass("bottom-animate");
  
      // Header no move if menu is open (if class "show-hide-on-scroll" is enabled)
      $(".show-hide-on-scroll").toggleClass("no-move");
  
      // no page scroll if menu is open
      $("body").toggleClass("no-scroll");
  });
  
  // remove menu link on click
  $(".menu-nav li a").on('click',function () {
      $(".menu-button").click();
  });
  
  
  
  //====================================================
  // Hide header/menu on scroll down, show on scroll up
  //====================================================
  
  var didScroll;
  var lastScrollTop = 0;
  var delta = 2;
  var navbarHeight = $('.show-hide-on-scroll').outerHeight();
  
  $(window).scroll(function(event){
      didScroll = true;
  });
  
  setInterval(function() {
      if (didScroll) {
          hasScrolled();
          didScroll = false;
      }
  }, 50);
  
  function hasScrolled() {
      var st = $(this).scrollTop();
  
      // Make sure they scroll more than delta
      if(Math.abs(lastScrollTop - st) <= delta)
           return;
  
  // If they scrolled down and are past the header, add class .fly-up.
  // This is necessary so you never see what is "behind" the header.
  if (st > lastScrollTop && st > navbarHeight){
          // Scroll Down
          $('.show-hide-on-scroll').addClass('fly-up');
      } else {
          // Scroll Up
          if(st + $(window).height() < $(document).height()) {
              $('.show-hide-on-scroll').removeClass('fly-up');
          }
      }
  
      lastScrollTop = st;
  }
  
  
  
  //====================================================================
  // Header Filled (cbpAnimatedHeader)
  // http://tympanus.net/codrops/2013/06/06/on-scroll-animated-header/
  //====================================================================
  
  var cbpAnimatedHeader = (function() {
  
  var docElem = document.documentElement,
      header = document.querySelector( '#header' ),
      didScroll = false,
      changeHeaderOn = 1;
  
  function init() {
      window.addEventListener( 'scroll', function( event ) {
           if( !didScroll ) {
                didScroll = true;
                setTimeout( scrollPage, 150 );
           }
      }, false );
  }
  
  function scrollPage() {
  var sy = scrollY();
  if ($(this).scrollTop() > 150){  
      $('#header.fixed-top, #header.show-hide-on-scroll').addClass("header-filled");
  }
  else{
      $('#header.fixed-top, #header.show-hide-on-scroll').removeClass("header-filled");
  }
      didScroll = false;
  }
  
  function scrollY() {
      return window.pageYOffset || docElem.scrollTop;
  }
  
  init();
  
  })();
  
  
  
  //=======================
  // Top sliding bar
  //=======================
  
  var megaDrop = $('.top-slidingbar-trigger');
  var megaContainer = $('#top-slidingbar');
  
  $(megaDrop).on('click',function() {
      $(megaContainer).slideToggle(300,function(){
          if ($(this).is(":hidden")) $(megaDrop).html("+");
          else $(megaDrop).html("×");
      });
  });
  
  
  
  //==============================================================
  // WOW animations (more info: http://mynameismatthieu.com/WOW/)
  //==============================================================
  
  $(window).on('load',function() {
    new WOW().init();
  });
  
  
  
  //=======================
  // Smooth scrolling
  //=======================
  
  $('.sm-scroll').on('click',function() {
      if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {
  
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
          $('html,body').animate({
              scrollTop: target.offset().top 
          }, 1500, 'easeInOutExpo');
              return false;
          }
      }
  });
  
  
  
  //=====================================================================================
  // Isotope
  // Source: http://isotope.metafizzy.co
  // Note-1: "imagesloaded" blugin is required: https://github.com/desandro/imagesloaded
  // Note-2: "lazysizes" blugin is recommended: https://github.com/aFarkas/lazysizes
  //=====================================================================================
  
  // init Isotope
  var $container = $('.isotope-items-wrap');
  $container.imagesLoaded(function() {
      $container.isotope({
          itemSelector: '.isotope-item',
          transitionDuration: '0.5s',
          masonry: {
              columnWidth: '.grid-sizer',
              horizontalOrder: false
          }
      });
  });
  
  // Filter
  $('.isotope-filter-links a').on('click',function(){
      var selector = $(this).attr('data-filter');
      $container.isotope({
          filter: selector
      });
      return false;
  });
  
  // Filter item active
  var filterItemActive = $('.isotope-filter-links a');
  filterItemActive.on('click', function(){
      var $this = $(this);
      if ( !$this.hasClass('active')) {
          filterItemActive.removeClass('active');
          $this.addClass('active');
      }
  });
  
  
  
  //====================================================================================
  // YTPlayer (Background Youtube video): https://github.com/pupunzi/jquery.mb.YTPlayer
  //====================================================================================
  
  // Disabled on mobile devices, because video background doesn't work on mobile devices (instead the background image is displayed).
  if (!jQuery.browser.mobile) { 
      $(".youtube-bg").mb_YTPlayer();
  }
  
  
  
  //=================================================================
  // OWL Carousel (more info: http://www.owlcarousel.owlgraphic.com)
  //=================================================================
  
  $('.owl-carousel').each( function() {
      var $carousel = $(this);
      $carousel.owlCarousel({
  
          items: $carousel.data("items"),
          loop: $carousel.data("loop"),
          margin: $carousel.data("margin"),
          center: $carousel.data("center"),
          startPosition: $carousel.data("start-position"),
          animateIn: $carousel.data("animate-in"),
          animateOut: $carousel.data("animate-out"),
          autoWidth: $carousel.data("autowidth"),
          autoHeight: $carousel.data("autoheight"),
          autoplay: $carousel.data("autoplay"),
          autoplayTimeout: $carousel.data("autoplay-timeout"),
          autoplayHoverPause: $carousel.data("autoplay-hover-pause"),
          autoplaySpeed: $carousel.data("autoplay-speed"),
          nav: $carousel.data("nav"),
          navText: ['<i class="fa fa-chevron-left"></i>', '<i class="fa fa-chevron-right"></i>'],
          navSpeed: $carousel.data("nav-speed"),
          dots: $carousel.data("dots"),
          dotsSpeed: $carousel.data("dots-speed"),
          mouseDrag: $carousel.data("mouse-drag"),
          touchDrag: $carousel.data("touch-drag"),
          dragEndSpeed: $carousel.data("drag-end-speed"),
          lazyLoad: $carousel.data("lazy-load"),
          video: true,
          responsive: {
              0: {
                  items: $carousel.data("mobile-portrait"),
                  center: false,
              },
              480: {
                  items: $carousel.data("mobile-landscape"),
                  center: false,
              },
              768: {
                  items: $carousel.data("tablet-portrait"),
                  center: false,
              },
              992: {
                  items: $carousel.data("tablet-landscape"),
              },
              1200: {
                  items: $carousel.data("items"),
              }
          }
  
      });
  });
  
  
  
  //=====================================================
  // Paroller - Background Image Parallax Plugin
  // More info: https://tgomilar.github.io/paroller.js/
  //=====================================================
  
  $('.bg-image-parallax').paroller({ 
      factor: 0.3, // multiplier for scrolling speed and offset.
      factorXs: 0.1, // multiplier for scrolling speed and offset if window width is <576px.
      factorSm: 0.2, // multiplier for scrolling speed and offset if window width is <=768px.
      factorMd: 0.2, // multiplier for scrolling speed and offset if window width is <=1024px.
      factorLg: 0.3, // multiplier for scrolling speed and offset if window width is <=1200px.
      type: 'background', // background, foreground.
      direction: 'vertical' // vertical, horizontal.
  });
  
  
  
  //==============================================================================================
  //
  // Deferring embed videos (Youtube, Vimeo).
  // 
  // When you have videos from Youtube, Vimeo or just about any other provider embedded 
  // in your webpages it causes your page to load slower. Just about every video can be deferred 
  // until after your initial pageload which will allow your page to load quickly 
  // without having to gather all the files and resources that the video is requesting.
  //
  // More info: https://www.feedthebot.com/pagespeed/defer-videos.html
  //
  //==============================================================================================
  
  function init() {
  var vidDefer = document.getElementsByTagName('iframe');
  for (var i=0; i<vidDefer.length; i++) {
  if(vidDefer[i].getAttribute('data-src')) {
  vidDefer[i].setAttribute('src',vidDefer[i].getAttribute('data-src'));
  } } }
  window.onload = init;
  
  
  //================================================================
  // Magnific Popup: http://dimsemenov.com/plugins/magnific-popup/
  //================================================================
  
  // Image gallery popup (type image)
  $('.popup-gallery').magnificPopup({
      delegate: '.popup-trigger',
      type: 'image',
      tLoading: 'Loading image #%curr%...',
      mainClass: 'mfp-fadein',
      gallery: {
        enabled: true, // enable or disable gallery (false/true)
        preload: [0,1], // read about this option in next Lazy-loading section
        navigateByImgClick: true,
        arrowMarkup: '<button title="%title%" type="button" class="mfp-custom-arrow mfp-custom-arrow-%dir%"></button>', // markup of an arrow button
        tPrev: 'Previous (Left arrow key)', // title for left button
        tNext: 'Next (Right arrow key)', // title for right button
        tCounter: '<span class="mfp-counter">%curr% of %total%</span>' // markup of counter
      },
      image: {
        titleSrc: 'data-title', // Attribute of the target element that contains caption for the slide.
        tError: '<a href="%url%">The image #%curr%</a> could not be loaded.' // Error message
      }
  });
  
  // Inline popup (type inline)
  $('.inline-popup-trigger').magnificPopup({
      type: 'inline',
      modal: false,
      alignTop: true,
      fixedContentPos: true,
      fixedBgPos: false,
      overflowY: 'auto',
      closeBtnInside: true,
      preloader: false,
      midClick: true,
      removalDelay: 300,
      mainClass: 'mfp-fade-zoom',
      gallery: {
        enabled: true, // enable or disable gallery (false/true)
        arrowMarkup: '<button title="%title%" type="button" class="mfp-custom-arrow mfp-custom-arrow-%dir%"></button>', // markup of an arrow button
        tPrev: 'Previous (Left arrow key)', // title for left button
        tNext: 'Next (Right arrow key)' // title for right button
      }
  });
  
  $(document).on('click', '.inline-popup-close', function (e) {
      e.preventDefault();
      $.magnificPopup.close();
  });
  
  
  
  // ===============================================
  // uniMail - Universal PHP Mail Feedback Script
  // Source: https://github.com/agragregra/uniMail
  // ===============================================
  
  // E-mail Ajax Send
  $("#contact-form").submit(function() { // your contact form ID.
      var th = $(this);
      $.ajax({
          type: "POST",
          url: "mail.php", // mail.php path.
          data: th.serialize()
      }).done(function() {
          alert("Thank you. Your message has been sent!");
          setTimeout(function() {
          // Done Functions
          th.trigger("reset");
          }, 1000);
      });
      return false;
  });
  
  
  
  //=======================
  // Scroll to top button
  //=======================
  
  // Check to see if the window is top if not then display button
  $(window).scroll(function(){
      if ($(this).scrollTop() > 400) {
          $('.scrolltotop').fadeIn();
      } else {
          $('.scrolltotop').fadeOut();
      }
  });
  