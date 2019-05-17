(function ($, Drupal) {

  Drupal.behaviors.ama_mainNavigation = {
    attach: function (context, settings) {

      var $categoryNavWrapper = $('.ama_category_navigation_wrapper'),
          $categoryNavigationMenu = $('.ama_category_navigation_menu'),
          $categoryNavigationMenuGroup = $('.ama_category_navigation_menu__group'),
          $mobileSearchTrigger = $('.global-search-trigger'),
          $mobileSearch = $('.ama__global-search'),
          $mainNav = $('.ama__main-navigation '),
          $productNav = $('.ama__product-nav'),
          viewportHeight = 0,
          productNavHeight = 0,
          categoryNavMenuHeight = $('.ama_category_navigation_menu').outerHeight(),
          categoryNavMenuResizedHeight = 0;

      // Checks if user agent is a mobile device
      var deviceAgent = navigator.userAgent.toLowerCase();
      var agentID = deviceAgent.match(/(android|webos|iphone|ipod|blackberry)/);

      if($productNav.length){
        productNavHeight = $productNav.height();
      }

        // Calculate whether or not the category nav should have scrollbars
      function categoryNavHeight($resizeViewportHeight) {

        // Check to see if viewport height is passed back when the window gets resized
        if(typeof $resizeViewportHeight !== 'undefined') {
          viewportHeight = $resizeViewportHeight - productNavHeight;
        } else {
          // Window height is used by default
          viewportHeight = $(window).innerHeight();
        }

        // Subtract the navigation height from window height to assess content height
        categoryNavMenuResizedHeight = viewportHeight;

        // Check to see if main menu purple dropdown height is larger than viewport height
        if (categoryNavMenuHeight > viewportHeight) {
          // Set the menu dropdown the same as viewport to enable scrolling
          $categoryNavigationMenuGroup.addClass('scroll').outerHeight(categoryNavMenuResizedHeight - $mainNav.outerHeight());
        } else {
          $categoryNavigationMenuGroup.removeClass('scroll').outerHeight('auto');
        }
      }

      // Hide/Show menu
      function hideShow() {
        if ($('#global-menu').prop('checked')) {
          $categoryNavigationMenu.slideDown(function () {
            categoryNavHeight();
            if (agentID) {
              $categoryNavigationMenu.outerHeight($('.ama_category_navigation_menu__group').outerHeight());
            } else {
              $(this).parent().height('auto');
            }

            // Only make the menu height same as viewport on mobile devices
            if (agentID) {
              $categoryNavWrapper.outerHeight($(window).innerHeight()).addClass('scroll');

              $(window).resize(function () {
                $categoryNavWrapper.outerHeight($(window).innerHeight());
              });
            }
          });
        }
        else {
          $categoryNavigationMenu.slideUp(function () {
            $(this).parent().height(0);

            // Only make the menu height same as viewport on mobile devices
            if (agentID) {
              $categoryNavWrapper.outerHeight(0).removeClass('scroll');

              $(window).resize(function () {
                $categoryNavWrapper.outerHeight(0);
              });
            }
          });
        }
      }

      $('#global-menu').prop('checked', false);

      $('.ama__global-menu').click(function (e) {
        hideShow();
        e.stopPropagation();
      });

      $(document).click(function (e) {
        if (!$categoryNavigationMenu.is(e.target) && $categoryNavigationMenu.has(e.target).length === 0) {
          $('#global-menu').prop('checked', false);
          hideShow();
        }
      });

      $($mobileSearchTrigger).unbind('click').click(function () {
        $mobileSearch.slideToggle();
      });

      function moveSocialSharePosition(){
        var mainNavPosition = $('.ama__main-navigation .container').offset().left;
        var $amaSocialShare = $('.ama__social-share');

        // Checks to see if there is enough for the sticky nav
        if(mainNavPosition > 60) {

          var socialStickyPosition = mainNavPosition - 60;
          var $socialIcons = $('.ama__masthead__content__share');

          // Check to see if viewport width is greater 850px then the social icons will be sticky
          if($socialIcons.length && $(window).width() > 850) {
            $socialIcons.sticky({
              wrapperClassName: 'ama__masthead__content__share-wrapper',
              zIndex: 501
            });

            $socialIcons.on('sticky-start', function () {
              $amaSocialShare.addClass('ama__social-share--fixed').css('left', socialStickyPosition).hide().fadeTo('slow', 1);
            });

            $socialIcons.on('sticky-update', function () {
              $amaSocialShare.addClass('ama__social-share--fixed').hide().fadeTo('slow', 1);
            });

            $socialIcons.on('sticky-end', function () {
              $('.ama__social-share--fixed').removeClass('ama__social-share--fixed');
            });
          }
        }
      }

      // Initialize getSocialShare()
      moveSocialSharePosition();

      // Onscroll check to see if social icon position is greater than footer position
      var debounce_timer;

      if($('.ama__masthead__content__share .ama__social-share').is(':visible')) {
        $(window).scroll(function() {
          var $socialIcons = $('.ama__masthead__content__share .ama__social-share');
          var socialIconPositionBottom = $socialIcons.offset().top + $socialIcons.outerHeight();
          var footerPosition = $('footer').offset().top;

          if(debounce_timer) {
            window.clearTimeout(debounce_timer);
          }

          debounce_timer = window.setTimeout(function() {
            if(socialIconPositionBottom > footerPosition) {
              $('.ama__masthead__content__share').fadeOut('fast');
            } else {
              $('.ama__masthead__content__share').fadeIn('fast');
            }
          }, 50);

          if($(window).scrollTop() + $(window).height() >= $(document).height()) {
            categoryNavHeight();
          }
        });
      }

      //Checks the layout position of article on window resize and moves the social icons accordingly
      $( window ).resize(function() {

        var $resizeViewportHeight = $(window).innerHeight()
        categoryNavHeight($resizeViewportHeight);

        var mainNavPositionUpdate = $('.ama__main-navigation .container').offset().left - 100;

        $('.ama__social-share.ama__social-share--fixed').css('left', mainNavPositionUpdate);

      });
    }
  };
})(jQuery, Drupal);



