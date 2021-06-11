$(document).ready(function() {

  $('.mobile-wrap').on('click', function() {
    $('.line-burger').toggleClass('line-active');
    $('.main-header__box').toggleClass('main-header__box--active');
    $('.main-header__list').slideToggle();
  });

  $(window).resize(function() {
    if ($(window).width() >= 650) {
      $('.main-header__list').attr('style', '');
      $('.line-burger').removeClass('line-active');
    }
   
handleIndicator();

  });

  function validate(input, length, regExp, error, phone) {

    $(input).on('blur keyup', function() {
      var value = $(this).val();
      var that = $(this);

      regExp = regExp == '' ? /./ : regExp;

      if (phone === true) {
        bool_reg = !regExp.test(value);
      } else {
        bool_reg = regExp.test(value);
      }

      if (value.length > length && value !== '' && bool_reg) {
        that.removeClass('form-fail').addClass('form-done');
        $(error).slideUp();
      } else {
        that.removeClass('form-done').addClass('form-fail');
        $(error).slideDown();
      }
    });

  }

  // деакцивация кнопки если есть поле с ошибкой

  function disBtn(input, btn) {
    var input = $(input);
    input.on('blur keyup', function() {

      if (input.hasClass('form-fail')) {
        $(btn).attr('disabled', 'disabled');
      } else {
        $(btn).removeAttr('disabled');
      }

    });

  }

  // для проверки при нажатии

  function valClick(input, length, regExp, error, btn, phone) {
    var value = $(input).val();

    regExp = regExp == '' ? /./ : regExp;

    if (phone === true) {
      bool_reg = regExp.test(value);
    } else {
      bool_reg = !regExp.test(value);
    }

    if (value.length < length && value === '' && bool_reg) {
      $(input).addClass('form-fail');
      $(error).slideDown();
    }
  }

  //  деакцивация кнопки при нажатии

  function disBtnClick(input, btn) {
    var input = $(input);

    if (input.hasClass('form-fail')) {
      $(btn).attr('disabled', 'disabled');
      return false;
    } else {
      return true;
    }

  }

  $('input[type="tel"]').mask("+38 (999) 999-99-99");

  var regName = /^[a-zA-Zа-яА-ЯёЁ]+/;
  var regPhone = /[_]/i;

  // пример использования
  validate('#c_name', 1, regName, '.contacts__fail-name');
  validate('#c_phone', 1, regPhone, '.contacts__fail-phone', true);
  disBtn('#c_name, #c_phone', '.contacts__btn');

  validate('.reqcall__input', 1, regPhone, '.reqcall__error', true);
  disBtn('.reqcall__input', '.reqcall__btn');

  validate('#cart_name', 1, regName, '.cart__fail-name');
  validate('#cart_phone', 1, regPhone, '.cart__fail-phone', true);
  disBtn('#cart_name, #cart_phone', '.cart__order');

  $(".services__box").click(function() {
    $(".services__box").removeClass("services__box--active").eq($(this).index()).addClass("services__box--active");
    var index = $(this).index();
    $(".services__wrap").hide().eq(index).fadeIn()
  }).eq(0).addClass("services__box--active");

  $('.catalog__block').on('click', function() {
    $(this).toggleClass('catalog__block--active').next().slideToggle();
  });

  function range_slider() {

    var parents = document.querySelectorAll(".filter__range-slider");
    parents.forEach((parent => {
      var
        rangeS = parent.querySelectorAll("input[type=range]"),
        numberS = parent.querySelectorAll(".filter__count");

      rangeS.forEach(function(el) {
        el.oninput = function() {
          var slide1 = parseFloat(rangeS[0].value),
            slide2 = parseFloat(rangeS[1].value);

          if (slide1 > slide2) {
            [slide1, slide2] = [slide2, slide1];
          }

          numberS[0].value = slide1;
          numberS[1].value = slide2;
        }
      });

      numberS.forEach(function(el) {
        el.oninput = function() {
          var number1 = parseFloat(numberS[0].value),
            number2 = parseFloat(numberS[1].value);

          rangeS[0].value = number1;
          rangeS[1].value = number2;

        }
      });
    }))

  }

  range_slider();

  const inputs = document.querySelectorAll('.filter__count');
  inputs.forEach(el => {
    el.addEventListener('input', e => {
      let value = el.value[0] === '0' ? '' : parseInt(el.value);
      let maxValue = parseInt(el.max);
      if (value > maxValue) {
        el.value = maxValue;
      } else {
        el.value = value;
      }

    })

  });

  var select_obj = {};

  (function() {

    $('.select__wrap').each(function() {
      var id = $(this).attr('id');
      checkActive(this);
      var placeholder = $(this).find('.select__placeholder').html();
      select_obj[id] = placeholder;
    });

    $('.select__wrap').on('click', '.select__placeholder', function() {
      $('.select__list').removeClass('select__list--active');
      $('.select__placeholder').removeClass('changed');
      $(this).next().toggleClass('select__list--active');
      $(this).toggleClass('changed');
    });

    $('.select__wrap').on('click', '.select__item', function(e) {
      if ($(e.target).is('.select__item--disabled')) {
        return false;
      } else {
        var container = $(this).parents('.select__wrap').attr('id');
        if ($('#' + container + ' .select__item--active').length == 1) {

          if (!$(this).hasClass('select__item--active')) {
            $('#' + container + ' .select__item').removeClass('select__item--active');
            $(this).addClass('select__item--active');
            setPlaceholder(this);
          }

        } else {
          setPlaceholder(this);
          $(this).toggleClass('select__item--active');
        }
        $(this).parent().removeClass('select__list--active');
        $(this).parents('.select__wrap').find('.select__placeholder').removeClass('changed');
      }
    });

    $('body').on('click', function(e) {
      if (!$(e.target).is('.changed, .select__list, .select__item')) {
        $('.select__list').removeClass('select__list--active');
      }
    });

    function setPlaceholder(self) {
      var value = $(self).data('value');
      var value_pl = $(self).html();
      $(self).parents('.select__wrap').find('.select__placeholder').html(value_pl);
    }

    function checkActive(self) {
      var text = $(self).find('.select__item--active').text();
      if (text === undefined || text === '') {
        text = $(self).find('.select__item:not(.select__item--disabled):eq(0)').addClass('select__item--active').text();
      }
      $(self).find('.select__placeholder').html(text);
    }

  })();

  function toggleSelect(id, value) {
    $(id).find('.select__item').removeClass('select__item--active');
    $(id).find('.select__item[data-value="' + value + '"]').addClass('select__item--active');
    $(id).find('.select__placeholder').html(value);
  }

  function getSelValue(id) {
    return $(id).find('.select__item--active').data('value');
  }

  $('body').on('click', function(e) {
    if ($(e.target).is('.popup__reqcall, .popup__close')) {
      $('.popup__reqcall').removeClass('popup__reqcall--active');
    }
  });

  var date = new Date();
  var hours = date.getHours();

  var minHours = '08';

  var sDay = getSelValue('#select__day');
  if (sDay == 'Сегодня' && hours >= 21) {
    $('#select__day').find('.select__item:eq(0)').addClass('select__item--disabled').removeClass('select__item--active');
    $('#select__day').find('.select__item:eq(1)').addClass('select__item--active');
    var newDay = $('#select__day').find('.select__item:eq(1)').data('value');
    $('#select__day').find('.select__placeholder').html(newDay);

    toggleSelect('#select__hour', minHours);
  } else if (sDay == 'Сегодня' && hours < 21) {
    sHours = hours + 2;
    sHours = sHours < 10 ? '0' + sHours : sHours;
    toggleSelect('#select__hour', sHours);
  }

  $('.overlay-close').click(function() {
    $(this).parents('.popup').removeClass('popup--active');
    if ($(this).parents('.popup').is('.popup__product')) {
      $('.popup__product .product__single--block, .popup__product .product__content, .popup__view .overlay-slider').slick('unslick');
      $('.inner__product--data').html('');
      $('.popup__view .overlay-slider').html('');
    }

    if ($(this).parents('.popup').is('.popup__category')) {
      $(this).parents('.popup').removeClass('popup__category--active');
    }
  });

  $('.btn').on('click', function() {
    $('.popup__reqcall').addClass('popup__reqcall--active');
  });


  (function() {
    var product__single = $('.product__single');
    var product__gallery = $('.product__gallery');

    var overlay_gallery = $('.popup-gallery');
    var overlay_gallery_slider = $('.popup-gallery .overlay-slider');


    // goods__gallery
    product__gallery.slick({
      slidesToShow: 4,
      slidesToScroll: 1,
      dots: false,
      draggable: false,
      prevArrow: '<button type="button" class="slick-prev"></button>',
      nextArrow: '<button type="button" class="slick-next"></button>',
      focusOnSelect: true,
      responsive: [

        {
          breakpoint: 960,
          settings: {
            slidesToShow: 4,
          }
        },
        {
          breakpoint: 580,
          settings: {
            slidesToShow: 3,
          }
        },
        {
          breakpoint: 410,
          settings: {
            slidesToShow: 2,
          }
        }
      ]
    });

    overlay_gallery_slider.slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      dots: false,
      draggable: false,
      prevArrow: '<button type="button" class="slick-prev"></button>',
      nextArrow: '<button type="button" class="slick-next"></button>'
    });

    product__gallery.find('.product__col').on('click', function() {
      var img = $(this).find('img').attr('src');
      product__single.find('img').attr('src', img);

      var id = product__gallery.slick("slickCurrentSlide");
      overlay_gallery_slider.slick('slickGoTo', id, true);
    });


    product__single.on('click', function() {
      overlay_gallery.addClass('popup-gallery--active');
    });

    $('.product__col').on('click', function() {
      $('.product__col').removeClass('product__col--active');
      $(this).addClass('product__col--active');
    });

    $('.overlay-close').click(function() {
      var overlay = $(this).parents('.popup');
      overlay.removeClass('popup-gallery--active');
      if (overlay.hasClass('popup-gallery')) {
        setTimeout(function() {
          var currentSlide = $('.product__gallery').slick('slickCurrentSlide');
          overlay_gallery_slider.slick('slickGoTo', currentSlide, true);
        }, 500);
      }

    });

  })();


  $('.product__box input').on('change, input', function() {
    $(this).val(
      $(this).val().replace(/^0|\D/, '')
    );
    $(this).parents('.product__elem').find('.page-cart__count span').text($(this).val());
  })

  $('.product__box input').on('focus', function() {
    $(this).data("before", $(this).val());

    console.log($(this).val())
  })

  $('input[data-together-input]').on('change, input', function() {
    $('input[data-together-input]').val($(this).val());
  })


  $('.product__box input').on('blur', function() {
    let v = /\d+/.exec($(this).val())
    if (!v || !parseInt(v)) v = $(this).data("before")
    $(this).val(v)
    $(this).trigger('input');
  })

  function InitProduct() {

    var elem = $('.product__container .product__count b').text();
    if (elem.match(/\d\./) == null) {
      $('.product__container .product__count b').text(elem + '.00');
    }


    $('.product__container').each(function(i, e) {
      e = $(e);

      let quantity = e.find('.product__box input');


      var recount = new RecountProduct({
        summ: e.find('.product__count b'),
        quantity: quantity,
        price: e.find('.product__box input').attr('data-price'),
      })

      quantity.on('input', function() {
        recount.updateSumm()
      })

      e.find('.product__btn--decrement').click(function() {
        recount.update('minus')
      });

      e.find('.product__btn--increment').click(function() {
        recount.update('plus')
      });


    });

    //basket

    $('.page-cart .product__elem').each(function(i, e) {
      e = $(e);

      let quantity = e.find('.product__box input');
      console.log(quantity);

      var recount = new RecountProduct({
        summ: e.find('.product__price span'),
        quantity: quantity,
        price: e.find('.product__box input').attr('data-price'),
        count: e.find('.page-cart__count span'),
        fun: updateTotalSumm,
        //decimalSeparator: ','
      })

      quantity.on('input', function() {
        recount.updateSumm();
        resultCount();
        changeLang();
      })

      e.find('.product__btn--decrement').click(function() {
        recount.update('minus');
        resultCount();
        changeLang();
      });

      e.find('.product__btn--increment').click(function() {
        recount.update('plus');
        resultCount();
        changeLang();
      });


      recount.updateSumm(false);
    });

    updateTotalSumm()
  }



  // summ - jq узел общей стоимости продуктов
  // quantity - jq узел количества продукта
  // price - стоимости продукта
  // after - строка, которая прибавится к общей стоимости
  // fun - функция, которая вызывается после пересчета стоимости

  function RecountProduct(param) {
    this.summ = param.summ;
    this.count = param.count;
    this.quantity = param.quantity;
    this.price = parseFloat(param.price);
    this.after = param.after || "";
    this.fun = param.fun;
    this.decimalSeparator = param.decimalSeparator;

    // обновления количества товара
    // action - флаг: 'plus' || 'minus'

    this.update = function(action) {
      var value = this.getQuantity();
      var together = this.quantity.data('together-input');

      if (action == 'plus') {
        value += 1;
      } else if (action == 'minus' && value != 1) {
        value -= 1;
      }

      if (together !== undefined) {
        $('[data-together-input="' + together + '"]').val(value).trigger('input');
      }

      this.quantity.val(value);
      if ($('.page-cart').length != -0) {
        this.count.text(value);
      }
      this.updateSumm();


    }

    // обновление общей стоимости товара
    // если total == true будет запущен пересчёт общей суммы

    this.updateSumm = function(total = true) {
      var num = (this.getQuantity() * this.price).toFixed(2)
      //if (this.decimalSeparator) num = num.replace('.', this.decimalSeparator)
      num = this.format(num)

      this.summ.text(num);
      if (total && typeof this.fun === "function") this.fun()
    }

    // возвращает количество товара

    this.getQuantity = function() {
      return parseInt(this.quantity.val()) || 0
    }

    this.format = function(v) {
      return String(v).replace(/(\d)(?=(\d{3})+([^\d]|$))/g, '$1 ')
    }
  }


  // Пересчёт общей суммы

  function updateTotalSumm() {
    var val = 0;

    $('.product__price span').each(function(i, e) {
      val += parseFloat($(e).text() || 0);
    })

    val = val; //.toFixed(2).replace(/(\d)(?=(\d{3})+([^\d]|$))/g, '$1 ')
    $('.cart__sum span').text(val.toFixed(2) /*.replace('.', ",")*/ ); 
  }



  InitProduct();

  function resultCount() {
    var summ = 0;
    $('.page-cart__count span').each(function(i, e) {
       
        summ += parseFloat($(e).text() || 0);
        console.log(summ);
         $('.cart__unit b').text(summ);
      });
  }

