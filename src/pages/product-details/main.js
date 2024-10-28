'use strict';
import Swiper from 'swiper';
import 'swiper/css';
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

// 버튼 이벤트 (신발이미지 클릭에 따른 이미지 변경)
let imgchange_braun = document.querySelector('.nike_shoes');
document.querySelector('.braun_button').addEventListener('click', function () {
  imgchange_braun.setAttribute(
    'src',
    '../../../public/assets/icons/shoes/(big)NIKE+JAM_braun.svg',
    'src',
    '../../../public/assets/icons/shoes/middle-img-1.svg',
  );
});

let imgchange_black = document.querySelector('.nike_shoes');
document.querySelector('.black_button').addEventListener('click', function () {
  imgchange_black.setAttribute(
    'src',
    '../../../public/assets/icons/shoes/(big)NIKE+JAM_black.svg',
    'src',
    '../../../public/assets/icons/shoes/middle-img-black-1.svg',
  );
});
