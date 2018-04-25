/**
 * @file
 * Form fields masking
 */

(function ($, Drupal) {
  Drupal.behaviors.formItems = {
    attach: function (context, settings) {
      (function ($) {
        $(document).ready(function(){
          $('.ama__select-menu__select').selectmenu();
        });
      })(jQuery);
    }
  };
})(jQuery, Drupal);