resultCount();

function changeLang(){

  var arr_ru = ['единицу', 'единицы', 'единиц'];
  var arr_ua = ['одиницю', 'одиниці', 'одиниць'];

  var lang = window.location.href;

  if (lang.indexOf('/ua') !== -1) {
    curlang = arr_ru;
  } else {
    curlang = arr_ua;
  }

  var count = $('.cart__unit b').text();
  var result = $('.cart__unit span');

  if (count == 1) {
    result.text(curlang[0]);
  } else if (count > 1 && count < 5) {
    result.text(curlang[1]);
  } else {
    result.text(curlang[2]);
  }
}

changeLang();

  if ($('.advantages__number').length) {
    // Получаем нужный элемент
    var element = $('.advantages__row')[0];
    var isResizeble = false;

    var Visible = function(target) {
      // Все позиции элемента
      var targetPosition = {
          top: window.pageYOffset + target.getBoundingClientRect().top,
          left: window.pageXOffset + target.getBoundingClientRect().left,
          right: window.pageXOffset + target.getBoundingClientRect().right,
          bottom: window.pageYOffset + target.getBoundingClientRect().bottom
        },
        // Получаем позиции окна
        windowPosition = {
          top: window.pageYOffset,
          left: window.pageXOffset,
          right: window.pageXOffset + document.documentElement.clientWidth,
          bottom: window.pageYOffset + document.documentElement.clientHeight
        };



      if (targetPosition.bottom > windowPosition.top && // Если позиция нижней части элемента больше позиции верхней чайти окна, то элемент виден сверху
        targetPosition.top < windowPosition.bottom && // Если позиция верхней части элемента меньше позиции нижней чайти окна, то элемент виден снизу
        targetPosition.right > windowPosition.left && // Если позиция правой стороны элемента больше позиции левой части окна, то элемент виден слева
        targetPosition.left < windowPosition.right) { // Если позиция левой стороны элемента меньше позиции правой чайти окна, то элемент виден справа
        // Если элемент полностью видно, то запускаем следующий код

        console.log('Вы видите элемент :)');

        if (!isResizeble) {
          //  ф-ция которая, отработает 1 раз и все

          loading();
          isResizeble = true;
        } else {
          // Если элемент не видно, то запускаем этот код

        }
      }


    }



    // Запускаем функцию при прокрутке страницы
    window.addEventListener('scroll', function() {
      Visible(element);
    });

    // А также запустим функцию сразу. А то вдруг, элемент изначально видно
    Visible(element);

    function loading() {
      $('.advantages__item').each(function() {
        const $this = $(this);
        const $value = $this.find('.advantages__number');
        const value = $this.find('.advantages__number').data('progress-value');
        $({
          value: 0
        }).animate({
          value,
        }, {
          duration: 1000,
          step: function load_animate(val) {
            $value.text(`${val.toFixed(0).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1 ")} `);
          },
        });
      });
    }
  }

const mainBlock = $(".cart__box--radio");
const items = $(".cart__label");

function handleIndicator() {
  mainBlock.each(( i, el ) => {
    const $el = $(el);
    const indicator = $el.find(".cart__mask");
    const activeLabel = $el.find(".cart__label.is-active");

    indicator.css( "width", activeLabel.outerWidth() + "px"); 
    indicator.css( "left", activeLabel.position().left+ "px"); 
  });
}

items.each((i, el) => {
  const $el = $(el);
  $el.on("click", () => {
    $el.closest('.cart__element').find(".is-active").removeClass('is-active');
    $el.addClass('is-active');

    handleIndicator();
  });
});

handleIndicator();

  
 $('select').styler();


});

