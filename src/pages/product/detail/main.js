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
'use strict';
// import Swiper from 'swiper';
// import { Navigation, Pagination } from 'swiper/modules';
// import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';
// Swiper.use([Navigation, Pagination]);
// import '../../../../index';
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
    '../../../../public/assets/icons/shoes/NIKE+JAM.png.svg',
    'src',
    '../../../../public/assets/icons/shoes/middle-img-1.svg',
  );
});

let imgchange_black = document.querySelector('.nike_shoes');
document.querySelector('.black_button').addEventListener('click', function () {
  imgchange_black.setAttribute(
    'src',
    '../../../../public/assets/icons/shoes/(big)NIKE+JAM_black.svg',
    'src',
    '../../../../public/assets/icons/shoes/middle-img-black-1.svg',
  );
});

// footer
const footerContainer = document.querySelector('.drop-container');
const footerContainerOrder = document.querySelector('.drop-container-order');
const footerContainerAbout = document.querySelector('.drop-container-about');

const footerUp = document.querySelector('.up-icon');
const footerDown = document.querySelector('.drop-icon');

const dropOrder = document.querySelector('.drop-icon-order');
const upOrder = document.querySelector('.up-icon-order');

const dropAbout = document.querySelector('.drop-icon-about');
const upAbout = document.querySelector('.up-icon-about');

footerDown.addEventListener('click', function () {
  footerContainer.style.display = 'block';
  footerUp.style.display = 'block';
  footerDown.style.display = 'none';
});

footerUp.addEventListener('click', function () {
  footerContainer.style.display = 'none';
  footerUp.style.display = 'none';
  footerDown.style.display = 'block';
});

dropOrder.addEventListener('click', function () {
  footerContainerOrder.style.display = 'block';
  upOrder.style.display = 'block';
  dropOrder.style.display = 'none';
});

upOrder.addEventListener('click', function () {
  footerContainerOrder.style.display = 'none';
  upOrder.style.display = 'none';
  dropOrder.style.display = 'block';
});

dropAbout.addEventListener('click', function () {
  footerContainerAbout.style.display = 'block';
  upAbout.style.display = 'block';
  dropAbout.style.display = 'none';
});

upAbout.addEventListener('click', function () {
  footerContainerAbout.style.display = 'none';
  upAbout.style.display = 'none';
  dropAbout.style.display = 'block';
});

//✨메뉴패널 구현*/
// 요소 선택
const menuIcon = document.getElementById('menu-icon');
const menuSidebar = document.getElementById('menu-sidebar');
const closeBtn = document.querySelector('.close-btn');
const navLinks = document.querySelector('.nav-links'); // 기존 내비게이션 링크들
const sidebarLinks = document.getElementById('sidebar-links'); // 사이드바 내 링크를 추가할 곳

// 메뉴 아이콘 클릭 시 메뉴 탭이 나타나는 기능
menuIcon.addEventListener('click', () => {
  menuSidebar.classList.add('active');
});

// X 닫기 버튼 클릭 시 메뉴 탭이 사라지는 기능
closeBtn.addEventListener('click', () => {
  menuSidebar.classList.remove('active');
});

// nav-links의 내용을 복사해서 사이드바에 넣는 함수
function populateSidebar() {
  sidebarLinks.innerHTML = navLinks.innerHTML; // nav-links의 내용을 그대로 복사
}

// 페이지가 로드될 때 사이드바에 nav-links 내용 추가
window.addEventListener('DOMContentLoaded', populateSidebar);
