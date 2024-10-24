'use strict';

// eslint-disable-next-line no-undef
new Swiper('.mySwiper', {
  slidesPerView: 3,
  spaceBetween: 10,
  loop: false,
  autoHeight: true,
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  navigation: {
    nextEl: '.right_button',
    prevEl: '.left_button',
  },
  breakpoints: {
    500: {
      slidesPerView: 1,
      spaceBetween: 40,
    },
    959: {
      slidesPerView: 3,
      spaceBetween: 10,
    },
  },
});

// Panel on off
var act = document.getElementsByClassName('active_button');
var val; //변수 val
for (val = 0; val < act.length; val++) {
  act[val].addEventListener('click', function () {
    this.classList.toggle('on'); //화살표 on off

    var shoes_panel = this.nextElementSibling;

    // 높이 속성값
    if (shoes_panel.style.maxHeight) {
      shoes_panel.style.maxHeight = null;
    } else {
      shoes_panel.style.maxHeight = shoes_panel.scrollHeight + 'px';
    }
  });
}
function toggleImg() {
  document.getElementsByClassName('nike_shoes')[0].src =
    '../../../public/assets/icons/shoes/(big)NIKE+JAM_black.png';
}
