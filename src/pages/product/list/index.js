'use strict';
import api from '@/api.js';

// 상품 리스트를 가져올 때 사용될 params를 관리하는 클래스
class Params {
  gender = [];
  price = [];
  category = [];
  currentPage = 1;
  page = 1;
  totalPages = 1;

  constructor() {
    // 현재 페이지의 URL을 가져옵니다.
    const url = new URL(window.location.href);

    // 쿼리 파라미터를 파싱합니다.
    const URLparams = new URLSearchParams(url.search);

    // 특정 쿼리 파라미터의 값을 가져옵니다.
    // category=depth1-depth2-depth3 형태로 되어 있습니다.
    // Men-신발-조던
    const paramValue = URLparams.get('category');

    let categoryList = null;
    if (paramValue) {
      categoryList = paramValue.split('-');
      this.category = categoryList;
    }
  }

  // g가 gender에 포함되어 있으면 제거, 아니면 추가
  setGender(g) {
    const index = this.gender.indexOf(g);
    index !== -1 ? this.gender.splice(index, 1) : this.gender.push(g);
  }
  getGender() {
    if (this.gender.length === 0) {
      return null;
    }
    const genderParams = {
      'extra.gender': {
        $in: [],
      },
    };
    this.gender.forEach(g => {
      genderParams['extra.gender'].$in.push(g);
    });

    return genderParams;
  }

  // p가 price에 포함되어 있으면 제거, 아니면 추가
  setPrice(p) {
    const index = this.price.indexOf(p);
    index !== -1 ? this.price.splice(index, 1) : this.price.push(p);
  }
  getPrice() {
    if (this.price.length === 0) {
      return null;
    }
    const MIN = [];
    const MAX = [];

    // p = min-max형태의 문자열
    this.price.forEach(p => {
      const [min, max] = p.split('-');
      MIN.push(min);
      MAX.push(max);
    });

    const priceParams = {
      minPrice: Math.min(...MIN),
      maxPrice: Math.max(...MAX),
    };
    return priceParams;
  }

  getCategory() {
    if (this.category.length === 0) {
      return null;
    }
    const categoryParams = {};
    this.category.forEach((c, i) => {
      categoryParams[`extra.category.${i}`] = c;
    });
    return categoryParams;
  }

  // getList에 사용될 params 객체 반환
  getCustomParams() {
    return {
      ...this.getGender(),
      ...this.getCategory(),
    };
  }
}
const params = new Params();
let isLoad = false;

// `{"$or": ${JSON.stringify(params.getParams())}}`
// {"extra.isNew":{"$in":[true, false]},"_id":{"$in":[1,2,3]}}
// GET /api/products
// 상품 리스트 가져오기
async function getProducts() {
  try {
    const custom = params.getCustomParams() || null;
    // console.log(custom);
    // console.log(JSON.stringify(custom));

    const { data } = await api('get', 'products', {
      custom: JSON.stringify(custom),
      minPrice: params?.getPrice()?.minPrice || null,
      maxPrice: params?.getPrice()?.maxPrice || null,
      page: params.page,
      limit: 15,
    });

    params.totalPages = data.pagination.totalPages;
    renderList(data);
  } catch (error) {
    console.error(error);
  }
}

// 상품 목록 출력
async function renderList(data) {
  const listNode = document.querySelector('.product-list');
  const countNode = document.querySelectorAll(
    '.result-count .count, .subheading__result-count .count',
  );

  const { item, pagination } = data || { item: [], pagination: {} };

  // item의 price를 기준으로 오름차순 정렬
  // item.sort((a, b) => a.price - b.price);

  // 상품 개수 출력
  countNode.forEach(el => {
    el.textContent = `(${pagination.total})`;
  });

  // 상품 목록 출력
  const list = item
    .map(product => {
      console.log(product);

      return `
      <li class="product">
        <figure>
          <a href="/src/pages/product/detail/index.html?id=${product._id}">
            <div class="product__image">
              <img 
                src="https://11.fesp.shop${product.mainImages[0].path}" 
                alt="${product.mainImages[0].name}" 
              />
            </div>

            <div class="product__info">
              <div class="product-title">
                ${product.extra.isNew ? '<span class="isNew">신제품</span>' : ''}
                ${product.extra.isBest ? '<span class="isHot">인기</span>' : ''}
                <div class="product__name">${product.name}</div>
                <div class=""product__content">
                  ${product.content || ''}
                </div>
              </div>
              ${product.options ? `<div class="product__count">${product.options}개 색상</div>` : ''}              
              <p class="product__price">${product.price.toLocaleString()} 원</p>
            </div>
          </a>
        </figure>
      </li>
    `;
    })
    .join('');

  if (list === '') {
    listNode.innerHTML = '<p>상품이 없습니다.</p>';
    return;
  }
  if (params.currentPage !== params.page) {
    listNode.innerHTML += list;
    params.currentPage = params.page;
  } else {
    listNode.innerHTML = list;
  }
  isLoad = false;
}

// 필터 메뉴 선택
function filterMenuSelect(e) {
  e.preventDefault();

  switch (e.currentTarget.name) {
    case 'price__filter':
      params.setPrice(e.currentTarget.value);
      break;
    case 'gender__filter':
      params.setGender(e.currentTarget.value);
      break;
    default:
      break;
  }

  // 페이지와 스크롤 초기화
  window.scrollTo(0, 0);
  params.page = 1;
  params.totalPages = 1;
  params.currentPage = 1;
  getProducts();
}
// 카테고리에 이벤트 리스너 추가
document
  .querySelectorAll('.filter-checkbox input[type="checkbox"]')
  .forEach(el => {
    el.addEventListener('change', e => filterMenuSelect(e));
  });

// 지우기 버튼 클릭시 필터 초기화
function filterReset(e) {
  e.preventDefault();

  const filterCheckboxes = document.querySelectorAll(
    '.filter-checkbox input[type="checkbox"]',
  );
  filterCheckboxes.forEach(el => {
    if (el.checked) {
      // el에 change 이벤트 발생
      el.checked = false;
      const event = new Event('change');
      el.dispatchEvent(event);
    }
  });
}
document
  .querySelector('button[aria-label="필터 초기화"]')
  .addEventListener('click', e => filterReset(e));

// 무한 스크롤
window.addEventListener('scroll', () => {
  const footerNode = document.querySelector('footer');
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

  // 스크롤이 페이지 하단에 도달했는지 확인
  // footerNode 위치에 도달시 한 번만 실행
  if (scrollTop + clientHeight >= scrollHeight - footerNode.clientHeight) {
    if (isLoad) return;
    isLoad = true;

    if (params.page < params.totalPages) {
      params.page += 1;
      getProducts();
    }
  }
});

// 초기 실행
document.addEventListener('DOMContentLoaded', () => {
  getProducts();
});
