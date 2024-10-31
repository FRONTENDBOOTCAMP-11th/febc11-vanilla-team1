('use strict');
// import Swiper from 'swiper';
// import { Navigation, Pagination } from 'swiper/modules';
// import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';
// Swiper.use([Navigation, Pagination]);
// import '../../../../index';
import axios from 'axios';
import apijs from '../../../api';
// import Swiper from 'swiper';

export default function api(method, url, params = null, data = null) {
  const baseURL = import.meta.env.VITE_BASE_URL;
  const clientId = import.meta.env.VITE_CLIENT_ID;

  return axios({
    method,
    url: `${baseURL}/${url}`,
    params,
    data,
    headers: {
      'Content-Type': 'application/json',
      'client-id': clientId,
    },
  });
}
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

// fetch('https://11.fesp.shop/seller/products')
//   .then(response => response.json())
//   .then(data => {
//     console.log(data);
//   });

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
  );
});

let imgchange_black = document.querySelector('.nike_shoes');
document.querySelector('.black_button').addEventListener('click', function () {
  imgchange_black.setAttribute('src', 'https://via.placeholder.com/544');
});

//-----------------------------------------------------------------------------
// let product_item = {
//   name: '나이키 잼',
//   _id: 1,
//   price: 125100,
// };

// const res = await fetch('https://11.fesp.shop/products/1');
// console.log(res);

// fetch('https://11.fesp.shop/products/1')
//   .then(response => response.json())
//   .then(data => ['name']);

// fetch('https://11.fesp.shop/products/1')
//   .then(response => response.json())
//   .then(data => console.log(data['name']));

// res 변수에 json이라는 메서드를 사용해 이를 객체형태로 변환하고
// fetch함수는 비동기적으로 처리되기 때문에
// 이 api호출이 완전히 끝난 이후
// res변수를 객체로 변환해주기 위해 await를 사용한다.
// 결과에 데이터들이 객체 형태로 떠야 innerHTML로 뭘 하든 할텐데...
const getData = async () => {
  const res = await fetch('https://11.fesp.shop/products/1');
  const data = await res.json();
  console.log(data);
};

getData();

const urlSearch = new URLSearchParams(location.search);
const productId = urlSearch.get('productId');

const basket = document.querySelector('.basket');

const getProduct = async function (productId) {
  try {
    const response = await apijs('get', `products/${productId}`);
    return response.data;
  } catch (error) {
    console.error(error);
    return;
  }
};
const product = await getProduct(productId);

const renderImage = function () {
  const shoes_img = document.querySelector('.nike_shoes');
  shoes_img.innerHTML = '';
  if (product.item.options.length === 0) {
    product.item.mainImages.map(
      e =>
        (shoes_img.innerHTML += `<img src='https://11.fesp.shop/files/vanilla01/${e.name}
      ' />`),
    );
  } else {
    product.item.options[currentOption.option].mainImages.map(
      e =>
        (shoes_img.innerHTML += `<img src='https://11.fesp.shop/files/vanilla01/${e.name}
' />`),
    );
  }
};
renderImage(product, currentOption);

const currentOption = { option: 0, size: null };

basket.addEventListener('click', async function () {
  console.log(productId, currentOption.size);
  if (currentOption.size === null) {
    alert('원하는 신발 사이즈 선택하세요');
  } else {
    try {
      const product_id =
        product.item.options.length === 0
          ? +productId
          : +productId + currentOption.option + 1;
      const response = await apijs.post({
        product_id,
        quantity: 1,
        size: currentOption.size,
      });
      alert(`장바구니에 추가되었습니다.`);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }
});
