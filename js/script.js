(function() {
  var activeSlide, activeLink;
  var fields = ['name', 'email', 'comment'];

  var popup = document.querySelector('.contacts-popup-form');
  var form = document.querySelector('.contacts-popup-form form');

  function initialize() {
    [].slice.call(document.querySelectorAll('.slider-controls a')).forEach(function(a) {
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

    form.addEventListener('submit', submitForm);

    fields.map(function(name) {
      form.elements[name].addEventListener('focus', clearInvalidState);
    });

    popup.addEventListener('animationend', clearAnimation);
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
    popup.classList.add('opened');
  }

  function closePopup(event) {
    event.preventDefault();
    popup.classList.remove('opened');

    fields.map(function(name) {
      form.elements[name].classList.remove('invalid');
    });
  }

  function submitForm(event) {
    var isValid = fields.reduce(function(acc, name) {
      var element = form.elements[name];

      if (element.value.trim() === '') {
        element.classList.add('invalid');
        return false;
      } else {
        return acc;
      }
    }, true);

    if (!isValid) {
      popup.classList.add('invalid-form');
      event.preventDefault();
    }
  }

  function clearInvalidState(event) {
    event.target.classList.remove('invalid');
  }

  function clearAnimation(event) {
    popup.classList.remove('invalid-form');
  }

  if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', initialize);
  } else {
    initialize();
  }
})();
