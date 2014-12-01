angular.module('extendedWallPost', [])
  .directive('extendedWallPost', ['$timeout', function($timeout) {
    return {
      link: {
        post: function($scope, $element, attrs) {

          $timeout(function() {
            var $t = $element.find('.text');
            var $more;
            var lh = parseInt($element.find('.text').css('line-height'));
            var h = $t.height();
            var c = Math.floor(h / lh);
            if (h > lh * 10) {
              $t.height(lh * 10);
              $element.addClass('big');
              var last = c - 10;
              $element.attr('data-lines', last);
              $more = $(document.createElement('div')).addClass('more').html('еще ' + last + ' строк').insertAfter($t).on('click', function() {
                $element.toggleClass('extended');
                if ($element.hasClass('extended')) {
                  $more.html('скрыть');
                  $t.height(h);
                } else {
                  $("html, body").animate({
                    scrollTop: "-=" + (last * lh) + "px"
                  }, 0);
                  $more.html('еще ' + last + ' строк');
                  $t.height(lh * 10);
                }
              });
            }
          }, 0);

        }
      }
    }
  }]);
