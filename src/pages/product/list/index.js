'use strict';
import api from '@/api.js';

class Params {
  gender = [];
  price = [];
  category = [];

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

  getCustomParams() {
    return {
      ...this.getGender(),
    };
  }
}
const params = new Params();

// GET /api/codes
// get main category
async function getMainCategory() {
  // 현재 페이지의 URL을 가져옵니다.
  const url = new URL(window.location.href);

  // 쿼리 파라미터를 파싱합니다.
  const URLparams = new URLSearchParams(url.search);

  // 특정 쿼리 파라미터의 값을 가져옵니다.
  // category=depth1-depth2-depth3 형태로 되어 있습니다.
  // Men-신발-조던
  const paramValue = URLparams.get('category');
  console.log(paramValue);

  let categoryList = null;
  if (paramValue) {
    categoryList = paramValue.split('-');
    params.category = categoryList;
  }

  try {
    const {
      data: {
        item: { codes },
      },
    } = await api('get', 'codes/productCategory', {
      code: categoryList && categoryList[categoryList.length - 1],
      depth: categoryList ? categoryList.length : 1,
    });

    // data.item.codes[0] or data.item.productCategory.codes[0]
    // codes[0]만 사용
    const headerTitle = document.querySelector('.header__title .title');
    headerTitle.textContent = codes[0].desc || codes[0].value;

    getSubCategory(codes[0].code);
    // renderCategoryList(data.item?.codes[0]);
  } catch (error) {
    console.error(error);
  }
}

// get sub category
async function getSubCategory(code) {
  try {
    const {
      data: {
        item: { codes },
      },
    } = await api('get', 'codes/productCategory', {
      parent: code,
    });

    console.log(codes);

    renderCategoryList(codes);
  } catch (error) {
    console.error(error);
  }
}

// 카테고리 목록 출력
function renderCategoryList(codes) {
  console.log(codes);
  const url = new URL(window.location.href);
  const baseURI = url.origin + url.pathname;

  const categoryList = document.querySelector('ul.categories');
  const sidebar__categoryList = document.querySelector(
    'ul.sidebar__categories',
  );

  codes.forEach(code => {
    categoryList.innerHTML += `
      <li class="categories__item">
        <a href="${baseURI}?category=${code.code}">
          ${code.desc || code.value}
        </a>
      </li>
    `;
    sidebar__categoryList.innerHTML += `
      <li class="sidebar__category">
        <a href="${baseURI}?category=${code.code}">
          ${code.desc || code.value}
        </a>
      </li>
    `;
  });
  // categoryList.forEach(el => {
  //   const sub = data.sub || [];
  //   const list = sub.map(item => {
  //     return `
  //       <li class="${el.classList.contains('is_mobile') ? 'categories' : 'sidebar__category'}">
  //         <a href="${baseURI}?category=${data.code}-${item.code}">
  //           ${item.desc || item.value}
  //         </a>
  //       </li>
  //     `;
  //   });
  //   el.innerHTML = list.join('');
  // });
}

// `{"$or": ${JSON.stringify(params.getParams())}}`
// {"extra.isNew":{"$in":[true, false]},"_id":{"$in":[1,2,3]}}
// GET /api/products
async function getList() {
  try {
    const custom = params.getCustomParams() || null;
    // console.log(custom);
    console.log(params.category);

    const { data } = await api('get', 'products', {
      custom: JSON.stringify(custom),
      minPrice: params?.getPrice()?.minPrice || null,
      maxPrice: params?.getPrice()?.maxPrice || null,
    });

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
    el.textContent = pagination.total;
  });

  // 상품 목록 출력
  const list = item
    .map(product => {
      return `
      <li class="product">
        <figure>
          <a href="">
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
  listNode.innerHTML = list;
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

  getList();
}
document
  .querySelectorAll('.filter-checkbox input[type="checkbox"]')
  .forEach(el => {
    el.addEventListener('change', e => filterMenuSelect(e));
  });

// 카테고리

// 초기 실행
document.addEventListener('DOMContentLoaded', () => {
  getMainCategory();
  getList();
});
