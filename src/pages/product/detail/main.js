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

//----------------

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

const renderSize = function () {
  const sizelist = document.querySelector('.det_size_list');
  sizelist.innerHTML = '';

  if (product.item.options.length === 0) {
    product.item.extra.size.map(e => {
      sizelist.innerHTML += `<span>${e}</span>`;
    });
  } else {
    product.item.options[currentOption.option].extra.size.map(e => {
      sizelist.innerHTML += `<span>${e}</span>`;
    });
  }

  const sizes = [...sizelist.querySelectorAll('span')];
  sizes.forEach(e => {
    e.addEventListener('click', function (e) {
      currentOption.size = e.target.textContent;

      [...sizelist.querySelectorAll('span')].map(e => {
        e.classList.remove('unactive');
      });
      e.target.classList.add('active');
    });
  });
};

const currentOption = { option: 0, size: null };

renderImage(product, currentOption);
renderSize(product, currentOption);

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
