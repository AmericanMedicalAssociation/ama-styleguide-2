/**
 * @file
 * Initialization script for global processes
 */

(function ($, Drupal) {

/**
 *
 * Initialize fitVid for YouTube vieos.
 *
 * JavaScript should be made compatible with libraries other than jQuery by
 * wrapping it with an "anonymous closure". See:
 * - https://drupal.org/node/1446420
 * - http://www.adequatelygood.com/2010/3/JavaScript-Module-Pattern-In-Depth
 */

	Drupal.behaviors.fitvidinit = {
	 attach: function (context, settings) {
			(function ($) {
				$(document).ready(function(){
					$('.video-container').fitVids();
				});
			})(jQuery);
		}
	};

})(jQuery, Drupal);

/**
 * @file
 * Form fields masking
 */

(function ($, Drupal) {
  Drupal.behaviors.formItems = {
    attach: function (context, settings) {
      (function ($) {
        $(document).ready(function(){

          $('.multiselect').multiselect();

          $('.ama__tooltip').tooltip({
            tooltipClass: "ama__tooltip-bubble"
          });

          function count_remaining_character() {
            var max_length = 150;
            var character_entered = $('.textarea').val().length;
            var character_remaining = max_length - character_entered;
            $('.character-count').html(character_remaining);
            if (max_length < character_entered) {
              $('.textarea').addClass('error');
              $('.character-count').addClass('error');
            } else {
              $('.textarea').removeClass('error');
              $('.character-count').removeClass('error');
            }
          }

          // Start search filter

          var availableTags = [
            "Alabama",
            "Alaska",
            "American Samoa",
            "Arizona",
            "Arkansas",
            "California",
            "Colorado",
            "Connecticut",
            "Delaware",
            "District Of Columbia",
            "Federated States Of Micronesia",
            "Florida",
            "Georgia",
            "Guam",
            "Hawaii",
            "Idaho",
            "Illinois",
            "Indiana",
            "Iowa",
            "Kansas",
            "Kentucky",
            "Louisiana",
            "Maine",
            "Marshall Islands",
            "Maryland",
            "Massachusetts",
            "Michigan",
            "Minnesota",
            "Mississippi",
            "Missouri",
            "Montana",
            "Nebraska",
            "Nevada",
            "New Hampshire",
            "New Jersey",
            "New Mexico",
            "New York",
            "North Carolina",
            "North Dakota",
            "Northern Mariana Islands",
            "Ohio",
            "Oklahoma",
            "Oregon",
            "Palau",
            "Pennsylvania",
            "Puerto Rico",
            "Rhode Island",
            "South Carolina",
            "South Dakota",
            "Tennessee",
            "Texas",
            "Utah",
            "Vermont",
            "Virgin Islands",
            "Virginia",
            "Washington",
            "West Virginia",
            "Wisconsin",
            "Wyoming"
          ];

          $( "#search_filter" ).autocomplete({
            source: availableTags
          });

          $.ui.autocomplete.prototype._resizeMenu = function () {
            var ul = this.menu.element;
            ul.outerWidth(this.element.outerWidth());
          };


          // Start search filter with checkboxes

          var dataModel = [
            {text: 'Alabama', value: '2'},
            {text: 'Alaska', value: '2'},
            {text: 'American Samoa', value: '2'},
            {text: 'Arizona', value: '2'},
            {text: 'Arkansas', value: '2'},
            {text: 'California', value: '2'},
            {text: 'Colorado', value: '2'},
            {text: 'Connecticut', value: '2'},
            {text: 'Delaware', value: '2'},
            {text: 'District Of Columbia', value: '2'},
            {text: 'Federated States Of Micronesia', value: '2'},
            {text: 'Florida', value: '2'},
            {text: 'Georgia', value: '2'},
            {text: 'Guam', value: '2'},
            {text: 'Hawaii', value: '2'},
            {text: 'Idaho', value: '2'},
            {text: 'Illinois', value: '2'},
            {text: 'Indiana', value: '2'},
            {text: 'Iowa', value: '2'},
            {text: 'Kansas', value: '2'},
            {text: 'Kentucky', value: '2'},
            {text: 'Louisiana', value: '2'},
            {text: 'Maine', value: '2'},
            {text: 'Marshall Islands', value: '2'},
            {text: 'Maryland', value: '2'},
            {text: 'Massachusetts', value: '2'},
            {text: 'Michigan', value: '2'},
            {text: 'Minnesota', value: '2'},
            {text: 'Mississippi', value: '2'},
            {text: 'Missouri', value: '2'},
            {text: 'Montana', value: '2'},
            {text: 'Nebraska', value: '2'},
            {text: 'Nevada', value: '2'},
            {text: 'New Hampshire', value: '2'},
            {text: 'New Jersey', value: '2'},
            {text: 'New Mexico', value: '2'},
            {text: 'New York', value: '2'},
            {text: 'North Carolina', value: '2'},
            {text: 'North Dakota', value: '2'},
            {text: 'Northern Mariana Islands', value: '2'},
            {text: 'Ohio', value: '2'},
            {text: 'Oklahoma', value: '2'},
            {text: 'Oregon', value: '2'},
            {text: 'Palau', value: '2'},
            {text: 'Pennsylvania', value: '2'},
            {text: 'Puerto Rico', value: '2'},
            {text: 'Rhode Island', value: '2'},
            {text: 'South Carolina', value: '2'},
            {text: 'South Dakota', value: '2'},
            {text: 'Tennessee', value: '2'},
            {text: 'Texas', value: '2'},
            {text: 'Utah', value: '2'},
            {text: 'Vermont', value: '2'},
            {text: 'Virgin Islands', value: '2'},
            {text: 'Virginia', value: '2'},
            {text: 'Washington', value: '2'},
            {text: 'West Virginia', value: '2'},
            {text: 'Wisconsin', value: '2'},
            {text: 'Wyoming', value: '2'},
            {text: '', value: ''}
          ];

          function selChange(){
            var selection = $('#myCheckList').checkList('getSelection');

            $('#selectedItems').text(JSON.stringify(selection));
          }

          if (typeof(jQuery.ui.checkList) != 'undefined'){
            $('#filterList').checkList({
              listItems: dataModel,
              onChange: selChange
            });
          }

          $('[type=checkbox]').checkboxradio();
          $('[type=radio]').checkboxradio().buttonset().find('label').css('width', '19.4%');

          $('.textarea').keyup(function() {
            count_remaining_character();
          });

          // Range Field
          var legend = $('.ama__range-field__legend');
          var handle = $( "#currentValue" );

          $(".ama__range-field").slider({
            animate: true,
            range: 'min',
            value: 1,
            min: 2000,
            max: 5000,
            step: 1,
            create: function(){
              var handle = jQuery(this).find('.ui-slider-handle');
              var bubble = jQuery('<div class="ama__range-field__valuebox"></div>');
              handle.append(bubble);
            },
            slide: function(evt, ui) {
              ui.handle.childNodes[0].innerHTML = '$' + ui.value;
            }
          }).append(legend);

          // Form accordion
          $( ".tablist" ).accordion({
            header: ".ama__form-steps__step",
            heightStyle: "content"
          });

          // Expand list
          $( ".ama__expand-list" ).accordion({
            multiple: true,
            icons: false,
            heightStyle: "content",
            collapsible: true,
            active: false,
            animate: 500,
            activate : function (event, ui)
            {
              if($(ui.newPanel).hasClass('ui-accordion-content-active')) {
                $(ui.newPanel).prev().addClass('active');
              } else {
                $(ui.oldPanel).prev().removeClass('active');
              }
            }
          });

          // Collapse all accordion panels
          $('.ama__filter__collapse-panels button').click(function(){
            $('.ama__expand-list .ui-accordion-header').each( function() {
              if($(this).hasClass('ui-state-active') || $(this).hasClass('active')) {
                $(this).click();
              }
            });
          });

          // Open accordion panels for mobile
          $('.ama__applied-filters__show-filters').click(function(){
            $('.ama__expand-list, .ama__applied-filters__tags').slideDown();
            $('.ama__filter__see-results').fadeIn();
            $(this).fadeOut();
          });

          // Close accordion panels
          $('.ama__filter__see-results').click(function(){
            $('.ama__expand-list, .ama__applied-filters__tags').slideUp();
            $('.ama__applied-filters__show-filters').fadeIn();
            $(this).fadeOut();
          });

          // search filter
          function listFilter(input, list) { // header is any element, list is an unordered list
            // custom css expression for a case-insensitive contains()
            jQuery.expr[':'].Contains = function(a,i,m){
              return (a.textContent || a.innerText || "").toUpperCase().indexOf(m[3].toUpperCase())>=0;
            };

            $(input).change( function () {
              var filter = $(this).val();
              if(filter) {
                // this finds all links in a list that contain the input,
                // and hide the ones not containing the input while showing the ones that do
                $(list).find("span:not(:Contains(" + filter + "))").parent().hide();
                $(list).find("span:Contains(" + filter + ")").parent().show();
              } else {
                $(list).find("label").show();
              }
              return false;
              // only show results after 3 characters are entered
            }).keyup( function() {
              if( this.value.length < 4 ) return;
              $(this).change();
            });
          }

          listFilter($("#ama__search__location"), $(".ama__form-group"));

        });
      })(jQuery);
    }
  };
})(jQuery, Drupal);

/**
 * @file
 * Ribbon nav user interactions.
 *
 * JavaScript should be made compatible with libraries other than jQuery by
 * wrapping it with an "anonymous closure". See:
 * - https://drupal.org/node/1446420
 * - http://www.adequatelygood.com/2010/3/JavaScript-Module-Pattern-In-Depth
 */
(function ($, Drupal) {

  Drupal.behaviors.ribbonnav = {
    attach: function (context, settings) {

      $('.ama__ribbon__dropdown').each(function () {
        var class_active = 'is-active';

        $('.ama__ribbon__dropdown__trigger', this).on('click', function(e) {
          e.stopPropagation();
          // Unfocus on the dropdown.
          $(this).blur();
          // Add our class for CSS.
          $(this).toggleClass(class_active);
          // Add our class to the dropdown UL.
          $(this).children().toggleClass(class_active);
        });

        $(document).click( function(){
          $('.ama__ribbon__dropdown__trigger', this).removeClass(class_active).children().removeClass(class_active)
        });
      })
    }
  }
})(jQuery, Drupal);

/**
 * @file
 * Subcategory
 *
 * JavaScript should be made compatible with libraries other than jQuery by
 * wrapping it with an "anonymous closure". See:
 * - https://drupal.org/node/1446420
 * - http://www.adequatelygood.com/2010/3/JavaScript-Module-Pattern-In-Depth
 */
