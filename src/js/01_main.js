window.onscroll = function() {
    checkMarginToTop();
};

var nav = document.getElementById("header-items");

var sticky = nav.offsetTop;

function checkMarginToTop() {
        if (window.pageYOffset > sticky) {
        nav.classList.add("sticky");
    } else {
        nav.classList.remove("sticky");
    }
}

// Слайдер галерея 

Fancybox.bind('[data-fancybox="gallery-1"]', {
  // Your custom options
});
Fancybox.bind('[data-fancybox="gallery-2"]', {
  // Your custom options
});

var swiper = new Swiper(".mySwiper", {
  slidesPerView: 3,
  spaceBetween: 20,
  loop: false,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    type: "progressbar",
  },
  breakpoints: {
    320: {
      slidesPerView: 'auto',
      centeredSlides: true,
      spaceBetween: 0,
    },
    620: {
      slidesPerView: 3,
      spaceBetween: 20,
    }
  }
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

// Селектор переключения языка
const selectedOption = document.querySelector('.selected-option');
const options = document.querySelectorAll('.option');

options.forEach(option => {
  option.addEventListener('click', (event) => {
    event.preventDefault();
    const selectedValue = option.getAttribute('data-value');
    selectedOption.textContent = selectedValue;
    document.querySelector('.options').style.display = 'none';
  });
});

document.addEventListener('click', (event) => {
  const selector = document.querySelector('.selector');
  if (!selector.contains(event.target)) {
    document.querySelector('.options').style.display = 'none';
  }
});

selectedOption.addEventListener('click', () => {
  const options = document.querySelector('.options');
  options.style.display = options.style.display === 'block' ? 'none' : 'block';
});
console.log("sss");

// Аккардион Операции
if (document.querySelector('.customselect')) {
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
}



// скрыть лого при выпадания меню
$('.menu-btn').on('click', function() {
  if ($(window).width() < 769) {
    $('.logo').toggleClass('hidden');
  }
});


// Аккардион в меню
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



