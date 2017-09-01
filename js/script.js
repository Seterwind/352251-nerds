(function () {
  var activeSlide, activeLink;

  function initialize() {
    [].slice.call(document.querySelectorAll('.slider-controls a')).forEach(function (a) {
      var slide = document.getElementById(a.dataset.rel);

      if (slide.classList.contains('slide-active')) {
        a.classList.add('active');
        activeSlide = slide;
        activeLink = a;
      }

      a.addEventListener('click', sliderClick);
    });

    document.querySelector('.contacts-btn').addEventListener('click', openPopup);
    document.querySelector('.contacts-popup-close').addEventListener('click', closePopup);

    [].slice.call(document.querySelectorAll('.contacts-popup-form input, .contacts-popup-form textarea')).forEach(function (control) {
      control.addEventListener('blur', touchControl)
    });
  }

  function sliderClick(event) {
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

  function openPopup(event) {
    event.preventDefault();
    document.querySelector('.contacts-popup-form').classList.add('opened');
  }

  function closePopup(event) {
    event.preventDefault();
    document.querySelector('.contacts-popup-form').classList.remove('opened');
  }

  function touchControl(event) {
    event.target.classList.add('touched');
  }

  if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', initialize);
  } else {
    initialize();
  }
})();