(function ($, Drupal) {
  Drupal.behaviors.subcategories = {
    attach: function(context, settings) {

      function checkSize(){
        var subcategoryWrapper = $('.ama__subcategory-exploration-with-images').outerWidth();
        var subcategoryTitle = $('.ama__subcategory-exploration-with-images__title').outerWidth();
        subcategory = $('.ama__subcategory-exploration__subcategory');
        subcategory.hide();

        if (subcategoryWrapper > 0 && subcategoryWrapper < 290 && subcategoryTitle > 200 ) {
          subcategory.slice(0, 2).css('display', 'block');
        } else if (subcategoryWrapper > 290 && subcategoryWrapper < 600 && subcategoryTitle > 200 ) {
          subcategory.slice(0, 3).css('display', 'block');
        } else if ((subcategoryWrapper > 300 && subcategoryWrapper < 700) && subcategoryTitle < 200) {
          subcategory.slice(0, 2).css('display', 'block');
        } else if ((subcategoryWrapper > 700 && subcategoryWrapper < 1000) && subcategoryTitle < 200) {
          subcategory.slice(0, 3).css('display', 'block');
        } else if ((subcategoryWrapper > 1000 && subcategoryWrapper < 1200) && subcategoryTitle < 200) {
          subcategory.slice(0, 4).css('display', 'block');
        } else {
          subcategory.slice(0, 5).css('display', 'block');
        }
      }

      function viewMore() {
        $('.ama__subcategory-exploration-with-images__view-less').hide();
        $('.ama__subcategory-exploration-with-images__view-all').show();

        $('.viewAll').click(function(e) {
          e.preventDefault();
          subcategory.fadeIn();
          $('.ama__subcategory-exploration-with-images__view-all').hide();
          $('.ama__subcategory-exploration-with-images__view-less').show();
        });

        $('.viewLess').click(function(e) {
          e.preventDefault();
          subcategory.hide();
          checkSize();
          $('.ama__subcategory-exploration-with-images__view-less').hide();
          $('.ama__subcategory-exploration-with-images__view-all').show();
        });
      }

      // run test on initial page load
      checkSize();
      viewMore();

      // run test on resize of the window
      $( window ).resize(function() {
        checkSize();
        viewMore();
      });
    }
  };
})(jQuery, Drupal);

/**
 * @file
 * Interactions for wayfinder.
 *
 * JavaScript should be made compatible with libraries other than jQuery by
 * wrapping it with an "anonymous closure". See:
 * - https://drupal.org/node/1446420
 * - http://www.adequatelygood.com/2010/3/JavaScript-Module-Pattern-In-Depth
 */
(function ($, Drupal) {
  Drupal.behaviors.wayfinder = {
    attach: function (context, settings) {
      (function ($) {
        if($.cookie('ama_wayfinder_cookie')) {
          $.cookie.json = true;
          // Read wayfinder cookies set from ama-assn domains
          var ama_wayfinder_cookie = $.cookie('ama_wayfinder_cookie');
          if (typeof ama_wayfinder_cookie !== 'undefined' || $('.referred').length > 0) {
            $('.ama__wayfinder--referrer a').fadeIn().css('display', 'flex');
            $('.ama__wayfinder--referrer a').attr("href", ama_wayfinder_cookie[1]);
            $('.ama__wayfinder--referrer a').text(ama_wayfinder_cookie[0]);
          } else {
            $('.ama_wayfinder_referrer--link-back').fadeOut();
          }
        }
      })(jQuery);
    }
  };
})(jQuery, Drupal);

/*====== jQuery UI tabs ======*/


(function ($, Drupal) {
  Drupal.behaviors.ama_tabs = {
    attach: function (context, settings) {
      var defaultActiveTab = 0;
      var viewportWidth = window.innerWidth;
      var lastHash = null;
      if (viewportWidth >= 600 && $('.ama__resource-tabs').length > 0) {
        defaultActiveTab = 1;
      }

      $(".ama__tabs").tabs({
        active: defaultActiveTab
      });

      //Resource page specific tags
      $(".ama__resource-tabs").tabs({
        active: defaultActiveTab,
        create: function () {
          var widget = $(this).data('ui-tabs');
          $(window).on('hashchange', function () {
            widget.option('active', widget._getIndex(location.hash));
            lastHash = location.hash;

            // Scroll to top of ui tabs navigation
            smoothScroll($(widget.element), $(widget.active[0]));
            return false;
          });
        }
      });

      // Prevent jump onclick
      $('.ui-tabs-anchor').on('click', function (e) {
        // Store window y location so we can restore after changing the hash
        // which would otherwise cause the window to jump down.
        var windowScrollY = window.scrollY;
        // Update window hash location, and restore to previous y-position.
        // Use currentTarget because target is sometimes the icon div.
        window.location.hash = e.currentTarget.hash;
        window.scroll({top: windowScrollY});
      });

      // Scroll to when there is no has change on resource page tab links
      $('.ama____page--resources__page-content a[href^="#"]').on('click', function (e) {
        if (lastHash == window.location.hash) {
          var hash = window.location.hash;
          smoothScroll($('.ama__resource-tabs__nav'), $('.ama__resource-tabs__nav a[href="' + hash + '"]'));
        }
      });

      //Simulate click event on actual simpleTabs tab from mobile drop down.
      $('.ama__tabs-navigation--mobile select').on("selectmenuchange", function (event, ui) {
        var selectedValue = ui.item.value;
        $('a[href="#' + selectedValue + '"]').click();
      });

      /*
       * This function animates the browser scroll action with attention to keyboard only accessibility concerns
       *
       * @param {jQuery Object] $tabNav
       * @param {jQuery Object] $target
       */
      function smoothScroll($tabNav, $target) {
        var navCoords = $tabNav[0].getBoundingClientRect();
        $('html,body').animate({
          scrollTop: window.scrollY + navCoords.top
        }, 850, function () {
          // update focus for keyboard only navigation
          $target.attr('tabindex', '-1');
          $target.focus();
        });
      }
    }
  };
})(jQuery, Drupal);

/*====== jQuery UI accordion ======*/

(function($) {
    $( ".ama__accordion" ).accordion({
        heightStyle: "content",
        collapsible: true,
        active: false
    });
})(jQuery);

(function ($, Drupal) {
  var verifyFields = function(form) {
    var $sections = form.find('section');
    var $inputs = $('.webform-submission-form section *').filter(':input');
    var $iconElement = $('.ama__form-steps__icon');
    var errorSections = [];

    $inputs.each(function(i, input) {
      $closestSection = $(this).closest('section').attr('data-drupal-selector').toString();
      if ($(this).prop('required') && $(this).hasClass('error')) {
        errorSections.push($closestSection);
      }
    });

    $sections.each(function(i, section) {
      if ($.inArray($(this).attr('data-drupal-selector').trim().toString(), errorSections) !== -1) {
        $(this).find($iconElement).removeClass('edit error completed').addClass('error');
      }
      else {
        $(this).find($iconElement).removeClass('edit error completed').addClass('completed');
      }
    });
    return this;
  };

  function validateEmail(email) {
    var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    return emailReg.test(email);
  }

  function fieldIsRequired(input) {
    input.addClass('error');
    input.next().remove('.form-item--error-message');
    input.after('<div class="form-item--error-message">Field is required.</div>');
  }

  function checkField(input) {
    if (input.prop('required') && (input.val().length === 0 || input.val() === "")) {
      fieldIsRequired(input);
    }
    else {
      if (input.attr('type') === 'email' && !validateEmail(input.val())) {
        fieldIsRequired(input);
      }
      else {
        input.removeClass('error').next().remove('.form-item--error-message');
      }
    }
  }

  // Go back to previous back is user clicks decline submit button
  $('.ama__button--decline').click(function(e) {
    e.preventDefault();

    if (document.referrer == "") {
      document.location.href='/';
    }
    else {
      history.back();
    }
  });

  var initialLoad = true;

  Drupal.behaviors.webForm = {
    attach: function (context, settings) {
      $.validator.addMethod(
        "regex",
        function(value, element, regexp) {
          return this.optional(element) || regexp.test(value);
        },
        "Please check your input."
      );

      // On webform submit check to see if all inputs are valid
      $('.webform-submission-form').validate({
        ignore: [],
        rules: {
          'email': {
            email: true
          },
          'telephone': {
            'regex': /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/
          },
          'birth_year': {
            'regex': /^(19|20)\d{2}$/
          }
        },
        errorPlacement: function(error, element) {
          if (element.attr("type") === "checkbox") {
            error.insertAfter(element.parent().siblings().last());
          }
          else if (element.is("select")) {
            error.insertAfter(element.next());
          }
          else {
            error.insertAfter(element);
          }
        },
        invalidHandler: function(form, validator) {
          var errors = validator.numberOfInvalids();
          if (errors) {
            $('.ama__form-steps__icon').addClass('error');
          }

          if($('.js-form-type-radio').find('label.error').length !== 0) {
            $('.js-form-type-radio label.error').parents('.fieldset-wrapper').addClass('error');
          }
        }
      });

      // Check to see if inputs are valid
      $('.webform-submission-form input').change(function() {
        $('.webform-submission-form label.error').each(function() {
          if( $(this).text() !== '') {
            $('.ama__form-steps__icon').addClass('error');
          }
          else {
            $('.ama__form-steps__icon').removeClass('error');
          }
        });
      });

      // Add validation to select dropdown menus using jQuery UI
      $('.webform-submission-form select').selectmenu({
        style: 'dropdown',
        transferClasses: true,
        width: null,
        change: function() {
          $(".webform-submission-form").validate().element(this);
        }
      });
    }
  };
})(jQuery, Drupal);

(function ($, Drupal) {
  Drupal.behaviors.ama_mainNavigation = {
    attach: function (context, settings) {

      var categoryNavigationMenu = $('.ama_category_navigation_menu');

      // Hide/Show menu
      function hideShow() {
        if($('#global-menu').prop('checked')) {
          categoryNavigationMenu.slideDown();
        } else {
          categoryNavigationMenu.slideUp();
        }
      }

      $('.ama__global-menu').click(function(e){
        e.stopPropagation();
        hideShow();
      });

      $(document).click(function(e) {
        if (!categoryNavigationMenu.is(e.target) && categoryNavigationMenu.has(e.target).length === 0) {
          $('#global-menu').prop('checked',false);
          hideShow();
        }
      });
    }
  };
})(jQuery, Drupal);

/**
 * SmartMenus jQuery Plugin - v1.1.0 - September 17, 2017
 * http://www.smartmenus.org/
 *
 * Copyright Vasil Dinkov, Vadikom Web Ltd.
 * http://vadikom.com
 *
 * Licensed MIT
 */
(function ($, Drupal) {
  Drupal.behaviors.categoryMenu = {
    attach: function (context, settings) {
      $('.ama_category_navigation_menu__group').smartmenus({
        mainMenuSubOffsetX: 250,
        mainMenuSubOffsetY: 20,
        keepInViewport: true
      });
    }
  };
})(jQuery, Drupal);

