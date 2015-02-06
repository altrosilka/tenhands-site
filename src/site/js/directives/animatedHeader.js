angular.module('App')
  .directive('animatedHeader', function() {
    return function(scope, $element, attrs) {


      var width, height, largeHeader, image, translate, lastScrolled = 0, currentDate;

      // Main
      initHeader();
      addListeners();

      function initHeader() {
        width = window.innerWidth;
        height = window.innerHeight;

        largeHeader = $element[0];
        image = $element.find('.image');
        //largeHeader.style.height = height + 'px';

      }

      // Event handling
      function addListeners() {
        window.addEventListener('scroll', scrollCheck);
        window.addEventListener('resize', resize);
      }

      function scrollCheck() {
        return;
        if (document.body.scrollTop <= height) {
          currentDate = new Date().getTime();
          
            lastScrolled = currentDate;
            translate = (document.body.scrollTop / 2);
            image.css({
              '-webkit-transform': 'translateY(' + translate + 'px)'
            });
          
        }

      }

      function resize() {
        return
        width = window.innerWidth;
        height = window.innerHeight;
        largeHeader.style.height = height + 'px';
      }

    };
  });
