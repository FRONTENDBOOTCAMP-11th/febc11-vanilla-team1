'use strict';
import api from '@/api.js';

class Params {
  gender = [];

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

  getParams() {
    return {
      ...this.getGender(),
    };
  }
}
const params = new Params();

// `{"$or": ${JSON.stringify(params.getParams())}}`
// {"extra.isNew":{"$in":[true, false]},"_id":{"$in":[1,2,3]}}
// GET /api/products
async function getList() {
  try {
    const custom = params.getParams() || null;

    const { data } = await api('get', 'products', {
      custom: JSON.stringify(custom),
    });

    return data;
  } catch (error) {
    console.error(error);
  }
}
// 상품 목록 출력
async function renderList() {
  const listNode = document.querySelector('.product-list');

  const { item, pagination } = await getList();

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

// 정렬 드롭다운
function sortingDropdown(e, el) {
  e.preventDefault();

  el.setAttribute(
    'aria-expanded',
    el.getAttribute('aria-expanded') === 'true' ? 'false' : 'true',
  );

  const buttonIcon = document.querySelector('.header__sorting-dropdown img');
  buttonIcon.src = buttonIcon.src.includes('up')
    ? '/assets/icons/button24px/down.svg'
    : '/assets/icons/button24px/up.svg';
}
const sortingButton = document.querySelector(
  '.header__action-button.header__sorting-dropdown',
);
sortingButton.addEventListener('click', e =>
  sortingDropdown(e, e.currentTarget),
);

// filter toggle
function filterToggle(e) {
  e.preventDefault();

  const expanded = e.currentTarget.getAttribute('aria-expanded') === 'true';
  const asideNode = document.querySelector('.sidebar');
  const toggleTextNode = document.querySelector('.header__filter-toggle span');

  e.currentTarget.setAttribute('aria-expanded', !expanded);
  asideNode.setAttribute('aria-expanded', !expanded);
  toggleTextNode.textContent = expanded ? '필터 표시' : '필터 숨기기';
}
const filterToggleButton = document.querySelector('.header__filter-toggle');
filterToggleButton.addEventListener('click', e => filterToggle(e));

// filter menu dropdown
function dropdownFilterCollapse(e) {
  const collapseContainerNode = e.currentTarget.parentElement;
  const collapseContentNode =
    collapseContainerNode.querySelector('.collapse-content');

  e.currentTarget.querySelector('img').src = e.currentTarget
    .querySelector('img')
    .src.includes('down')
    ? '/assets/icons/button24px/up.svg'
    : '/assets/icons/button24px/down.svg';
  collapseContentNode.classList.toggle('hidden');
}
const filterCollapseButtons =
  document.querySelectorAll('.collapse-button') || [];
filterCollapseButtons.forEach(el => {
  el.addEventListener('click', e => dropdownFilterCollapse(e));
});

// filter mobile toggle
function filterMobileToggle(e) {
  e.preventDefault();

  const dialogNode = document.querySelector('.dialog');
  dialogNode.classList.toggle('active');
}
const filterMobileToggleButtons =
  document.querySelectorAll(
    '.subheading__filter-toggle, .close-btn[aria-label="필터 메뉴 닫기"]',
  ) || [];
filterMobileToggleButtons.forEach(el => {
  el.addEventListener('click', e => filterMobileToggle(e));
});

// 필터 메뉴 선택
function filterMenuSelect(e) {
  e.preventDefault();

  params.setGender(e.currentTarget.value);

  renderList();
}
document
  .querySelectorAll('.filter-checkbox input[type="checkbox"]')
  .forEach(el => {
    el.addEventListener('change', e => filterMenuSelect(e));
  });

// 초기 실행
document.addEventListener('DOMContentLoaded', () => {
  renderList();
});
