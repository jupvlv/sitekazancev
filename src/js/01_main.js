// Слайдер галерея 

$('.slider').slick({
  slidesToShow: 3,
  centerMode: true,
  spaceBetween: 20,
  slidesToScroll: 1,               
  dots: false,
  arrows:false,
  infinite: true, 
  variableWidth: true,  
  arrows:true,
  nextArrow: '.project__next',
  prevArrow: '.project__prev',
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
    // more then one submenu open?
    this.multiple = multiple || false;
    
    var dropdownlink = this.el.find('.dropdownlink');
    dropdownlink.on('click',
                    { el: this.el, multiple: this.multiple },
                    this.dropdown);
  };
  
  Accordion.prototype.dropdown = function(e) {
    var $el = e.data.el,
        $this = $(this),
        //this is the ul.submenuItems
        $next = $this.next();
    
    $next.slideToggle();
    $this.parent().toggleClass('open');
    
    if(!e.data.multiple) {
      //show only one menu at the same time
      $el.find('.submenuItems').not($next).slideUp().parent().removeClass('open');
    }
  }
  
  var accordion = new Accordion($('.accordion-menu'), false);
})

