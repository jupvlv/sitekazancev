// Слайдер галерея 

var swiper = new Swiper(".mySwiper", {
  slidesPerView: 3,
  spaceBetween: 20,
  loop: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    type: "progressbar",
  },
});

$(function() {
  $('.ju-custom').on('click', function() {
    $(this).toggleClass('rotate-180');
  });
});

var swiperMain = new Swiper(".mySwiperMain", {
  slidesPerView: 3,
  spaceBetween: 20,
  breakpoints: {
    320: {
      slidesPerView: 'auto',
      loop: true,
      centeredSlides: true,
      spaceBetween: 15
    },
    640: {
      slidesPerView: 3,
      spaceBetween: 20,
    }
  }
});


// Аккардион Операции
function CustomSelect(options) {
  var elem = options.elem;

  elem.onclick = function(event) {
    if (event.target.className == 'title') {
      toggle();
    } else if (event.target.tagName == 'LI') {
      setValue(event.target.innerHTML, event.target.dataset.value);
      close();
    }
  }

  var isOpen = false;

  // ------ обработчики ------

  // закрыть селект, если клик вне его
  function onDocumentClick(event) {
    if (!elem.contains(event.target)) close();
  }

  // ------------------------

  function setValue(title, value) {
    elem.querySelector('.title').innerHTML = title;

    var widgetEvent = new CustomEvent('select', {
      bubbles: true,
      detail: {
        title: title,
        value: value
      }
    });

    elem.dispatchEvent(widgetEvent);

  }

  function toggle() {
    if (isOpen) close()
    else open();
  }

  function open() {
    elem.classList.add('open');
    document.addEventListener('click', onDocumentClick);
    isOpen = true;
  }

  function close() {
    elem.classList.remove('open');
    document.removeEventListener('click', onDocumentClick);
    isOpen = false;
  }

}

var animalSelect = new CustomSelect({
  elem: document.getElementById('animal-select')
});

$(function() {
  var Accordion = function(el, multiple) {
    this.el = el || {};
    this.multiple = multiple || false;

    var dropdownlink = this.el.find('.dropdownlink');
    dropdownlink.on('click', { el: this.el, multiple: this.multiple }, this.dropdown);
  };

  Accordion.prototype.dropdown = function(e) {
    var $el = e.data.el,
      $this = $(this),
      $next = $this.next();

    $next.slideToggle();
    $this.parent().toggleClass('open');
    $this.find('.ju-custom').toggleClass('rotate-180'); // Добавленный код

    if (!e.data.multiple) {
      $el.find('.submenuItems').not($next).slideUp().parent().removeClass('open');
      $el.find('.ju-custom').not($this.find('.ju-custom')).removeClass('rotate-180'); // Добавленный код
    }
  };

  var accordion = new Accordion($('.accordion-menu'), false);
});
