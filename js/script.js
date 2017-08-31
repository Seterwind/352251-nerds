(function() {
  var activeSlide, activeLink;

  function initialize() {
    [].slice.call(document.querySelectorAll('.slider-controls a')).forEach(function(a) {
      var slide = document.getElementById(a.dataset.rel);

      if (slide.classList.contains('slide-active')) {
        a.classList.add('active');
        activeSlide = slide;
        activeLink = a;
      }

      a.addEventListener('click', click);
    });
  }

  function click(event) {
    event.preventDefault();

    var a = event.target;

    if (!a.classList.contains('active')) {
      activeSlide.classList.remove('slide-active');
      activeLink.classList.remove('active');

      activeSlide = document.getElementById(a.dataset.rel);
      activeLink = a;

      activeSlide.classList.add('slide-active');
      a.classList.add('active');
    }

    return false;
  }

  if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', initialize);
  } else {
    initialize();
  }
})();
