!function(e,t){if("function"==typeof define&&define.amd)define(["exports"],t);else if("undefined"!=typeof exports)t(exports);else{var o={};t(o),e.bodyScrollLock=o}}(this,function(exports){"use strict";function r(e){if(Array.isArray(e)){for(var t=0,o=Array(e.length);t<e.length;t++)o[t]=e[t];return o}return Array.from(e)}Object.defineProperty(exports,"__esModule",{value:!0});var l=!1;if("undefined"!=typeof window){var e={get passive(){l=!0}};window.addEventListener("testPassive",null,e),window.removeEventListener("testPassive",null,e)}var d="undefined"!=typeof window&&window.navigator&&window.navigator.platform&&/iP(ad|hone|od)/.test(window.navigator.platform),c=[],u=!1,a=-1,s=void 0,v=void 0,f=function(t){return c.some(function(e){return!(!e.options.allowTouchMove||!e.options.allowTouchMove(t))})},m=function(e){var t=e||window.event;return!!f(t.target)||(1<t.touches.length||(t.preventDefault&&t.preventDefault(),!1))},o=function(){setTimeout(function(){void 0!==v&&(document.body.style.paddingRight=v,v=void 0),void 0!==s&&(document.body.style.overflow=s,s=void 0)})};exports.disableBodyScroll=function(i,e){if(d){if(!i)return void console.error("disableBodyScroll unsuccessful - targetElement must be provided when calling disableBodyScroll on IOS devices.");if(i&&!c.some(function(e){return e.targetElement===i})){var t={targetElement:i,options:e||{}};c=[].concat(r(c),[t]),i.ontouchstart=function(e){1===e.targetTouches.length&&(a=e.targetTouches[0].clientY)},i.ontouchmove=function(e){var t,o,n,r;1===e.targetTouches.length&&(o=i,r=(t=e).targetTouches[0].clientY-a,!f(t.target)&&(o&&0===o.scrollTop&&0<r?m(t):(n=o)&&n.scrollHeight-n.scrollTop<=n.clientHeight&&r<0?m(t):t.stopPropagation()))},u||(document.addEventListener("touchmove",m,l?{passive:!1}:void 0),u=!0)}}else{n=e,setTimeout(function(){if(void 0===v){var e=!!n&&!0===n.reserveScrollBarGap,t=window.innerWidth-document.documentElement.clientWidth;e&&0<t&&(v=document.body.style.paddingRight,document.body.style.paddingRight=t+"px")}void 0===s&&(s=document.body.style.overflow,document.body.style.overflow="hidden")});var o={targetElement:i,options:e||{}};c=[].concat(r(c),[o])}var n},exports.clearAllBodyScrollLocks=function(){d?(c.forEach(function(e){e.targetElement.ontouchstart=null,e.targetElement.ontouchmove=null}),u&&(document.removeEventListener("touchmove",m,l?{passive:!1}:void 0),u=!1),c=[],a=-1):(o(),c=[])},exports.enableBodyScroll=function(t){if(d){if(!t)return void console.error("enableBodyScroll unsuccessful - targetElement must be provided when calling enableBodyScroll on IOS devices.");t.ontouchstart=null,t.ontouchmove=null,c=c.filter(function(e){return e.targetElement!==t}),u&&0===c.length&&(document.removeEventListener("touchmove",m,l?{passive:!1}:void 0),u=!1)}else 1===c.length&&c[0].targetElement===t?(o(),c=[]):c=c.filter(function(e){return e.targetElement!==t})}});

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
 * alert.
 *
 * JavaScript should be made compatible with libraries other than jQuery by
 * wrapping it with an "anonymous closure". See:
 * - https://drupal.org/node/1446420
 * - http://www.adequatelygood.com/2010/3/JavaScript-Module-Pattern-In-Depth
 */
 (function ($, Drupal) {
   Drupal.behaviors.alert = {
     attach: function (context, settings) {
       $.cookie('ama__alert--hide');
       var alertCookie = $.cookie('ama__alert--hide');
       
       (function ($) {
         // If the 'hide cookie is not set we show the alert
         if (alertCookie !== '1') {
           $('.ama__alert__wrap').fadeIn("slow");
         }

         // Add the event that closes the popup and sets the cookie that tells us to
         // not show it again until one day has passed.
         $('.ama__alert__close').click(function() {
           $('.ama__alert__wrap').fadeOut();
           // set the cookie
           $.cookie('ama__alert--hide', '1', { expires: 1});
           return false;
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

          // Do not execute in the layout builder edit dialog
          if ($('.js-off-canvas-dialog-open').length < 0) {

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

            // jQueryUI selectmenu method
            $('.ama__select-menu__select').selectmenu();

            // Submits the search form after a select menu items has been selected
            $('.ama__select-menu__select').on('selectmenuchange', function() {
              $('#block-exposedformacquia-searchpage').submit();
            });

            $('.ama__select-menu__select').on('selectmenuchange', function() {
              $(this).trigger('change');
            });

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

            $('form:not([class*="layout-builder"]) [type=checkbox]').each( function() {
              $('[type=checkbox]').checkboxradio();
            });

            $('form:not([class*="layout-builder"]) [type=radio]').checkboxradio().buttonset().find('label').css('width', '19.4%');

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
            function expandListAccordion(element, open){
              $(element).accordion({
                multiple: true,
                icons: false,
                heightStyle: "content",
                collapsible: true,
                animate: 500,
                active: open,
                activate : function (event, ui) {
                  if($(ui.newPanel).hasClass('ui-accordion-content-active')) {
                    $(ui.newPanel).prev().addClass('active');
                  } else {
                    $(ui.oldPanel).siblings().removeClass('active');
                  }
                }
              });
            }

            if($(".ama__expand-list").find('.ui-checkboxradio-checked').length) {
              expandListAccordion('.ama__expand-list', 0);
              $(".ama__expand-list .ama__expand-list__header").first().addClass('active');
            } else {
              expandListAccordion('.ama__expand-list', false);
              $(".ama__expand-list").children('.ama__expand-list__header').removeClass('active');
            }

            // Collapse all accordion panels
            $('.ama__filter__collapse-panels button').click(function(){
              $('.ama__expand-list .ui-accordion-header').each( function() {
                if($(this).hasClass('ui-state-active') || $(this).hasClass('active')) {
                  $(this).click();
                }
              });
            });

            // Open accordion panels for mobile
            $('.ama__applied-filters__show-filters').unbind('click').click(function(){
              $('.ama__expand-list, .ama__applied-filters__tags').slideToggle(function() {
                $('.ama__applied-filters__show-filters').text($(this).is(':visible') ? 'Hide Filter' : 'Filter');
              });
            });

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
          }
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
 * wrapping it with an 'anonymous closure'. See:
 * - https://drupal.org/node/1446420
 * - http://www.adequatelygood.com/2010/3/JavaScript-Module-Pattern-In-Depth
 */
(function ($, Drupal) {

  Drupal.behaviors.ribbonnav = {
    attach: function (context, settings) {

      // Needs doc ready because the admin toolbar needs to get loaded to determine the top spacing for sticky nav
      $(function() {
        var $bodyFixed = $('body').css('overflow');

        if($bodyFixed === 'hidden') {
          $('.ama__main-navigation').unstick();
          return;
        } else if($(window).width() < 768 ) { // If less than tablet
          $('.ama__main-navigation').sticky({zIndex: 501});
        } else if($('.toolbar-tray').hasClass('toolbar-tray-horizontal')) {
          $('.ama__main-navigation ').sticky({ zIndex: 501, topSpacing: 72 });
        } else if($('.toolbar-tray').hasClass('toolbar-tray-vertical')) {
          $('.ama__main-navigation ').sticky({ zIndex: 501, topSpacing: 39 });
        } else {
          $('.ama__main-navigation ').sticky({ zIndex: 501 });
        }
      });

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
          $('.ama__ribbon__dropdown__trigger', this).removeClass(class_active).children().removeClass(class_active);
        });
      });
    }
  };
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
    attach: function (context, settings) {

      // Create static var for subcategory item count. To be used for determining whether recalculations are needed.
      var subcategoryExplorationColumns = 0;

      function checkSize() {
        var $subcategory = $('.ama__subcategory-exploration__subcategory');
        var $subcategoryContainer = $('.ama__subcategory-exploration-with-images__container');
        var $subcategoryTitle = $('.ama__subcategory-exploration-with-images__title');
        // We want the width minus padding so use width() instead of innerWidth().
        var subcategoryExplorationWidth = $('.ama__subcategory-exploration-with-images').width();
        // Subcategory items have max-width of 180px. This will be used for calculations instead of extracting it via jQuery calls.
        var subcategoryItemWidth = 180;
        var subcategoryTitleWidth = $subcategoryTitle.outerWidth();
        var totalGridItems = $subcategory.length + 1;
        // Start column count as lowest possible.
        var columnCount = 2;
        // Set subcategory row items to lowest that should display.
        var subcategoryItemsPerRow = Math.floor((subcategoryExplorationWidth - subcategoryTitleWidth) / subcategoryItemWidth);

        if (subcategoryItemsPerRow < 2) {
          // The minimum subcategory items per row should be two. If the variable computed to less, manually correct it.
          subcategoryItemsPerRow = 2;
          totalGridItems = totalGridItems - 1;
        } else {
          columnCount = subcategoryItemsPerRow + 1;
        }

        // Determine if changes in column count has occurred and act accordingly
        if (subcategoryExplorationColumns !== columnCount) {
          // Determine additional "filler-box" needed to create complete row
          var fillerBoxCount = columnCount - (totalGridItems % columnCount);
          fillGridRow($subcategoryContainer, fillerBoxCount);
          // Update persistent column count
          subcategoryExplorationColumns = columnCount;
        }

        // Update viewable subcategories.
        $subcategory.hide();
        $subcategory.slice(0, subcategoryItemsPerRow).css('display', 'inline-block');

        viewMore();
      }

      function viewMore() {
        var $viewLess = $('.ama__subcategory-exploration-with-images__view-less');
        var $viewMore = $('.ama__subcategory-exploration-with-images__view-all');
        var $subcategory = $('.ama__subcategory-exploration__subcategory');
        var $subcategoryContainer = $('.ama__subcategory-exploration-with-images__container');

        $viewLess.hide();
        $viewMore.show();

        $('.viewAll').click(function (e) {
          e.preventDefault();
          $subcategory.fadeIn();
          $viewMore.hide();
          $subcategoryContainer.addClass('expanded');
          $viewLess.show();

        });

        $('.viewLess').click(function (e) {
          e.preventDefault();
          $subcategory.hide();
          checkSize();
          $viewLess.hide();
          $subcategoryContainer.removeClass('expanded');
          $viewMore.show();
        });
      }


      function fillGridRow($container, count) {
        var fillerBox = '<div class="filler-box"></div>';
        // clear out current filler boxes
        var $fillerBoxes = $container.find('.filler-box');
        $fillerBoxes.remove();
        // fill out grid row
        for (var i = 0; i < count; i++) {
          $container.append(fillerBox);
        }
      }

      // run test on initial page load
      checkSize();

      // run test on resize of the window
      $(window).resize(function () {
        checkSize();
      });
    }
  };
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
  Drupal.behaviors.subcategoriesExploration = {
    attach: function(context, settings) {

      var $subcategoryListContainer = $('.ama__subcategory-exploration__list');
      var $subcategoryList  = $('.ama__subcategory-exploration__list ul');
      var $subcategoryListExpander = $('.ama__subcategory-exploration__show-more');
      var $subcategoryListContainerHeight = $subcategoryListContainer.outerHeight() + 3;
      var $subcategoryListLinkText = $('.ama__subcategory-exploration__text');
      var $initialWindowWidth = $(window).width();

      // Determine when to show link based on window size.
      $(document).ready(function () {
        function showHideMoreLink () {
          // Set intial window width to 1024 pixel.
          // @todo: Check if this is an issue to set 1024 width limit.
          if ($initialWindowWidth <= 1024) {
            // If the unordered list outerHeight is greater than the parent container then show the show more link,
            // hide otherwise.
            if ($subcategoryList.outerHeight() > $subcategoryListContainerHeight) {
              $subcategoryListExpander.show();
            }
            if ($subcategoryList.outerHeight() < $subcategoryListContainerHeight) {
              $subcategoryListExpander.hide();
            }
          }
          if ($initialWindowWidth !== $(window).width()) {
            // If the unordered list outerHeight is greater than the parent container then show the show more link
            if ($subcategoryList.outerHeight() > $subcategoryListContainerHeight) {
              $subcategoryListExpander.show();

            } else {
              $subcategoryListExpander.hide();
            }
          }
        }

        showHideMoreLink();
          $(window).resize(showHideMoreLink);
      });


      // Drupal compels me to unbind clicks otherwise double clicks occur
      $subcategoryListExpander.unbind('click').click(function(e){
        e.stopPropagation();
        e.preventDefault();

        // Checks to see if the container has been expand or not by comparing initial outerHeight to current outerHeight
        if($subcategoryListContainer.outerHeight() > $subcategoryListContainerHeight) {
          $subcategoryListContainer.removeClass('ama__subcategory-exploration__list--expanded');
          $(this).removeClass('ama__subcategory-exploration__show-more--expanded');
          $subcategoryListLinkText.text('View all subcategories');
        }
        else {
          $subcategoryListContainer.addClass('ama__subcategory-exploration__list--expanded');
          $(this).addClass('ama__subcategory-exploration__show-more--expanded');
          $subcategoryListLinkText.text('View fewer subcategories');
        }
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
      if (viewportWidth >= 600 && $('.ama__resource-tabs').length > 0) {
        defaultActiveTab = 1;
      }

      $(".ama__tabs, .ama__resource-tabs").tabs({
        active: defaultActiveTab,
        activate: removeHighlights
      });

      // Prevent jump onclick
      $('.ui-tabs-anchor').on('click', function (e) {
        e.preventDefault();
        return false;
      });


      //Simulate click event on actual simpleTabs tab from mobile drop down.
      $('.ama__tabs-navigation--mobile select').on("selectmenuchange", function (event, ui) {
        var selectedValue = ui.item.value;
        $('a[href="#' + selectedValue + '"]').click();
      });

      // When clicking an inline resource page link referencing a tab, open referenced tab.
      $('.ama__resource-link--inline, .ama__page--resource__resource-link').on('click', function (e) {

        e.preventDefault();

        var $tabs = $('.ama__resource-tabs');
        switchTabs($tabs, this);
        // Stop bubbling and default actions
        return false;
      });

      function removeHighlights() {
        $('.ama_resource-header--highlight').removeClass('ama_resource-header--highlight');
      }

      /*
       * This function animates the browser scroll action with attention to keyboard only accessibility concerns
       *
       * @param {jQuery Object} $tabNav
       * @param {jQuery Object} $target
       */
      function smoothScroll($tabNav, tabHash, positionInTab) {
        var scrollTarget = window.innerWidth >= 1200 ? '.ama__resource-tabs__content' : 'html,body';

        // Remove previous highlights, if any
        removeHighlights();

        // Try to find target element offset, but default to zero
        var scrollPosition = 0;
        var $target;
        if (positionInTab !== undefined) {
          var tabElements = $(tabHash + ' .ama__resource-tabs__item');
          if (tabElements.length) {
            // If desired position is larger than the result set, use the last element
            if (tabElements.length <= positionInTab) {
              positionInTab = tabElements.length;
            }
            // Users are instructed to consider 1 as the first element
            var target = tabElements[positionInTab - 1];
            scrollPosition = target.offsetTop;
            // Add highlight to target
            $target = $(target).find('.ama_resource-header'); // save for use in animate() callback
            $target.addClass('ama_resource-header--highlight');
          }
        } else {
          $target = $(tabHash);
        }
        
        $(scrollTarget).animate({
          scrollTop: scrollPosition
        }, 850, function () {
          // Update focus for keyboard only navigation
          $target.attr('tabindex', '-1').focus();
        });

        // Stop bubbling and default actions
        return false;
      }

      /*
       * This function opens referenced tabs from inline links
       *
       * @param {jQuery Object} $tabObj The element which has the .tab() function attached.
       * @param {Element} link
       */
      function switchTabs($tabObj, link) {

        var linkHash = link.getAttribute("href");
        var widget = $tabObj.data('ui-tabs');

        var tabHash, positionInTab;
        var parts = linkHash.split('-');
        tabHash = parts[0];
        if (parts.length > 1) {
          positionInTab = parts[1];
        } else {
          // If old link, try to determine position from link text
          var matches = link.innerText.match(/([0-9]+)/g);
          if (matches) {
            positionInTab = matches.shift();
          }
        }

        // Ensure correct tab is active
        var tabIndex = widget._getIndex(tabHash);
        $tabObj.tabs({
          active: tabIndex
        });

        // Scroll to top of ui tabs navigation
        smoothScroll($tabObj, tabHash, positionInTab);

        // Stop bubbling and default actions
        return false;
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

  // Submits first page of Contact Us form on radio button selection
  $.fn.contactSubmit = function(){
    var $webform_buttons = $('.webform-submission-contact-us-form input[type="radio"]');
    $webform_buttons.bind('click', function(e) {
      $('.webform-submission-contact-us-form').submit();
    });
  }
  $.fn.contactSubmit();
  $( document ).ajaxComplete(function() {
    $.fn.contactSubmit();
  });

  // Go back to previous back is user clicks decline submit button
  $('.ama__button--decline').click(function(e) {
    e.preventDefault();

    if (document.referrer === "") {
      document.location.href='/';
    }
    else {
      history.back();
    }
  });

  var initialLoad = true;

  Drupal.behaviors.webForm = {
    detach: function (context, settings, trigger) {
      if (trigger === 'serialize') {
        initialLoad = false;
      }
    },
    attach: function (context, settings) {
      if (!initialLoad) {
        if (!context.innerText.match("Error message")) {
          $('.ama__sales-landing-page__form__heading').hide();
        }
      }

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

      var $categoryNavWrapper = $('.ama_category_navigation_wrapper'),
          $categoryNavigationMenu = $('.ama_category_navigation_menu'),
          $categoryNavigationMenuGroup = $('.ama_category_navigation_menu__group'),
          $mobileSearchTrigger = $('.global-search-trigger'),
          $mobileSearch = $('.ama__global-search'),
          $mainNav = $('.ama__main-navigation '),
          $productNav = $('.ama__product-nav'),
          $subMenu = $('.ama_category_navigation_menu__submenu'),
          $subMenuArticle = $('.ama_category_navigation_menu__articles'),
          viewportHeight = 0,
          productNavHeight = 0,
          categoryNavMenuHeight = $('.ama_category_navigation_menu').outerHeight(),
          categoryNavMenuResizedHeight = 0,
          windowWidth = $(window).width();

      // Checks if user agent is a mobile device
      var deviceAgent = navigator.userAgent.toLowerCase();
      var agentID = deviceAgent.match(/(android|webos|iphone|ipod|blackberry)/) && windowWidth < 768;

      if($productNav.length && $productNav.is(':visible') ){
        productNavHeight = $productNav.height();
      } else {
        productNavHeight = 0;
      }

        // Calculate whether or not the category nav should have scrollbars
      function categoryNavHeight(resizeViewportHeight) {

        // Check to see if viewport height is passed back when the window gets resized
        if(typeof resizeViewportHeight !== 'undefined') {
          viewportHeight = resizeViewportHeight;
        } else {
          // Window height is used by default
          viewportHeight = window.innerHeight ? window.innerHeight : $(window).height();
        }

        // Subtract the navigation height from window height to assess content height
        categoryNavMenuResizedHeight = viewportHeight;
        // Check to see if main menu purple dropdown height is larger than viewport height
        if (categoryNavMenuHeight + $mainNav.outerHeight() + productNavHeight > viewportHeight && !agentID) {

          // Set the menu dropdown the same as viewport to enable scrolling
          var categoryNavMenuHeightResized = categoryNavMenuResizedHeight - $mainNav.outerHeight() - productNavHeight;
          $categoryNavigationMenuGroup.addClass('scroll').outerHeight(categoryNavMenuHeightResized);

          $categoryNavigationMenuGroup.on('show.smapi', function(e, menu) {
            if($('.ama_category_navigation_menu__submenu', menu).outerHeight() > categoryNavMenuHeightResized) {
              $('.ama_category_navigation_menu__submenu', menu).outerHeight(categoryNavMenuHeightResized);
            }

            if($('.ama_category_navigation_menu__articles', menu).outerHeight() > categoryNavMenuHeightResized) {
              $('.ama_category_navigation_menu__articles', menu).outerHeight(categoryNavMenuHeightResized).addClass('one_article');
            }
          });
        } else {
          $categoryNavigationMenuGroup.removeClass('scroll').outerHeight('auto');
          $subMenu.outerHeight('auto');
          $subMenuArticle.outerHeight('auto');
        }
      }


      // Hide/Show menu
      function hideShow() {
        if ($('#global-menu').prop('checked')) {
          $categoryNavigationMenu.slideDown(function () {
            if ((categoryNavMenuHeight +  $mainNav.outerHeight() + productNavHeight) > viewportHeight) {
              bodyScrollLock.disableBodyScroll($categoryNavigationMenuGroup, {
                allowTouchMove: function allowTouchMove(el) {
                  while (el && el !== document.body) {
                    if (el.getAttribute('body-scroll-lock-ignore') !== null) {
                      return true;
                    }
                    el = el.parentNode;
                  }
                }
              });
            }

            if (agentID) {
              // Only make the menu height same as viewport on mobile devices
              var mobileHeight = window.innerHeight ? window.innerHeight : $(window).height();
              $categoryNavWrapper.height(mobileHeight).addClass('scroll');

              $categoryNavigationMenuGroup.on('show.smapi', function(e, menu) {
                if($(menu).outerHeight() > mobileHeight) {
                  $(menu).outerHeight(mobileHeight);
                }

              });
            } else {
              $(this).parent().height('auto');
              categoryNavHeight();
            }
          });
        }
        else {
          $categoryNavigationMenu.slideUp(function () {
            $(this).parent().height(0);
            bodyScrollLock.clearAllBodyScrollLocks();
          });
        }
      }

      // Closes menu on doc load
      $('#global-menu').prop('checked', false);

      $('.ama__global-menu').click(function (e) {
        hideShow();
        e.stopPropagation();
      });

      // If a user clicks outside the menu then close it
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
        });
      }


      $(window).scroll(function() {
        var resizeViewportHeight = window.innerHeight ? window.innerHeight : $(window).height();
        categoryNavHeight(resizeViewportHeight);
      });

      //Checks the layout position of article on window resize and moves the social icons accordingly
      $( window ).resize(function() {
        if (!agentID) {
          var resizeViewportHeight = $(window).innerHeight();
          var mainNavPositionUpdate = $('.ama__main-navigation .container').offset().left - 100;

          categoryNavHeight(resizeViewportHeight);
          $('.ama__social-share.ama__social-share--fixed').css('left', mainNavPositionUpdate);
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


jQuery('.ama_category_navigation_menu__group').smartmenus({
  subIndicatorsPos: 'append'
});

(function ($, Drupal) {
  Drupal.behaviors.ama_signInMenu = {
    attach: function (context, settings) {
      var $signInDropdown = $('.ama__sign-in-dropdown');
      var $signInDropdownMenu = $('.ama__sign-in-dropdown__menu');
      var $signInLink = $('.ama__sign-in-dropdown__text');
      var $exploreMenu = $('.ama__explore-menu');
      var $exploreMenuDropdown = $('.ama__explore-menu__menu');

      function dropdownDownMenu(parentElement, menuElement) {
       parentElement.unbind('click').click(function(e){
          e.stopPropagation();
          $(menuElement).slideToggle();
        });

        // Stop link from firing
        $signInLink.click(function(e) {
          e.preventDefault();
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

      dropdownDownMenu($signInDropdown, $signInDropdownMenu);
      dropdownDownMenu($exploreMenu, $exploreMenuDropdown);
    }
  };
})(jQuery, Drupal);

(function ($, Drupal) {
  Drupal.behaviors.ama_search_checkbox = {
    attach: function (context, settings) {

      var $categorySearchInput = $('#search_category');
      var $categorySearchList = $('.facets-widget-checkbox ul li');
      var $clearSearchFilter = $('#appliedFiltersRemove');

      // Filter list using jQuery filter
      function filterList(searchBox, list) {
        searchBox.keyup(function () {
          var $regex = new RegExp(this.value, 'i');
          list.hide().filter(function () {
            return $regex.test($.trim($(this).text()));
          }).show();
        });
      }

      // Clear filter
      function cleafFilterList(clearSearchFilter) {
        clearSearchFilter.click(function (e) {
          e.preventDefault();
          $categorySearchInput.val('');
          $categorySearchInput.trigger('keyup');

          $('.facets-widget-checkbox ul li [type=checkbox]').each( function() {
            $(this).prop("checked", false);
            $('#block-exposedformacquia-searchpage').submit();
          });
        });
      }

      // Invoke filter list
      filterList($categorySearchInput, $categorySearchList);

      // Invoke clear filter
      cleafFilterList($clearSearchFilter);
    }
  };
})(jQuery, Drupal);

/**
 * @file
 * bp calculator.
 *
 * JavaScript should be made compatible with libraries other than jQuery by
 * wrapping it with an 'anonymous closure'. See:
 * - https://drupal.org/node/1446420
 * - http://www.adequatelygood.com/2010/3/JavaScript-Module-Pattern-In-Depth
 */

(function ($, Drupal) {
  Drupal.behaviors.bpCalculator = {
    attach: function (context, settings) {

      // Clone last row of table
      $('.add-bp-row').unbind('click').click(function(e){
        e.preventDefault();
        var $tableBody = $('#bpCalculator table').find('tbody'),
          $trLast = $tableBody.find('tr:last'),
          $trNew = $trLast.clone();

        // Append new class name to cloned row
        $trLast.before($trNew).addClass('cloned').find('input').val('');

        // Add new name with index
        $tableBody.find('tr:last input').each(function () {
          var $trInputClassIndex = $('#bpCalculator tbody>tr').length + 1,
              $trInputClassName = $(this).attr('class');

          $(this).attr('name', $trInputClassName + '-' + $trInputClassIndex);
        });

        $('td:eq(0)', $trLast).text($('#bpCalculator tbody>tr').length);
        return false;
      });

      // When clear/restart button is clicked return table to initial state
      $('.clear-restart').unbind('click').click(function(e){
        e.preventDefault();

        // Remove all cloned rows
        var $trCloned = $('.cloned');
        $trCloned.remove();

        // Reset to intial values
        $('#bpCalculator input').each(function () {
          $(this).val('');
        });

        // Reset form
        $('#bpCalculator ').validate().resetForm();

        // Hide output row
        $('.bpCalculator__table__output').hide();

        return false;
      });

      // Calculate average BP
      function calculcateBP(bpValue, bpOutput) {
        var bpInput = 0, // row count
            bpTotal = 0, // incremented input values
            bpAverage; // averaged bpTotal / bpInput

        bpValue.each(function () {
          // If Input values are greater than 0 then turn into a number and round
          var val = $(this).val() > 0 ? Math.round(parseInt($(this).val(), 10)) : false;

          if (val !== 0) {
            bpInput += 1;
            bpTotal += val;
          }
        });

        // Calculate average
        bpAverage = bpTotal / bpInput > 0 ? Math.round(bpTotal / bpInput) : 0;

        bpOutput.text(bpAverage);

        $('.bpCalculator__table__output').show();
      }

      // Validate BP Form
      $('#bpCalculator').validate({
        // Calculate BP when calculate is clicked
        submitHandler: function(form) {
          var sysBpValue = $('.bpCalculator__systolic-input'),
            sysBpOutput = $('.bpCalculator__systolic-output');

          var diaBpValue = $('.bpCalculator__diastolic-input'),
            diaBpOutput = $('.bpCalculator__diastolic-output');

          calculcateBP(sysBpValue, sysBpOutput);
          calculcateBP(diaBpValue, diaBpOutput);

          return false;
        }
      });
    }
  };
})(jQuery, Drupal);

/**
 * @file
 * Sadly adds footer to left resource page column.
 *
 * JavaScript should be made compatible with libraries other than jQuery by
 * wrapping it with an "anonymous closure". See:
 * - https://drupal.org/node/1446420
 * - http://www.adequatelygood.com/2010/3/JavaScript-Module-Pattern-In-Depth
 */
(function ($, Drupal) {
  Drupal.behaviors.resourcePageFooter = {
    attach: function(context, settings) {

      $(function() {
        if ($('body.ama__resource-page').length) {
          $('footer', context).clone().appendTo('.ama__layout--split__left').addClass('ama__footer ama__resource-page__desktop-footer');
        }
      });
    }
  };
})(jQuery, Drupal);

/**
 * @file
 * Responsive Tables.
 *
 * JavaScript should be made compatible with libraries other than jQuery by
 * wrapping it with an "anonymous closure". See:
 * - https://drupal.org/node/1446420
 * - http://www.adequatelygood.com/2010/3/JavaScript-Module-Pattern-In-Depth
 */
(function ($, Drupal) {
  Drupal.behaviors.responsiveTables = {
    attach: function(context, settings) {

      // This conditional has been added to prevent basicTable plugin to selectively not run on tables
      if (!$('table').hasClass('simpleTable')) {
        $('table').basictable({
          breakpoint: 1024
        });
      }

      // this forces tables inside of the .ama__resource--schedules div to have mobile look and feel
      $('.ama__resource--schedules table').each( function() {
        $(this).basictable('start');
      });

    }
  };
})(jQuery, Drupal);

/**
 * @file
 * Listicle Clases.
 *
 * Handling classes to build listicle properly outside ckeditor.
 */
(function ($, Drupal) {
  Drupal.behaviors.listicle = {
    attach: function(context, settings) {
      if ($('.listicle', context).length) {
        $('.listicle').each(function () {
          $(this).children().each(function (idx, e) {
            $(e).addClass('listicle__item');
            $(e).children('ol').each(function (idx, f) {
              $(f).addClass('listicle__item-sub');
              $(f).children('li').addClass('listicle__item-sub-item');
            });
          });
        });
      }
      //if there is an inline promo on a page with a listicle, determine if the list is close enough beneath the promo in the dom to assume it will be floated next to it. I chose within 5 siblings.
      if($('.ama__promo--inline ~ .listicle')) {
        var length = $('.ama__promo--inline').first().nextUntil('.listicle').addBack().length;
        if (length <= 5) {
          $('.ama__promo--inline').addClass('listicle-margin');
        }
      }
      //if the listicle item contains an image, put a clearfix div on the item so if it has a trailing image, the next item won't wrap on it.
      //Also, determine it the image is almost 100% of the list width. if it is, add a class to remove the left margin and make the image 100% width. I chose 80%.
      if($('.listicle__item img')) {
        $('.listicle__item img').each(function () {
          var width = $(this).closest('.listicle__item').width()
          console.log(width)
          var imageWidth = $(this).width()
          console.log(imageWidth)
          var clearfix = '<div class="clearfix"></div>'
          $(this).closest('.listicle__item').once().append(clearfix)
          if (imageWidth >= width*.7) {
            $(this).addClass('no-margin')
            $(this).closest ('figure').addClass('no-margin')
          }
        })
      }
    }
  };
})(jQuery, Drupal);

/**
 * @file
 * Attaches AMA Image Popup library.
 */

(function ($, Drupal) {
	function alterModal (context) {
		$('.ui-dialog').css({"z-index": "50001"});
		$('.ui-dialog-title').hide();
		$('.ui-button-icon-only .ui-icon').hide();
		// Styleguide specific treatment to hide and css to elements.
		$('.ui-draggable .ui-dialog-titlebar').css({
			"border": "none",
			"padding:": "0",
			"background": "none"
		});
		$('.ui-widget-overlay').css({
			"opacity": ".5",
			"z-index:": "5000"
		});
		$('.ui-dialog .ui-dialog-titlebar-close').css({
			"background": "url('/assets/images/icon-modal-close.svg')",
			"border": "none",
			"position": "absolute",
			"right": "-20px",
			"top": "-10px",
			"height": "28px",
			"width": "28px",
			"padding": "0",
		});
	}

	function closeModal (context) {
		$('.ui-icon-closethick').unbind('click.close');
		$('.ui-icon-closethick').trigger('click');
	}

	Drupal.behaviors.ama_image_popup = {
		attach: function (context) {
			$(document).on("dialogopen", ".ui-dialog", function (event, ui) {
				alterModal();
			});
			$(document).on("click", ".ui-widget-overlay", function (event, ui) {
				closeModal();
			});
		}
	};

})(jQuery, Drupal);

/**
 * @file
 * Attaches AMA Image Popup library.
 */

(function ($, Drupal) {
	function alterModal (context) {
		$('.ama-image-popup-modal .ui-dialog-title').hide();
		$('.ama-image-popup-modal .ui-button-icon-only .ui-icon').hide();
	}

	function closeModal (context) {
		$('.ui-icon-closethick').unbind('click.close');
		$('.ui-icon-closethick').trigger('click');
	}

	Drupal.behaviors.ama_image_popup = {
		attach: function (context) {
			$(document).on("dialogopen", ".ui-dialog", function(event, ui) {
				alterModal();
			});
			$(document).on("click", ".ui-widget-overlay", function(event, ui) {
				closeModal();
			});
		}
	}
})(jQuery, Drupal);

(function ($, Drupal) {
  Drupal.behaviors.index = {
    attach: function (context, settings) {

  if ( $('.desc-display').length ) {

    var full = $('.fulltext');
    var trunc = $('.truncated')
    var desc = $('.desc-display')
    var fullText = $('.fulltext').html()
    var truncated = $('.truncated').html()
    var fullHeight = ''
    var truncHeight = ''
    var moreHtml = '<a href="#" class="more"> ...Read More</a>'
    var lessHtml = '<a href="#" class="less">Hide Content</a>'
    var width = ''

      function getDimensions () {
        width = $(window).width()
        if (width < 400) {
          truncHeight = trunc.height() + 25
          fullHeight = full.height() + 15
        } else {
          truncHeight = trunc.height()
          fullHeight = full.height() + 35
        }
      };

      /*
        * Animate the height of a dynamic height object? SIMPLE!
        * What a fool you would be to not think of so elegant a solution.
        * In the markup, there are hidden fulltext and summary divs.
        * They are absolutely positioned whithin the page template to keep an accurate height.
       */

      // Set height on pageload using the hidden divs.
      $('.desc-display', context).once('getHeight').each(function () {
        getDimensions()
        desc.css('height', truncHeight + 'px')
      });

      // Set the height again on window resize.
      $(window).on('resize', function () {
        getDimensions()
        if (desc.hasClass('full')) {
          desc.css('height', fullHeight + 'px')
        } else if (desc.hasClass('summary')) {
          desc.css('height', truncHeight + 'px')
        }
      });

      // On click, set the height to trigger css transition.
      desc.on('click', '.more', function () {
        getDimensions()
        desc.css('height', fullHeight + 'px')
        desc.addClass('full').removeClass('summary')
        // Swap the full copy into the display div.
        desc.html($.parseHTML(fullText)).append(lessHtml)
      });
      desc.on('click', '.less', function () {
        getDimensions()
        desc.css('height', truncHeight + 'px')
        desc.addClass('summary').removeClass('full')
        // Swap the truncated copy into the display div.
        desc.html($.parseHTML(truncated)).append(moreHtml)
        // Scroll to top.
        $('html, body').animate({ scrollTop: 0 }, 500, 'swing')
      });
    }

    }
  };
})(jQuery, Drupal);

(function ($, Drupal) {
  Drupal.behaviors.ama_toc = {
    attach: function (context, settings) {
      $(document).ready(function() {
        $('.ama--news-toc a').bind('click', function(e) {
            e.preventDefault(); // prevent hard jump, the default behavior

            var target = $(this).attr("href"); // Set the target as variable
            // perform animated scrolling by getting top-position of target-element and set it as scroll target
            $('html, body').stop().animate({
                scrollTop: $(target).offset().top - $('#main-content').offset().top + ($('.workbench-tabs').height()?$('.workbench-tabs').height():0)
            }, 600);

            return false;
        });
      });
    }
  };
})(jQuery, Drupal);

/**
 * @file
 * Application dropdown.
 */
(function ($, Drupal) {
  Drupal.behaviors.appMenu = {
    attach: function (context, settings) {

      $('#block-accountnav').each(function () {
        var class_active = 'is-active';

        $('.account_nav_trigger', this).on('click', function(e) {
          e.stopPropagation();
          // Unfocus on the dropdown.
          $(this).blur();
          // Add our class for CSS.
          $(this).toggleClass(class_active);
          // Add our class to the dropdown UL.
          $(this).next().toggleClass(class_active);
        });

        $(document).click( function(){
          $('.account_nav_trigger', this).removeClass(class_active).next().removeClass(class_active);
        });
      });
    }
  };
})(jQuery, Drupal);

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJvZHlTY3JvbGxMb2NrLm1pbi5qcyIsImluaXQuanMiLCJhbGVydC5qcyIsImZvcm0taXRlbXMuanMiLCJuYXYuanMiLCJzdWJjYXRlZ29yeS5qcyIsInN1YmNhdGVnb3J5LWV4cGxvcmF0aW9uLmpzIiwid2F5ZmluZGVyLmpzIiwidGFicy5qcyIsImFjY29yZGlvbi5qcyIsIndlYmZvcm1zLmpzIiwibWFpbi1uYXZpZ2F0aW9uLmpzIiwiY2F0ZWdvcnktbWVudS5qcyIsInNpZ24taW4tZHJvcGRvd24uanMiLCJzZWFyY2gtY2hlY2tib3guanMiLCJicC1jYWxjdWxhdG9yLmpzIiwicmVzb3VyY2UuanMiLCJ0YWJsZXMuanMiLCJsaXN0aWNsZS5qcyIsIm1vZGFsLmpzIiwiaW5kZXgtcGFnZS5qcyIsInRvYy5qcyIsImFwcGxpY2F0aW9uLWRyb3Bkb3duLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDNUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDakNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3BUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDcERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDekdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDeEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzdCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNoSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM5SkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2hOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNkQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDeENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3JHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3JCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDNUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM5Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDN0VBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN6RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ25CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6InN0eWxlZ3VpZGUtY3VzdG9tLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIWZ1bmN0aW9uKGUsdCl7aWYoXCJmdW5jdGlvblwiPT10eXBlb2YgZGVmaW5lJiZkZWZpbmUuYW1kKWRlZmluZShbXCJleHBvcnRzXCJdLHQpO2Vsc2UgaWYoXCJ1bmRlZmluZWRcIiE9dHlwZW9mIGV4cG9ydHMpdChleHBvcnRzKTtlbHNle3ZhciBvPXt9O3QobyksZS5ib2R5U2Nyb2xsTG9jaz1vfX0odGhpcyxmdW5jdGlvbihleHBvcnRzKXtcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiByKGUpe2lmKEFycmF5LmlzQXJyYXkoZSkpe2Zvcih2YXIgdD0wLG89QXJyYXkoZS5sZW5ndGgpO3Q8ZS5sZW5ndGg7dCsrKW9bdF09ZVt0XTtyZXR1cm4gb31yZXR1cm4gQXJyYXkuZnJvbShlKX1PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cyxcIl9fZXNNb2R1bGVcIix7dmFsdWU6ITB9KTt2YXIgbD0hMTtpZihcInVuZGVmaW5lZFwiIT10eXBlb2Ygd2luZG93KXt2YXIgZT17Z2V0IHBhc3NpdmUoKXtsPSEwfX07d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJ0ZXN0UGFzc2l2ZVwiLG51bGwsZSksd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJ0ZXN0UGFzc2l2ZVwiLG51bGwsZSl9dmFyIGQ9XCJ1bmRlZmluZWRcIiE9dHlwZW9mIHdpbmRvdyYmd2luZG93Lm5hdmlnYXRvciYmd2luZG93Lm5hdmlnYXRvci5wbGF0Zm9ybSYmL2lQKGFkfGhvbmV8b2QpLy50ZXN0KHdpbmRvdy5uYXZpZ2F0b3IucGxhdGZvcm0pLGM9W10sdT0hMSxhPS0xLHM9dm9pZCAwLHY9dm9pZCAwLGY9ZnVuY3Rpb24odCl7cmV0dXJuIGMuc29tZShmdW5jdGlvbihlKXtyZXR1cm4hKCFlLm9wdGlvbnMuYWxsb3dUb3VjaE1vdmV8fCFlLm9wdGlvbnMuYWxsb3dUb3VjaE1vdmUodCkpfSl9LG09ZnVuY3Rpb24oZSl7dmFyIHQ9ZXx8d2luZG93LmV2ZW50O3JldHVybiEhZih0LnRhcmdldCl8fCgxPHQudG91Y2hlcy5sZW5ndGh8fCh0LnByZXZlbnREZWZhdWx0JiZ0LnByZXZlbnREZWZhdWx0KCksITEpKX0sbz1mdW5jdGlvbigpe3NldFRpbWVvdXQoZnVuY3Rpb24oKXt2b2lkIDAhPT12JiYoZG9jdW1lbnQuYm9keS5zdHlsZS5wYWRkaW5nUmlnaHQ9dix2PXZvaWQgMCksdm9pZCAwIT09cyYmKGRvY3VtZW50LmJvZHkuc3R5bGUub3ZlcmZsb3c9cyxzPXZvaWQgMCl9KX07ZXhwb3J0cy5kaXNhYmxlQm9keVNjcm9sbD1mdW5jdGlvbihpLGUpe2lmKGQpe2lmKCFpKXJldHVybiB2b2lkIGNvbnNvbGUuZXJyb3IoXCJkaXNhYmxlQm9keVNjcm9sbCB1bnN1Y2Nlc3NmdWwgLSB0YXJnZXRFbGVtZW50IG11c3QgYmUgcHJvdmlkZWQgd2hlbiBjYWxsaW5nIGRpc2FibGVCb2R5U2Nyb2xsIG9uIElPUyBkZXZpY2VzLlwiKTtpZihpJiYhYy5zb21lKGZ1bmN0aW9uKGUpe3JldHVybiBlLnRhcmdldEVsZW1lbnQ9PT1pfSkpe3ZhciB0PXt0YXJnZXRFbGVtZW50Omksb3B0aW9uczplfHx7fX07Yz1bXS5jb25jYXQocihjKSxbdF0pLGkub250b3VjaHN0YXJ0PWZ1bmN0aW9uKGUpezE9PT1lLnRhcmdldFRvdWNoZXMubGVuZ3RoJiYoYT1lLnRhcmdldFRvdWNoZXNbMF0uY2xpZW50WSl9LGkub250b3VjaG1vdmU9ZnVuY3Rpb24oZSl7dmFyIHQsbyxuLHI7MT09PWUudGFyZ2V0VG91Y2hlcy5sZW5ndGgmJihvPWkscj0odD1lKS50YXJnZXRUb3VjaGVzWzBdLmNsaWVudFktYSwhZih0LnRhcmdldCkmJihvJiYwPT09by5zY3JvbGxUb3AmJjA8cj9tKHQpOihuPW8pJiZuLnNjcm9sbEhlaWdodC1uLnNjcm9sbFRvcDw9bi5jbGllbnRIZWlnaHQmJnI8MD9tKHQpOnQuc3RvcFByb3BhZ2F0aW9uKCkpKX0sdXx8KGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaG1vdmVcIixtLGw/e3Bhc3NpdmU6ITF9OnZvaWQgMCksdT0hMCl9fWVsc2V7bj1lLHNldFRpbWVvdXQoZnVuY3Rpb24oKXtpZih2b2lkIDA9PT12KXt2YXIgZT0hIW4mJiEwPT09bi5yZXNlcnZlU2Nyb2xsQmFyR2FwLHQ9d2luZG93LmlubmVyV2lkdGgtZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudFdpZHRoO2UmJjA8dCYmKHY9ZG9jdW1lbnQuYm9keS5zdHlsZS5wYWRkaW5nUmlnaHQsZG9jdW1lbnQuYm9keS5zdHlsZS5wYWRkaW5nUmlnaHQ9dCtcInB4XCIpfXZvaWQgMD09PXMmJihzPWRvY3VtZW50LmJvZHkuc3R5bGUub3ZlcmZsb3csZG9jdW1lbnQuYm9keS5zdHlsZS5vdmVyZmxvdz1cImhpZGRlblwiKX0pO3ZhciBvPXt0YXJnZXRFbGVtZW50Omksb3B0aW9uczplfHx7fX07Yz1bXS5jb25jYXQocihjKSxbb10pfXZhciBufSxleHBvcnRzLmNsZWFyQWxsQm9keVNjcm9sbExvY2tzPWZ1bmN0aW9uKCl7ZD8oYy5mb3JFYWNoKGZ1bmN0aW9uKGUpe2UudGFyZ2V0RWxlbWVudC5vbnRvdWNoc3RhcnQ9bnVsbCxlLnRhcmdldEVsZW1lbnQub250b3VjaG1vdmU9bnVsbH0pLHUmJihkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwidG91Y2htb3ZlXCIsbSxsP3twYXNzaXZlOiExfTp2b2lkIDApLHU9ITEpLGM9W10sYT0tMSk6KG8oKSxjPVtdKX0sZXhwb3J0cy5lbmFibGVCb2R5U2Nyb2xsPWZ1bmN0aW9uKHQpe2lmKGQpe2lmKCF0KXJldHVybiB2b2lkIGNvbnNvbGUuZXJyb3IoXCJlbmFibGVCb2R5U2Nyb2xsIHVuc3VjY2Vzc2Z1bCAtIHRhcmdldEVsZW1lbnQgbXVzdCBiZSBwcm92aWRlZCB3aGVuIGNhbGxpbmcgZW5hYmxlQm9keVNjcm9sbCBvbiBJT1MgZGV2aWNlcy5cIik7dC5vbnRvdWNoc3RhcnQ9bnVsbCx0Lm9udG91Y2htb3ZlPW51bGwsYz1jLmZpbHRlcihmdW5jdGlvbihlKXtyZXR1cm4gZS50YXJnZXRFbGVtZW50IT09dH0pLHUmJjA9PT1jLmxlbmd0aCYmKGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJ0b3VjaG1vdmVcIixtLGw/e3Bhc3NpdmU6ITF9OnZvaWQgMCksdT0hMSl9ZWxzZSAxPT09Yy5sZW5ndGgmJmNbMF0udGFyZ2V0RWxlbWVudD09PXQ/KG8oKSxjPVtdKTpjPWMuZmlsdGVyKGZ1bmN0aW9uKGUpe3JldHVybiBlLnRhcmdldEVsZW1lbnQhPT10fSl9fSk7XG4iLCIvKipcbiAqIEBmaWxlXG4gKiBJbml0aWFsaXphdGlvbiBzY3JpcHQgZm9yIGdsb2JhbCBwcm9jZXNzZXNcbiAqL1xuXG4oZnVuY3Rpb24gKCQsIERydXBhbCkge1xuXG4vKipcbiAqXG4gKiBJbml0aWFsaXplIGZpdFZpZCBmb3IgWW91VHViZSB2aWVvcy5cbiAqXG4gKiBKYXZhU2NyaXB0IHNob3VsZCBiZSBtYWRlIGNvbXBhdGlibGUgd2l0aCBsaWJyYXJpZXMgb3RoZXIgdGhhbiBqUXVlcnkgYnlcbiAqIHdyYXBwaW5nIGl0IHdpdGggYW4gXCJhbm9ueW1vdXMgY2xvc3VyZVwiLiBTZWU6XG4gKiAtIGh0dHBzOi8vZHJ1cGFsLm9yZy9ub2RlLzE0NDY0MjBcbiAqIC0gaHR0cDovL3d3dy5hZGVxdWF0ZWx5Z29vZC5jb20vMjAxMC8zL0phdmFTY3JpcHQtTW9kdWxlLVBhdHRlcm4tSW4tRGVwdGhcbiAqL1xuXG5cdERydXBhbC5iZWhhdmlvcnMuZml0dmlkaW5pdCA9IHtcblx0IGF0dGFjaDogZnVuY3Rpb24gKGNvbnRleHQsIHNldHRpbmdzKSB7XG5cdFx0XHQoZnVuY3Rpb24gKCQpIHtcblx0XHRcdFx0JChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKXtcblx0XHRcdFx0XHQkKCcudmlkZW8tY29udGFpbmVyJykuZml0VmlkcygpO1xuXHRcdFx0XHR9KTtcblx0XHRcdH0pKGpRdWVyeSk7XG5cdFx0fVxuXHR9O1xuXG59KShqUXVlcnksIERydXBhbCk7XG4iLCIvKipcbiAqIEBmaWxlXG4gKiBhbGVydC5cbiAqXG4gKiBKYXZhU2NyaXB0IHNob3VsZCBiZSBtYWRlIGNvbXBhdGlibGUgd2l0aCBsaWJyYXJpZXMgb3RoZXIgdGhhbiBqUXVlcnkgYnlcbiAqIHdyYXBwaW5nIGl0IHdpdGggYW4gXCJhbm9ueW1vdXMgY2xvc3VyZVwiLiBTZWU6XG4gKiAtIGh0dHBzOi8vZHJ1cGFsLm9yZy9ub2RlLzE0NDY0MjBcbiAqIC0gaHR0cDovL3d3dy5hZGVxdWF0ZWx5Z29vZC5jb20vMjAxMC8zL0phdmFTY3JpcHQtTW9kdWxlLVBhdHRlcm4tSW4tRGVwdGhcbiAqL1xuIChmdW5jdGlvbiAoJCwgRHJ1cGFsKSB7XG4gICBEcnVwYWwuYmVoYXZpb3JzLmFsZXJ0ID0ge1xuICAgICBhdHRhY2g6IGZ1bmN0aW9uIChjb250ZXh0LCBzZXR0aW5ncykge1xuICAgICAgICQuY29va2llKCdhbWFfX2FsZXJ0LS1oaWRlJyk7XG4gICAgICAgdmFyIGFsZXJ0Q29va2llID0gJC5jb29raWUoJ2FtYV9fYWxlcnQtLWhpZGUnKTtcbiAgICAgICBcbiAgICAgICAoZnVuY3Rpb24gKCQpIHtcbiAgICAgICAgIC8vIElmIHRoZSAnaGlkZSBjb29raWUgaXMgbm90IHNldCB3ZSBzaG93IHRoZSBhbGVydFxuICAgICAgICAgaWYgKGFsZXJ0Q29va2llICE9PSAnMScpIHtcbiAgICAgICAgICAgJCgnLmFtYV9fYWxlcnRfX3dyYXAnKS5mYWRlSW4oXCJzbG93XCIpO1xuICAgICAgICAgfVxuXG4gICAgICAgICAvLyBBZGQgdGhlIGV2ZW50IHRoYXQgY2xvc2VzIHRoZSBwb3B1cCBhbmQgc2V0cyB0aGUgY29va2llIHRoYXQgdGVsbHMgdXMgdG9cbiAgICAgICAgIC8vIG5vdCBzaG93IGl0IGFnYWluIHVudGlsIG9uZSBkYXkgaGFzIHBhc3NlZC5cbiAgICAgICAgICQoJy5hbWFfX2FsZXJ0X19jbG9zZScpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAkKCcuYW1hX19hbGVydF9fd3JhcCcpLmZhZGVPdXQoKTtcbiAgICAgICAgICAgLy8gc2V0IHRoZSBjb29raWVcbiAgICAgICAgICAgJC5jb29raWUoJ2FtYV9fYWxlcnQtLWhpZGUnLCAnMScsIHsgZXhwaXJlczogMX0pO1xuICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICB9KTtcbiAgICAgICB9KShqUXVlcnkpO1xuICAgICB9XG4gICB9O1xuIH0pKGpRdWVyeSwgRHJ1cGFsKTtcbiIsIi8qKlxuICogQGZpbGVcbiAqIEZvcm0gZmllbGRzIG1hc2tpbmdcbiAqL1xuXG4oZnVuY3Rpb24gKCQsIERydXBhbCkge1xuICBEcnVwYWwuYmVoYXZpb3JzLmZvcm1JdGVtcyA9IHtcbiAgICBhdHRhY2g6IGZ1bmN0aW9uIChjb250ZXh0LCBzZXR0aW5ncykge1xuICAgICAgKGZ1bmN0aW9uICgkKSB7XG4gICAgICAgICQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCl7XG5cbiAgICAgICAgICAvLyBEbyBub3QgZXhlY3V0ZSBpbiB0aGUgbGF5b3V0IGJ1aWxkZXIgZWRpdCBkaWFsb2dcbiAgICAgICAgICBpZiAoJCgnLmpzLW9mZi1jYW52YXMtZGlhbG9nLW9wZW4nKS5sZW5ndGggPCAwKSB7XG5cbiAgICAgICAgICAgICQoJy5tdWx0aXNlbGVjdCcpLm11bHRpc2VsZWN0KCk7XG5cbiAgICAgICAgICAgICQoJy5hbWFfX3Rvb2x0aXAnKS50b29sdGlwKHtcbiAgICAgICAgICAgICAgdG9vbHRpcENsYXNzOiBcImFtYV9fdG9vbHRpcC1idWJibGVcIlxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGZ1bmN0aW9uIGNvdW50X3JlbWFpbmluZ19jaGFyYWN0ZXIoKSB7XG4gICAgICAgICAgICAgIHZhciBtYXhfbGVuZ3RoID0gMTUwO1xuICAgICAgICAgICAgICB2YXIgY2hhcmFjdGVyX2VudGVyZWQgPSAkKCcudGV4dGFyZWEnKS52YWwoKS5sZW5ndGg7XG4gICAgICAgICAgICAgIHZhciBjaGFyYWN0ZXJfcmVtYWluaW5nID0gbWF4X2xlbmd0aCAtIGNoYXJhY3Rlcl9lbnRlcmVkO1xuICAgICAgICAgICAgICAkKCcuY2hhcmFjdGVyLWNvdW50JykuaHRtbChjaGFyYWN0ZXJfcmVtYWluaW5nKTtcbiAgICAgICAgICAgICAgaWYgKG1heF9sZW5ndGggPCBjaGFyYWN0ZXJfZW50ZXJlZCkge1xuICAgICAgICAgICAgICAgICQoJy50ZXh0YXJlYScpLmFkZENsYXNzKCdlcnJvcicpO1xuICAgICAgICAgICAgICAgICQoJy5jaGFyYWN0ZXItY291bnQnKS5hZGRDbGFzcygnZXJyb3InKTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAkKCcudGV4dGFyZWEnKS5yZW1vdmVDbGFzcygnZXJyb3InKTtcbiAgICAgICAgICAgICAgICAkKCcuY2hhcmFjdGVyLWNvdW50JykucmVtb3ZlQ2xhc3MoJ2Vycm9yJyk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8galF1ZXJ5VUkgc2VsZWN0bWVudSBtZXRob2RcbiAgICAgICAgICAgICQoJy5hbWFfX3NlbGVjdC1tZW51X19zZWxlY3QnKS5zZWxlY3RtZW51KCk7XG5cbiAgICAgICAgICAgIC8vIFN1Ym1pdHMgdGhlIHNlYXJjaCBmb3JtIGFmdGVyIGEgc2VsZWN0IG1lbnUgaXRlbXMgaGFzIGJlZW4gc2VsZWN0ZWRcbiAgICAgICAgICAgICQoJy5hbWFfX3NlbGVjdC1tZW51X19zZWxlY3QnKS5vbignc2VsZWN0bWVudWNoYW5nZScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAkKCcjYmxvY2stZXhwb3NlZGZvcm1hY3F1aWEtc2VhcmNocGFnZScpLnN1Ym1pdCgpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICQoJy5hbWFfX3NlbGVjdC1tZW51X19zZWxlY3QnKS5vbignc2VsZWN0bWVudWNoYW5nZScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAkKHRoaXMpLnRyaWdnZXIoJ2NoYW5nZScpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIC8vIFN0YXJ0IHNlYXJjaCBmaWx0ZXJcblxuICAgICAgICAgICAgdmFyIGF2YWlsYWJsZVRhZ3MgPSBbXG4gICAgICAgICAgICAgIFwiQWxhYmFtYVwiLFxuICAgICAgICAgICAgICBcIkFsYXNrYVwiLFxuICAgICAgICAgICAgICBcIkFtZXJpY2FuIFNhbW9hXCIsXG4gICAgICAgICAgICAgIFwiQXJpem9uYVwiLFxuICAgICAgICAgICAgICBcIkFya2Fuc2FzXCIsXG4gICAgICAgICAgICAgIFwiQ2FsaWZvcm5pYVwiLFxuICAgICAgICAgICAgICBcIkNvbG9yYWRvXCIsXG4gICAgICAgICAgICAgIFwiQ29ubmVjdGljdXRcIixcbiAgICAgICAgICAgICAgXCJEZWxhd2FyZVwiLFxuICAgICAgICAgICAgICBcIkRpc3RyaWN0IE9mIENvbHVtYmlhXCIsXG4gICAgICAgICAgICAgIFwiRmVkZXJhdGVkIFN0YXRlcyBPZiBNaWNyb25lc2lhXCIsXG4gICAgICAgICAgICAgIFwiRmxvcmlkYVwiLFxuICAgICAgICAgICAgICBcIkdlb3JnaWFcIixcbiAgICAgICAgICAgICAgXCJHdWFtXCIsXG4gICAgICAgICAgICAgIFwiSGF3YWlpXCIsXG4gICAgICAgICAgICAgIFwiSWRhaG9cIixcbiAgICAgICAgICAgICAgXCJJbGxpbm9pc1wiLFxuICAgICAgICAgICAgICBcIkluZGlhbmFcIixcbiAgICAgICAgICAgICAgXCJJb3dhXCIsXG4gICAgICAgICAgICAgIFwiS2Fuc2FzXCIsXG4gICAgICAgICAgICAgIFwiS2VudHVja3lcIixcbiAgICAgICAgICAgICAgXCJMb3Vpc2lhbmFcIixcbiAgICAgICAgICAgICAgXCJNYWluZVwiLFxuICAgICAgICAgICAgICBcIk1hcnNoYWxsIElzbGFuZHNcIixcbiAgICAgICAgICAgICAgXCJNYXJ5bGFuZFwiLFxuICAgICAgICAgICAgICBcIk1hc3NhY2h1c2V0dHNcIixcbiAgICAgICAgICAgICAgXCJNaWNoaWdhblwiLFxuICAgICAgICAgICAgICBcIk1pbm5lc290YVwiLFxuICAgICAgICAgICAgICBcIk1pc3Npc3NpcHBpXCIsXG4gICAgICAgICAgICAgIFwiTWlzc291cmlcIixcbiAgICAgICAgICAgICAgXCJNb250YW5hXCIsXG4gICAgICAgICAgICAgIFwiTmVicmFza2FcIixcbiAgICAgICAgICAgICAgXCJOZXZhZGFcIixcbiAgICAgICAgICAgICAgXCJOZXcgSGFtcHNoaXJlXCIsXG4gICAgICAgICAgICAgIFwiTmV3IEplcnNleVwiLFxuICAgICAgICAgICAgICBcIk5ldyBNZXhpY29cIixcbiAgICAgICAgICAgICAgXCJOZXcgWW9ya1wiLFxuICAgICAgICAgICAgICBcIk5vcnRoIENhcm9saW5hXCIsXG4gICAgICAgICAgICAgIFwiTm9ydGggRGFrb3RhXCIsXG4gICAgICAgICAgICAgIFwiTm9ydGhlcm4gTWFyaWFuYSBJc2xhbmRzXCIsXG4gICAgICAgICAgICAgIFwiT2hpb1wiLFxuICAgICAgICAgICAgICBcIk9rbGFob21hXCIsXG4gICAgICAgICAgICAgIFwiT3JlZ29uXCIsXG4gICAgICAgICAgICAgIFwiUGFsYXVcIixcbiAgICAgICAgICAgICAgXCJQZW5uc3lsdmFuaWFcIixcbiAgICAgICAgICAgICAgXCJQdWVydG8gUmljb1wiLFxuICAgICAgICAgICAgICBcIlJob2RlIElzbGFuZFwiLFxuICAgICAgICAgICAgICBcIlNvdXRoIENhcm9saW5hXCIsXG4gICAgICAgICAgICAgIFwiU291dGggRGFrb3RhXCIsXG4gICAgICAgICAgICAgIFwiVGVubmVzc2VlXCIsXG4gICAgICAgICAgICAgIFwiVGV4YXNcIixcbiAgICAgICAgICAgICAgXCJVdGFoXCIsXG4gICAgICAgICAgICAgIFwiVmVybW9udFwiLFxuICAgICAgICAgICAgICBcIlZpcmdpbiBJc2xhbmRzXCIsXG4gICAgICAgICAgICAgIFwiVmlyZ2luaWFcIixcbiAgICAgICAgICAgICAgXCJXYXNoaW5ndG9uXCIsXG4gICAgICAgICAgICAgIFwiV2VzdCBWaXJnaW5pYVwiLFxuICAgICAgICAgICAgICBcIldpc2NvbnNpblwiLFxuICAgICAgICAgICAgICBcIld5b21pbmdcIlxuICAgICAgICAgICAgXTtcblxuICAgICAgICAgICAgJCggXCIjc2VhcmNoX2ZpbHRlclwiICkuYXV0b2NvbXBsZXRlKHtcbiAgICAgICAgICAgICAgc291cmNlOiBhdmFpbGFibGVUYWdzXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgJC51aS5hdXRvY29tcGxldGUucHJvdG90eXBlLl9yZXNpemVNZW51ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICB2YXIgdWwgPSB0aGlzLm1lbnUuZWxlbWVudDtcbiAgICAgICAgICAgICAgdWwub3V0ZXJXaWR0aCh0aGlzLmVsZW1lbnQub3V0ZXJXaWR0aCgpKTtcbiAgICAgICAgICAgIH07XG5cblxuICAgICAgICAgICAgLy8gU3RhcnQgc2VhcmNoIGZpbHRlciB3aXRoIGNoZWNrYm94ZXNcblxuICAgICAgICAgICAgdmFyIGRhdGFNb2RlbCA9IFtcbiAgICAgICAgICAgICAge3RleHQ6ICdBbGFiYW1hJywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICAgIHt0ZXh0OiAnQWxhc2thJywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICAgIHt0ZXh0OiAnQW1lcmljYW4gU2Ftb2EnLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgICAge3RleHQ6ICdBcml6b25hJywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICAgIHt0ZXh0OiAnQXJrYW5zYXMnLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgICAge3RleHQ6ICdDYWxpZm9ybmlhJywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICAgIHt0ZXh0OiAnQ29sb3JhZG8nLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgICAge3RleHQ6ICdDb25uZWN0aWN1dCcsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAgICB7dGV4dDogJ0RlbGF3YXJlJywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICAgIHt0ZXh0OiAnRGlzdHJpY3QgT2YgQ29sdW1iaWEnLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgICAge3RleHQ6ICdGZWRlcmF0ZWQgU3RhdGVzIE9mIE1pY3JvbmVzaWEnLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgICAge3RleHQ6ICdGbG9yaWRhJywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICAgIHt0ZXh0OiAnR2VvcmdpYScsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAgICB7dGV4dDogJ0d1YW0nLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgICAge3RleHQ6ICdIYXdhaWknLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgICAge3RleHQ6ICdJZGFobycsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAgICB7dGV4dDogJ0lsbGlub2lzJywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICAgIHt0ZXh0OiAnSW5kaWFuYScsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAgICB7dGV4dDogJ0lvd2EnLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgICAge3RleHQ6ICdLYW5zYXMnLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgICAge3RleHQ6ICdLZW50dWNreScsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAgICB7dGV4dDogJ0xvdWlzaWFuYScsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAgICB7dGV4dDogJ01haW5lJywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICAgIHt0ZXh0OiAnTWFyc2hhbGwgSXNsYW5kcycsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAgICB7dGV4dDogJ01hcnlsYW5kJywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICAgIHt0ZXh0OiAnTWFzc2FjaHVzZXR0cycsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAgICB7dGV4dDogJ01pY2hpZ2FuJywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICAgIHt0ZXh0OiAnTWlubmVzb3RhJywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICAgIHt0ZXh0OiAnTWlzc2lzc2lwcGknLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgICAge3RleHQ6ICdNaXNzb3VyaScsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAgICB7dGV4dDogJ01vbnRhbmEnLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgICAge3RleHQ6ICdOZWJyYXNrYScsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAgICB7dGV4dDogJ05ldmFkYScsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAgICB7dGV4dDogJ05ldyBIYW1wc2hpcmUnLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgICAge3RleHQ6ICdOZXcgSmVyc2V5JywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICAgIHt0ZXh0OiAnTmV3IE1leGljbycsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAgICB7dGV4dDogJ05ldyBZb3JrJywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICAgIHt0ZXh0OiAnTm9ydGggQ2Fyb2xpbmEnLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgICAge3RleHQ6ICdOb3J0aCBEYWtvdGEnLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgICAge3RleHQ6ICdOb3J0aGVybiBNYXJpYW5hIElzbGFuZHMnLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgICAge3RleHQ6ICdPaGlvJywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICAgIHt0ZXh0OiAnT2tsYWhvbWEnLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgICAge3RleHQ6ICdPcmVnb24nLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgICAge3RleHQ6ICdQYWxhdScsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAgICB7dGV4dDogJ1Blbm5zeWx2YW5pYScsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAgICB7dGV4dDogJ1B1ZXJ0byBSaWNvJywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICAgIHt0ZXh0OiAnUmhvZGUgSXNsYW5kJywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICAgIHt0ZXh0OiAnU291dGggQ2Fyb2xpbmEnLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgICAge3RleHQ6ICdTb3V0aCBEYWtvdGEnLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgICAge3RleHQ6ICdUZW5uZXNzZWUnLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgICAge3RleHQ6ICdUZXhhcycsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAgICB7dGV4dDogJ1V0YWgnLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgICAge3RleHQ6ICdWZXJtb250JywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICAgIHt0ZXh0OiAnVmlyZ2luIElzbGFuZHMnLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgICAge3RleHQ6ICdWaXJnaW5pYScsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAgICB7dGV4dDogJ1dhc2hpbmd0b24nLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgICAge3RleHQ6ICdXZXN0IFZpcmdpbmlhJywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICAgIHt0ZXh0OiAnV2lzY29uc2luJywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICAgIHt0ZXh0OiAnV3lvbWluZycsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAgICB7dGV4dDogJycsIHZhbHVlOiAnJ31cbiAgICAgICAgICAgIF07XG5cbiAgICAgICAgICAgIGZ1bmN0aW9uIHNlbENoYW5nZSgpe1xuICAgICAgICAgICAgICB2YXIgc2VsZWN0aW9uID0gJCgnI215Q2hlY2tMaXN0JykuY2hlY2tMaXN0KCdnZXRTZWxlY3Rpb24nKTtcblxuICAgICAgICAgICAgICAkKCcjc2VsZWN0ZWRJdGVtcycpLnRleHQoSlNPTi5zdHJpbmdpZnkoc2VsZWN0aW9uKSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0eXBlb2YoalF1ZXJ5LnVpLmNoZWNrTGlzdCkgIT0gJ3VuZGVmaW5lZCcpe1xuICAgICAgICAgICAgICAkKCcjZmlsdGVyTGlzdCcpLmNoZWNrTGlzdCh7XG4gICAgICAgICAgICAgICAgbGlzdEl0ZW1zOiBkYXRhTW9kZWwsXG4gICAgICAgICAgICAgICAgb25DaGFuZ2U6IHNlbENoYW5nZVxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgJCgnZm9ybTpub3QoW2NsYXNzKj1cImxheW91dC1idWlsZGVyXCJdKSBbdHlwZT1jaGVja2JveF0nKS5lYWNoKCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgJCgnW3R5cGU9Y2hlY2tib3hdJykuY2hlY2tib3hyYWRpbygpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICQoJ2Zvcm06bm90KFtjbGFzcyo9XCJsYXlvdXQtYnVpbGRlclwiXSkgW3R5cGU9cmFkaW9dJykuY2hlY2tib3hyYWRpbygpLmJ1dHRvbnNldCgpLmZpbmQoJ2xhYmVsJykuY3NzKCd3aWR0aCcsICcxOS40JScpO1xuXG4gICAgICAgICAgICAkKCcudGV4dGFyZWEnKS5rZXl1cChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgY291bnRfcmVtYWluaW5nX2NoYXJhY3RlcigpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIC8vIFJhbmdlIEZpZWxkXG4gICAgICAgICAgICB2YXIgbGVnZW5kID0gJCgnLmFtYV9fcmFuZ2UtZmllbGRfX2xlZ2VuZCcpO1xuICAgICAgICAgICAgdmFyIGhhbmRsZSA9ICQoIFwiI2N1cnJlbnRWYWx1ZVwiICk7XG5cbiAgICAgICAgICAgICQoXCIuYW1hX19yYW5nZS1maWVsZFwiKS5zbGlkZXIoe1xuICAgICAgICAgICAgICBhbmltYXRlOiB0cnVlLFxuICAgICAgICAgICAgICByYW5nZTogJ21pbicsXG4gICAgICAgICAgICAgIHZhbHVlOiAxLFxuICAgICAgICAgICAgICBtaW46IDIwMDAsXG4gICAgICAgICAgICAgIG1heDogNTAwMCxcbiAgICAgICAgICAgICAgc3RlcDogMSxcbiAgICAgICAgICAgICAgY3JlYXRlOiBmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgIHZhciBoYW5kbGUgPSBqUXVlcnkodGhpcykuZmluZCgnLnVpLXNsaWRlci1oYW5kbGUnKTtcbiAgICAgICAgICAgICAgICB2YXIgYnViYmxlID0galF1ZXJ5KCc8ZGl2IGNsYXNzPVwiYW1hX19yYW5nZS1maWVsZF9fdmFsdWVib3hcIj48L2Rpdj4nKTtcbiAgICAgICAgICAgICAgICBoYW5kbGUuYXBwZW5kKGJ1YmJsZSk7XG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIHNsaWRlOiBmdW5jdGlvbihldnQsIHVpKSB7XG4gICAgICAgICAgICAgICAgdWkuaGFuZGxlLmNoaWxkTm9kZXNbMF0uaW5uZXJIVE1MID0gJyQnICsgdWkudmFsdWU7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pLmFwcGVuZChsZWdlbmQpO1xuXG4gICAgICAgICAgICAvLyBGb3JtIGFjY29yZGlvblxuICAgICAgICAgICAgJCggXCIudGFibGlzdFwiICkuYWNjb3JkaW9uKHtcbiAgICAgICAgICAgICAgaGVhZGVyOiBcIi5hbWFfX2Zvcm0tc3RlcHNfX3N0ZXBcIixcbiAgICAgICAgICAgICAgaGVpZ2h0U3R5bGU6IFwiY29udGVudFwiXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgLy8gRXhwYW5kIGxpc3RcbiAgICAgICAgICAgIGZ1bmN0aW9uIGV4cGFuZExpc3RBY2NvcmRpb24oZWxlbWVudCwgb3Blbil7XG4gICAgICAgICAgICAgICQoZWxlbWVudCkuYWNjb3JkaW9uKHtcbiAgICAgICAgICAgICAgICBtdWx0aXBsZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICBpY29uczogZmFsc2UsXG4gICAgICAgICAgICAgICAgaGVpZ2h0U3R5bGU6IFwiY29udGVudFwiLFxuICAgICAgICAgICAgICAgIGNvbGxhcHNpYmxlOiB0cnVlLFxuICAgICAgICAgICAgICAgIGFuaW1hdGU6IDUwMCxcbiAgICAgICAgICAgICAgICBhY3RpdmU6IG9wZW4sXG4gICAgICAgICAgICAgICAgYWN0aXZhdGUgOiBmdW5jdGlvbiAoZXZlbnQsIHVpKSB7XG4gICAgICAgICAgICAgICAgICBpZigkKHVpLm5ld1BhbmVsKS5oYXNDbGFzcygndWktYWNjb3JkaW9uLWNvbnRlbnQtYWN0aXZlJykpIHtcbiAgICAgICAgICAgICAgICAgICAgJCh1aS5uZXdQYW5lbCkucHJldigpLmFkZENsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICQodWkub2xkUGFuZWwpLnNpYmxpbmdzKCkucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmKCQoXCIuYW1hX19leHBhbmQtbGlzdFwiKS5maW5kKCcudWktY2hlY2tib3hyYWRpby1jaGVja2VkJykubGVuZ3RoKSB7XG4gICAgICAgICAgICAgIGV4cGFuZExpc3RBY2NvcmRpb24oJy5hbWFfX2V4cGFuZC1saXN0JywgMCk7XG4gICAgICAgICAgICAgICQoXCIuYW1hX19leHBhbmQtbGlzdCAuYW1hX19leHBhbmQtbGlzdF9faGVhZGVyXCIpLmZpcnN0KCkuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgZXhwYW5kTGlzdEFjY29yZGlvbignLmFtYV9fZXhwYW5kLWxpc3QnLCBmYWxzZSk7XG4gICAgICAgICAgICAgICQoXCIuYW1hX19leHBhbmQtbGlzdFwiKS5jaGlsZHJlbignLmFtYV9fZXhwYW5kLWxpc3RfX2hlYWRlcicpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gQ29sbGFwc2UgYWxsIGFjY29yZGlvbiBwYW5lbHNcbiAgICAgICAgICAgICQoJy5hbWFfX2ZpbHRlcl9fY29sbGFwc2UtcGFuZWxzIGJ1dHRvbicpLmNsaWNrKGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICQoJy5hbWFfX2V4cGFuZC1saXN0IC51aS1hY2NvcmRpb24taGVhZGVyJykuZWFjaCggZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgaWYoJCh0aGlzKS5oYXNDbGFzcygndWktc3RhdGUtYWN0aXZlJykgfHwgJCh0aGlzKS5oYXNDbGFzcygnYWN0aXZlJykpIHtcbiAgICAgICAgICAgICAgICAgICQodGhpcykuY2xpY2soKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIC8vIE9wZW4gYWNjb3JkaW9uIHBhbmVscyBmb3IgbW9iaWxlXG4gICAgICAgICAgICAkKCcuYW1hX19hcHBsaWVkLWZpbHRlcnNfX3Nob3ctZmlsdGVycycpLnVuYmluZCgnY2xpY2snKS5jbGljayhmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAkKCcuYW1hX19leHBhbmQtbGlzdCwgLmFtYV9fYXBwbGllZC1maWx0ZXJzX190YWdzJykuc2xpZGVUb2dnbGUoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgJCgnLmFtYV9fYXBwbGllZC1maWx0ZXJzX19zaG93LWZpbHRlcnMnKS50ZXh0KCQodGhpcykuaXMoJzp2aXNpYmxlJykgPyAnSGlkZSBGaWx0ZXInIDogJ0ZpbHRlcicpO1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBmdW5jdGlvbiBsaXN0RmlsdGVyKGlucHV0LCBsaXN0KSB7IC8vIGhlYWRlciBpcyBhbnkgZWxlbWVudCwgbGlzdCBpcyBhbiB1bm9yZGVyZWQgbGlzdFxuICAgICAgICAgICAgICAvLyBjdXN0b20gY3NzIGV4cHJlc3Npb24gZm9yIGEgY2FzZS1pbnNlbnNpdGl2ZSBjb250YWlucygpXG4gICAgICAgICAgICAgIGpRdWVyeS5leHByWyc6J10uQ29udGFpbnMgPSBmdW5jdGlvbihhLGksbSl7XG4gICAgICAgICAgICAgICAgcmV0dXJuIChhLnRleHRDb250ZW50IHx8IGEuaW5uZXJUZXh0IHx8IFwiXCIpLnRvVXBwZXJDYXNlKCkuaW5kZXhPZihtWzNdLnRvVXBwZXJDYXNlKCkpPj0wO1xuICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICQoaW5wdXQpLmNoYW5nZSggZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHZhciBmaWx0ZXIgPSAkKHRoaXMpLnZhbCgpO1xuICAgICAgICAgICAgICAgIGlmKGZpbHRlcikge1xuICAgICAgICAgICAgICAgICAgLy8gdGhpcyBmaW5kcyBhbGwgbGlua3MgaW4gYSBsaXN0IHRoYXQgY29udGFpbiB0aGUgaW5wdXQsXG4gICAgICAgICAgICAgICAgICAvLyBhbmQgaGlkZSB0aGUgb25lcyBub3QgY29udGFpbmluZyB0aGUgaW5wdXQgd2hpbGUgc2hvd2luZyB0aGUgb25lcyB0aGF0IGRvXG4gICAgICAgICAgICAgICAgICAkKGxpc3QpLmZpbmQoXCJzcGFuOm5vdCg6Q29udGFpbnMoXCIgKyBmaWx0ZXIgKyBcIikpXCIpLnBhcmVudCgpLmhpZGUoKTtcbiAgICAgICAgICAgICAgICAgICQobGlzdCkuZmluZChcInNwYW46Q29udGFpbnMoXCIgKyBmaWx0ZXIgKyBcIilcIikucGFyZW50KCkuc2hvdygpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAkKGxpc3QpLmZpbmQoXCJsYWJlbFwiKS5zaG93KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICAvLyBvbmx5IHNob3cgcmVzdWx0cyBhZnRlciAzIGNoYXJhY3RlcnMgYXJlIGVudGVyZWRcbiAgICAgICAgICAgICAgfSkua2V5dXAoIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGlmKCB0aGlzLnZhbHVlLmxlbmd0aCA8IDQgKSByZXR1cm47XG4gICAgICAgICAgICAgICAgJCh0aGlzKS5jaGFuZ2UoKTtcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsaXN0RmlsdGVyKCQoXCIjYW1hX19zZWFyY2hfX2xvY2F0aW9uXCIpLCAkKFwiLmFtYV9fZm9ybS1ncm91cFwiKSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0pKGpRdWVyeSk7XG4gICAgfVxuICB9O1xufSkoalF1ZXJ5LCBEcnVwYWwpO1xuIiwiLyoqXG4gKiBAZmlsZVxuICogUmliYm9uIG5hdiB1c2VyIGludGVyYWN0aW9ucy5cbiAqXG4gKiBKYXZhU2NyaXB0IHNob3VsZCBiZSBtYWRlIGNvbXBhdGlibGUgd2l0aCBsaWJyYXJpZXMgb3RoZXIgdGhhbiBqUXVlcnkgYnlcbiAqIHdyYXBwaW5nIGl0IHdpdGggYW4gJ2Fub255bW91cyBjbG9zdXJlJy4gU2VlOlxuICogLSBodHRwczovL2RydXBhbC5vcmcvbm9kZS8xNDQ2NDIwXG4gKiAtIGh0dHA6Ly93d3cuYWRlcXVhdGVseWdvb2QuY29tLzIwMTAvMy9KYXZhU2NyaXB0LU1vZHVsZS1QYXR0ZXJuLUluLURlcHRoXG4gKi9cbihmdW5jdGlvbiAoJCwgRHJ1cGFsKSB7XG5cbiAgRHJ1cGFsLmJlaGF2aW9ycy5yaWJib25uYXYgPSB7XG4gICAgYXR0YWNoOiBmdW5jdGlvbiAoY29udGV4dCwgc2V0dGluZ3MpIHtcblxuICAgICAgLy8gTmVlZHMgZG9jIHJlYWR5IGJlY2F1c2UgdGhlIGFkbWluIHRvb2xiYXIgbmVlZHMgdG8gZ2V0IGxvYWRlZCB0byBkZXRlcm1pbmUgdGhlIHRvcCBzcGFjaW5nIGZvciBzdGlja3kgbmF2XG4gICAgICAkKGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgJGJvZHlGaXhlZCA9ICQoJ2JvZHknKS5jc3MoJ292ZXJmbG93Jyk7XG5cbiAgICAgICAgaWYoJGJvZHlGaXhlZCA9PT0gJ2hpZGRlbicpIHtcbiAgICAgICAgICAkKCcuYW1hX19tYWluLW5hdmlnYXRpb24nKS51bnN0aWNrKCk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9IGVsc2UgaWYoJCh3aW5kb3cpLndpZHRoKCkgPCA3NjggKSB7IC8vIElmIGxlc3MgdGhhbiB0YWJsZXRcbiAgICAgICAgICAkKCcuYW1hX19tYWluLW5hdmlnYXRpb24nKS5zdGlja3koe3pJbmRleDogNTAxfSk7XG4gICAgICAgIH0gZWxzZSBpZigkKCcudG9vbGJhci10cmF5JykuaGFzQ2xhc3MoJ3Rvb2xiYXItdHJheS1ob3Jpem9udGFsJykpIHtcbiAgICAgICAgICAkKCcuYW1hX19tYWluLW5hdmlnYXRpb24gJykuc3RpY2t5KHsgekluZGV4OiA1MDEsIHRvcFNwYWNpbmc6IDcyIH0pO1xuICAgICAgICB9IGVsc2UgaWYoJCgnLnRvb2xiYXItdHJheScpLmhhc0NsYXNzKCd0b29sYmFyLXRyYXktdmVydGljYWwnKSkge1xuICAgICAgICAgICQoJy5hbWFfX21haW4tbmF2aWdhdGlvbiAnKS5zdGlja3koeyB6SW5kZXg6IDUwMSwgdG9wU3BhY2luZzogMzkgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgJCgnLmFtYV9fbWFpbi1uYXZpZ2F0aW9uICcpLnN0aWNreSh7IHpJbmRleDogNTAxIH0pO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgJCgnLmFtYV9fcmliYm9uX19kcm9wZG93bicpLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgY2xhc3NfYWN0aXZlID0gJ2lzLWFjdGl2ZSc7XG5cbiAgICAgICAgJCgnLmFtYV9fcmliYm9uX19kcm9wZG93bl9fdHJpZ2dlcicsIHRoaXMpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgIC8vIFVuZm9jdXMgb24gdGhlIGRyb3Bkb3duLlxuICAgICAgICAgICQodGhpcykuYmx1cigpO1xuICAgICAgICAgIC8vIEFkZCBvdXIgY2xhc3MgZm9yIENTUy5cbiAgICAgICAgICAkKHRoaXMpLnRvZ2dsZUNsYXNzKGNsYXNzX2FjdGl2ZSk7XG4gICAgICAgICAgLy8gQWRkIG91ciBjbGFzcyB0byB0aGUgZHJvcGRvd24gVUwuXG4gICAgICAgICAgJCh0aGlzKS5jaGlsZHJlbigpLnRvZ2dsZUNsYXNzKGNsYXNzX2FjdGl2ZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICQoZG9jdW1lbnQpLmNsaWNrKCBmdW5jdGlvbigpe1xuICAgICAgICAgICQoJy5hbWFfX3JpYmJvbl9fZHJvcGRvd25fX3RyaWdnZXInLCB0aGlzKS5yZW1vdmVDbGFzcyhjbGFzc19hY3RpdmUpLmNoaWxkcmVuKCkucmVtb3ZlQ2xhc3MoY2xhc3NfYWN0aXZlKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH07XG59KShqUXVlcnksIERydXBhbCk7XG4iLCIvKipcbiAqIEBmaWxlXG4gKiBTdWJjYXRlZ29yeVxuICpcbiAqIEphdmFTY3JpcHQgc2hvdWxkIGJlIG1hZGUgY29tcGF0aWJsZSB3aXRoIGxpYnJhcmllcyBvdGhlciB0aGFuIGpRdWVyeSBieVxuICogd3JhcHBpbmcgaXQgd2l0aCBhbiBcImFub255bW91cyBjbG9zdXJlXCIuIFNlZTpcbiAqIC0gaHR0cHM6Ly9kcnVwYWwub3JnL25vZGUvMTQ0NjQyMFxuICogLSBodHRwOi8vd3d3LmFkZXF1YXRlbHlnb29kLmNvbS8yMDEwLzMvSmF2YVNjcmlwdC1Nb2R1bGUtUGF0dGVybi1Jbi1EZXB0aFxuICovXG4oZnVuY3Rpb24gKCQsIERydXBhbCkge1xuICBEcnVwYWwuYmVoYXZpb3JzLnN1YmNhdGVnb3JpZXMgPSB7XG4gICAgYXR0YWNoOiBmdW5jdGlvbiAoY29udGV4dCwgc2V0dGluZ3MpIHtcblxuICAgICAgLy8gQ3JlYXRlIHN0YXRpYyB2YXIgZm9yIHN1YmNhdGVnb3J5IGl0ZW0gY291bnQuIFRvIGJlIHVzZWQgZm9yIGRldGVybWluaW5nIHdoZXRoZXIgcmVjYWxjdWxhdGlvbnMgYXJlIG5lZWRlZC5cbiAgICAgIHZhciBzdWJjYXRlZ29yeUV4cGxvcmF0aW9uQ29sdW1ucyA9IDA7XG5cbiAgICAgIGZ1bmN0aW9uIGNoZWNrU2l6ZSgpIHtcbiAgICAgICAgdmFyICRzdWJjYXRlZ29yeSA9ICQoJy5hbWFfX3N1YmNhdGVnb3J5LWV4cGxvcmF0aW9uX19zdWJjYXRlZ29yeScpO1xuICAgICAgICB2YXIgJHN1YmNhdGVnb3J5Q29udGFpbmVyID0gJCgnLmFtYV9fc3ViY2F0ZWdvcnktZXhwbG9yYXRpb24td2l0aC1pbWFnZXNfX2NvbnRhaW5lcicpO1xuICAgICAgICB2YXIgJHN1YmNhdGVnb3J5VGl0bGUgPSAkKCcuYW1hX19zdWJjYXRlZ29yeS1leHBsb3JhdGlvbi13aXRoLWltYWdlc19fdGl0bGUnKTtcbiAgICAgICAgLy8gV2Ugd2FudCB0aGUgd2lkdGggbWludXMgcGFkZGluZyBzbyB1c2Ugd2lkdGgoKSBpbnN0ZWFkIG9mIGlubmVyV2lkdGgoKS5cbiAgICAgICAgdmFyIHN1YmNhdGVnb3J5RXhwbG9yYXRpb25XaWR0aCA9ICQoJy5hbWFfX3N1YmNhdGVnb3J5LWV4cGxvcmF0aW9uLXdpdGgtaW1hZ2VzJykud2lkdGgoKTtcbiAgICAgICAgLy8gU3ViY2F0ZWdvcnkgaXRlbXMgaGF2ZSBtYXgtd2lkdGggb2YgMTgwcHguIFRoaXMgd2lsbCBiZSB1c2VkIGZvciBjYWxjdWxhdGlvbnMgaW5zdGVhZCBvZiBleHRyYWN0aW5nIGl0IHZpYSBqUXVlcnkgY2FsbHMuXG4gICAgICAgIHZhciBzdWJjYXRlZ29yeUl0ZW1XaWR0aCA9IDE4MDtcbiAgICAgICAgdmFyIHN1YmNhdGVnb3J5VGl0bGVXaWR0aCA9ICRzdWJjYXRlZ29yeVRpdGxlLm91dGVyV2lkdGgoKTtcbiAgICAgICAgdmFyIHRvdGFsR3JpZEl0ZW1zID0gJHN1YmNhdGVnb3J5Lmxlbmd0aCArIDE7XG4gICAgICAgIC8vIFN0YXJ0IGNvbHVtbiBjb3VudCBhcyBsb3dlc3QgcG9zc2libGUuXG4gICAgICAgIHZhciBjb2x1bW5Db3VudCA9IDI7XG4gICAgICAgIC8vIFNldCBzdWJjYXRlZ29yeSByb3cgaXRlbXMgdG8gbG93ZXN0IHRoYXQgc2hvdWxkIGRpc3BsYXkuXG4gICAgICAgIHZhciBzdWJjYXRlZ29yeUl0ZW1zUGVyUm93ID0gTWF0aC5mbG9vcigoc3ViY2F0ZWdvcnlFeHBsb3JhdGlvbldpZHRoIC0gc3ViY2F0ZWdvcnlUaXRsZVdpZHRoKSAvIHN1YmNhdGVnb3J5SXRlbVdpZHRoKTtcblxuICAgICAgICBpZiAoc3ViY2F0ZWdvcnlJdGVtc1BlclJvdyA8IDIpIHtcbiAgICAgICAgICAvLyBUaGUgbWluaW11bSBzdWJjYXRlZ29yeSBpdGVtcyBwZXIgcm93IHNob3VsZCBiZSB0d28uIElmIHRoZSB2YXJpYWJsZSBjb21wdXRlZCB0byBsZXNzLCBtYW51YWxseSBjb3JyZWN0IGl0LlxuICAgICAgICAgIHN1YmNhdGVnb3J5SXRlbXNQZXJSb3cgPSAyO1xuICAgICAgICAgIHRvdGFsR3JpZEl0ZW1zID0gdG90YWxHcmlkSXRlbXMgLSAxO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbHVtbkNvdW50ID0gc3ViY2F0ZWdvcnlJdGVtc1BlclJvdyArIDE7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBEZXRlcm1pbmUgaWYgY2hhbmdlcyBpbiBjb2x1bW4gY291bnQgaGFzIG9jY3VycmVkIGFuZCBhY3QgYWNjb3JkaW5nbHlcbiAgICAgICAgaWYgKHN1YmNhdGVnb3J5RXhwbG9yYXRpb25Db2x1bW5zICE9PSBjb2x1bW5Db3VudCkge1xuICAgICAgICAgIC8vIERldGVybWluZSBhZGRpdGlvbmFsIFwiZmlsbGVyLWJveFwiIG5lZWRlZCB0byBjcmVhdGUgY29tcGxldGUgcm93XG4gICAgICAgICAgdmFyIGZpbGxlckJveENvdW50ID0gY29sdW1uQ291bnQgLSAodG90YWxHcmlkSXRlbXMgJSBjb2x1bW5Db3VudCk7XG4gICAgICAgICAgZmlsbEdyaWRSb3coJHN1YmNhdGVnb3J5Q29udGFpbmVyLCBmaWxsZXJCb3hDb3VudCk7XG4gICAgICAgICAgLy8gVXBkYXRlIHBlcnNpc3RlbnQgY29sdW1uIGNvdW50XG4gICAgICAgICAgc3ViY2F0ZWdvcnlFeHBsb3JhdGlvbkNvbHVtbnMgPSBjb2x1bW5Db3VudDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFVwZGF0ZSB2aWV3YWJsZSBzdWJjYXRlZ29yaWVzLlxuICAgICAgICAkc3ViY2F0ZWdvcnkuaGlkZSgpO1xuICAgICAgICAkc3ViY2F0ZWdvcnkuc2xpY2UoMCwgc3ViY2F0ZWdvcnlJdGVtc1BlclJvdykuY3NzKCdkaXNwbGF5JywgJ2lubGluZS1ibG9jaycpO1xuXG4gICAgICAgIHZpZXdNb3JlKCk7XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIHZpZXdNb3JlKCkge1xuICAgICAgICB2YXIgJHZpZXdMZXNzID0gJCgnLmFtYV9fc3ViY2F0ZWdvcnktZXhwbG9yYXRpb24td2l0aC1pbWFnZXNfX3ZpZXctbGVzcycpO1xuICAgICAgICB2YXIgJHZpZXdNb3JlID0gJCgnLmFtYV9fc3ViY2F0ZWdvcnktZXhwbG9yYXRpb24td2l0aC1pbWFnZXNfX3ZpZXctYWxsJyk7XG4gICAgICAgIHZhciAkc3ViY2F0ZWdvcnkgPSAkKCcuYW1hX19zdWJjYXRlZ29yeS1leHBsb3JhdGlvbl9fc3ViY2F0ZWdvcnknKTtcbiAgICAgICAgdmFyICRzdWJjYXRlZ29yeUNvbnRhaW5lciA9ICQoJy5hbWFfX3N1YmNhdGVnb3J5LWV4cGxvcmF0aW9uLXdpdGgtaW1hZ2VzX19jb250YWluZXInKTtcblxuICAgICAgICAkdmlld0xlc3MuaGlkZSgpO1xuICAgICAgICAkdmlld01vcmUuc2hvdygpO1xuXG4gICAgICAgICQoJy52aWV3QWxsJykuY2xpY2soZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgJHN1YmNhdGVnb3J5LmZhZGVJbigpO1xuICAgICAgICAgICR2aWV3TW9yZS5oaWRlKCk7XG4gICAgICAgICAgJHN1YmNhdGVnb3J5Q29udGFpbmVyLmFkZENsYXNzKCdleHBhbmRlZCcpO1xuICAgICAgICAgICR2aWV3TGVzcy5zaG93KCk7XG5cbiAgICAgICAgfSk7XG5cbiAgICAgICAgJCgnLnZpZXdMZXNzJykuY2xpY2soZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgJHN1YmNhdGVnb3J5LmhpZGUoKTtcbiAgICAgICAgICBjaGVja1NpemUoKTtcbiAgICAgICAgICAkdmlld0xlc3MuaGlkZSgpO1xuICAgICAgICAgICRzdWJjYXRlZ29yeUNvbnRhaW5lci5yZW1vdmVDbGFzcygnZXhwYW5kZWQnKTtcbiAgICAgICAgICAkdmlld01vcmUuc2hvdygpO1xuICAgICAgICB9KTtcbiAgICAgIH1cblxuXG4gICAgICBmdW5jdGlvbiBmaWxsR3JpZFJvdygkY29udGFpbmVyLCBjb3VudCkge1xuICAgICAgICB2YXIgZmlsbGVyQm94ID0gJzxkaXYgY2xhc3M9XCJmaWxsZXItYm94XCI+PC9kaXY+JztcbiAgICAgICAgLy8gY2xlYXIgb3V0IGN1cnJlbnQgZmlsbGVyIGJveGVzXG4gICAgICAgIHZhciAkZmlsbGVyQm94ZXMgPSAkY29udGFpbmVyLmZpbmQoJy5maWxsZXItYm94Jyk7XG4gICAgICAgICRmaWxsZXJCb3hlcy5yZW1vdmUoKTtcbiAgICAgICAgLy8gZmlsbCBvdXQgZ3JpZCByb3dcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjb3VudDsgaSsrKSB7XG4gICAgICAgICAgJGNvbnRhaW5lci5hcHBlbmQoZmlsbGVyQm94KTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBydW4gdGVzdCBvbiBpbml0aWFsIHBhZ2UgbG9hZFxuICAgICAgY2hlY2tTaXplKCk7XG5cbiAgICAgIC8vIHJ1biB0ZXN0IG9uIHJlc2l6ZSBvZiB0aGUgd2luZG93XG4gICAgICAkKHdpbmRvdykucmVzaXplKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY2hlY2tTaXplKCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH07XG59KShqUXVlcnksIERydXBhbCk7XG4iLCIvKipcbiAqIEBmaWxlXG4gKiBTdWJjYXRlZ29yeVxuICpcbiAqIEphdmFTY3JpcHQgc2hvdWxkIGJlIG1hZGUgY29tcGF0aWJsZSB3aXRoIGxpYnJhcmllcyBvdGhlciB0aGFuIGpRdWVyeSBieVxuICogd3JhcHBpbmcgaXQgd2l0aCBhbiBcImFub255bW91cyBjbG9zdXJlXCIuIFNlZTpcbiAqIC0gaHR0cHM6Ly9kcnVwYWwub3JnL25vZGUvMTQ0NjQyMFxuICogLSBodHRwOi8vd3d3LmFkZXF1YXRlbHlnb29kLmNvbS8yMDEwLzMvSmF2YVNjcmlwdC1Nb2R1bGUtUGF0dGVybi1Jbi1EZXB0aFxuICovXG4oZnVuY3Rpb24gKCQsIERydXBhbCkge1xuICBEcnVwYWwuYmVoYXZpb3JzLnN1YmNhdGVnb3JpZXNFeHBsb3JhdGlvbiA9IHtcbiAgICBhdHRhY2g6IGZ1bmN0aW9uKGNvbnRleHQsIHNldHRpbmdzKSB7XG5cbiAgICAgIHZhciAkc3ViY2F0ZWdvcnlMaXN0Q29udGFpbmVyID0gJCgnLmFtYV9fc3ViY2F0ZWdvcnktZXhwbG9yYXRpb25fX2xpc3QnKTtcbiAgICAgIHZhciAkc3ViY2F0ZWdvcnlMaXN0ICA9ICQoJy5hbWFfX3N1YmNhdGVnb3J5LWV4cGxvcmF0aW9uX19saXN0IHVsJyk7XG4gICAgICB2YXIgJHN1YmNhdGVnb3J5TGlzdEV4cGFuZGVyID0gJCgnLmFtYV9fc3ViY2F0ZWdvcnktZXhwbG9yYXRpb25fX3Nob3ctbW9yZScpO1xuICAgICAgdmFyICRzdWJjYXRlZ29yeUxpc3RDb250YWluZXJIZWlnaHQgPSAkc3ViY2F0ZWdvcnlMaXN0Q29udGFpbmVyLm91dGVySGVpZ2h0KCkgKyAzO1xuICAgICAgdmFyICRzdWJjYXRlZ29yeUxpc3RMaW5rVGV4dCA9ICQoJy5hbWFfX3N1YmNhdGVnb3J5LWV4cGxvcmF0aW9uX190ZXh0Jyk7XG4gICAgICB2YXIgJGluaXRpYWxXaW5kb3dXaWR0aCA9ICQod2luZG93KS53aWR0aCgpO1xuXG4gICAgICAvLyBEZXRlcm1pbmUgd2hlbiB0byBzaG93IGxpbmsgYmFzZWQgb24gd2luZG93IHNpemUuXG4gICAgICAkKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbiAoKSB7XG4gICAgICAgIGZ1bmN0aW9uIHNob3dIaWRlTW9yZUxpbmsgKCkge1xuICAgICAgICAgIC8vIFNldCBpbnRpYWwgd2luZG93IHdpZHRoIHRvIDEwMjQgcGl4ZWwuXG4gICAgICAgICAgLy8gQHRvZG86IENoZWNrIGlmIHRoaXMgaXMgYW4gaXNzdWUgdG8gc2V0IDEwMjQgd2lkdGggbGltaXQuXG4gICAgICAgICAgaWYgKCRpbml0aWFsV2luZG93V2lkdGggPD0gMTAyNCkge1xuICAgICAgICAgICAgLy8gSWYgdGhlIHVub3JkZXJlZCBsaXN0IG91dGVySGVpZ2h0IGlzIGdyZWF0ZXIgdGhhbiB0aGUgcGFyZW50IGNvbnRhaW5lciB0aGVuIHNob3cgdGhlIHNob3cgbW9yZSBsaW5rLFxuICAgICAgICAgICAgLy8gaGlkZSBvdGhlcndpc2UuXG4gICAgICAgICAgICBpZiAoJHN1YmNhdGVnb3J5TGlzdC5vdXRlckhlaWdodCgpID4gJHN1YmNhdGVnb3J5TGlzdENvbnRhaW5lckhlaWdodCkge1xuICAgICAgICAgICAgICAkc3ViY2F0ZWdvcnlMaXN0RXhwYW5kZXIuc2hvdygpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCRzdWJjYXRlZ29yeUxpc3Qub3V0ZXJIZWlnaHQoKSA8ICRzdWJjYXRlZ29yeUxpc3RDb250YWluZXJIZWlnaHQpIHtcbiAgICAgICAgICAgICAgJHN1YmNhdGVnb3J5TGlzdEV4cGFuZGVyLmhpZGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKCRpbml0aWFsV2luZG93V2lkdGggIT09ICQod2luZG93KS53aWR0aCgpKSB7XG4gICAgICAgICAgICAvLyBJZiB0aGUgdW5vcmRlcmVkIGxpc3Qgb3V0ZXJIZWlnaHQgaXMgZ3JlYXRlciB0aGFuIHRoZSBwYXJlbnQgY29udGFpbmVyIHRoZW4gc2hvdyB0aGUgc2hvdyBtb3JlIGxpbmtcbiAgICAgICAgICAgIGlmICgkc3ViY2F0ZWdvcnlMaXN0Lm91dGVySGVpZ2h0KCkgPiAkc3ViY2F0ZWdvcnlMaXN0Q29udGFpbmVySGVpZ2h0KSB7XG4gICAgICAgICAgICAgICRzdWJjYXRlZ29yeUxpc3RFeHBhbmRlci5zaG93KCk7XG5cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICRzdWJjYXRlZ29yeUxpc3RFeHBhbmRlci5oaWRlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgc2hvd0hpZGVNb3JlTGluaygpO1xuICAgICAgICAgICQod2luZG93KS5yZXNpemUoc2hvd0hpZGVNb3JlTGluayk7XG4gICAgICB9KTtcblxuXG4gICAgICAvLyBEcnVwYWwgY29tcGVscyBtZSB0byB1bmJpbmQgY2xpY2tzIG90aGVyd2lzZSBkb3VibGUgY2xpY2tzIG9jY3VyXG4gICAgICAkc3ViY2F0ZWdvcnlMaXN0RXhwYW5kZXIudW5iaW5kKCdjbGljaycpLmNsaWNrKGZ1bmN0aW9uKGUpe1xuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgLy8gQ2hlY2tzIHRvIHNlZSBpZiB0aGUgY29udGFpbmVyIGhhcyBiZWVuIGV4cGFuZCBvciBub3QgYnkgY29tcGFyaW5nIGluaXRpYWwgb3V0ZXJIZWlnaHQgdG8gY3VycmVudCBvdXRlckhlaWdodFxuICAgICAgICBpZigkc3ViY2F0ZWdvcnlMaXN0Q29udGFpbmVyLm91dGVySGVpZ2h0KCkgPiAkc3ViY2F0ZWdvcnlMaXN0Q29udGFpbmVySGVpZ2h0KSB7XG4gICAgICAgICAgJHN1YmNhdGVnb3J5TGlzdENvbnRhaW5lci5yZW1vdmVDbGFzcygnYW1hX19zdWJjYXRlZ29yeS1leHBsb3JhdGlvbl9fbGlzdC0tZXhwYW5kZWQnKTtcbiAgICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdhbWFfX3N1YmNhdGVnb3J5LWV4cGxvcmF0aW9uX19zaG93LW1vcmUtLWV4cGFuZGVkJyk7XG4gICAgICAgICAgJHN1YmNhdGVnb3J5TGlzdExpbmtUZXh0LnRleHQoJ1ZpZXcgYWxsIHN1YmNhdGVnb3JpZXMnKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAkc3ViY2F0ZWdvcnlMaXN0Q29udGFpbmVyLmFkZENsYXNzKCdhbWFfX3N1YmNhdGVnb3J5LWV4cGxvcmF0aW9uX19saXN0LS1leHBhbmRlZCcpO1xuICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2FtYV9fc3ViY2F0ZWdvcnktZXhwbG9yYXRpb25fX3Nob3ctbW9yZS0tZXhwYW5kZWQnKTtcbiAgICAgICAgICAkc3ViY2F0ZWdvcnlMaXN0TGlua1RleHQudGV4dCgnVmlldyBmZXdlciBzdWJjYXRlZ29yaWVzJyk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcbn0pKGpRdWVyeSwgRHJ1cGFsKTtcblxuIiwiLyoqXG4gKiBAZmlsZVxuICogSW50ZXJhY3Rpb25zIGZvciB3YXlmaW5kZXIuXG4gKlxuICogSmF2YVNjcmlwdCBzaG91bGQgYmUgbWFkZSBjb21wYXRpYmxlIHdpdGggbGlicmFyaWVzIG90aGVyIHRoYW4galF1ZXJ5IGJ5XG4gKiB3cmFwcGluZyBpdCB3aXRoIGFuIFwiYW5vbnltb3VzIGNsb3N1cmVcIi4gU2VlOlxuICogLSBodHRwczovL2RydXBhbC5vcmcvbm9kZS8xNDQ2NDIwXG4gKiAtIGh0dHA6Ly93d3cuYWRlcXVhdGVseWdvb2QuY29tLzIwMTAvMy9KYXZhU2NyaXB0LU1vZHVsZS1QYXR0ZXJuLUluLURlcHRoXG4gKi9cbihmdW5jdGlvbiAoJCwgRHJ1cGFsKSB7XG4gIERydXBhbC5iZWhhdmlvcnMud2F5ZmluZGVyID0ge1xuICAgIGF0dGFjaDogZnVuY3Rpb24gKGNvbnRleHQsIHNldHRpbmdzKSB7XG4gICAgICAoZnVuY3Rpb24gKCQpIHtcbiAgICAgICAgaWYoJC5jb29raWUoJ2FtYV93YXlmaW5kZXJfY29va2llJykpIHtcbiAgICAgICAgICAkLmNvb2tpZS5qc29uID0gdHJ1ZTtcbiAgICAgICAgICAvLyBSZWFkIHdheWZpbmRlciBjb29raWVzIHNldCBmcm9tIGFtYS1hc3NuIGRvbWFpbnNcbiAgICAgICAgICB2YXIgYW1hX3dheWZpbmRlcl9jb29raWUgPSAkLmNvb2tpZSgnYW1hX3dheWZpbmRlcl9jb29raWUnKTtcbiAgICAgICAgICBpZiAodHlwZW9mIGFtYV93YXlmaW5kZXJfY29va2llICE9PSAndW5kZWZpbmVkJyB8fCAkKCcucmVmZXJyZWQnKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAkKCcuYW1hX193YXlmaW5kZXItLXJlZmVycmVyIGEnKS5mYWRlSW4oKS5jc3MoJ2Rpc3BsYXknLCAnZmxleCcpO1xuICAgICAgICAgICAgJCgnLmFtYV9fd2F5ZmluZGVyLS1yZWZlcnJlciBhJykuYXR0cihcImhyZWZcIiwgYW1hX3dheWZpbmRlcl9jb29raWVbMV0pO1xuICAgICAgICAgICAgJCgnLmFtYV9fd2F5ZmluZGVyLS1yZWZlcnJlciBhJykudGV4dChhbWFfd2F5ZmluZGVyX2Nvb2tpZVswXSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICQoJy5hbWFfd2F5ZmluZGVyX3JlZmVycmVyLS1saW5rLWJhY2snKS5mYWRlT3V0KCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KShqUXVlcnkpO1xuICAgIH1cbiAgfTtcbn0pKGpRdWVyeSwgRHJ1cGFsKTtcbiIsIi8qPT09PT09IGpRdWVyeSBVSSB0YWJzID09PT09PSovXG5cblxuKGZ1bmN0aW9uICgkLCBEcnVwYWwpIHtcbiAgRHJ1cGFsLmJlaGF2aW9ycy5hbWFfdGFicyA9IHtcbiAgICBhdHRhY2g6IGZ1bmN0aW9uIChjb250ZXh0LCBzZXR0aW5ncykge1xuICAgICAgdmFyIGRlZmF1bHRBY3RpdmVUYWIgPSAwO1xuICAgICAgdmFyIHZpZXdwb3J0V2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDtcbiAgICAgIGlmICh2aWV3cG9ydFdpZHRoID49IDYwMCAmJiAkKCcuYW1hX19yZXNvdXJjZS10YWJzJykubGVuZ3RoID4gMCkge1xuICAgICAgICBkZWZhdWx0QWN0aXZlVGFiID0gMTtcbiAgICAgIH1cblxuICAgICAgJChcIi5hbWFfX3RhYnMsIC5hbWFfX3Jlc291cmNlLXRhYnNcIikudGFicyh7XG4gICAgICAgIGFjdGl2ZTogZGVmYXVsdEFjdGl2ZVRhYixcbiAgICAgICAgYWN0aXZhdGU6IHJlbW92ZUhpZ2hsaWdodHNcbiAgICAgIH0pO1xuXG4gICAgICAvLyBQcmV2ZW50IGp1bXAgb25jbGlja1xuICAgICAgJCgnLnVpLXRhYnMtYW5jaG9yJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9KTtcblxuXG4gICAgICAvL1NpbXVsYXRlIGNsaWNrIGV2ZW50IG9uIGFjdHVhbCBzaW1wbGVUYWJzIHRhYiBmcm9tIG1vYmlsZSBkcm9wIGRvd24uXG4gICAgICAkKCcuYW1hX190YWJzLW5hdmlnYXRpb24tLW1vYmlsZSBzZWxlY3QnKS5vbihcInNlbGVjdG1lbnVjaGFuZ2VcIiwgZnVuY3Rpb24gKGV2ZW50LCB1aSkge1xuICAgICAgICB2YXIgc2VsZWN0ZWRWYWx1ZSA9IHVpLml0ZW0udmFsdWU7XG4gICAgICAgICQoJ2FbaHJlZj1cIiMnICsgc2VsZWN0ZWRWYWx1ZSArICdcIl0nKS5jbGljaygpO1xuICAgICAgfSk7XG5cbiAgICAgIC8vIFdoZW4gY2xpY2tpbmcgYW4gaW5saW5lIHJlc291cmNlIHBhZ2UgbGluayByZWZlcmVuY2luZyBhIHRhYiwgb3BlbiByZWZlcmVuY2VkIHRhYi5cbiAgICAgICQoJy5hbWFfX3Jlc291cmNlLWxpbmstLWlubGluZSwgLmFtYV9fcGFnZS0tcmVzb3VyY2VfX3Jlc291cmNlLWxpbmsnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xuXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICB2YXIgJHRhYnMgPSAkKCcuYW1hX19yZXNvdXJjZS10YWJzJyk7XG4gICAgICAgIHN3aXRjaFRhYnMoJHRhYnMsIHRoaXMpO1xuICAgICAgICAvLyBTdG9wIGJ1YmJsaW5nIGFuZCBkZWZhdWx0IGFjdGlvbnNcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfSk7XG5cbiAgICAgIGZ1bmN0aW9uIHJlbW92ZUhpZ2hsaWdodHMoKSB7XG4gICAgICAgICQoJy5hbWFfcmVzb3VyY2UtaGVhZGVyLS1oaWdobGlnaHQnKS5yZW1vdmVDbGFzcygnYW1hX3Jlc291cmNlLWhlYWRlci0taGlnaGxpZ2h0Jyk7XG4gICAgICB9XG5cbiAgICAgIC8qXG4gICAgICAgKiBUaGlzIGZ1bmN0aW9uIGFuaW1hdGVzIHRoZSBicm93c2VyIHNjcm9sbCBhY3Rpb24gd2l0aCBhdHRlbnRpb24gdG8ga2V5Ym9hcmQgb25seSBhY2Nlc3NpYmlsaXR5IGNvbmNlcm5zXG4gICAgICAgKlxuICAgICAgICogQHBhcmFtIHtqUXVlcnkgT2JqZWN0fSAkdGFiTmF2XG4gICAgICAgKiBAcGFyYW0ge2pRdWVyeSBPYmplY3R9ICR0YXJnZXRcbiAgICAgICAqL1xuICAgICAgZnVuY3Rpb24gc21vb3RoU2Nyb2xsKCR0YWJOYXYsIHRhYkhhc2gsIHBvc2l0aW9uSW5UYWIpIHtcbiAgICAgICAgdmFyIHNjcm9sbFRhcmdldCA9IHdpbmRvdy5pbm5lcldpZHRoID49IDEyMDAgPyAnLmFtYV9fcmVzb3VyY2UtdGFic19fY29udGVudCcgOiAnaHRtbCxib2R5JztcblxuICAgICAgICAvLyBSZW1vdmUgcHJldmlvdXMgaGlnaGxpZ2h0cywgaWYgYW55XG4gICAgICAgIHJlbW92ZUhpZ2hsaWdodHMoKTtcblxuICAgICAgICAvLyBUcnkgdG8gZmluZCB0YXJnZXQgZWxlbWVudCBvZmZzZXQsIGJ1dCBkZWZhdWx0IHRvIHplcm9cbiAgICAgICAgdmFyIHNjcm9sbFBvc2l0aW9uID0gMDtcbiAgICAgICAgdmFyICR0YXJnZXQ7XG4gICAgICAgIGlmIChwb3NpdGlvbkluVGFiICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICB2YXIgdGFiRWxlbWVudHMgPSAkKHRhYkhhc2ggKyAnIC5hbWFfX3Jlc291cmNlLXRhYnNfX2l0ZW0nKTtcbiAgICAgICAgICBpZiAodGFiRWxlbWVudHMubGVuZ3RoKSB7XG4gICAgICAgICAgICAvLyBJZiBkZXNpcmVkIHBvc2l0aW9uIGlzIGxhcmdlciB0aGFuIHRoZSByZXN1bHQgc2V0LCB1c2UgdGhlIGxhc3QgZWxlbWVudFxuICAgICAgICAgICAgaWYgKHRhYkVsZW1lbnRzLmxlbmd0aCA8PSBwb3NpdGlvbkluVGFiKSB7XG4gICAgICAgICAgICAgIHBvc2l0aW9uSW5UYWIgPSB0YWJFbGVtZW50cy5sZW5ndGg7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBVc2VycyBhcmUgaW5zdHJ1Y3RlZCB0byBjb25zaWRlciAxIGFzIHRoZSBmaXJzdCBlbGVtZW50XG4gICAgICAgICAgICB2YXIgdGFyZ2V0ID0gdGFiRWxlbWVudHNbcG9zaXRpb25JblRhYiAtIDFdO1xuICAgICAgICAgICAgc2Nyb2xsUG9zaXRpb24gPSB0YXJnZXQub2Zmc2V0VG9wO1xuICAgICAgICAgICAgLy8gQWRkIGhpZ2hsaWdodCB0byB0YXJnZXRcbiAgICAgICAgICAgICR0YXJnZXQgPSAkKHRhcmdldCkuZmluZCgnLmFtYV9yZXNvdXJjZS1oZWFkZXInKTsgLy8gc2F2ZSBmb3IgdXNlIGluIGFuaW1hdGUoKSBjYWxsYmFja1xuICAgICAgICAgICAgJHRhcmdldC5hZGRDbGFzcygnYW1hX3Jlc291cmNlLWhlYWRlci0taGlnaGxpZ2h0Jyk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICR0YXJnZXQgPSAkKHRhYkhhc2gpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAkKHNjcm9sbFRhcmdldCkuYW5pbWF0ZSh7XG4gICAgICAgICAgc2Nyb2xsVG9wOiBzY3JvbGxQb3NpdGlvblxuICAgICAgICB9LCA4NTAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAvLyBVcGRhdGUgZm9jdXMgZm9yIGtleWJvYXJkIG9ubHkgbmF2aWdhdGlvblxuICAgICAgICAgICR0YXJnZXQuYXR0cigndGFiaW5kZXgnLCAnLTEnKS5mb2N1cygpO1xuICAgICAgICB9KTtcblxuICAgICAgICAvLyBTdG9wIGJ1YmJsaW5nIGFuZCBkZWZhdWx0IGFjdGlvbnNcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuXG4gICAgICAvKlxuICAgICAgICogVGhpcyBmdW5jdGlvbiBvcGVucyByZWZlcmVuY2VkIHRhYnMgZnJvbSBpbmxpbmUgbGlua3NcbiAgICAgICAqXG4gICAgICAgKiBAcGFyYW0ge2pRdWVyeSBPYmplY3R9ICR0YWJPYmogVGhlIGVsZW1lbnQgd2hpY2ggaGFzIHRoZSAudGFiKCkgZnVuY3Rpb24gYXR0YWNoZWQuXG4gICAgICAgKiBAcGFyYW0ge0VsZW1lbnR9IGxpbmtcbiAgICAgICAqL1xuICAgICAgZnVuY3Rpb24gc3dpdGNoVGFicygkdGFiT2JqLCBsaW5rKSB7XG5cbiAgICAgICAgdmFyIGxpbmtIYXNoID0gbGluay5nZXRBdHRyaWJ1dGUoXCJocmVmXCIpO1xuICAgICAgICB2YXIgd2lkZ2V0ID0gJHRhYk9iai5kYXRhKCd1aS10YWJzJyk7XG5cbiAgICAgICAgdmFyIHRhYkhhc2gsIHBvc2l0aW9uSW5UYWI7XG4gICAgICAgIHZhciBwYXJ0cyA9IGxpbmtIYXNoLnNwbGl0KCctJyk7XG4gICAgICAgIHRhYkhhc2ggPSBwYXJ0c1swXTtcbiAgICAgICAgaWYgKHBhcnRzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICBwb3NpdGlvbkluVGFiID0gcGFydHNbMV07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gSWYgb2xkIGxpbmssIHRyeSB0byBkZXRlcm1pbmUgcG9zaXRpb24gZnJvbSBsaW5rIHRleHRcbiAgICAgICAgICB2YXIgbWF0Y2hlcyA9IGxpbmsuaW5uZXJUZXh0Lm1hdGNoKC8oWzAtOV0rKS9nKTtcbiAgICAgICAgICBpZiAobWF0Y2hlcykge1xuICAgICAgICAgICAgcG9zaXRpb25JblRhYiA9IG1hdGNoZXMuc2hpZnQoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBFbnN1cmUgY29ycmVjdCB0YWIgaXMgYWN0aXZlXG4gICAgICAgIHZhciB0YWJJbmRleCA9IHdpZGdldC5fZ2V0SW5kZXgodGFiSGFzaCk7XG4gICAgICAgICR0YWJPYmoudGFicyh7XG4gICAgICAgICAgYWN0aXZlOiB0YWJJbmRleFxuICAgICAgICB9KTtcblxuICAgICAgICAvLyBTY3JvbGwgdG8gdG9wIG9mIHVpIHRhYnMgbmF2aWdhdGlvblxuICAgICAgICBzbW9vdGhTY3JvbGwoJHRhYk9iaiwgdGFiSGFzaCwgcG9zaXRpb25JblRhYik7XG5cbiAgICAgICAgLy8gU3RvcCBidWJibGluZyBhbmQgZGVmYXVsdCBhY3Rpb25zXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG59KShqUXVlcnksIERydXBhbCk7XG4iLCIvKj09PT09PSBqUXVlcnkgVUkgYWNjb3JkaW9uID09PT09PSovXG5cbihmdW5jdGlvbigkKSB7XG4gICAgJCggXCIuYW1hX19hY2NvcmRpb25cIiApLmFjY29yZGlvbih7XG4gICAgICAgIGhlaWdodFN0eWxlOiBcImNvbnRlbnRcIixcbiAgICAgICAgY29sbGFwc2libGU6IHRydWUsXG4gICAgICAgIGFjdGl2ZTogZmFsc2VcbiAgICB9KTtcbn0pKGpRdWVyeSk7XG4iLCIoZnVuY3Rpb24gKCQsIERydXBhbCkge1xuICB2YXIgdmVyaWZ5RmllbGRzID0gZnVuY3Rpb24oZm9ybSkge1xuICAgIHZhciAkc2VjdGlvbnMgPSBmb3JtLmZpbmQoJ3NlY3Rpb24nKTtcbiAgICB2YXIgJGlucHV0cyA9ICQoJy53ZWJmb3JtLXN1Ym1pc3Npb24tZm9ybSBzZWN0aW9uIConKS5maWx0ZXIoJzppbnB1dCcpO1xuICAgIHZhciAkaWNvbkVsZW1lbnQgPSAkKCcuYW1hX19mb3JtLXN0ZXBzX19pY29uJyk7XG4gICAgdmFyIGVycm9yU2VjdGlvbnMgPSBbXTtcblxuICAgICRpbnB1dHMuZWFjaChmdW5jdGlvbihpLCBpbnB1dCkge1xuICAgICAgJGNsb3Nlc3RTZWN0aW9uID0gJCh0aGlzKS5jbG9zZXN0KCdzZWN0aW9uJykuYXR0cignZGF0YS1kcnVwYWwtc2VsZWN0b3InKS50b1N0cmluZygpO1xuICAgICAgaWYgKCQodGhpcykucHJvcCgncmVxdWlyZWQnKSAmJiAkKHRoaXMpLmhhc0NsYXNzKCdlcnJvcicpKSB7XG4gICAgICAgIGVycm9yU2VjdGlvbnMucHVzaCgkY2xvc2VzdFNlY3Rpb24pO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgJHNlY3Rpb25zLmVhY2goZnVuY3Rpb24oaSwgc2VjdGlvbikge1xuICAgICAgaWYgKCQuaW5BcnJheSgkKHRoaXMpLmF0dHIoJ2RhdGEtZHJ1cGFsLXNlbGVjdG9yJykudHJpbSgpLnRvU3RyaW5nKCksIGVycm9yU2VjdGlvbnMpICE9PSAtMSkge1xuICAgICAgICAkKHRoaXMpLmZpbmQoJGljb25FbGVtZW50KS5yZW1vdmVDbGFzcygnZWRpdCBlcnJvciBjb21wbGV0ZWQnKS5hZGRDbGFzcygnZXJyb3InKTtcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICAkKHRoaXMpLmZpbmQoJGljb25FbGVtZW50KS5yZW1vdmVDbGFzcygnZWRpdCBlcnJvciBjb21wbGV0ZWQnKS5hZGRDbGFzcygnY29tcGxldGVkJyk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgZnVuY3Rpb24gdmFsaWRhdGVFbWFpbChlbWFpbCkge1xuICAgIHZhciBlbWFpbFJlZyA9IC9eKFtcXHctXFwuXStAKFtcXHctXStcXC4pK1tcXHctXXsyLDR9KT8kLztcbiAgICByZXR1cm4gZW1haWxSZWcudGVzdChlbWFpbCk7XG4gIH1cblxuICBmdW5jdGlvbiBmaWVsZElzUmVxdWlyZWQoaW5wdXQpIHtcbiAgICBpbnB1dC5hZGRDbGFzcygnZXJyb3InKTtcbiAgICBpbnB1dC5uZXh0KCkucmVtb3ZlKCcuZm9ybS1pdGVtLS1lcnJvci1tZXNzYWdlJyk7XG4gICAgaW5wdXQuYWZ0ZXIoJzxkaXYgY2xhc3M9XCJmb3JtLWl0ZW0tLWVycm9yLW1lc3NhZ2VcIj5GaWVsZCBpcyByZXF1aXJlZC48L2Rpdj4nKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNoZWNrRmllbGQoaW5wdXQpIHtcbiAgICBpZiAoaW5wdXQucHJvcCgncmVxdWlyZWQnKSAmJiAoaW5wdXQudmFsKCkubGVuZ3RoID09PSAwIHx8IGlucHV0LnZhbCgpID09PSBcIlwiKSkge1xuICAgICAgZmllbGRJc1JlcXVpcmVkKGlucHV0KTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBpZiAoaW5wdXQuYXR0cigndHlwZScpID09PSAnZW1haWwnICYmICF2YWxpZGF0ZUVtYWlsKGlucHV0LnZhbCgpKSkge1xuICAgICAgICBmaWVsZElzUmVxdWlyZWQoaW5wdXQpO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIGlucHV0LnJlbW92ZUNsYXNzKCdlcnJvcicpLm5leHQoKS5yZW1vdmUoJy5mb3JtLWl0ZW0tLWVycm9yLW1lc3NhZ2UnKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvLyBTdWJtaXRzIGZpcnN0IHBhZ2Ugb2YgQ29udGFjdCBVcyBmb3JtIG9uIHJhZGlvIGJ1dHRvbiBzZWxlY3Rpb25cbiAgJC5mbi5jb250YWN0U3VibWl0ID0gZnVuY3Rpb24oKXtcbiAgICB2YXIgJHdlYmZvcm1fYnV0dG9ucyA9ICQoJy53ZWJmb3JtLXN1Ym1pc3Npb24tY29udGFjdC11cy1mb3JtIGlucHV0W3R5cGU9XCJyYWRpb1wiXScpO1xuICAgICR3ZWJmb3JtX2J1dHRvbnMuYmluZCgnY2xpY2snLCBmdW5jdGlvbihlKSB7XG4gICAgICAkKCcud2ViZm9ybS1zdWJtaXNzaW9uLWNvbnRhY3QtdXMtZm9ybScpLnN1Ym1pdCgpO1xuICAgIH0pO1xuICB9XG4gICQuZm4uY29udGFjdFN1Ym1pdCgpO1xuICAkKCBkb2N1bWVudCApLmFqYXhDb21wbGV0ZShmdW5jdGlvbigpIHtcbiAgICAkLmZuLmNvbnRhY3RTdWJtaXQoKTtcbiAgfSk7XG5cbiAgLy8gR28gYmFjayB0byBwcmV2aW91cyBiYWNrIGlzIHVzZXIgY2xpY2tzIGRlY2xpbmUgc3VibWl0IGJ1dHRvblxuICAkKCcuYW1hX19idXR0b24tLWRlY2xpbmUnKS5jbGljayhmdW5jdGlvbihlKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgaWYgKGRvY3VtZW50LnJlZmVycmVyID09PSBcIlwiKSB7XG4gICAgICBkb2N1bWVudC5sb2NhdGlvbi5ocmVmPScvJztcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBoaXN0b3J5LmJhY2soKTtcbiAgICB9XG4gIH0pO1xuXG4gIHZhciBpbml0aWFsTG9hZCA9IHRydWU7XG5cbiAgRHJ1cGFsLmJlaGF2aW9ycy53ZWJGb3JtID0ge1xuICAgIGRldGFjaDogZnVuY3Rpb24gKGNvbnRleHQsIHNldHRpbmdzLCB0cmlnZ2VyKSB7XG4gICAgICBpZiAodHJpZ2dlciA9PT0gJ3NlcmlhbGl6ZScpIHtcbiAgICAgICAgaW5pdGlhbExvYWQgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9LFxuICAgIGF0dGFjaDogZnVuY3Rpb24gKGNvbnRleHQsIHNldHRpbmdzKSB7XG4gICAgICBpZiAoIWluaXRpYWxMb2FkKSB7XG4gICAgICAgIGlmICghY29udGV4dC5pbm5lclRleHQubWF0Y2goXCJFcnJvciBtZXNzYWdlXCIpKSB7XG4gICAgICAgICAgJCgnLmFtYV9fc2FsZXMtbGFuZGluZy1wYWdlX19mb3JtX19oZWFkaW5nJykuaGlkZSgpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgICQudmFsaWRhdG9yLmFkZE1ldGhvZChcbiAgICAgICAgXCJyZWdleFwiLFxuICAgICAgICBmdW5jdGlvbih2YWx1ZSwgZWxlbWVudCwgcmVnZXhwKSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMub3B0aW9uYWwoZWxlbWVudCkgfHwgcmVnZXhwLnRlc3QodmFsdWUpO1xuICAgICAgICB9LFxuICAgICAgICBcIlBsZWFzZSBjaGVjayB5b3VyIGlucHV0LlwiXG4gICAgICApO1xuXG4gICAgICAvLyBPbiB3ZWJmb3JtIHN1Ym1pdCBjaGVjayB0byBzZWUgaWYgYWxsIGlucHV0cyBhcmUgdmFsaWRcbiAgICAgICQoJy53ZWJmb3JtLXN1Ym1pc3Npb24tZm9ybScpLnZhbGlkYXRlKHtcbiAgICAgICAgaWdub3JlOiBbXSxcbiAgICAgICAgcnVsZXM6IHtcbiAgICAgICAgICAnZW1haWwnOiB7XG4gICAgICAgICAgICBlbWFpbDogdHJ1ZVxuICAgICAgICAgIH0sXG4gICAgICAgICAgJ3RlbGVwaG9uZSc6IHtcbiAgICAgICAgICAgICdyZWdleCc6IC9eKFxcK1xcZHsxLDJ9XFxzKT9cXCg/XFxkezN9XFwpP1tcXHMuLV0/XFxkezN9W1xccy4tXT9cXGR7NH0kL1xuICAgICAgICAgIH0sXG4gICAgICAgICAgJ2JpcnRoX3llYXInOiB7XG4gICAgICAgICAgICAncmVnZXgnOiAvXigxOXwyMClcXGR7Mn0kL1xuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgZXJyb3JQbGFjZW1lbnQ6IGZ1bmN0aW9uKGVycm9yLCBlbGVtZW50KSB7XG4gICAgICAgICAgaWYgKGVsZW1lbnQuYXR0cihcInR5cGVcIikgPT09IFwiY2hlY2tib3hcIikge1xuICAgICAgICAgICAgZXJyb3IuaW5zZXJ0QWZ0ZXIoZWxlbWVudC5wYXJlbnQoKS5zaWJsaW5ncygpLmxhc3QoKSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGVsc2UgaWYgKGVsZW1lbnQuaXMoXCJzZWxlY3RcIikpIHtcbiAgICAgICAgICAgIGVycm9yLmluc2VydEFmdGVyKGVsZW1lbnQubmV4dCgpKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBlcnJvci5pbnNlcnRBZnRlcihlbGVtZW50KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGludmFsaWRIYW5kbGVyOiBmdW5jdGlvbihmb3JtLCB2YWxpZGF0b3IpIHtcbiAgICAgICAgICB2YXIgZXJyb3JzID0gdmFsaWRhdG9yLm51bWJlck9mSW52YWxpZHMoKTtcbiAgICAgICAgICBpZiAoZXJyb3JzKSB7XG4gICAgICAgICAgICAkKCcuYW1hX19mb3JtLXN0ZXBzX19pY29uJykuYWRkQ2xhc3MoJ2Vycm9yJyk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYoJCgnLmpzLWZvcm0tdHlwZS1yYWRpbycpLmZpbmQoJ2xhYmVsLmVycm9yJykubGVuZ3RoICE9PSAwKSB7XG4gICAgICAgICAgICAkKCcuanMtZm9ybS10eXBlLXJhZGlvIGxhYmVsLmVycm9yJykucGFyZW50cygnLmZpZWxkc2V0LXdyYXBwZXInKS5hZGRDbGFzcygnZXJyb3InKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICAvLyBDaGVjayB0byBzZWUgaWYgaW5wdXRzIGFyZSB2YWxpZFxuICAgICAgJCgnLndlYmZvcm0tc3VibWlzc2lvbi1mb3JtIGlucHV0JykuY2hhbmdlKGZ1bmN0aW9uKCkge1xuICAgICAgICAkKCcud2ViZm9ybS1zdWJtaXNzaW9uLWZvcm0gbGFiZWwuZXJyb3InKS5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGlmKCAkKHRoaXMpLnRleHQoKSAhPT0gJycpIHtcbiAgICAgICAgICAgICQoJy5hbWFfX2Zvcm0tc3RlcHNfX2ljb24nKS5hZGRDbGFzcygnZXJyb3InKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAkKCcuYW1hX19mb3JtLXN0ZXBzX19pY29uJykucmVtb3ZlQ2xhc3MoJ2Vycm9yJyk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgICAvLyBBZGQgdmFsaWRhdGlvbiB0byBzZWxlY3QgZHJvcGRvd24gbWVudXMgdXNpbmcgalF1ZXJ5IFVJXG4gICAgICAkKCcud2ViZm9ybS1zdWJtaXNzaW9uLWZvcm0gc2VsZWN0Jykuc2VsZWN0bWVudSh7XG4gICAgICAgIHN0eWxlOiAnZHJvcGRvd24nLFxuICAgICAgICB0cmFuc2ZlckNsYXNzZXM6IHRydWUsXG4gICAgICAgIHdpZHRoOiBudWxsLFxuICAgICAgICBjaGFuZ2U6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICQoXCIud2ViZm9ybS1zdWJtaXNzaW9uLWZvcm1cIikudmFsaWRhdGUoKS5lbGVtZW50KHRoaXMpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH07XG59KShqUXVlcnksIERydXBhbCk7XG4iLCIoZnVuY3Rpb24gKCQsIERydXBhbCkge1xuXG4gIERydXBhbC5iZWhhdmlvcnMuYW1hX21haW5OYXZpZ2F0aW9uID0ge1xuICAgIGF0dGFjaDogZnVuY3Rpb24gKGNvbnRleHQsIHNldHRpbmdzKSB7XG5cbiAgICAgIHZhciAkY2F0ZWdvcnlOYXZXcmFwcGVyID0gJCgnLmFtYV9jYXRlZ29yeV9uYXZpZ2F0aW9uX3dyYXBwZXInKSxcbiAgICAgICAgICAkY2F0ZWdvcnlOYXZpZ2F0aW9uTWVudSA9ICQoJy5hbWFfY2F0ZWdvcnlfbmF2aWdhdGlvbl9tZW51JyksXG4gICAgICAgICAgJGNhdGVnb3J5TmF2aWdhdGlvbk1lbnVHcm91cCA9ICQoJy5hbWFfY2F0ZWdvcnlfbmF2aWdhdGlvbl9tZW51X19ncm91cCcpLFxuICAgICAgICAgICRtb2JpbGVTZWFyY2hUcmlnZ2VyID0gJCgnLmdsb2JhbC1zZWFyY2gtdHJpZ2dlcicpLFxuICAgICAgICAgICRtb2JpbGVTZWFyY2ggPSAkKCcuYW1hX19nbG9iYWwtc2VhcmNoJyksXG4gICAgICAgICAgJG1haW5OYXYgPSAkKCcuYW1hX19tYWluLW5hdmlnYXRpb24gJyksXG4gICAgICAgICAgJHByb2R1Y3ROYXYgPSAkKCcuYW1hX19wcm9kdWN0LW5hdicpLFxuICAgICAgICAgICRzdWJNZW51ID0gJCgnLmFtYV9jYXRlZ29yeV9uYXZpZ2F0aW9uX21lbnVfX3N1Ym1lbnUnKSxcbiAgICAgICAgICAkc3ViTWVudUFydGljbGUgPSAkKCcuYW1hX2NhdGVnb3J5X25hdmlnYXRpb25fbWVudV9fYXJ0aWNsZXMnKSxcbiAgICAgICAgICB2aWV3cG9ydEhlaWdodCA9IDAsXG4gICAgICAgICAgcHJvZHVjdE5hdkhlaWdodCA9IDAsXG4gICAgICAgICAgY2F0ZWdvcnlOYXZNZW51SGVpZ2h0ID0gJCgnLmFtYV9jYXRlZ29yeV9uYXZpZ2F0aW9uX21lbnUnKS5vdXRlckhlaWdodCgpLFxuICAgICAgICAgIGNhdGVnb3J5TmF2TWVudVJlc2l6ZWRIZWlnaHQgPSAwLFxuICAgICAgICAgIHdpbmRvd1dpZHRoID0gJCh3aW5kb3cpLndpZHRoKCk7XG5cbiAgICAgIC8vIENoZWNrcyBpZiB1c2VyIGFnZW50IGlzIGEgbW9iaWxlIGRldmljZVxuICAgICAgdmFyIGRldmljZUFnZW50ID0gbmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpO1xuICAgICAgdmFyIGFnZW50SUQgPSBkZXZpY2VBZ2VudC5tYXRjaCgvKGFuZHJvaWR8d2Vib3N8aXBob25lfGlwb2R8YmxhY2tiZXJyeSkvKSAmJiB3aW5kb3dXaWR0aCA8IDc2ODtcblxuICAgICAgaWYoJHByb2R1Y3ROYXYubGVuZ3RoICYmICRwcm9kdWN0TmF2LmlzKCc6dmlzaWJsZScpICl7XG4gICAgICAgIHByb2R1Y3ROYXZIZWlnaHQgPSAkcHJvZHVjdE5hdi5oZWlnaHQoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHByb2R1Y3ROYXZIZWlnaHQgPSAwO1xuICAgICAgfVxuXG4gICAgICAgIC8vIENhbGN1bGF0ZSB3aGV0aGVyIG9yIG5vdCB0aGUgY2F0ZWdvcnkgbmF2IHNob3VsZCBoYXZlIHNjcm9sbGJhcnNcbiAgICAgIGZ1bmN0aW9uIGNhdGVnb3J5TmF2SGVpZ2h0KHJlc2l6ZVZpZXdwb3J0SGVpZ2h0KSB7XG5cbiAgICAgICAgLy8gQ2hlY2sgdG8gc2VlIGlmIHZpZXdwb3J0IGhlaWdodCBpcyBwYXNzZWQgYmFjayB3aGVuIHRoZSB3aW5kb3cgZ2V0cyByZXNpemVkXG4gICAgICAgIGlmKHR5cGVvZiByZXNpemVWaWV3cG9ydEhlaWdodCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICB2aWV3cG9ydEhlaWdodCA9IHJlc2l6ZVZpZXdwb3J0SGVpZ2h0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIFdpbmRvdyBoZWlnaHQgaXMgdXNlZCBieSBkZWZhdWx0XG4gICAgICAgICAgdmlld3BvcnRIZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQgPyB3aW5kb3cuaW5uZXJIZWlnaHQgOiAkKHdpbmRvdykuaGVpZ2h0KCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBTdWJ0cmFjdCB0aGUgbmF2aWdhdGlvbiBoZWlnaHQgZnJvbSB3aW5kb3cgaGVpZ2h0IHRvIGFzc2VzcyBjb250ZW50IGhlaWdodFxuICAgICAgICBjYXRlZ29yeU5hdk1lbnVSZXNpemVkSGVpZ2h0ID0gdmlld3BvcnRIZWlnaHQ7XG4gICAgICAgIC8vIENoZWNrIHRvIHNlZSBpZiBtYWluIG1lbnUgcHVycGxlIGRyb3Bkb3duIGhlaWdodCBpcyBsYXJnZXIgdGhhbiB2aWV3cG9ydCBoZWlnaHRcbiAgICAgICAgaWYgKGNhdGVnb3J5TmF2TWVudUhlaWdodCArICRtYWluTmF2Lm91dGVySGVpZ2h0KCkgKyBwcm9kdWN0TmF2SGVpZ2h0ID4gdmlld3BvcnRIZWlnaHQgJiYgIWFnZW50SUQpIHtcblxuICAgICAgICAgIC8vIFNldCB0aGUgbWVudSBkcm9wZG93biB0aGUgc2FtZSBhcyB2aWV3cG9ydCB0byBlbmFibGUgc2Nyb2xsaW5nXG4gICAgICAgICAgdmFyIGNhdGVnb3J5TmF2TWVudUhlaWdodFJlc2l6ZWQgPSBjYXRlZ29yeU5hdk1lbnVSZXNpemVkSGVpZ2h0IC0gJG1haW5OYXYub3V0ZXJIZWlnaHQoKSAtIHByb2R1Y3ROYXZIZWlnaHQ7XG4gICAgICAgICAgJGNhdGVnb3J5TmF2aWdhdGlvbk1lbnVHcm91cC5hZGRDbGFzcygnc2Nyb2xsJykub3V0ZXJIZWlnaHQoY2F0ZWdvcnlOYXZNZW51SGVpZ2h0UmVzaXplZCk7XG5cbiAgICAgICAgICAkY2F0ZWdvcnlOYXZpZ2F0aW9uTWVudUdyb3VwLm9uKCdzaG93LnNtYXBpJywgZnVuY3Rpb24oZSwgbWVudSkge1xuICAgICAgICAgICAgaWYoJCgnLmFtYV9jYXRlZ29yeV9uYXZpZ2F0aW9uX21lbnVfX3N1Ym1lbnUnLCBtZW51KS5vdXRlckhlaWdodCgpID4gY2F0ZWdvcnlOYXZNZW51SGVpZ2h0UmVzaXplZCkge1xuICAgICAgICAgICAgICAkKCcuYW1hX2NhdGVnb3J5X25hdmlnYXRpb25fbWVudV9fc3VibWVudScsIG1lbnUpLm91dGVySGVpZ2h0KGNhdGVnb3J5TmF2TWVudUhlaWdodFJlc2l6ZWQpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZigkKCcuYW1hX2NhdGVnb3J5X25hdmlnYXRpb25fbWVudV9fYXJ0aWNsZXMnLCBtZW51KS5vdXRlckhlaWdodCgpID4gY2F0ZWdvcnlOYXZNZW51SGVpZ2h0UmVzaXplZCkge1xuICAgICAgICAgICAgICAkKCcuYW1hX2NhdGVnb3J5X25hdmlnYXRpb25fbWVudV9fYXJ0aWNsZXMnLCBtZW51KS5vdXRlckhlaWdodChjYXRlZ29yeU5hdk1lbnVIZWlnaHRSZXNpemVkKS5hZGRDbGFzcygnb25lX2FydGljbGUnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAkY2F0ZWdvcnlOYXZpZ2F0aW9uTWVudUdyb3VwLnJlbW92ZUNsYXNzKCdzY3JvbGwnKS5vdXRlckhlaWdodCgnYXV0bycpO1xuICAgICAgICAgICRzdWJNZW51Lm91dGVySGVpZ2h0KCdhdXRvJyk7XG4gICAgICAgICAgJHN1Yk1lbnVBcnRpY2xlLm91dGVySGVpZ2h0KCdhdXRvJyk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuXG4gICAgICAvLyBIaWRlL1Nob3cgbWVudVxuICAgICAgZnVuY3Rpb24gaGlkZVNob3coKSB7XG4gICAgICAgIGlmICgkKCcjZ2xvYmFsLW1lbnUnKS5wcm9wKCdjaGVja2VkJykpIHtcbiAgICAgICAgICAkY2F0ZWdvcnlOYXZpZ2F0aW9uTWVudS5zbGlkZURvd24oZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKChjYXRlZ29yeU5hdk1lbnVIZWlnaHQgKyAgJG1haW5OYXYub3V0ZXJIZWlnaHQoKSArIHByb2R1Y3ROYXZIZWlnaHQpID4gdmlld3BvcnRIZWlnaHQpIHtcbiAgICAgICAgICAgICAgYm9keVNjcm9sbExvY2suZGlzYWJsZUJvZHlTY3JvbGwoJGNhdGVnb3J5TmF2aWdhdGlvbk1lbnVHcm91cCwge1xuICAgICAgICAgICAgICAgIGFsbG93VG91Y2hNb3ZlOiBmdW5jdGlvbiBhbGxvd1RvdWNoTW92ZShlbCkge1xuICAgICAgICAgICAgICAgICAgd2hpbGUgKGVsICYmIGVsICE9PSBkb2N1bWVudC5ib2R5KSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlbC5nZXRBdHRyaWJ1dGUoJ2JvZHktc2Nyb2xsLWxvY2staWdub3JlJykgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbCA9IGVsLnBhcmVudE5vZGU7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGFnZW50SUQpIHtcbiAgICAgICAgICAgICAgLy8gT25seSBtYWtlIHRoZSBtZW51IGhlaWdodCBzYW1lIGFzIHZpZXdwb3J0IG9uIG1vYmlsZSBkZXZpY2VzXG4gICAgICAgICAgICAgIHZhciBtb2JpbGVIZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQgPyB3aW5kb3cuaW5uZXJIZWlnaHQgOiAkKHdpbmRvdykuaGVpZ2h0KCk7XG4gICAgICAgICAgICAgICRjYXRlZ29yeU5hdldyYXBwZXIuaGVpZ2h0KG1vYmlsZUhlaWdodCkuYWRkQ2xhc3MoJ3Njcm9sbCcpO1xuXG4gICAgICAgICAgICAgICRjYXRlZ29yeU5hdmlnYXRpb25NZW51R3JvdXAub24oJ3Nob3cuc21hcGknLCBmdW5jdGlvbihlLCBtZW51KSB7XG4gICAgICAgICAgICAgICAgaWYoJChtZW51KS5vdXRlckhlaWdodCgpID4gbW9iaWxlSGVpZ2h0KSB7XG4gICAgICAgICAgICAgICAgICAkKG1lbnUpLm91dGVySGVpZ2h0KG1vYmlsZUhlaWdodCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgJCh0aGlzKS5wYXJlbnQoKS5oZWlnaHQoJ2F1dG8nKTtcbiAgICAgICAgICAgICAgY2F0ZWdvcnlOYXZIZWlnaHQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAkY2F0ZWdvcnlOYXZpZ2F0aW9uTWVudS5zbGlkZVVwKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICQodGhpcykucGFyZW50KCkuaGVpZ2h0KDApO1xuICAgICAgICAgICAgYm9keVNjcm9sbExvY2suY2xlYXJBbGxCb2R5U2Nyb2xsTG9ja3MoKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBDbG9zZXMgbWVudSBvbiBkb2MgbG9hZFxuICAgICAgJCgnI2dsb2JhbC1tZW51JykucHJvcCgnY2hlY2tlZCcsIGZhbHNlKTtcblxuICAgICAgJCgnLmFtYV9fZ2xvYmFsLW1lbnUnKS5jbGljayhmdW5jdGlvbiAoZSkge1xuICAgICAgICBoaWRlU2hvdygpO1xuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgfSk7XG5cbiAgICAgIC8vIElmIGEgdXNlciBjbGlja3Mgb3V0c2lkZSB0aGUgbWVudSB0aGVuIGNsb3NlIGl0XG4gICAgICAkKGRvY3VtZW50KS5jbGljayhmdW5jdGlvbiAoZSkge1xuICAgICAgICBpZiAoISRjYXRlZ29yeU5hdmlnYXRpb25NZW51LmlzKGUudGFyZ2V0KSAmJiAkY2F0ZWdvcnlOYXZpZ2F0aW9uTWVudS5oYXMoZS50YXJnZXQpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICQoJyNnbG9iYWwtbWVudScpLnByb3AoJ2NoZWNrZWQnLCBmYWxzZSk7XG4gICAgICAgICAgaGlkZVNob3coKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgICQoJG1vYmlsZVNlYXJjaFRyaWdnZXIpLnVuYmluZCgnY2xpY2snKS5jbGljayhmdW5jdGlvbiAoKSB7XG4gICAgICAgICRtb2JpbGVTZWFyY2guc2xpZGVUb2dnbGUoKTtcbiAgICAgIH0pO1xuXG4gICAgICBmdW5jdGlvbiBtb3ZlU29jaWFsU2hhcmVQb3NpdGlvbigpe1xuICAgICAgICB2YXIgbWFpbk5hdlBvc2l0aW9uID0gJCgnLmFtYV9fbWFpbi1uYXZpZ2F0aW9uIC5jb250YWluZXInKS5vZmZzZXQoKS5sZWZ0O1xuICAgICAgICB2YXIgJGFtYVNvY2lhbFNoYXJlID0gJCgnLmFtYV9fc29jaWFsLXNoYXJlJyk7XG5cbiAgICAgICAgLy8gQ2hlY2tzIHRvIHNlZSBpZiB0aGVyZSBpcyBlbm91Z2ggZm9yIHRoZSBzdGlja3kgbmF2XG4gICAgICAgIGlmKG1haW5OYXZQb3NpdGlvbiA+IDYwKSB7XG5cbiAgICAgICAgICB2YXIgc29jaWFsU3RpY2t5UG9zaXRpb24gPSBtYWluTmF2UG9zaXRpb24gLSA2MDtcbiAgICAgICAgICB2YXIgJHNvY2lhbEljb25zID0gJCgnLmFtYV9fbWFzdGhlYWRfX2NvbnRlbnRfX3NoYXJlJyk7XG5cbiAgICAgICAgICAvLyBDaGVjayB0byBzZWUgaWYgdmlld3BvcnQgd2lkdGggaXMgZ3JlYXRlciA4NTBweCB0aGVuIHRoZSBzb2NpYWwgaWNvbnMgd2lsbCBiZSBzdGlja3lcbiAgICAgICAgICBpZigkc29jaWFsSWNvbnMubGVuZ3RoICYmICQod2luZG93KS53aWR0aCgpID4gODUwKSB7XG4gICAgICAgICAgICAkc29jaWFsSWNvbnMuc3RpY2t5KHtcbiAgICAgICAgICAgICAgd3JhcHBlckNsYXNzTmFtZTogJ2FtYV9fbWFzdGhlYWRfX2NvbnRlbnRfX3NoYXJlLXdyYXBwZXInLFxuICAgICAgICAgICAgICB6SW5kZXg6IDUwMVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICRzb2NpYWxJY29ucy5vbignc3RpY2t5LXN0YXJ0JywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAkYW1hU29jaWFsU2hhcmUuYWRkQ2xhc3MoJ2FtYV9fc29jaWFsLXNoYXJlLS1maXhlZCcpLmNzcygnbGVmdCcsIHNvY2lhbFN0aWNreVBvc2l0aW9uKS5oaWRlKCkuZmFkZVRvKCdzbG93JywgMSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgJHNvY2lhbEljb25zLm9uKCdzdGlja3ktdXBkYXRlJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAkYW1hU29jaWFsU2hhcmUuYWRkQ2xhc3MoJ2FtYV9fc29jaWFsLXNoYXJlLS1maXhlZCcpLmhpZGUoKS5mYWRlVG8oJ3Nsb3cnLCAxKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAkc29jaWFsSWNvbnMub24oJ3N0aWNreS1lbmQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICQoJy5hbWFfX3NvY2lhbC1zaGFyZS0tZml4ZWQnKS5yZW1vdmVDbGFzcygnYW1hX19zb2NpYWwtc2hhcmUtLWZpeGVkJyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gSW5pdGlhbGl6ZSBnZXRTb2NpYWxTaGFyZSgpXG4gICAgICBtb3ZlU29jaWFsU2hhcmVQb3NpdGlvbigpO1xuXG4gICAgICAvLyBPbnNjcm9sbCBjaGVjayB0byBzZWUgaWYgc29jaWFsIGljb24gcG9zaXRpb24gaXMgZ3JlYXRlciB0aGFuIGZvb3RlciBwb3NpdGlvblxuICAgICAgdmFyIGRlYm91bmNlX3RpbWVyO1xuICAgICAgaWYoJCgnLmFtYV9fbWFzdGhlYWRfX2NvbnRlbnRfX3NoYXJlIC5hbWFfX3NvY2lhbC1zaGFyZScpLmlzKCc6dmlzaWJsZScpKSB7XG4gICAgICAgICQod2luZG93KS5zY3JvbGwoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgdmFyICRzb2NpYWxJY29ucyA9ICQoJy5hbWFfX21hc3RoZWFkX19jb250ZW50X19zaGFyZSAuYW1hX19zb2NpYWwtc2hhcmUnKTtcbiAgICAgICAgICB2YXIgc29jaWFsSWNvblBvc2l0aW9uQm90dG9tID0gJHNvY2lhbEljb25zLm9mZnNldCgpLnRvcCArICRzb2NpYWxJY29ucy5vdXRlckhlaWdodCgpO1xuICAgICAgICAgIHZhciBmb290ZXJQb3NpdGlvbiA9ICQoJ2Zvb3RlcicpLm9mZnNldCgpLnRvcDtcblxuICAgICAgICAgIGlmKGRlYm91bmNlX3RpbWVyKSB7XG4gICAgICAgICAgICB3aW5kb3cuY2xlYXJUaW1lb3V0KGRlYm91bmNlX3RpbWVyKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBkZWJvdW5jZV90aW1lciA9IHdpbmRvdy5zZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaWYoc29jaWFsSWNvblBvc2l0aW9uQm90dG9tID4gZm9vdGVyUG9zaXRpb24pIHtcbiAgICAgICAgICAgICAgJCgnLmFtYV9fbWFzdGhlYWRfX2NvbnRlbnRfX3NoYXJlJykuZmFkZU91dCgnZmFzdCcpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgJCgnLmFtYV9fbWFzdGhlYWRfX2NvbnRlbnRfX3NoYXJlJykuZmFkZUluKCdmYXN0Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSwgNTApO1xuICAgICAgICB9KTtcbiAgICAgIH1cblxuXG4gICAgICAkKHdpbmRvdykuc2Nyb2xsKGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgcmVzaXplVmlld3BvcnRIZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQgPyB3aW5kb3cuaW5uZXJIZWlnaHQgOiAkKHdpbmRvdykuaGVpZ2h0KCk7XG4gICAgICAgIGNhdGVnb3J5TmF2SGVpZ2h0KHJlc2l6ZVZpZXdwb3J0SGVpZ2h0KTtcbiAgICAgIH0pO1xuXG4gICAgICAvL0NoZWNrcyB0aGUgbGF5b3V0IHBvc2l0aW9uIG9mIGFydGljbGUgb24gd2luZG93IHJlc2l6ZSBhbmQgbW92ZXMgdGhlIHNvY2lhbCBpY29ucyBhY2NvcmRpbmdseVxuICAgICAgJCggd2luZG93ICkucmVzaXplKGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAoIWFnZW50SUQpIHtcbiAgICAgICAgICB2YXIgcmVzaXplVmlld3BvcnRIZWlnaHQgPSAkKHdpbmRvdykuaW5uZXJIZWlnaHQoKTtcbiAgICAgICAgICB2YXIgbWFpbk5hdlBvc2l0aW9uVXBkYXRlID0gJCgnLmFtYV9fbWFpbi1uYXZpZ2F0aW9uIC5jb250YWluZXInKS5vZmZzZXQoKS5sZWZ0IC0gMTAwO1xuXG4gICAgICAgICAgY2F0ZWdvcnlOYXZIZWlnaHQocmVzaXplVmlld3BvcnRIZWlnaHQpO1xuICAgICAgICAgICQoJy5hbWFfX3NvY2lhbC1zaGFyZS5hbWFfX3NvY2lhbC1zaGFyZS0tZml4ZWQnKS5jc3MoJ2xlZnQnLCBtYWluTmF2UG9zaXRpb25VcGRhdGUpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH07XG59KShqUXVlcnksIERydXBhbCk7XG5cblxuXG4iLCIvKipcbiAqIFNtYXJ0TWVudXMgalF1ZXJ5IFBsdWdpbiAtIHYxLjEuMCAtIFNlcHRlbWJlciAxNywgMjAxN1xuICogaHR0cDovL3d3dy5zbWFydG1lbnVzLm9yZy9cbiAqXG4gKiBDb3B5cmlnaHQgVmFzaWwgRGlua292LCBWYWRpa29tIFdlYiBMdGQuXG4gKiBodHRwOi8vdmFkaWtvbS5jb21cbiAqXG4gKiBMaWNlbnNlZCBNSVRcbiAqL1xuXG5cbmpRdWVyeSgnLmFtYV9jYXRlZ29yeV9uYXZpZ2F0aW9uX21lbnVfX2dyb3VwJykuc21hcnRtZW51cyh7XG4gIHN1YkluZGljYXRvcnNQb3M6ICdhcHBlbmQnXG59KTtcbiIsIihmdW5jdGlvbiAoJCwgRHJ1cGFsKSB7XG4gIERydXBhbC5iZWhhdmlvcnMuYW1hX3NpZ25Jbk1lbnUgPSB7XG4gICAgYXR0YWNoOiBmdW5jdGlvbiAoY29udGV4dCwgc2V0dGluZ3MpIHtcbiAgICAgIHZhciAkc2lnbkluRHJvcGRvd24gPSAkKCcuYW1hX19zaWduLWluLWRyb3Bkb3duJyk7XG4gICAgICB2YXIgJHNpZ25JbkRyb3Bkb3duTWVudSA9ICQoJy5hbWFfX3NpZ24taW4tZHJvcGRvd25fX21lbnUnKTtcbiAgICAgIHZhciAkc2lnbkluTGluayA9ICQoJy5hbWFfX3NpZ24taW4tZHJvcGRvd25fX3RleHQnKTtcbiAgICAgIHZhciAkZXhwbG9yZU1lbnUgPSAkKCcuYW1hX19leHBsb3JlLW1lbnUnKTtcbiAgICAgIHZhciAkZXhwbG9yZU1lbnVEcm9wZG93biA9ICQoJy5hbWFfX2V4cGxvcmUtbWVudV9fbWVudScpO1xuXG4gICAgICBmdW5jdGlvbiBkcm9wZG93bkRvd25NZW51KHBhcmVudEVsZW1lbnQsIG1lbnVFbGVtZW50KSB7XG4gICAgICAgcGFyZW50RWxlbWVudC51bmJpbmQoJ2NsaWNrJykuY2xpY2soZnVuY3Rpb24oZSl7XG4gICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAkKG1lbnVFbGVtZW50KS5zbGlkZVRvZ2dsZSgpO1xuICAgICAgICB9KTtcblxuICAgICAgICAvLyBTdG9wIGxpbmsgZnJvbSBmaXJpbmdcbiAgICAgICAgJHNpZ25JbkxpbmsuY2xpY2soZnVuY3Rpb24oZSkge1xuICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJChkb2N1bWVudCkuY2xpY2soZnVuY3Rpb24oZSkge1xuICAgICAgICAgIC8vIGlmIHRoZSB0YXJnZXQgb2YgdGhlIGNsaWNrIGlzbid0IHRoZSBjb250YWluZXIgbm9yIGEgZGVzY2VuZGFudCBvZiB0aGUgY29udGFpbmVyXG4gICAgICAgICAgaWYgKCFwYXJlbnRFbGVtZW50LmlzKGUudGFyZ2V0KSAmJiBwYXJlbnRFbGVtZW50LmhhcyhlLnRhcmdldCkubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAkKG1lbnVFbGVtZW50KS5zbGlkZVVwKCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gU2V0IHRpbWVvdXQgZm9yIHdoZW4gYSB1c2VyIG1vdXNlcyBvdXQgb2YgdGhlIG1lbnVcbiAgICAgICAgICBwYXJlbnRFbGVtZW50Lm1vdXNlZW50ZXIoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIGNsZWFyVGltZW91dCgpO1xuICAgICAgICAgIH0pLm1vdXNlbGVhdmUoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgJChtZW51RWxlbWVudCkuc2xpZGVVcCgpO1xuICAgICAgICAgICAgfSwgMjAwMCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICBkcm9wZG93bkRvd25NZW51KCRzaWduSW5Ecm9wZG93biwgJHNpZ25JbkRyb3Bkb3duTWVudSk7XG4gICAgICBkcm9wZG93bkRvd25NZW51KCRleHBsb3JlTWVudSwgJGV4cGxvcmVNZW51RHJvcGRvd24pO1xuICAgIH1cbiAgfTtcbn0pKGpRdWVyeSwgRHJ1cGFsKTtcbiIsIihmdW5jdGlvbiAoJCwgRHJ1cGFsKSB7XG4gIERydXBhbC5iZWhhdmlvcnMuYW1hX3NlYXJjaF9jaGVja2JveCA9IHtcbiAgICBhdHRhY2g6IGZ1bmN0aW9uIChjb250ZXh0LCBzZXR0aW5ncykge1xuXG4gICAgICB2YXIgJGNhdGVnb3J5U2VhcmNoSW5wdXQgPSAkKCcjc2VhcmNoX2NhdGVnb3J5Jyk7XG4gICAgICB2YXIgJGNhdGVnb3J5U2VhcmNoTGlzdCA9ICQoJy5mYWNldHMtd2lkZ2V0LWNoZWNrYm94IHVsIGxpJyk7XG4gICAgICB2YXIgJGNsZWFyU2VhcmNoRmlsdGVyID0gJCgnI2FwcGxpZWRGaWx0ZXJzUmVtb3ZlJyk7XG5cbiAgICAgIC8vIEZpbHRlciBsaXN0IHVzaW5nIGpRdWVyeSBmaWx0ZXJcbiAgICAgIGZ1bmN0aW9uIGZpbHRlckxpc3Qoc2VhcmNoQm94LCBsaXN0KSB7XG4gICAgICAgIHNlYXJjaEJveC5rZXl1cChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgdmFyICRyZWdleCA9IG5ldyBSZWdFeHAodGhpcy52YWx1ZSwgJ2knKTtcbiAgICAgICAgICBsaXN0LmhpZGUoKS5maWx0ZXIoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuICRyZWdleC50ZXN0KCQudHJpbSgkKHRoaXMpLnRleHQoKSkpO1xuICAgICAgICAgIH0pLnNob3coKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIC8vIENsZWFyIGZpbHRlclxuICAgICAgZnVuY3Rpb24gY2xlYWZGaWx0ZXJMaXN0KGNsZWFyU2VhcmNoRmlsdGVyKSB7XG4gICAgICAgIGNsZWFyU2VhcmNoRmlsdGVyLmNsaWNrKGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICRjYXRlZ29yeVNlYXJjaElucHV0LnZhbCgnJyk7XG4gICAgICAgICAgJGNhdGVnb3J5U2VhcmNoSW5wdXQudHJpZ2dlcigna2V5dXAnKTtcblxuICAgICAgICAgICQoJy5mYWNldHMtd2lkZ2V0LWNoZWNrYm94IHVsIGxpIFt0eXBlPWNoZWNrYm94XScpLmVhY2goIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgJCh0aGlzKS5wcm9wKFwiY2hlY2tlZFwiLCBmYWxzZSk7XG4gICAgICAgICAgICAkKCcjYmxvY2stZXhwb3NlZGZvcm1hY3F1aWEtc2VhcmNocGFnZScpLnN1Ym1pdCgpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgLy8gSW52b2tlIGZpbHRlciBsaXN0XG4gICAgICBmaWx0ZXJMaXN0KCRjYXRlZ29yeVNlYXJjaElucHV0LCAkY2F0ZWdvcnlTZWFyY2hMaXN0KTtcblxuICAgICAgLy8gSW52b2tlIGNsZWFyIGZpbHRlclxuICAgICAgY2xlYWZGaWx0ZXJMaXN0KCRjbGVhclNlYXJjaEZpbHRlcik7XG4gICAgfVxuICB9O1xufSkoalF1ZXJ5LCBEcnVwYWwpO1xuIiwiLyoqXG4gKiBAZmlsZVxuICogYnAgY2FsY3VsYXRvci5cbiAqXG4gKiBKYXZhU2NyaXB0IHNob3VsZCBiZSBtYWRlIGNvbXBhdGlibGUgd2l0aCBsaWJyYXJpZXMgb3RoZXIgdGhhbiBqUXVlcnkgYnlcbiAqIHdyYXBwaW5nIGl0IHdpdGggYW4gJ2Fub255bW91cyBjbG9zdXJlJy4gU2VlOlxuICogLSBodHRwczovL2RydXBhbC5vcmcvbm9kZS8xNDQ2NDIwXG4gKiAtIGh0dHA6Ly93d3cuYWRlcXVhdGVseWdvb2QuY29tLzIwMTAvMy9KYXZhU2NyaXB0LU1vZHVsZS1QYXR0ZXJuLUluLURlcHRoXG4gKi9cblxuKGZ1bmN0aW9uICgkLCBEcnVwYWwpIHtcbiAgRHJ1cGFsLmJlaGF2aW9ycy5icENhbGN1bGF0b3IgPSB7XG4gICAgYXR0YWNoOiBmdW5jdGlvbiAoY29udGV4dCwgc2V0dGluZ3MpIHtcblxuICAgICAgLy8gQ2xvbmUgbGFzdCByb3cgb2YgdGFibGVcbiAgICAgICQoJy5hZGQtYnAtcm93JykudW5iaW5kKCdjbGljaycpLmNsaWNrKGZ1bmN0aW9uKGUpe1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHZhciAkdGFibGVCb2R5ID0gJCgnI2JwQ2FsY3VsYXRvciB0YWJsZScpLmZpbmQoJ3Rib2R5JyksXG4gICAgICAgICAgJHRyTGFzdCA9ICR0YWJsZUJvZHkuZmluZCgndHI6bGFzdCcpLFxuICAgICAgICAgICR0ck5ldyA9ICR0ckxhc3QuY2xvbmUoKTtcblxuICAgICAgICAvLyBBcHBlbmQgbmV3IGNsYXNzIG5hbWUgdG8gY2xvbmVkIHJvd1xuICAgICAgICAkdHJMYXN0LmJlZm9yZSgkdHJOZXcpLmFkZENsYXNzKCdjbG9uZWQnKS5maW5kKCdpbnB1dCcpLnZhbCgnJyk7XG5cbiAgICAgICAgLy8gQWRkIG5ldyBuYW1lIHdpdGggaW5kZXhcbiAgICAgICAgJHRhYmxlQm9keS5maW5kKCd0cjpsYXN0IGlucHV0JykuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgdmFyICR0cklucHV0Q2xhc3NJbmRleCA9ICQoJyNicENhbGN1bGF0b3IgdGJvZHk+dHInKS5sZW5ndGggKyAxLFxuICAgICAgICAgICAgICAkdHJJbnB1dENsYXNzTmFtZSA9ICQodGhpcykuYXR0cignY2xhc3MnKTtcblxuICAgICAgICAgICQodGhpcykuYXR0cignbmFtZScsICR0cklucHV0Q2xhc3NOYW1lICsgJy0nICsgJHRySW5wdXRDbGFzc0luZGV4KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJCgndGQ6ZXEoMCknLCAkdHJMYXN0KS50ZXh0KCQoJyNicENhbGN1bGF0b3IgdGJvZHk+dHInKS5sZW5ndGgpO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9KTtcblxuICAgICAgLy8gV2hlbiBjbGVhci9yZXN0YXJ0IGJ1dHRvbiBpcyBjbGlja2VkIHJldHVybiB0YWJsZSB0byBpbml0aWFsIHN0YXRlXG4gICAgICAkKCcuY2xlYXItcmVzdGFydCcpLnVuYmluZCgnY2xpY2snKS5jbGljayhmdW5jdGlvbihlKXtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgIC8vIFJlbW92ZSBhbGwgY2xvbmVkIHJvd3NcbiAgICAgICAgdmFyICR0ckNsb25lZCA9ICQoJy5jbG9uZWQnKTtcbiAgICAgICAgJHRyQ2xvbmVkLnJlbW92ZSgpO1xuXG4gICAgICAgIC8vIFJlc2V0IHRvIGludGlhbCB2YWx1ZXNcbiAgICAgICAgJCgnI2JwQ2FsY3VsYXRvciBpbnB1dCcpLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICQodGhpcykudmFsKCcnKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gUmVzZXQgZm9ybVxuICAgICAgICAkKCcjYnBDYWxjdWxhdG9yICcpLnZhbGlkYXRlKCkucmVzZXRGb3JtKCk7XG5cbiAgICAgICAgLy8gSGlkZSBvdXRwdXQgcm93XG4gICAgICAgICQoJy5icENhbGN1bGF0b3JfX3RhYmxlX19vdXRwdXQnKS5oaWRlKCk7XG5cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfSk7XG5cbiAgICAgIC8vIENhbGN1bGF0ZSBhdmVyYWdlIEJQXG4gICAgICBmdW5jdGlvbiBjYWxjdWxjYXRlQlAoYnBWYWx1ZSwgYnBPdXRwdXQpIHtcbiAgICAgICAgdmFyIGJwSW5wdXQgPSAwLCAvLyByb3cgY291bnRcbiAgICAgICAgICAgIGJwVG90YWwgPSAwLCAvLyBpbmNyZW1lbnRlZCBpbnB1dCB2YWx1ZXNcbiAgICAgICAgICAgIGJwQXZlcmFnZTsgLy8gYXZlcmFnZWQgYnBUb3RhbCAvIGJwSW5wdXRcblxuICAgICAgICBicFZhbHVlLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgIC8vIElmIElucHV0IHZhbHVlcyBhcmUgZ3JlYXRlciB0aGFuIDAgdGhlbiB0dXJuIGludG8gYSBudW1iZXIgYW5kIHJvdW5kXG4gICAgICAgICAgdmFyIHZhbCA9ICQodGhpcykudmFsKCkgPiAwID8gTWF0aC5yb3VuZChwYXJzZUludCgkKHRoaXMpLnZhbCgpLCAxMCkpIDogZmFsc2U7XG5cbiAgICAgICAgICBpZiAodmFsICE9PSAwKSB7XG4gICAgICAgICAgICBicElucHV0ICs9IDE7XG4gICAgICAgICAgICBicFRvdGFsICs9IHZhbDtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIENhbGN1bGF0ZSBhdmVyYWdlXG4gICAgICAgIGJwQXZlcmFnZSA9IGJwVG90YWwgLyBicElucHV0ID4gMCA/IE1hdGgucm91bmQoYnBUb3RhbCAvIGJwSW5wdXQpIDogMDtcblxuICAgICAgICBicE91dHB1dC50ZXh0KGJwQXZlcmFnZSk7XG5cbiAgICAgICAgJCgnLmJwQ2FsY3VsYXRvcl9fdGFibGVfX291dHB1dCcpLnNob3coKTtcbiAgICAgIH1cblxuICAgICAgLy8gVmFsaWRhdGUgQlAgRm9ybVxuICAgICAgJCgnI2JwQ2FsY3VsYXRvcicpLnZhbGlkYXRlKHtcbiAgICAgICAgLy8gQ2FsY3VsYXRlIEJQIHdoZW4gY2FsY3VsYXRlIGlzIGNsaWNrZWRcbiAgICAgICAgc3VibWl0SGFuZGxlcjogZnVuY3Rpb24oZm9ybSkge1xuICAgICAgICAgIHZhciBzeXNCcFZhbHVlID0gJCgnLmJwQ2FsY3VsYXRvcl9fc3lzdG9saWMtaW5wdXQnKSxcbiAgICAgICAgICAgIHN5c0JwT3V0cHV0ID0gJCgnLmJwQ2FsY3VsYXRvcl9fc3lzdG9saWMtb3V0cHV0Jyk7XG5cbiAgICAgICAgICB2YXIgZGlhQnBWYWx1ZSA9ICQoJy5icENhbGN1bGF0b3JfX2RpYXN0b2xpYy1pbnB1dCcpLFxuICAgICAgICAgICAgZGlhQnBPdXRwdXQgPSAkKCcuYnBDYWxjdWxhdG9yX19kaWFzdG9saWMtb3V0cHV0Jyk7XG5cbiAgICAgICAgICBjYWxjdWxjYXRlQlAoc3lzQnBWYWx1ZSwgc3lzQnBPdXRwdXQpO1xuICAgICAgICAgIGNhbGN1bGNhdGVCUChkaWFCcFZhbHVlLCBkaWFCcE91dHB1dCk7XG5cbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcbn0pKGpRdWVyeSwgRHJ1cGFsKTtcbiIsIi8qKlxuICogQGZpbGVcbiAqIFNhZGx5IGFkZHMgZm9vdGVyIHRvIGxlZnQgcmVzb3VyY2UgcGFnZSBjb2x1bW4uXG4gKlxuICogSmF2YVNjcmlwdCBzaG91bGQgYmUgbWFkZSBjb21wYXRpYmxlIHdpdGggbGlicmFyaWVzIG90aGVyIHRoYW4galF1ZXJ5IGJ5XG4gKiB3cmFwcGluZyBpdCB3aXRoIGFuIFwiYW5vbnltb3VzIGNsb3N1cmVcIi4gU2VlOlxuICogLSBodHRwczovL2RydXBhbC5vcmcvbm9kZS8xNDQ2NDIwXG4gKiAtIGh0dHA6Ly93d3cuYWRlcXVhdGVseWdvb2QuY29tLzIwMTAvMy9KYXZhU2NyaXB0LU1vZHVsZS1QYXR0ZXJuLUluLURlcHRoXG4gKi9cbihmdW5jdGlvbiAoJCwgRHJ1cGFsKSB7XG4gIERydXBhbC5iZWhhdmlvcnMucmVzb3VyY2VQYWdlRm9vdGVyID0ge1xuICAgIGF0dGFjaDogZnVuY3Rpb24oY29udGV4dCwgc2V0dGluZ3MpIHtcblxuICAgICAgJChmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKCQoJ2JvZHkuYW1hX19yZXNvdXJjZS1wYWdlJykubGVuZ3RoKSB7XG4gICAgICAgICAgJCgnZm9vdGVyJywgY29udGV4dCkuY2xvbmUoKS5hcHBlbmRUbygnLmFtYV9fbGF5b3V0LS1zcGxpdF9fbGVmdCcpLmFkZENsYXNzKCdhbWFfX2Zvb3RlciBhbWFfX3Jlc291cmNlLXBhZ2VfX2Rlc2t0b3AtZm9vdGVyJyk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcbn0pKGpRdWVyeSwgRHJ1cGFsKTtcbiIsIi8qKlxuICogQGZpbGVcbiAqIFJlc3BvbnNpdmUgVGFibGVzLlxuICpcbiAqIEphdmFTY3JpcHQgc2hvdWxkIGJlIG1hZGUgY29tcGF0aWJsZSB3aXRoIGxpYnJhcmllcyBvdGhlciB0aGFuIGpRdWVyeSBieVxuICogd3JhcHBpbmcgaXQgd2l0aCBhbiBcImFub255bW91cyBjbG9zdXJlXCIuIFNlZTpcbiAqIC0gaHR0cHM6Ly9kcnVwYWwub3JnL25vZGUvMTQ0NjQyMFxuICogLSBodHRwOi8vd3d3LmFkZXF1YXRlbHlnb29kLmNvbS8yMDEwLzMvSmF2YVNjcmlwdC1Nb2R1bGUtUGF0dGVybi1Jbi1EZXB0aFxuICovXG4oZnVuY3Rpb24gKCQsIERydXBhbCkge1xuICBEcnVwYWwuYmVoYXZpb3JzLnJlc3BvbnNpdmVUYWJsZXMgPSB7XG4gICAgYXR0YWNoOiBmdW5jdGlvbihjb250ZXh0LCBzZXR0aW5ncykge1xuXG4gICAgICAvLyBUaGlzIGNvbmRpdGlvbmFsIGhhcyBiZWVuIGFkZGVkIHRvIHByZXZlbnQgYmFzaWNUYWJsZSBwbHVnaW4gdG8gc2VsZWN0aXZlbHkgbm90IHJ1biBvbiB0YWJsZXNcbiAgICAgIGlmICghJCgndGFibGUnKS5oYXNDbGFzcygnc2ltcGxlVGFibGUnKSkge1xuICAgICAgICAkKCd0YWJsZScpLmJhc2ljdGFibGUoe1xuICAgICAgICAgIGJyZWFrcG9pbnQ6IDEwMjRcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIC8vIHRoaXMgZm9yY2VzIHRhYmxlcyBpbnNpZGUgb2YgdGhlIC5hbWFfX3Jlc291cmNlLS1zY2hlZHVsZXMgZGl2IHRvIGhhdmUgbW9iaWxlIGxvb2sgYW5kIGZlZWxcbiAgICAgICQoJy5hbWFfX3Jlc291cmNlLS1zY2hlZHVsZXMgdGFibGUnKS5lYWNoKCBmdW5jdGlvbigpIHtcbiAgICAgICAgJCh0aGlzKS5iYXNpY3RhYmxlKCdzdGFydCcpO1xuICAgICAgfSk7XG5cbiAgICB9XG4gIH07XG59KShqUXVlcnksIERydXBhbCk7XG4iLCIvKipcbiAqIEBmaWxlXG4gKiBMaXN0aWNsZSBDbGFzZXMuXG4gKlxuICogSGFuZGxpbmcgY2xhc3NlcyB0byBidWlsZCBsaXN0aWNsZSBwcm9wZXJseSBvdXRzaWRlIGNrZWRpdG9yLlxuICovXG4oZnVuY3Rpb24gKCQsIERydXBhbCkge1xuICBEcnVwYWwuYmVoYXZpb3JzLmxpc3RpY2xlID0ge1xuICAgIGF0dGFjaDogZnVuY3Rpb24oY29udGV4dCwgc2V0dGluZ3MpIHtcbiAgICAgIGlmICgkKCcubGlzdGljbGUnLCBjb250ZXh0KS5sZW5ndGgpIHtcbiAgICAgICAgJCgnLmxpc3RpY2xlJykuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgJCh0aGlzKS5jaGlsZHJlbigpLmVhY2goZnVuY3Rpb24gKGlkeCwgZSkge1xuICAgICAgICAgICAgJChlKS5hZGRDbGFzcygnbGlzdGljbGVfX2l0ZW0nKTtcbiAgICAgICAgICAgICQoZSkuY2hpbGRyZW4oJ29sJykuZWFjaChmdW5jdGlvbiAoaWR4LCBmKSB7XG4gICAgICAgICAgICAgICQoZikuYWRkQ2xhc3MoJ2xpc3RpY2xlX19pdGVtLXN1YicpO1xuICAgICAgICAgICAgICAkKGYpLmNoaWxkcmVuKCdsaScpLmFkZENsYXNzKCdsaXN0aWNsZV9faXRlbS1zdWItaXRlbScpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgLy9pZiB0aGVyZSBpcyBhbiBpbmxpbmUgcHJvbW8gb24gYSBwYWdlIHdpdGggYSBsaXN0aWNsZSwgZGV0ZXJtaW5lIGlmIHRoZSBsaXN0IGlzIGNsb3NlIGVub3VnaCBiZW5lYXRoIHRoZSBwcm9tbyBpbiB0aGUgZG9tIHRvIGFzc3VtZSBpdCB3aWxsIGJlIGZsb2F0ZWQgbmV4dCB0byBpdC4gSSBjaG9zZSB3aXRoaW4gNSBzaWJsaW5ncy5cbiAgICAgIGlmKCQoJy5hbWFfX3Byb21vLS1pbmxpbmUgfiAubGlzdGljbGUnKSkge1xuICAgICAgICB2YXIgbGVuZ3RoID0gJCgnLmFtYV9fcHJvbW8tLWlubGluZScpLmZpcnN0KCkubmV4dFVudGlsKCcubGlzdGljbGUnKS5hZGRCYWNrKCkubGVuZ3RoO1xuICAgICAgICBpZiAobGVuZ3RoIDw9IDUpIHtcbiAgICAgICAgICAkKCcuYW1hX19wcm9tby0taW5saW5lJykuYWRkQ2xhc3MoJ2xpc3RpY2xlLW1hcmdpbicpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICAvL2lmIHRoZSBsaXN0aWNsZSBpdGVtIGNvbnRhaW5zIGFuIGltYWdlLCBwdXQgYSBjbGVhcmZpeCBkaXYgb24gdGhlIGl0ZW0gc28gaWYgaXQgaGFzIGEgdHJhaWxpbmcgaW1hZ2UsIHRoZSBuZXh0IGl0ZW0gd29uJ3Qgd3JhcCBvbiBpdC5cbiAgICAgIC8vQWxzbywgZGV0ZXJtaW5lIGl0IHRoZSBpbWFnZSBpcyBhbG1vc3QgMTAwJSBvZiB0aGUgbGlzdCB3aWR0aC4gaWYgaXQgaXMsIGFkZCBhIGNsYXNzIHRvIHJlbW92ZSB0aGUgbGVmdCBtYXJnaW4gYW5kIG1ha2UgdGhlIGltYWdlIDEwMCUgd2lkdGguIEkgY2hvc2UgODAlLlxuICAgICAgaWYoJCgnLmxpc3RpY2xlX19pdGVtIGltZycpKSB7XG4gICAgICAgICQoJy5saXN0aWNsZV9faXRlbSBpbWcnKS5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICB2YXIgd2lkdGggPSAkKHRoaXMpLmNsb3Nlc3QoJy5saXN0aWNsZV9faXRlbScpLndpZHRoKClcbiAgICAgICAgICBjb25zb2xlLmxvZyh3aWR0aClcbiAgICAgICAgICB2YXIgaW1hZ2VXaWR0aCA9ICQodGhpcykud2lkdGgoKVxuICAgICAgICAgIGNvbnNvbGUubG9nKGltYWdlV2lkdGgpXG4gICAgICAgICAgdmFyIGNsZWFyZml4ID0gJzxkaXYgY2xhc3M9XCJjbGVhcmZpeFwiPjwvZGl2PidcbiAgICAgICAgICAkKHRoaXMpLmNsb3Nlc3QoJy5saXN0aWNsZV9faXRlbScpLm9uY2UoKS5hcHBlbmQoY2xlYXJmaXgpXG4gICAgICAgICAgaWYgKGltYWdlV2lkdGggPj0gd2lkdGgqLjcpIHtcbiAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ25vLW1hcmdpbicpXG4gICAgICAgICAgICAkKHRoaXMpLmNsb3Nlc3QgKCdmaWd1cmUnKS5hZGRDbGFzcygnbm8tbWFyZ2luJylcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfVxuICB9O1xufSkoalF1ZXJ5LCBEcnVwYWwpO1xuIiwiLyoqXG4gKiBAZmlsZVxuICogQXR0YWNoZXMgQU1BIEltYWdlIFBvcHVwIGxpYnJhcnkuXG4gKi9cblxuKGZ1bmN0aW9uICgkLCBEcnVwYWwpIHtcblx0ZnVuY3Rpb24gYWx0ZXJNb2RhbCAoY29udGV4dCkge1xuXHRcdCQoJy51aS1kaWFsb2cnKS5jc3Moe1wiei1pbmRleFwiOiBcIjUwMDAxXCJ9KTtcblx0XHQkKCcudWktZGlhbG9nLXRpdGxlJykuaGlkZSgpO1xuXHRcdCQoJy51aS1idXR0b24taWNvbi1vbmx5IC51aS1pY29uJykuaGlkZSgpO1xuXHRcdC8vIFN0eWxlZ3VpZGUgc3BlY2lmaWMgdHJlYXRtZW50IHRvIGhpZGUgYW5kIGNzcyB0byBlbGVtZW50cy5cblx0XHQkKCcudWktZHJhZ2dhYmxlIC51aS1kaWFsb2ctdGl0bGViYXInKS5jc3Moe1xuXHRcdFx0XCJib3JkZXJcIjogXCJub25lXCIsXG5cdFx0XHRcInBhZGRpbmc6XCI6IFwiMFwiLFxuXHRcdFx0XCJiYWNrZ3JvdW5kXCI6IFwibm9uZVwiXG5cdFx0fSk7XG5cdFx0JCgnLnVpLXdpZGdldC1vdmVybGF5JykuY3NzKHtcblx0XHRcdFwib3BhY2l0eVwiOiBcIi41XCIsXG5cdFx0XHRcInotaW5kZXg6XCI6IFwiNTAwMFwiXG5cdFx0fSk7XG5cdFx0JCgnLnVpLWRpYWxvZyAudWktZGlhbG9nLXRpdGxlYmFyLWNsb3NlJykuY3NzKHtcblx0XHRcdFwiYmFja2dyb3VuZFwiOiBcInVybCgnL2Fzc2V0cy9pbWFnZXMvaWNvbi1tb2RhbC1jbG9zZS5zdmcnKVwiLFxuXHRcdFx0XCJib3JkZXJcIjogXCJub25lXCIsXG5cdFx0XHRcInBvc2l0aW9uXCI6IFwiYWJzb2x1dGVcIixcblx0XHRcdFwicmlnaHRcIjogXCItMjBweFwiLFxuXHRcdFx0XCJ0b3BcIjogXCItMTBweFwiLFxuXHRcdFx0XCJoZWlnaHRcIjogXCIyOHB4XCIsXG5cdFx0XHRcIndpZHRoXCI6IFwiMjhweFwiLFxuXHRcdFx0XCJwYWRkaW5nXCI6IFwiMFwiLFxuXHRcdH0pO1xuXHR9XG5cblx0ZnVuY3Rpb24gY2xvc2VNb2RhbCAoY29udGV4dCkge1xuXHRcdCQoJy51aS1pY29uLWNsb3NldGhpY2snKS51bmJpbmQoJ2NsaWNrLmNsb3NlJyk7XG5cdFx0JCgnLnVpLWljb24tY2xvc2V0aGljaycpLnRyaWdnZXIoJ2NsaWNrJyk7XG5cdH1cblxuXHREcnVwYWwuYmVoYXZpb3JzLmFtYV9pbWFnZV9wb3B1cCA9IHtcblx0XHRhdHRhY2g6IGZ1bmN0aW9uIChjb250ZXh0KSB7XG5cdFx0XHQkKGRvY3VtZW50KS5vbihcImRpYWxvZ29wZW5cIiwgXCIudWktZGlhbG9nXCIsIGZ1bmN0aW9uIChldmVudCwgdWkpIHtcblx0XHRcdFx0YWx0ZXJNb2RhbCgpO1xuXHRcdFx0fSk7XG5cdFx0XHQkKGRvY3VtZW50KS5vbihcImNsaWNrXCIsIFwiLnVpLXdpZGdldC1vdmVybGF5XCIsIGZ1bmN0aW9uIChldmVudCwgdWkpIHtcblx0XHRcdFx0Y2xvc2VNb2RhbCgpO1xuXHRcdFx0fSk7XG5cdFx0fVxuXHR9O1xuXG59KShqUXVlcnksIERydXBhbCk7XG5cbi8qKlxuICogQGZpbGVcbiAqIEF0dGFjaGVzIEFNQSBJbWFnZSBQb3B1cCBsaWJyYXJ5LlxuICovXG5cbihmdW5jdGlvbiAoJCwgRHJ1cGFsKSB7XG5cdGZ1bmN0aW9uIGFsdGVyTW9kYWwgKGNvbnRleHQpIHtcblx0XHQkKCcuYW1hLWltYWdlLXBvcHVwLW1vZGFsIC51aS1kaWFsb2ctdGl0bGUnKS5oaWRlKCk7XG5cdFx0JCgnLmFtYS1pbWFnZS1wb3B1cC1tb2RhbCAudWktYnV0dG9uLWljb24tb25seSAudWktaWNvbicpLmhpZGUoKTtcblx0fVxuXG5cdGZ1bmN0aW9uIGNsb3NlTW9kYWwgKGNvbnRleHQpIHtcblx0XHQkKCcudWktaWNvbi1jbG9zZXRoaWNrJykudW5iaW5kKCdjbGljay5jbG9zZScpO1xuXHRcdCQoJy51aS1pY29uLWNsb3NldGhpY2snKS50cmlnZ2VyKCdjbGljaycpO1xuXHR9XG5cblx0RHJ1cGFsLmJlaGF2aW9ycy5hbWFfaW1hZ2VfcG9wdXAgPSB7XG5cdFx0YXR0YWNoOiBmdW5jdGlvbiAoY29udGV4dCkge1xuXHRcdFx0JChkb2N1bWVudCkub24oXCJkaWFsb2dvcGVuXCIsIFwiLnVpLWRpYWxvZ1wiLCBmdW5jdGlvbihldmVudCwgdWkpIHtcblx0XHRcdFx0YWx0ZXJNb2RhbCgpO1xuXHRcdFx0fSk7XG5cdFx0XHQkKGRvY3VtZW50KS5vbihcImNsaWNrXCIsIFwiLnVpLXdpZGdldC1vdmVybGF5XCIsIGZ1bmN0aW9uKGV2ZW50LCB1aSkge1xuXHRcdFx0XHRjbG9zZU1vZGFsKCk7XG5cdFx0XHR9KTtcblx0XHR9XG5cdH1cbn0pKGpRdWVyeSwgRHJ1cGFsKTtcbiIsIihmdW5jdGlvbiAoJCwgRHJ1cGFsKSB7XG4gIERydXBhbC5iZWhhdmlvcnMuaW5kZXggPSB7XG4gICAgYXR0YWNoOiBmdW5jdGlvbiAoY29udGV4dCwgc2V0dGluZ3MpIHtcblxuICBpZiAoICQoJy5kZXNjLWRpc3BsYXknKS5sZW5ndGggKSB7XG5cbiAgICB2YXIgZnVsbCA9ICQoJy5mdWxsdGV4dCcpO1xuICAgIHZhciB0cnVuYyA9ICQoJy50cnVuY2F0ZWQnKVxuICAgIHZhciBkZXNjID0gJCgnLmRlc2MtZGlzcGxheScpXG4gICAgdmFyIGZ1bGxUZXh0ID0gJCgnLmZ1bGx0ZXh0JykuaHRtbCgpXG4gICAgdmFyIHRydW5jYXRlZCA9ICQoJy50cnVuY2F0ZWQnKS5odG1sKClcbiAgICB2YXIgZnVsbEhlaWdodCA9ICcnXG4gICAgdmFyIHRydW5jSGVpZ2h0ID0gJydcbiAgICB2YXIgbW9yZUh0bWwgPSAnPGEgaHJlZj1cIiNcIiBjbGFzcz1cIm1vcmVcIj4gLi4uUmVhZCBNb3JlPC9hPidcbiAgICB2YXIgbGVzc0h0bWwgPSAnPGEgaHJlZj1cIiNcIiBjbGFzcz1cImxlc3NcIj5IaWRlIENvbnRlbnQ8L2E+J1xuICAgIHZhciB3aWR0aCA9ICcnXG5cbiAgICAgIGZ1bmN0aW9uIGdldERpbWVuc2lvbnMgKCkge1xuICAgICAgICB3aWR0aCA9ICQod2luZG93KS53aWR0aCgpXG4gICAgICAgIGlmICh3aWR0aCA8IDQwMCkge1xuICAgICAgICAgIHRydW5jSGVpZ2h0ID0gdHJ1bmMuaGVpZ2h0KCkgKyAyNVxuICAgICAgICAgIGZ1bGxIZWlnaHQgPSBmdWxsLmhlaWdodCgpICsgMTVcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0cnVuY0hlaWdodCA9IHRydW5jLmhlaWdodCgpXG4gICAgICAgICAgZnVsbEhlaWdodCA9IGZ1bGwuaGVpZ2h0KCkgKyAzNVxuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICAvKlxuICAgICAgICAqIEFuaW1hdGUgdGhlIGhlaWdodCBvZiBhIGR5bmFtaWMgaGVpZ2h0IG9iamVjdD8gU0lNUExFIVxuICAgICAgICAqIFdoYXQgYSBmb29sIHlvdSB3b3VsZCBiZSB0byBub3QgdGhpbmsgb2Ygc28gZWxlZ2FudCBhIHNvbHV0aW9uLlxuICAgICAgICAqIEluIHRoZSBtYXJrdXAsIHRoZXJlIGFyZSBoaWRkZW4gZnVsbHRleHQgYW5kIHN1bW1hcnkgZGl2cy5cbiAgICAgICAgKiBUaGV5IGFyZSBhYnNvbHV0ZWx5IHBvc2l0aW9uZWQgd2hpdGhpbiB0aGUgcGFnZSB0ZW1wbGF0ZSB0byBrZWVwIGFuIGFjY3VyYXRlIGhlaWdodC5cbiAgICAgICAqL1xuXG4gICAgICAvLyBTZXQgaGVpZ2h0IG9uIHBhZ2Vsb2FkIHVzaW5nIHRoZSBoaWRkZW4gZGl2cy5cbiAgICAgICQoJy5kZXNjLWRpc3BsYXknLCBjb250ZXh0KS5vbmNlKCdnZXRIZWlnaHQnKS5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZ2V0RGltZW5zaW9ucygpXG4gICAgICAgIGRlc2MuY3NzKCdoZWlnaHQnLCB0cnVuY0hlaWdodCArICdweCcpXG4gICAgICB9KTtcblxuICAgICAgLy8gU2V0IHRoZSBoZWlnaHQgYWdhaW4gb24gd2luZG93IHJlc2l6ZS5cbiAgICAgICQod2luZG93KS5vbigncmVzaXplJywgZnVuY3Rpb24gKCkge1xuICAgICAgICBnZXREaW1lbnNpb25zKClcbiAgICAgICAgaWYgKGRlc2MuaGFzQ2xhc3MoJ2Z1bGwnKSkge1xuICAgICAgICAgIGRlc2MuY3NzKCdoZWlnaHQnLCBmdWxsSGVpZ2h0ICsgJ3B4JylcbiAgICAgICAgfSBlbHNlIGlmIChkZXNjLmhhc0NsYXNzKCdzdW1tYXJ5JykpIHtcbiAgICAgICAgICBkZXNjLmNzcygnaGVpZ2h0JywgdHJ1bmNIZWlnaHQgKyAncHgnKVxuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgLy8gT24gY2xpY2ssIHNldCB0aGUgaGVpZ2h0IHRvIHRyaWdnZXIgY3NzIHRyYW5zaXRpb24uXG4gICAgICBkZXNjLm9uKCdjbGljaycsICcubW9yZScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZ2V0RGltZW5zaW9ucygpXG4gICAgICAgIGRlc2MuY3NzKCdoZWlnaHQnLCBmdWxsSGVpZ2h0ICsgJ3B4JylcbiAgICAgICAgZGVzYy5hZGRDbGFzcygnZnVsbCcpLnJlbW92ZUNsYXNzKCdzdW1tYXJ5JylcbiAgICAgICAgLy8gU3dhcCB0aGUgZnVsbCBjb3B5IGludG8gdGhlIGRpc3BsYXkgZGl2LlxuICAgICAgICBkZXNjLmh0bWwoJC5wYXJzZUhUTUwoZnVsbFRleHQpKS5hcHBlbmQobGVzc0h0bWwpXG4gICAgICB9KTtcbiAgICAgIGRlc2Mub24oJ2NsaWNrJywgJy5sZXNzJywgZnVuY3Rpb24gKCkge1xuICAgICAgICBnZXREaW1lbnNpb25zKClcbiAgICAgICAgZGVzYy5jc3MoJ2hlaWdodCcsIHRydW5jSGVpZ2h0ICsgJ3B4JylcbiAgICAgICAgZGVzYy5hZGRDbGFzcygnc3VtbWFyeScpLnJlbW92ZUNsYXNzKCdmdWxsJylcbiAgICAgICAgLy8gU3dhcCB0aGUgdHJ1bmNhdGVkIGNvcHkgaW50byB0aGUgZGlzcGxheSBkaXYuXG4gICAgICAgIGRlc2MuaHRtbCgkLnBhcnNlSFRNTCh0cnVuY2F0ZWQpKS5hcHBlbmQobW9yZUh0bWwpXG4gICAgICAgIC8vIFNjcm9sbCB0byB0b3AuXG4gICAgICAgICQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKHsgc2Nyb2xsVG9wOiAwIH0sIDUwMCwgJ3N3aW5nJylcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIH1cbiAgfTtcbn0pKGpRdWVyeSwgRHJ1cGFsKTtcbiIsIihmdW5jdGlvbiAoJCwgRHJ1cGFsKSB7XG4gIERydXBhbC5iZWhhdmlvcnMuYW1hX3RvYyA9IHtcbiAgICBhdHRhY2g6IGZ1bmN0aW9uIChjb250ZXh0LCBzZXR0aW5ncykge1xuICAgICAgJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKSB7XG4gICAgICAgICQoJy5hbWEtLW5ld3MtdG9jIGEnKS5iaW5kKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTsgLy8gcHJldmVudCBoYXJkIGp1bXAsIHRoZSBkZWZhdWx0IGJlaGF2aW9yXG5cbiAgICAgICAgICAgIHZhciB0YXJnZXQgPSAkKHRoaXMpLmF0dHIoXCJocmVmXCIpOyAvLyBTZXQgdGhlIHRhcmdldCBhcyB2YXJpYWJsZVxuICAgICAgICAgICAgLy8gcGVyZm9ybSBhbmltYXRlZCBzY3JvbGxpbmcgYnkgZ2V0dGluZyB0b3AtcG9zaXRpb24gb2YgdGFyZ2V0LWVsZW1lbnQgYW5kIHNldCBpdCBhcyBzY3JvbGwgdGFyZ2V0XG4gICAgICAgICAgICAkKCdodG1sLCBib2R5Jykuc3RvcCgpLmFuaW1hdGUoe1xuICAgICAgICAgICAgICAgIHNjcm9sbFRvcDogJCh0YXJnZXQpLm9mZnNldCgpLnRvcCAtICQoJyNtYWluLWNvbnRlbnQnKS5vZmZzZXQoKS50b3AgKyAoJCgnLndvcmtiZW5jaC10YWJzJykuaGVpZ2h0KCk/JCgnLndvcmtiZW5jaC10YWJzJykuaGVpZ2h0KCk6MClcbiAgICAgICAgICAgIH0sIDYwMCk7XG5cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH07XG59KShqUXVlcnksIERydXBhbCk7XG4iLCIvKipcbiAqIEBmaWxlXG4gKiBBcHBsaWNhdGlvbiBkcm9wZG93bi5cbiAqL1xuKGZ1bmN0aW9uICgkLCBEcnVwYWwpIHtcbiAgRHJ1cGFsLmJlaGF2aW9ycy5hcHBNZW51ID0ge1xuICAgIGF0dGFjaDogZnVuY3Rpb24gKGNvbnRleHQsIHNldHRpbmdzKSB7XG5cbiAgICAgICQoJyNibG9jay1hY2NvdW50bmF2JykuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBjbGFzc19hY3RpdmUgPSAnaXMtYWN0aXZlJztcblxuICAgICAgICAkKCcuYWNjb3VudF9uYXZfdHJpZ2dlcicsIHRoaXMpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgIC8vIFVuZm9jdXMgb24gdGhlIGRyb3Bkb3duLlxuICAgICAgICAgICQodGhpcykuYmx1cigpO1xuICAgICAgICAgIC8vIEFkZCBvdXIgY2xhc3MgZm9yIENTUy5cbiAgICAgICAgICAkKHRoaXMpLnRvZ2dsZUNsYXNzKGNsYXNzX2FjdGl2ZSk7XG4gICAgICAgICAgLy8gQWRkIG91ciBjbGFzcyB0byB0aGUgZHJvcGRvd24gVUwuXG4gICAgICAgICAgJCh0aGlzKS5uZXh0KCkudG9nZ2xlQ2xhc3MoY2xhc3NfYWN0aXZlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJChkb2N1bWVudCkuY2xpY2soIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgJCgnLmFjY291bnRfbmF2X3RyaWdnZXInLCB0aGlzKS5yZW1vdmVDbGFzcyhjbGFzc19hY3RpdmUpLm5leHQoKS5yZW1vdmVDbGFzcyhjbGFzc19hY3RpdmUpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcbn0pKGpRdWVyeSwgRHJ1cGFsKTtcbiJdfQ==
