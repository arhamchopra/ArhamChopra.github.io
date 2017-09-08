;(function () {

  'use strict';



  // iPad and iPod detection	
  var isiPad = function(){
    return (navigator.platform.indexOf("iPad") != -1);
  };

  var isiPhone = function(){
    return (
      (navigator.platform.indexOf("iPhone") != -1) || 
      (navigator.platform.indexOf("iPod") != -1)
    );
  };

  // Main Menu Superfish
  var mainMenu = function() {

    $('#fh5co-primary-menu').superfish({
      delay: 0,
      animation: {
        opacity: 'show'
      },
      speed: 'fast',
      cssArrows: true,
      disableHI: true
    });

  };

  // Parallax
  var parallax = function() {
    $(window).stellar();
  };


  // Offcanvas and cloning of the main menu
  var offcanvas = function() {

    var $clone = $('#fh5co-menu-wrap').clone();
    $clone.attr({
      'id' : 'offcanvas-menu'
    });
    $clone.find('> ul').attr({
      'class' : '',
      'id' : ''
    });

    $('#fh5co-page').prepend($clone);

    // click the burger
    $('.js-fh5co-nav-toggle').on('click', function(){

      if ( $('body').hasClass('fh5co-offcanvas') ) {
        $('body').removeClass('fh5co-offcanvas');
      } else {
        $('body').addClass('fh5co-offcanvas');
      }
      // $('body').toggleClass('fh5co-offcanvas');

    });

    $('#offcanvas-menu').css('height', $(window).height());

    $(window).resize(function(){
      var w = $(window);


      $('#offcanvas-menu').css('height', w.height());

      if ( w.width() > 769 ) {
        if ( $('body').hasClass('fh5co-offcanvas') ) {
          $('body').removeClass('fh5co-offcanvas');
        }
      }

    });	

  };



  // Click outside of the Mobile Menu
  var mobileMenuOutsideClick = function() {
    $(document).click(function (e) {
      var container = $("#offcanvas-menu, .js-fh5co-nav-toggle");
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        if ( $('body').hasClass('fh5co-offcanvas') ) {
          $('body').removeClass('fh5co-offcanvas');
        }
      }
    });
  };


  // Animations

  var contentWayPoint = function() {
    var i = 0;
    $('.animate-box').waypoint( function( direction ) {

      if( direction === 'down' && !$(this.element).hasClass('animated') ) {

        i++;

        $(this.element).addClass('item-animate');
        setTimeout(function(){

          $('body .animate-box.item-animate').each(function(k){
            var el = $(this);
            setTimeout( function () {
              el.addClass('fadeInUp animated');
              el.removeClass('item-animate');
            },  k * 200, 'easeInOutExpo' );
          });

        }, 100);

      }

    } , { offset: '85%' } );
  };

  // Smooth scrolling
  var setSmoothScroll = function(){
    // Select all links with hashes
    $('a[href*="#"]')
    // Remove links that don't actually link to anything
      .not('[href="#"]')
      .not('[href="#0"]')
      .click(function(event) {
        // On-page links
        if (
          location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') 
          && 
          location.hostname == this.hostname
        ) {
          // Figure out element to scroll to
          var target = $(this.hash);
          target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
          // Does a scroll target exist?
          if (target.length) {
            // Only prevent default if animation is actually gonna happen
            event.preventDefault();
            $('html, body').animate({
              scrollTop: target.offset().top
            }, target.offset.top, function() {
              // Callback after animation
              // Must change focus!
              var $target = $(target);
              $target.focus();
              if ($target.is(":focus")) { // Checking if the target was focused
                return false;
              } else {
                $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
                $target.focus(); // Set focus again
              }
            });
          }
        }
      });
  }

  // Document on load.
  $(function(){
    mainMenu();
    parallax();
    offcanvas();
    mobileMenuOutsideClick();
    contentWayPoint();
    setSmoothScroll();

  });


}());