(function ($, Drupal) {
  Drupal.behaviors.ama_signInMenu = {
    attach: function (context, settings) {
      var signInDropdown = $('.ama__sign-in-dropdown');
      var signInDropdownMenu = $('.ama__sign-in-dropdown__menu');
      var exploreMenu = $('.ama__explore-menu');
      var exploreMenuDropdown = $('.ama__explore-menu__menu');

      function dropdownDownMenu(parentElement, menuElement) {

        parentElement.unbind('click').click(function(e){
          e.stopPropagation();
          $(menuElement).slideToggle();
          return false;
        });

        $(document).click(function(e) {
          // if the target of the click isn't the container nor a descendant of the container
          if (!parentElement.is(e.target) && parentElement.has(e.target).length === 0) {
            $(menuElement).slideUp();
          }

          // Set timeout for when a user mouses out of the menu
          parentElement.mouseenter(function(){
            clearTimeout();
          }).mouseleave(function(){
            setTimeout(function(){
              $(menuElement).slideUp();
            }, 2000);
          });
        });
      }

      dropdownDownMenu(signInDropdown, signInDropdownMenu);
      dropdownDownMenu(exploreMenu, exploreMenuDropdown);
    }
  };
})(jQuery, Drupal);

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluaXQuanMiLCJmb3JtLWl0ZW1zLmpzIiwibmF2LmpzIiwic3ViY2F0ZWdvcnkuanMiLCJ3YXlmaW5kZXIuanMiLCJ0YWJzLmpzIiwiYWNjb3JkaW9uLmpzIiwid2ViZm9ybXMuanMiLCJtYWluLW5hdmlnYXRpb24uanMiLCJjYXRlZ29yeS1tZW51LmpzIiwic2lnbi1pbi1kcm9wZG93bi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDNUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2xTQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzdCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM3RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3ZJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM3QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDcEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJzdHlsZWd1aWRlLWN1c3RvbS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGZpbGVcbiAqIEluaXRpYWxpemF0aW9uIHNjcmlwdCBmb3IgZ2xvYmFsIHByb2Nlc3Nlc1xuICovXG5cbihmdW5jdGlvbiAoJCwgRHJ1cGFsKSB7XG5cbi8qKlxuICpcbiAqIEluaXRpYWxpemUgZml0VmlkIGZvciBZb3VUdWJlIHZpZW9zLlxuICpcbiAqIEphdmFTY3JpcHQgc2hvdWxkIGJlIG1hZGUgY29tcGF0aWJsZSB3aXRoIGxpYnJhcmllcyBvdGhlciB0aGFuIGpRdWVyeSBieVxuICogd3JhcHBpbmcgaXQgd2l0aCBhbiBcImFub255bW91cyBjbG9zdXJlXCIuIFNlZTpcbiAqIC0gaHR0cHM6Ly9kcnVwYWwub3JnL25vZGUvMTQ0NjQyMFxuICogLSBodHRwOi8vd3d3LmFkZXF1YXRlbHlnb29kLmNvbS8yMDEwLzMvSmF2YVNjcmlwdC1Nb2R1bGUtUGF0dGVybi1Jbi1EZXB0aFxuICovXG5cblx0RHJ1cGFsLmJlaGF2aW9ycy5maXR2aWRpbml0ID0ge1xuXHQgYXR0YWNoOiBmdW5jdGlvbiAoY29udGV4dCwgc2V0dGluZ3MpIHtcblx0XHRcdChmdW5jdGlvbiAoJCkge1xuXHRcdFx0XHQkKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpe1xuXHRcdFx0XHRcdCQoJy52aWRlby1jb250YWluZXInKS5maXRWaWRzKCk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fSkoalF1ZXJ5KTtcblx0XHR9XG5cdH07XG5cbn0pKGpRdWVyeSwgRHJ1cGFsKTtcbiIsIi8qKlxuICogQGZpbGVcbiAqIEZvcm0gZmllbGRzIG1hc2tpbmdcbiAqL1xuXG4oZnVuY3Rpb24gKCQsIERydXBhbCkge1xuICBEcnVwYWwuYmVoYXZpb3JzLmZvcm1JdGVtcyA9IHtcbiAgICBhdHRhY2g6IGZ1bmN0aW9uIChjb250ZXh0LCBzZXR0aW5ncykge1xuICAgICAgKGZ1bmN0aW9uICgkKSB7XG4gICAgICAgICQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCl7XG5cbiAgICAgICAgICAkKCcubXVsdGlzZWxlY3QnKS5tdWx0aXNlbGVjdCgpO1xuXG4gICAgICAgICAgJCgnLmFtYV9fdG9vbHRpcCcpLnRvb2x0aXAoe1xuICAgICAgICAgICAgdG9vbHRpcENsYXNzOiBcImFtYV9fdG9vbHRpcC1idWJibGVcIlxuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgZnVuY3Rpb24gY291bnRfcmVtYWluaW5nX2NoYXJhY3RlcigpIHtcbiAgICAgICAgICAgIHZhciBtYXhfbGVuZ3RoID0gMTUwO1xuICAgICAgICAgICAgdmFyIGNoYXJhY3Rlcl9lbnRlcmVkID0gJCgnLnRleHRhcmVhJykudmFsKCkubGVuZ3RoO1xuICAgICAgICAgICAgdmFyIGNoYXJhY3Rlcl9yZW1haW5pbmcgPSBtYXhfbGVuZ3RoIC0gY2hhcmFjdGVyX2VudGVyZWQ7XG4gICAgICAgICAgICAkKCcuY2hhcmFjdGVyLWNvdW50JykuaHRtbChjaGFyYWN0ZXJfcmVtYWluaW5nKTtcbiAgICAgICAgICAgIGlmIChtYXhfbGVuZ3RoIDwgY2hhcmFjdGVyX2VudGVyZWQpIHtcbiAgICAgICAgICAgICAgJCgnLnRleHRhcmVhJykuYWRkQ2xhc3MoJ2Vycm9yJyk7XG4gICAgICAgICAgICAgICQoJy5jaGFyYWN0ZXItY291bnQnKS5hZGRDbGFzcygnZXJyb3InKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICQoJy50ZXh0YXJlYScpLnJlbW92ZUNsYXNzKCdlcnJvcicpO1xuICAgICAgICAgICAgICAkKCcuY2hhcmFjdGVyLWNvdW50JykucmVtb3ZlQ2xhc3MoJ2Vycm9yJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gU3RhcnQgc2VhcmNoIGZpbHRlclxuXG4gICAgICAgICAgdmFyIGF2YWlsYWJsZVRhZ3MgPSBbXG4gICAgICAgICAgICBcIkFsYWJhbWFcIixcbiAgICAgICAgICAgIFwiQWxhc2thXCIsXG4gICAgICAgICAgICBcIkFtZXJpY2FuIFNhbW9hXCIsXG4gICAgICAgICAgICBcIkFyaXpvbmFcIixcbiAgICAgICAgICAgIFwiQXJrYW5zYXNcIixcbiAgICAgICAgICAgIFwiQ2FsaWZvcm5pYVwiLFxuICAgICAgICAgICAgXCJDb2xvcmFkb1wiLFxuICAgICAgICAgICAgXCJDb25uZWN0aWN1dFwiLFxuICAgICAgICAgICAgXCJEZWxhd2FyZVwiLFxuICAgICAgICAgICAgXCJEaXN0cmljdCBPZiBDb2x1bWJpYVwiLFxuICAgICAgICAgICAgXCJGZWRlcmF0ZWQgU3RhdGVzIE9mIE1pY3JvbmVzaWFcIixcbiAgICAgICAgICAgIFwiRmxvcmlkYVwiLFxuICAgICAgICAgICAgXCJHZW9yZ2lhXCIsXG4gICAgICAgICAgICBcIkd1YW1cIixcbiAgICAgICAgICAgIFwiSGF3YWlpXCIsXG4gICAgICAgICAgICBcIklkYWhvXCIsXG4gICAgICAgICAgICBcIklsbGlub2lzXCIsXG4gICAgICAgICAgICBcIkluZGlhbmFcIixcbiAgICAgICAgICAgIFwiSW93YVwiLFxuICAgICAgICAgICAgXCJLYW5zYXNcIixcbiAgICAgICAgICAgIFwiS2VudHVja3lcIixcbiAgICAgICAgICAgIFwiTG91aXNpYW5hXCIsXG4gICAgICAgICAgICBcIk1haW5lXCIsXG4gICAgICAgICAgICBcIk1hcnNoYWxsIElzbGFuZHNcIixcbiAgICAgICAgICAgIFwiTWFyeWxhbmRcIixcbiAgICAgICAgICAgIFwiTWFzc2FjaHVzZXR0c1wiLFxuICAgICAgICAgICAgXCJNaWNoaWdhblwiLFxuICAgICAgICAgICAgXCJNaW5uZXNvdGFcIixcbiAgICAgICAgICAgIFwiTWlzc2lzc2lwcGlcIixcbiAgICAgICAgICAgIFwiTWlzc291cmlcIixcbiAgICAgICAgICAgIFwiTW9udGFuYVwiLFxuICAgICAgICAgICAgXCJOZWJyYXNrYVwiLFxuICAgICAgICAgICAgXCJOZXZhZGFcIixcbiAgICAgICAgICAgIFwiTmV3IEhhbXBzaGlyZVwiLFxuICAgICAgICAgICAgXCJOZXcgSmVyc2V5XCIsXG4gICAgICAgICAgICBcIk5ldyBNZXhpY29cIixcbiAgICAgICAgICAgIFwiTmV3IFlvcmtcIixcbiAgICAgICAgICAgIFwiTm9ydGggQ2Fyb2xpbmFcIixcbiAgICAgICAgICAgIFwiTm9ydGggRGFrb3RhXCIsXG4gICAgICAgICAgICBcIk5vcnRoZXJuIE1hcmlhbmEgSXNsYW5kc1wiLFxuICAgICAgICAgICAgXCJPaGlvXCIsXG4gICAgICAgICAgICBcIk9rbGFob21hXCIsXG4gICAgICAgICAgICBcIk9yZWdvblwiLFxuICAgICAgICAgICAgXCJQYWxhdVwiLFxuICAgICAgICAgICAgXCJQZW5uc3lsdmFuaWFcIixcbiAgICAgICAgICAgIFwiUHVlcnRvIFJpY29cIixcbiAgICAgICAgICAgIFwiUmhvZGUgSXNsYW5kXCIsXG4gICAgICAgICAgICBcIlNvdXRoIENhcm9saW5hXCIsXG4gICAgICAgICAgICBcIlNvdXRoIERha290YVwiLFxuICAgICAgICAgICAgXCJUZW5uZXNzZWVcIixcbiAgICAgICAgICAgIFwiVGV4YXNcIixcbiAgICAgICAgICAgIFwiVXRhaFwiLFxuICAgICAgICAgICAgXCJWZXJtb250XCIsXG4gICAgICAgICAgICBcIlZpcmdpbiBJc2xhbmRzXCIsXG4gICAgICAgICAgICBcIlZpcmdpbmlhXCIsXG4gICAgICAgICAgICBcIldhc2hpbmd0b25cIixcbiAgICAgICAgICAgIFwiV2VzdCBWaXJnaW5pYVwiLFxuICAgICAgICAgICAgXCJXaXNjb25zaW5cIixcbiAgICAgICAgICAgIFwiV3lvbWluZ1wiXG4gICAgICAgICAgXTtcblxuICAgICAgICAgICQoIFwiI3NlYXJjaF9maWx0ZXJcIiApLmF1dG9jb21wbGV0ZSh7XG4gICAgICAgICAgICBzb3VyY2U6IGF2YWlsYWJsZVRhZ3NcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgICQudWkuYXV0b2NvbXBsZXRlLnByb3RvdHlwZS5fcmVzaXplTWVudSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciB1bCA9IHRoaXMubWVudS5lbGVtZW50O1xuICAgICAgICAgICAgdWwub3V0ZXJXaWR0aCh0aGlzLmVsZW1lbnQub3V0ZXJXaWR0aCgpKTtcbiAgICAgICAgICB9O1xuXG5cbiAgICAgICAgICAvLyBTdGFydCBzZWFyY2ggZmlsdGVyIHdpdGggY2hlY2tib3hlc1xuXG4gICAgICAgICAgdmFyIGRhdGFNb2RlbCA9IFtcbiAgICAgICAgICAgIHt0ZXh0OiAnQWxhYmFtYScsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAge3RleHQ6ICdBbGFza2EnLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgIHt0ZXh0OiAnQW1lcmljYW4gU2Ftb2EnLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgIHt0ZXh0OiAnQXJpem9uYScsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAge3RleHQ6ICdBcmthbnNhcycsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAge3RleHQ6ICdDYWxpZm9ybmlhJywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICB7dGV4dDogJ0NvbG9yYWRvJywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICB7dGV4dDogJ0Nvbm5lY3RpY3V0JywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICB7dGV4dDogJ0RlbGF3YXJlJywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICB7dGV4dDogJ0Rpc3RyaWN0IE9mIENvbHVtYmlhJywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICB7dGV4dDogJ0ZlZGVyYXRlZCBTdGF0ZXMgT2YgTWljcm9uZXNpYScsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAge3RleHQ6ICdGbG9yaWRhJywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICB7dGV4dDogJ0dlb3JnaWEnLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgIHt0ZXh0OiAnR3VhbScsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAge3RleHQ6ICdIYXdhaWknLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgIHt0ZXh0OiAnSWRhaG8nLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgIHt0ZXh0OiAnSWxsaW5vaXMnLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgIHt0ZXh0OiAnSW5kaWFuYScsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAge3RleHQ6ICdJb3dhJywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICB7dGV4dDogJ0thbnNhcycsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAge3RleHQ6ICdLZW50dWNreScsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAge3RleHQ6ICdMb3Vpc2lhbmEnLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgIHt0ZXh0OiAnTWFpbmUnLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgIHt0ZXh0OiAnTWFyc2hhbGwgSXNsYW5kcycsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAge3RleHQ6ICdNYXJ5bGFuZCcsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAge3RleHQ6ICdNYXNzYWNodXNldHRzJywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICB7dGV4dDogJ01pY2hpZ2FuJywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICB7dGV4dDogJ01pbm5lc290YScsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAge3RleHQ6ICdNaXNzaXNzaXBwaScsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAge3RleHQ6ICdNaXNzb3VyaScsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAge3RleHQ6ICdNb250YW5hJywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICB7dGV4dDogJ05lYnJhc2thJywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICB7dGV4dDogJ05ldmFkYScsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAge3RleHQ6ICdOZXcgSGFtcHNoaXJlJywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICB7dGV4dDogJ05ldyBKZXJzZXknLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgIHt0ZXh0OiAnTmV3IE1leGljbycsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAge3RleHQ6ICdOZXcgWW9yaycsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAge3RleHQ6ICdOb3J0aCBDYXJvbGluYScsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAge3RleHQ6ICdOb3J0aCBEYWtvdGEnLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgIHt0ZXh0OiAnTm9ydGhlcm4gTWFyaWFuYSBJc2xhbmRzJywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICB7dGV4dDogJ09oaW8nLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgIHt0ZXh0OiAnT2tsYWhvbWEnLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgIHt0ZXh0OiAnT3JlZ29uJywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICB7dGV4dDogJ1BhbGF1JywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICB7dGV4dDogJ1Blbm5zeWx2YW5pYScsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAge3RleHQ6ICdQdWVydG8gUmljbycsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAge3RleHQ6ICdSaG9kZSBJc2xhbmQnLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgIHt0ZXh0OiAnU291dGggQ2Fyb2xpbmEnLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgIHt0ZXh0OiAnU291dGggRGFrb3RhJywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICB7dGV4dDogJ1Rlbm5lc3NlZScsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAge3RleHQ6ICdUZXhhcycsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAge3RleHQ6ICdVdGFoJywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICB7dGV4dDogJ1Zlcm1vbnQnLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgIHt0ZXh0OiAnVmlyZ2luIElzbGFuZHMnLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgIHt0ZXh0OiAnVmlyZ2luaWEnLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgIHt0ZXh0OiAnV2FzaGluZ3RvbicsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAge3RleHQ6ICdXZXN0IFZpcmdpbmlhJywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICB7dGV4dDogJ1dpc2NvbnNpbicsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAge3RleHQ6ICdXeW9taW5nJywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICB7dGV4dDogJycsIHZhbHVlOiAnJ31cbiAgICAgICAgICBdO1xuXG4gICAgICAgICAgZnVuY3Rpb24gc2VsQ2hhbmdlKCl7XG4gICAgICAgICAgICB2YXIgc2VsZWN0aW9uID0gJCgnI215Q2hlY2tMaXN0JykuY2hlY2tMaXN0KCdnZXRTZWxlY3Rpb24nKTtcblxuICAgICAgICAgICAgJCgnI3NlbGVjdGVkSXRlbXMnKS50ZXh0KEpTT04uc3RyaW5naWZ5KHNlbGVjdGlvbikpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmICh0eXBlb2YoalF1ZXJ5LnVpLmNoZWNrTGlzdCkgIT0gJ3VuZGVmaW5lZCcpe1xuICAgICAgICAgICAgJCgnI2ZpbHRlckxpc3QnKS5jaGVja0xpc3Qoe1xuICAgICAgICAgICAgICBsaXN0SXRlbXM6IGRhdGFNb2RlbCxcbiAgICAgICAgICAgICAgb25DaGFuZ2U6IHNlbENoYW5nZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgJCgnW3R5cGU9Y2hlY2tib3hdJykuY2hlY2tib3hyYWRpbygpO1xuICAgICAgICAgICQoJ1t0eXBlPXJhZGlvXScpLmNoZWNrYm94cmFkaW8oKS5idXR0b25zZXQoKS5maW5kKCdsYWJlbCcpLmNzcygnd2lkdGgnLCAnMTkuNCUnKTtcblxuICAgICAgICAgICQoJy50ZXh0YXJlYScpLmtleXVwKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgY291bnRfcmVtYWluaW5nX2NoYXJhY3RlcigpO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgLy8gUmFuZ2UgRmllbGRcbiAgICAgICAgICB2YXIgbGVnZW5kID0gJCgnLmFtYV9fcmFuZ2UtZmllbGRfX2xlZ2VuZCcpO1xuICAgICAgICAgIHZhciBoYW5kbGUgPSAkKCBcIiNjdXJyZW50VmFsdWVcIiApO1xuXG4gICAgICAgICAgJChcIi5hbWFfX3JhbmdlLWZpZWxkXCIpLnNsaWRlcih7XG4gICAgICAgICAgICBhbmltYXRlOiB0cnVlLFxuICAgICAgICAgICAgcmFuZ2U6ICdtaW4nLFxuICAgICAgICAgICAgdmFsdWU6IDEsXG4gICAgICAgICAgICBtaW46IDIwMDAsXG4gICAgICAgICAgICBtYXg6IDUwMDAsXG4gICAgICAgICAgICBzdGVwOiAxLFxuICAgICAgICAgICAgY3JlYXRlOiBmdW5jdGlvbigpe1xuICAgICAgICAgICAgICB2YXIgaGFuZGxlID0galF1ZXJ5KHRoaXMpLmZpbmQoJy51aS1zbGlkZXItaGFuZGxlJyk7XG4gICAgICAgICAgICAgIHZhciBidWJibGUgPSBqUXVlcnkoJzxkaXYgY2xhc3M9XCJhbWFfX3JhbmdlLWZpZWxkX192YWx1ZWJveFwiPjwvZGl2PicpO1xuICAgICAgICAgICAgICBoYW5kbGUuYXBwZW5kKGJ1YmJsZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2xpZGU6IGZ1bmN0aW9uKGV2dCwgdWkpIHtcbiAgICAgICAgICAgICAgdWkuaGFuZGxlLmNoaWxkTm9kZXNbMF0uaW5uZXJIVE1MID0gJyQnICsgdWkudmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSkuYXBwZW5kKGxlZ2VuZCk7XG5cbiAgICAgICAgICAvLyBGb3JtIGFjY29yZGlvblxuICAgICAgICAgICQoIFwiLnRhYmxpc3RcIiApLmFjY29yZGlvbih7XG4gICAgICAgICAgICBoZWFkZXI6IFwiLmFtYV9fZm9ybS1zdGVwc19fc3RlcFwiLFxuICAgICAgICAgICAgaGVpZ2h0U3R5bGU6IFwiY29udGVudFwiXG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICAvLyBFeHBhbmQgbGlzdFxuICAgICAgICAgICQoIFwiLmFtYV9fZXhwYW5kLWxpc3RcIiApLmFjY29yZGlvbih7XG4gICAgICAgICAgICBtdWx0aXBsZTogdHJ1ZSxcbiAgICAgICAgICAgIGljb25zOiBmYWxzZSxcbiAgICAgICAgICAgIGhlaWdodFN0eWxlOiBcImNvbnRlbnRcIixcbiAgICAgICAgICAgIGNvbGxhcHNpYmxlOiB0cnVlLFxuICAgICAgICAgICAgYWN0aXZlOiBmYWxzZSxcbiAgICAgICAgICAgIGFuaW1hdGU6IDUwMCxcbiAgICAgICAgICAgIGFjdGl2YXRlIDogZnVuY3Rpb24gKGV2ZW50LCB1aSlcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgaWYoJCh1aS5uZXdQYW5lbCkuaGFzQ2xhc3MoJ3VpLWFjY29yZGlvbi1jb250ZW50LWFjdGl2ZScpKSB7XG4gICAgICAgICAgICAgICAgJCh1aS5uZXdQYW5lbCkucHJldigpLmFkZENsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAkKHVpLm9sZFBhbmVsKS5wcmV2KCkucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICAvLyBDb2xsYXBzZSBhbGwgYWNjb3JkaW9uIHBhbmVsc1xuICAgICAgICAgICQoJy5hbWFfX2ZpbHRlcl9fY29sbGFwc2UtcGFuZWxzIGJ1dHRvbicpLmNsaWNrKGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAkKCcuYW1hX19leHBhbmQtbGlzdCAudWktYWNjb3JkaW9uLWhlYWRlcicpLmVhY2goIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICBpZigkKHRoaXMpLmhhc0NsYXNzKCd1aS1zdGF0ZS1hY3RpdmUnKSB8fCAkKHRoaXMpLmhhc0NsYXNzKCdhY3RpdmUnKSkge1xuICAgICAgICAgICAgICAgICQodGhpcykuY2xpY2soKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICAvLyBPcGVuIGFjY29yZGlvbiBwYW5lbHMgZm9yIG1vYmlsZVxuICAgICAgICAgICQoJy5hbWFfX2FwcGxpZWQtZmlsdGVyc19fc2hvdy1maWx0ZXJzJykuY2xpY2soZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICQoJy5hbWFfX2V4cGFuZC1saXN0LCAuYW1hX19hcHBsaWVkLWZpbHRlcnNfX3RhZ3MnKS5zbGlkZURvd24oKTtcbiAgICAgICAgICAgICQoJy5hbWFfX2ZpbHRlcl9fc2VlLXJlc3VsdHMnKS5mYWRlSW4oKTtcbiAgICAgICAgICAgICQodGhpcykuZmFkZU91dCgpO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgLy8gQ2xvc2UgYWNjb3JkaW9uIHBhbmVsc1xuICAgICAgICAgICQoJy5hbWFfX2ZpbHRlcl9fc2VlLXJlc3VsdHMnKS5jbGljayhmdW5jdGlvbigpe1xuICAgICAgICAgICAgJCgnLmFtYV9fZXhwYW5kLWxpc3QsIC5hbWFfX2FwcGxpZWQtZmlsdGVyc19fdGFncycpLnNsaWRlVXAoKTtcbiAgICAgICAgICAgICQoJy5hbWFfX2FwcGxpZWQtZmlsdGVyc19fc2hvdy1maWx0ZXJzJykuZmFkZUluKCk7XG4gICAgICAgICAgICAkKHRoaXMpLmZhZGVPdXQoKTtcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIC8vIHNlYXJjaCBmaWx0ZXJcbiAgICAgICAgICBmdW5jdGlvbiBsaXN0RmlsdGVyKGlucHV0LCBsaXN0KSB7IC8vIGhlYWRlciBpcyBhbnkgZWxlbWVudCwgbGlzdCBpcyBhbiB1bm9yZGVyZWQgbGlzdFxuICAgICAgICAgICAgLy8gY3VzdG9tIGNzcyBleHByZXNzaW9uIGZvciBhIGNhc2UtaW5zZW5zaXRpdmUgY29udGFpbnMoKVxuICAgICAgICAgICAgalF1ZXJ5LmV4cHJbJzonXS5Db250YWlucyA9IGZ1bmN0aW9uKGEsaSxtKXtcbiAgICAgICAgICAgICAgcmV0dXJuIChhLnRleHRDb250ZW50IHx8IGEuaW5uZXJUZXh0IHx8IFwiXCIpLnRvVXBwZXJDYXNlKCkuaW5kZXhPZihtWzNdLnRvVXBwZXJDYXNlKCkpPj0wO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgJChpbnB1dCkuY2hhbmdlKCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgIHZhciBmaWx0ZXIgPSAkKHRoaXMpLnZhbCgpO1xuICAgICAgICAgICAgICBpZihmaWx0ZXIpIHtcbiAgICAgICAgICAgICAgICAvLyB0aGlzIGZpbmRzIGFsbCBsaW5rcyBpbiBhIGxpc3QgdGhhdCBjb250YWluIHRoZSBpbnB1dCxcbiAgICAgICAgICAgICAgICAvLyBhbmQgaGlkZSB0aGUgb25lcyBub3QgY29udGFpbmluZyB0aGUgaW5wdXQgd2hpbGUgc2hvd2luZyB0aGUgb25lcyB0aGF0IGRvXG4gICAgICAgICAgICAgICAgJChsaXN0KS5maW5kKFwic3Bhbjpub3QoOkNvbnRhaW5zKFwiICsgZmlsdGVyICsgXCIpKVwiKS5wYXJlbnQoKS5oaWRlKCk7XG4gICAgICAgICAgICAgICAgJChsaXN0KS5maW5kKFwic3BhbjpDb250YWlucyhcIiArIGZpbHRlciArIFwiKVwiKS5wYXJlbnQoKS5zaG93KCk7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgJChsaXN0KS5maW5kKFwibGFiZWxcIikuc2hvdygpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgLy8gb25seSBzaG93IHJlc3VsdHMgYWZ0ZXIgMyBjaGFyYWN0ZXJzIGFyZSBlbnRlcmVkXG4gICAgICAgICAgICB9KS5rZXl1cCggZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIGlmKCB0aGlzLnZhbHVlLmxlbmd0aCA8IDQgKSByZXR1cm47XG4gICAgICAgICAgICAgICQodGhpcykuY2hhbmdlKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBsaXN0RmlsdGVyKCQoXCIjYW1hX19zZWFyY2hfX2xvY2F0aW9uXCIpLCAkKFwiLmFtYV9fZm9ybS1ncm91cFwiKSk7XG5cbiAgICAgICAgfSk7XG4gICAgICB9KShqUXVlcnkpO1xuICAgIH1cbiAgfTtcbn0pKGpRdWVyeSwgRHJ1cGFsKTtcbiIsIi8qKlxuICogQGZpbGVcbiAqIFJpYmJvbiBuYXYgdXNlciBpbnRlcmFjdGlvbnMuXG4gKlxuICogSmF2YVNjcmlwdCBzaG91bGQgYmUgbWFkZSBjb21wYXRpYmxlIHdpdGggbGlicmFyaWVzIG90aGVyIHRoYW4galF1ZXJ5IGJ5XG4gKiB3cmFwcGluZyBpdCB3aXRoIGFuIFwiYW5vbnltb3VzIGNsb3N1cmVcIi4gU2VlOlxuICogLSBodHRwczovL2RydXBhbC5vcmcvbm9kZS8xNDQ2NDIwXG4gKiAtIGh0dHA6Ly93d3cuYWRlcXVhdGVseWdvb2QuY29tLzIwMTAvMy9KYXZhU2NyaXB0LU1vZHVsZS1QYXR0ZXJuLUluLURlcHRoXG4gKi9cbihmdW5jdGlvbiAoJCwgRHJ1cGFsKSB7XG5cbiAgRHJ1cGFsLmJlaGF2aW9ycy5yaWJib25uYXYgPSB7XG4gICAgYXR0YWNoOiBmdW5jdGlvbiAoY29udGV4dCwgc2V0dGluZ3MpIHtcblxuICAgICAgJCgnLmFtYV9fcmliYm9uX19kcm9wZG93bicpLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgY2xhc3NfYWN0aXZlID0gJ2lzLWFjdGl2ZSc7XG5cbiAgICAgICAgJCgnLmFtYV9fcmliYm9uX19kcm9wZG93bl9fdHJpZ2dlcicsIHRoaXMpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgIC8vIFVuZm9jdXMgb24gdGhlIGRyb3Bkb3duLlxuICAgICAgICAgICQodGhpcykuYmx1cigpO1xuICAgICAgICAgIC8vIEFkZCBvdXIgY2xhc3MgZm9yIENTUy5cbiAgICAgICAgICAkKHRoaXMpLnRvZ2dsZUNsYXNzKGNsYXNzX2FjdGl2ZSk7XG4gICAgICAgICAgLy8gQWRkIG91ciBjbGFzcyB0byB0aGUgZHJvcGRvd24gVUwuXG4gICAgICAgICAgJCh0aGlzKS5jaGlsZHJlbigpLnRvZ2dsZUNsYXNzKGNsYXNzX2FjdGl2ZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICQoZG9jdW1lbnQpLmNsaWNrKCBmdW5jdGlvbigpe1xuICAgICAgICAgICQoJy5hbWFfX3JpYmJvbl9fZHJvcGRvd25fX3RyaWdnZXInLCB0aGlzKS5yZW1vdmVDbGFzcyhjbGFzc19hY3RpdmUpLmNoaWxkcmVuKCkucmVtb3ZlQ2xhc3MoY2xhc3NfYWN0aXZlKVxuICAgICAgICB9KTtcbiAgICAgIH0pXG4gICAgfVxuICB9XG59KShqUXVlcnksIERydXBhbCk7XG4iLCIvKipcbiAqIEBmaWxlXG4gKiBTdWJjYXRlZ29yeVxuICpcbiAqIEphdmFTY3JpcHQgc2hvdWxkIGJlIG1hZGUgY29tcGF0aWJsZSB3aXRoIGxpYnJhcmllcyBvdGhlciB0aGFuIGpRdWVyeSBieVxuICogd3JhcHBpbmcgaXQgd2l0aCBhbiBcImFub255bW91cyBjbG9zdXJlXCIuIFNlZTpcbiAqIC0gaHR0cHM6Ly9kcnVwYWwub3JnL25vZGUvMTQ0NjQyMFxuICogLSBodHRwOi8vd3d3LmFkZXF1YXRlbHlnb29kLmNvbS8yMDEwLzMvSmF2YVNjcmlwdC1Nb2R1bGUtUGF0dGVybi1Jbi1EZXB0aFxuICovXG4oZnVuY3Rpb24gKCQsIERydXBhbCkge1xuICBEcnVwYWwuYmVoYXZpb3JzLnN1YmNhdGVnb3JpZXMgPSB7XG4gICAgYXR0YWNoOiBmdW5jdGlvbihjb250ZXh0LCBzZXR0aW5ncykge1xuXG4gICAgICBmdW5jdGlvbiBjaGVja1NpemUoKXtcbiAgICAgICAgdmFyIHN1YmNhdGVnb3J5V3JhcHBlciA9ICQoJy5hbWFfX3N1YmNhdGVnb3J5LWV4cGxvcmF0aW9uLXdpdGgtaW1hZ2VzJykub3V0ZXJXaWR0aCgpO1xuICAgICAgICB2YXIgc3ViY2F0ZWdvcnlUaXRsZSA9ICQoJy5hbWFfX3N1YmNhdGVnb3J5LWV4cGxvcmF0aW9uLXdpdGgtaW1hZ2VzX190aXRsZScpLm91dGVyV2lkdGgoKTtcbiAgICAgICAgc3ViY2F0ZWdvcnkgPSAkKCcuYW1hX19zdWJjYXRlZ29yeS1leHBsb3JhdGlvbl9fc3ViY2F0ZWdvcnknKTtcbiAgICAgICAgc3ViY2F0ZWdvcnkuaGlkZSgpO1xuXG4gICAgICAgIGlmIChzdWJjYXRlZ29yeVdyYXBwZXIgPiAwICYmIHN1YmNhdGVnb3J5V3JhcHBlciA8IDI5MCAmJiBzdWJjYXRlZ29yeVRpdGxlID4gMjAwICkge1xuICAgICAgICAgIHN1YmNhdGVnb3J5LnNsaWNlKDAsIDIpLmNzcygnZGlzcGxheScsICdibG9jaycpO1xuICAgICAgICB9IGVsc2UgaWYgKHN1YmNhdGVnb3J5V3JhcHBlciA+IDI5MCAmJiBzdWJjYXRlZ29yeVdyYXBwZXIgPCA2MDAgJiYgc3ViY2F0ZWdvcnlUaXRsZSA+IDIwMCApIHtcbiAgICAgICAgICBzdWJjYXRlZ29yeS5zbGljZSgwLCAzKS5jc3MoJ2Rpc3BsYXknLCAnYmxvY2snKTtcbiAgICAgICAgfSBlbHNlIGlmICgoc3ViY2F0ZWdvcnlXcmFwcGVyID4gMzAwICYmIHN1YmNhdGVnb3J5V3JhcHBlciA8IDcwMCkgJiYgc3ViY2F0ZWdvcnlUaXRsZSA8IDIwMCkge1xuICAgICAgICAgIHN1YmNhdGVnb3J5LnNsaWNlKDAsIDIpLmNzcygnZGlzcGxheScsICdibG9jaycpO1xuICAgICAgICB9IGVsc2UgaWYgKChzdWJjYXRlZ29yeVdyYXBwZXIgPiA3MDAgJiYgc3ViY2F0ZWdvcnlXcmFwcGVyIDwgMTAwMCkgJiYgc3ViY2F0ZWdvcnlUaXRsZSA8IDIwMCkge1xuICAgICAgICAgIHN1YmNhdGVnb3J5LnNsaWNlKDAsIDMpLmNzcygnZGlzcGxheScsICdibG9jaycpO1xuICAgICAgICB9IGVsc2UgaWYgKChzdWJjYXRlZ29yeVdyYXBwZXIgPiAxMDAwICYmIHN1YmNhdGVnb3J5V3JhcHBlciA8IDEyMDApICYmIHN1YmNhdGVnb3J5VGl0bGUgPCAyMDApIHtcbiAgICAgICAgICBzdWJjYXRlZ29yeS5zbGljZSgwLCA0KS5jc3MoJ2Rpc3BsYXknLCAnYmxvY2snKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzdWJjYXRlZ29yeS5zbGljZSgwLCA1KS5jc3MoJ2Rpc3BsYXknLCAnYmxvY2snKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiB2aWV3TW9yZSgpIHtcbiAgICAgICAgJCgnLmFtYV9fc3ViY2F0ZWdvcnktZXhwbG9yYXRpb24td2l0aC1pbWFnZXNfX3ZpZXctbGVzcycpLmhpZGUoKTtcbiAgICAgICAgJCgnLmFtYV9fc3ViY2F0ZWdvcnktZXhwbG9yYXRpb24td2l0aC1pbWFnZXNfX3ZpZXctYWxsJykuc2hvdygpO1xuXG4gICAgICAgICQoJy52aWV3QWxsJykuY2xpY2soZnVuY3Rpb24oZSkge1xuICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICBzdWJjYXRlZ29yeS5mYWRlSW4oKTtcbiAgICAgICAgICAkKCcuYW1hX19zdWJjYXRlZ29yeS1leHBsb3JhdGlvbi13aXRoLWltYWdlc19fdmlldy1hbGwnKS5oaWRlKCk7XG4gICAgICAgICAgJCgnLmFtYV9fc3ViY2F0ZWdvcnktZXhwbG9yYXRpb24td2l0aC1pbWFnZXNfX3ZpZXctbGVzcycpLnNob3coKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJCgnLnZpZXdMZXNzJykuY2xpY2soZnVuY3Rpb24oZSkge1xuICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICBzdWJjYXRlZ29yeS5oaWRlKCk7XG4gICAgICAgICAgY2hlY2tTaXplKCk7XG4gICAgICAgICAgJCgnLmFtYV9fc3ViY2F0ZWdvcnktZXhwbG9yYXRpb24td2l0aC1pbWFnZXNfX3ZpZXctbGVzcycpLmhpZGUoKTtcbiAgICAgICAgICAkKCcuYW1hX19zdWJjYXRlZ29yeS1leHBsb3JhdGlvbi13aXRoLWltYWdlc19fdmlldy1hbGwnKS5zaG93KCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICAvLyBydW4gdGVzdCBvbiBpbml0aWFsIHBhZ2UgbG9hZFxuICAgICAgY2hlY2tTaXplKCk7XG4gICAgICB2aWV3TW9yZSgpO1xuXG4gICAgICAvLyBydW4gdGVzdCBvbiByZXNpemUgb2YgdGhlIHdpbmRvd1xuICAgICAgJCggd2luZG93ICkucmVzaXplKGZ1bmN0aW9uKCkge1xuICAgICAgICBjaGVja1NpemUoKTtcbiAgICAgICAgdmlld01vcmUoKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcbn0pKGpRdWVyeSwgRHJ1cGFsKTtcbiIsIi8qKlxuICogQGZpbGVcbiAqIEludGVyYWN0aW9ucyBmb3Igd2F5ZmluZGVyLlxuICpcbiAqIEphdmFTY3JpcHQgc2hvdWxkIGJlIG1hZGUgY29tcGF0aWJsZSB3aXRoIGxpYnJhcmllcyBvdGhlciB0aGFuIGpRdWVyeSBieVxuICogd3JhcHBpbmcgaXQgd2l0aCBhbiBcImFub255bW91cyBjbG9zdXJlXCIuIFNlZTpcbiAqIC0gaHR0cHM6Ly9kcnVwYWwub3JnL25vZGUvMTQ0NjQyMFxuICogLSBodHRwOi8vd3d3LmFkZXF1YXRlbHlnb29kLmNvbS8yMDEwLzMvSmF2YVNjcmlwdC1Nb2R1bGUtUGF0dGVybi1Jbi1EZXB0aFxuICovXG4oZnVuY3Rpb24gKCQsIERydXBhbCkge1xuICBEcnVwYWwuYmVoYXZpb3JzLndheWZpbmRlciA9IHtcbiAgICBhdHRhY2g6IGZ1bmN0aW9uIChjb250ZXh0LCBzZXR0aW5ncykge1xuICAgICAgKGZ1bmN0aW9uICgkKSB7XG4gICAgICAgIGlmKCQuY29va2llKCdhbWFfd2F5ZmluZGVyX2Nvb2tpZScpKSB7XG4gICAgICAgICAgJC5jb29raWUuanNvbiA9IHRydWU7XG4gICAgICAgICAgLy8gUmVhZCB3YXlmaW5kZXIgY29va2llcyBzZXQgZnJvbSBhbWEtYXNzbiBkb21haW5zXG4gICAgICAgICAgdmFyIGFtYV93YXlmaW5kZXJfY29va2llID0gJC5jb29raWUoJ2FtYV93YXlmaW5kZXJfY29va2llJyk7XG4gICAgICAgICAgaWYgKHR5cGVvZiBhbWFfd2F5ZmluZGVyX2Nvb2tpZSAhPT0gJ3VuZGVmaW5lZCcgfHwgJCgnLnJlZmVycmVkJykubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgJCgnLmFtYV9fd2F5ZmluZGVyLS1yZWZlcnJlciBhJykuZmFkZUluKCkuY3NzKCdkaXNwbGF5JywgJ2ZsZXgnKTtcbiAgICAgICAgICAgICQoJy5hbWFfX3dheWZpbmRlci0tcmVmZXJyZXIgYScpLmF0dHIoXCJocmVmXCIsIGFtYV93YXlmaW5kZXJfY29va2llWzFdKTtcbiAgICAgICAgICAgICQoJy5hbWFfX3dheWZpbmRlci0tcmVmZXJyZXIgYScpLnRleHQoYW1hX3dheWZpbmRlcl9jb29raWVbMF0pO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAkKCcuYW1hX3dheWZpbmRlcl9yZWZlcnJlci0tbGluay1iYWNrJykuZmFkZU91dCgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSkoalF1ZXJ5KTtcbiAgICB9XG4gIH07XG59KShqUXVlcnksIERydXBhbCk7XG4iLCIvKj09PT09PSBqUXVlcnkgVUkgdGFicyA9PT09PT0qL1xuXG5cbihmdW5jdGlvbiAoJCwgRHJ1cGFsKSB7XG4gIERydXBhbC5iZWhhdmlvcnMuYW1hX3RhYnMgPSB7XG4gICAgYXR0YWNoOiBmdW5jdGlvbiAoY29udGV4dCwgc2V0dGluZ3MpIHtcbiAgICAgIHZhciBkZWZhdWx0QWN0aXZlVGFiID0gMDtcbiAgICAgIHZhciB2aWV3cG9ydFdpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XG4gICAgICB2YXIgbGFzdEhhc2ggPSBudWxsO1xuICAgICAgaWYgKHZpZXdwb3J0V2lkdGggPj0gNjAwICYmICQoJy5hbWFfX3Jlc291cmNlLXRhYnMnKS5sZW5ndGggPiAwKSB7XG4gICAgICAgIGRlZmF1bHRBY3RpdmVUYWIgPSAxO1xuICAgICAgfVxuXG4gICAgICAkKFwiLmFtYV9fdGFic1wiKS50YWJzKHtcbiAgICAgICAgYWN0aXZlOiBkZWZhdWx0QWN0aXZlVGFiXG4gICAgICB9KTtcblxuICAgICAgLy9SZXNvdXJjZSBwYWdlIHNwZWNpZmljIHRhZ3NcbiAgICAgICQoXCIuYW1hX19yZXNvdXJjZS10YWJzXCIpLnRhYnMoe1xuICAgICAgICBhY3RpdmU6IGRlZmF1bHRBY3RpdmVUYWIsXG4gICAgICAgIGNyZWF0ZTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHZhciB3aWRnZXQgPSAkKHRoaXMpLmRhdGEoJ3VpLXRhYnMnKTtcbiAgICAgICAgICAkKHdpbmRvdykub24oJ2hhc2hjaGFuZ2UnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB3aWRnZXQub3B0aW9uKCdhY3RpdmUnLCB3aWRnZXQuX2dldEluZGV4KGxvY2F0aW9uLmhhc2gpKTtcbiAgICAgICAgICAgIGxhc3RIYXNoID0gbG9jYXRpb24uaGFzaDtcblxuICAgICAgICAgICAgLy8gU2Nyb2xsIHRvIHRvcCBvZiB1aSB0YWJzIG5hdmlnYXRpb25cbiAgICAgICAgICAgIHNtb290aFNjcm9sbCgkKHdpZGdldC5lbGVtZW50KSwgJCh3aWRnZXQuYWN0aXZlWzBdKSk7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICAvLyBQcmV2ZW50IGp1bXAgb25jbGlja1xuICAgICAgJCgnLnVpLXRhYnMtYW5jaG9yJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgLy8gU3RvcmUgd2luZG93IHkgbG9jYXRpb24gc28gd2UgY2FuIHJlc3RvcmUgYWZ0ZXIgY2hhbmdpbmcgdGhlIGhhc2hcbiAgICAgICAgLy8gd2hpY2ggd291bGQgb3RoZXJ3aXNlIGNhdXNlIHRoZSB3aW5kb3cgdG8ganVtcCBkb3duLlxuICAgICAgICB2YXIgd2luZG93U2Nyb2xsWSA9IHdpbmRvdy5zY3JvbGxZO1xuICAgICAgICAvLyBVcGRhdGUgd2luZG93IGhhc2ggbG9jYXRpb24sIGFuZCByZXN0b3JlIHRvIHByZXZpb3VzIHktcG9zaXRpb24uXG4gICAgICAgIC8vIFVzZSBjdXJyZW50VGFyZ2V0IGJlY2F1c2UgdGFyZ2V0IGlzIHNvbWV0aW1lcyB0aGUgaWNvbiBkaXYuXG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbi5oYXNoID0gZS5jdXJyZW50VGFyZ2V0Lmhhc2g7XG4gICAgICAgIHdpbmRvdy5zY3JvbGwoe3RvcDogd2luZG93U2Nyb2xsWX0pO1xuICAgICAgfSk7XG5cbiAgICAgIC8vIFNjcm9sbCB0byB3aGVuIHRoZXJlIGlzIG5vIGhhcyBjaGFuZ2Ugb24gcmVzb3VyY2UgcGFnZSB0YWIgbGlua3NcbiAgICAgICQoJy5hbWFfX19fcGFnZS0tcmVzb3VyY2VzX19wYWdlLWNvbnRlbnQgYVtocmVmXj1cIiNcIl0nKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICBpZiAobGFzdEhhc2ggPT0gd2luZG93LmxvY2F0aW9uLmhhc2gpIHtcbiAgICAgICAgICB2YXIgaGFzaCA9IHdpbmRvdy5sb2NhdGlvbi5oYXNoO1xuICAgICAgICAgIHNtb290aFNjcm9sbCgkKCcuYW1hX19yZXNvdXJjZS10YWJzX19uYXYnKSwgJCgnLmFtYV9fcmVzb3VyY2UtdGFic19fbmF2IGFbaHJlZj1cIicgKyBoYXNoICsgJ1wiXScpKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIC8vU2ltdWxhdGUgY2xpY2sgZXZlbnQgb24gYWN0dWFsIHNpbXBsZVRhYnMgdGFiIGZyb20gbW9iaWxlIGRyb3AgZG93bi5cbiAgICAgICQoJy5hbWFfX3RhYnMtbmF2aWdhdGlvbi0tbW9iaWxlIHNlbGVjdCcpLm9uKFwic2VsZWN0bWVudWNoYW5nZVwiLCBmdW5jdGlvbiAoZXZlbnQsIHVpKSB7XG4gICAgICAgIHZhciBzZWxlY3RlZFZhbHVlID0gdWkuaXRlbS52YWx1ZTtcbiAgICAgICAgJCgnYVtocmVmPVwiIycgKyBzZWxlY3RlZFZhbHVlICsgJ1wiXScpLmNsaWNrKCk7XG4gICAgICB9KTtcblxuICAgICAgLypcbiAgICAgICAqIFRoaXMgZnVuY3Rpb24gYW5pbWF0ZXMgdGhlIGJyb3dzZXIgc2Nyb2xsIGFjdGlvbiB3aXRoIGF0dGVudGlvbiB0byBrZXlib2FyZCBvbmx5IGFjY2Vzc2liaWxpdHkgY29uY2VybnNcbiAgICAgICAqXG4gICAgICAgKiBAcGFyYW0ge2pRdWVyeSBPYmplY3RdICR0YWJOYXZcbiAgICAgICAqIEBwYXJhbSB7alF1ZXJ5IE9iamVjdF0gJHRhcmdldFxuICAgICAgICovXG4gICAgICBmdW5jdGlvbiBzbW9vdGhTY3JvbGwoJHRhYk5hdiwgJHRhcmdldCkge1xuICAgICAgICB2YXIgbmF2Q29vcmRzID0gJHRhYk5hdlswXS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgJCgnaHRtbCxib2R5JykuYW5pbWF0ZSh7XG4gICAgICAgICAgc2Nyb2xsVG9wOiB3aW5kb3cuc2Nyb2xsWSArIG5hdkNvb3Jkcy50b3BcbiAgICAgICAgfSwgODUwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgLy8gdXBkYXRlIGZvY3VzIGZvciBrZXlib2FyZCBvbmx5IG5hdmlnYXRpb25cbiAgICAgICAgICAkdGFyZ2V0LmF0dHIoJ3RhYmluZGV4JywgJy0xJyk7XG4gICAgICAgICAgJHRhcmdldC5mb2N1cygpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG59KShqUXVlcnksIERydXBhbCk7XG4iLCIvKj09PT09PSBqUXVlcnkgVUkgYWNjb3JkaW9uID09PT09PSovXG5cbihmdW5jdGlvbigkKSB7XG4gICAgJCggXCIuYW1hX19hY2NvcmRpb25cIiApLmFjY29yZGlvbih7XG4gICAgICAgIGhlaWdodFN0eWxlOiBcImNvbnRlbnRcIixcbiAgICAgICAgY29sbGFwc2libGU6IHRydWUsXG4gICAgICAgIGFjdGl2ZTogZmFsc2VcbiAgICB9KTtcbn0pKGpRdWVyeSk7XG4iLCIoZnVuY3Rpb24gKCQsIERydXBhbCkge1xuICB2YXIgdmVyaWZ5RmllbGRzID0gZnVuY3Rpb24oZm9ybSkge1xuICAgIHZhciAkc2VjdGlvbnMgPSBmb3JtLmZpbmQoJ3NlY3Rpb24nKTtcbiAgICB2YXIgJGlucHV0cyA9ICQoJy53ZWJmb3JtLXN1Ym1pc3Npb24tZm9ybSBzZWN0aW9uIConKS5maWx0ZXIoJzppbnB1dCcpO1xuICAgIHZhciAkaWNvbkVsZW1lbnQgPSAkKCcuYW1hX19mb3JtLXN0ZXBzX19pY29uJyk7XG4gICAgdmFyIGVycm9yU2VjdGlvbnMgPSBbXTtcblxuICAgICRpbnB1dHMuZWFjaChmdW5jdGlvbihpLCBpbnB1dCkge1xuICAgICAgJGNsb3Nlc3RTZWN0aW9uID0gJCh0aGlzKS5jbG9zZXN0KCdzZWN0aW9uJykuYXR0cignZGF0YS1kcnVwYWwtc2VsZWN0b3InKS50b1N0cmluZygpO1xuICAgICAgaWYgKCQodGhpcykucHJvcCgncmVxdWlyZWQnKSAmJiAkKHRoaXMpLmhhc0NsYXNzKCdlcnJvcicpKSB7XG4gICAgICAgIGVycm9yU2VjdGlvbnMucHVzaCgkY2xvc2VzdFNlY3Rpb24pO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgJHNlY3Rpb25zLmVhY2goZnVuY3Rpb24oaSwgc2VjdGlvbikge1xuICAgICAgaWYgKCQuaW5BcnJheSgkKHRoaXMpLmF0dHIoJ2RhdGEtZHJ1cGFsLXNlbGVjdG9yJykudHJpbSgpLnRvU3RyaW5nKCksIGVycm9yU2VjdGlvbnMpICE9PSAtMSkge1xuICAgICAgICAkKHRoaXMpLmZpbmQoJGljb25FbGVtZW50KS5yZW1vdmVDbGFzcygnZWRpdCBlcnJvciBjb21wbGV0ZWQnKS5hZGRDbGFzcygnZXJyb3InKTtcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICAkKHRoaXMpLmZpbmQoJGljb25FbGVtZW50KS5yZW1vdmVDbGFzcygnZWRpdCBlcnJvciBjb21wbGV0ZWQnKS5hZGRDbGFzcygnY29tcGxldGVkJyk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgZnVuY3Rpb24gdmFsaWRhdGVFbWFpbChlbWFpbCkge1xuICAgIHZhciBlbWFpbFJlZyA9IC9eKFtcXHctXFwuXStAKFtcXHctXStcXC4pK1tcXHctXXsyLDR9KT8kLztcbiAgICByZXR1cm4gZW1haWxSZWcudGVzdChlbWFpbCk7XG4gIH1cblxuICBmdW5jdGlvbiBmaWVsZElzUmVxdWlyZWQoaW5wdXQpIHtcbiAgICBpbnB1dC5hZGRDbGFzcygnZXJyb3InKTtcbiAgICBpbnB1dC5uZXh0KCkucmVtb3ZlKCcuZm9ybS1pdGVtLS1lcnJvci1tZXNzYWdlJyk7XG4gICAgaW5wdXQuYWZ0ZXIoJzxkaXYgY2xhc3M9XCJmb3JtLWl0ZW0tLWVycm9yLW1lc3NhZ2VcIj5GaWVsZCBpcyByZXF1aXJlZC48L2Rpdj4nKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNoZWNrRmllbGQoaW5wdXQpIHtcbiAgICBpZiAoaW5wdXQucHJvcCgncmVxdWlyZWQnKSAmJiAoaW5wdXQudmFsKCkubGVuZ3RoID09PSAwIHx8IGlucHV0LnZhbCgpID09PSBcIlwiKSkge1xuICAgICAgZmllbGRJc1JlcXVpcmVkKGlucHV0KTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBpZiAoaW5wdXQuYXR0cigndHlwZScpID09PSAnZW1haWwnICYmICF2YWxpZGF0ZUVtYWlsKGlucHV0LnZhbCgpKSkge1xuICAgICAgICBmaWVsZElzUmVxdWlyZWQoaW5wdXQpO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIGlucHV0LnJlbW92ZUNsYXNzKCdlcnJvcicpLm5leHQoKS5yZW1vdmUoJy5mb3JtLWl0ZW0tLWVycm9yLW1lc3NhZ2UnKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvLyBHbyBiYWNrIHRvIHByZXZpb3VzIGJhY2sgaXMgdXNlciBjbGlja3MgZGVjbGluZSBzdWJtaXQgYnV0dG9uXG4gICQoJy5hbWFfX2J1dHRvbi0tZGVjbGluZScpLmNsaWNrKGZ1bmN0aW9uKGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICBpZiAoZG9jdW1lbnQucmVmZXJyZXIgPT0gXCJcIikge1xuICAgICAgZG9jdW1lbnQubG9jYXRpb24uaHJlZj0nLyc7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgaGlzdG9yeS5iYWNrKCk7XG4gICAgfVxuICB9KTtcblxuICB2YXIgaW5pdGlhbExvYWQgPSB0cnVlO1xuXG4gIERydXBhbC5iZWhhdmlvcnMud2ViRm9ybSA9IHtcbiAgICBhdHRhY2g6IGZ1bmN0aW9uIChjb250ZXh0LCBzZXR0aW5ncykge1xuICAgICAgJC52YWxpZGF0b3IuYWRkTWV0aG9kKFxuICAgICAgICBcInJlZ2V4XCIsXG4gICAgICAgIGZ1bmN0aW9uKHZhbHVlLCBlbGVtZW50LCByZWdleHApIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5vcHRpb25hbChlbGVtZW50KSB8fCByZWdleHAudGVzdCh2YWx1ZSk7XG4gICAgICAgIH0sXG4gICAgICAgIFwiUGxlYXNlIGNoZWNrIHlvdXIgaW5wdXQuXCJcbiAgICAgICk7XG5cbiAgICAgIC8vIE9uIHdlYmZvcm0gc3VibWl0IGNoZWNrIHRvIHNlZSBpZiBhbGwgaW5wdXRzIGFyZSB2YWxpZFxuICAgICAgJCgnLndlYmZvcm0tc3VibWlzc2lvbi1mb3JtJykudmFsaWRhdGUoe1xuICAgICAgICBpZ25vcmU6IFtdLFxuICAgICAgICBydWxlczoge1xuICAgICAgICAgICdlbWFpbCc6IHtcbiAgICAgICAgICAgIGVtYWlsOiB0cnVlXG4gICAgICAgICAgfSxcbiAgICAgICAgICAndGVsZXBob25lJzoge1xuICAgICAgICAgICAgJ3JlZ2V4JzogL14oXFwrXFxkezEsMn1cXHMpP1xcKD9cXGR7M31cXCk/W1xccy4tXT9cXGR7M31bXFxzLi1dP1xcZHs0fSQvXG4gICAgICAgICAgfSxcbiAgICAgICAgICAnYmlydGhfeWVhcic6IHtcbiAgICAgICAgICAgICdyZWdleCc6IC9eKDE5fDIwKVxcZHsyfSQvXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBlcnJvclBsYWNlbWVudDogZnVuY3Rpb24oZXJyb3IsIGVsZW1lbnQpIHtcbiAgICAgICAgICBpZiAoZWxlbWVudC5hdHRyKFwidHlwZVwiKSA9PT0gXCJjaGVja2JveFwiKSB7XG4gICAgICAgICAgICBlcnJvci5pbnNlcnRBZnRlcihlbGVtZW50LnBhcmVudCgpLnNpYmxpbmdzKCkubGFzdCgpKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgZWxzZSBpZiAoZWxlbWVudC5pcyhcInNlbGVjdFwiKSkge1xuICAgICAgICAgICAgZXJyb3IuaW5zZXJ0QWZ0ZXIoZWxlbWVudC5uZXh0KCkpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGVycm9yLmluc2VydEFmdGVyKGVsZW1lbnQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgaW52YWxpZEhhbmRsZXI6IGZ1bmN0aW9uKGZvcm0sIHZhbGlkYXRvcikge1xuICAgICAgICAgIHZhciBlcnJvcnMgPSB2YWxpZGF0b3IubnVtYmVyT2ZJbnZhbGlkcygpO1xuICAgICAgICAgIGlmIChlcnJvcnMpIHtcbiAgICAgICAgICAgICQoJy5hbWFfX2Zvcm0tc3RlcHNfX2ljb24nKS5hZGRDbGFzcygnZXJyb3InKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZigkKCcuanMtZm9ybS10eXBlLXJhZGlvJykuZmluZCgnbGFiZWwuZXJyb3InKS5sZW5ndGggIT09IDApIHtcbiAgICAgICAgICAgICQoJy5qcy1mb3JtLXR5cGUtcmFkaW8gbGFiZWwuZXJyb3InKS5wYXJlbnRzKCcuZmllbGRzZXQtd3JhcHBlcicpLmFkZENsYXNzKCdlcnJvcicpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIC8vIENoZWNrIHRvIHNlZSBpZiBpbnB1dHMgYXJlIHZhbGlkXG4gICAgICAkKCcud2ViZm9ybS1zdWJtaXNzaW9uLWZvcm0gaW5wdXQnKS5jaGFuZ2UoZnVuY3Rpb24oKSB7XG4gICAgICAgICQoJy53ZWJmb3JtLXN1Ym1pc3Npb24tZm9ybSBsYWJlbC5lcnJvcicpLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICAgICAgaWYoICQodGhpcykudGV4dCgpICE9PSAnJykge1xuICAgICAgICAgICAgJCgnLmFtYV9fZm9ybS1zdGVwc19faWNvbicpLmFkZENsYXNzKCdlcnJvcicpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICQoJy5hbWFfX2Zvcm0tc3RlcHNfX2ljb24nKS5yZW1vdmVDbGFzcygnZXJyb3InKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICAgIC8vIEFkZCB2YWxpZGF0aW9uIHRvIHNlbGVjdCBkcm9wZG93biBtZW51cyB1c2luZyBqUXVlcnkgVUlcbiAgICAgICQoJy53ZWJmb3JtLXN1Ym1pc3Npb24tZm9ybSBzZWxlY3QnKS5zZWxlY3RtZW51KHtcbiAgICAgICAgc3R5bGU6ICdkcm9wZG93bicsXG4gICAgICAgIHRyYW5zZmVyQ2xhc3NlczogdHJ1ZSxcbiAgICAgICAgd2lkdGg6IG51bGwsXG4gICAgICAgIGNoYW5nZTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgJChcIi53ZWJmb3JtLXN1Ym1pc3Npb24tZm9ybVwiKS52YWxpZGF0ZSgpLmVsZW1lbnQodGhpcyk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcbn0pKGpRdWVyeSwgRHJ1cGFsKTtcbiIsIihmdW5jdGlvbiAoJCwgRHJ1cGFsKSB7XG4gIERydXBhbC5iZWhhdmlvcnMuYW1hX21haW5OYXZpZ2F0aW9uID0ge1xuICAgIGF0dGFjaDogZnVuY3Rpb24gKGNvbnRleHQsIHNldHRpbmdzKSB7XG5cbiAgICAgIHZhciBjYXRlZ29yeU5hdmlnYXRpb25NZW51ID0gJCgnLmFtYV9jYXRlZ29yeV9uYXZpZ2F0aW9uX21lbnUnKTtcblxuICAgICAgLy8gSGlkZS9TaG93IG1lbnVcbiAgICAgIGZ1bmN0aW9uIGhpZGVTaG93KCkge1xuICAgICAgICBpZigkKCcjZ2xvYmFsLW1lbnUnKS5wcm9wKCdjaGVja2VkJykpIHtcbiAgICAgICAgICBjYXRlZ29yeU5hdmlnYXRpb25NZW51LnNsaWRlRG93bigpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNhdGVnb3J5TmF2aWdhdGlvbk1lbnUuc2xpZGVVcCgpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgICQoJy5hbWFfX2dsb2JhbC1tZW51JykuY2xpY2soZnVuY3Rpb24oZSl7XG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIGhpZGVTaG93KCk7XG4gICAgICB9KTtcblxuICAgICAgJChkb2N1bWVudCkuY2xpY2soZnVuY3Rpb24oZSkge1xuICAgICAgICBpZiAoIWNhdGVnb3J5TmF2aWdhdGlvbk1lbnUuaXMoZS50YXJnZXQpICYmIGNhdGVnb3J5TmF2aWdhdGlvbk1lbnUuaGFzKGUudGFyZ2V0KS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAkKCcjZ2xvYmFsLW1lbnUnKS5wcm9wKCdjaGVja2VkJyxmYWxzZSk7XG4gICAgICAgICAgaGlkZVNob3coKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9O1xufSkoalF1ZXJ5LCBEcnVwYWwpO1xuIiwiLyoqXG4gKiBTbWFydE1lbnVzIGpRdWVyeSBQbHVnaW4gLSB2MS4xLjAgLSBTZXB0ZW1iZXIgMTcsIDIwMTdcbiAqIGh0dHA6Ly93d3cuc21hcnRtZW51cy5vcmcvXG4gKlxuICogQ29weXJpZ2h0IFZhc2lsIERpbmtvdiwgVmFkaWtvbSBXZWIgTHRkLlxuICogaHR0cDovL3ZhZGlrb20uY29tXG4gKlxuICogTGljZW5zZWQgTUlUXG4gKi9cbihmdW5jdGlvbiAoJCwgRHJ1cGFsKSB7XG4gIERydXBhbC5iZWhhdmlvcnMuY2F0ZWdvcnlNZW51ID0ge1xuICAgIGF0dGFjaDogZnVuY3Rpb24gKGNvbnRleHQsIHNldHRpbmdzKSB7XG4gICAgICAkKCcuYW1hX2NhdGVnb3J5X25hdmlnYXRpb25fbWVudV9fZ3JvdXAnKS5zbWFydG1lbnVzKHtcbiAgICAgICAgbWFpbk1lbnVTdWJPZmZzZXRYOiAyNTAsXG4gICAgICAgIG1haW5NZW51U3ViT2Zmc2V0WTogMjAsXG4gICAgICAgIGtlZXBJblZpZXdwb3J0OiB0cnVlXG4gICAgICB9KTtcbiAgICB9XG4gIH07XG59KShqUXVlcnksIERydXBhbCk7XG4iLCIoZnVuY3Rpb24gKCQsIERydXBhbCkge1xuICBEcnVwYWwuYmVoYXZpb3JzLmFtYV9zaWduSW5NZW51ID0ge1xuICAgIGF0dGFjaDogZnVuY3Rpb24gKGNvbnRleHQsIHNldHRpbmdzKSB7XG4gICAgICB2YXIgc2lnbkluRHJvcGRvd24gPSAkKCcuYW1hX19zaWduLWluLWRyb3Bkb3duJyk7XG4gICAgICB2YXIgc2lnbkluRHJvcGRvd25NZW51ID0gJCgnLmFtYV9fc2lnbi1pbi1kcm9wZG93bl9fbWVudScpO1xuICAgICAgdmFyIGV4cGxvcmVNZW51ID0gJCgnLmFtYV9fZXhwbG9yZS1tZW51Jyk7XG4gICAgICB2YXIgZXhwbG9yZU1lbnVEcm9wZG93biA9ICQoJy5hbWFfX2V4cGxvcmUtbWVudV9fbWVudScpO1xuXG4gICAgICBmdW5jdGlvbiBkcm9wZG93bkRvd25NZW51KHBhcmVudEVsZW1lbnQsIG1lbnVFbGVtZW50KSB7XG5cbiAgICAgICAgcGFyZW50RWxlbWVudC51bmJpbmQoJ2NsaWNrJykuY2xpY2soZnVuY3Rpb24oZSl7XG4gICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAkKG1lbnVFbGVtZW50KS5zbGlkZVRvZ2dsZSgpO1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJChkb2N1bWVudCkuY2xpY2soZnVuY3Rpb24oZSkge1xuICAgICAgICAgIC8vIGlmIHRoZSB0YXJnZXQgb2YgdGhlIGNsaWNrIGlzbid0IHRoZSBjb250YWluZXIgbm9yIGEgZGVzY2VuZGFudCBvZiB0aGUgY29udGFpbmVyXG4gICAgICAgICAgaWYgKCFwYXJlbnRFbGVtZW50LmlzKGUudGFyZ2V0KSAmJiBwYXJlbnRFbGVtZW50LmhhcyhlLnRhcmdldCkubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAkKG1lbnVFbGVtZW50KS5zbGlkZVVwKCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gU2V0IHRpbWVvdXQgZm9yIHdoZW4gYSB1c2VyIG1vdXNlcyBvdXQgb2YgdGhlIG1lbnVcbiAgICAgICAgICBwYXJlbnRFbGVtZW50Lm1vdXNlZW50ZXIoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIGNsZWFyVGltZW91dCgpO1xuICAgICAgICAgIH0pLm1vdXNlbGVhdmUoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgJChtZW51RWxlbWVudCkuc2xpZGVVcCgpO1xuICAgICAgICAgICAgfSwgMjAwMCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICBkcm9wZG93bkRvd25NZW51KHNpZ25JbkRyb3Bkb3duLCBzaWduSW5Ecm9wZG93bk1lbnUpO1xuICAgICAgZHJvcGRvd25Eb3duTWVudShleHBsb3JlTWVudSwgZXhwbG9yZU1lbnVEcm9wZG93bik7XG4gICAgfVxuICB9O1xufSkoalF1ZXJ5LCBEcnVwYWwpO1xuIl19
