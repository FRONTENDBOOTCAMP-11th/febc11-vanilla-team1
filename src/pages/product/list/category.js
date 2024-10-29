'use strict';
import api from '@/api.js';

class Category {
  main = [];
  middle = [];
  sub = [];

  async getMainCategory(code) {
    const {
      data: { item: codes },
    } = await api('get', 'codes/productCategory', {
      code,
      depth: 1,
    });

    this.main = codes.codes;
  }
  async getMiddleCategory(code) {
    const {
      data: { item: codes },
    } = await api('get', 'codes/productCategory', {
      parent: code,
    });
    this.middle = codes.codes;
  }
  async getSubCategory(code) {
    const {
      data: { item: codes },
    } = await api('get', 'codes/productCategory', {
      parent: code,
    });
    this.sub = codes.codes;
  }

  getBreadcrumbs(length) {
    switch (length) {
      case 0:
        return this.main;
      case 1:
        return this.middle;
      case 2:
      default:
        return this.sub;
    }
  }
}

// 현재 페이지의 URL을 가져옵니다.
const url = new URL(window.location.href);
// 쿼리 파라미터를 파싱합니다.
const URLparams = new URLSearchParams(url.search);
// category 쿼리 파라미터의 값을 가져옵니다.
const categoryParam = URLparams.get('category');

let categoryList = categoryParam ? categoryParam.split('-') : [];
let category = new Category();

async function setCategory() {
  await category.getMainCategory(categoryList[0]);
  await category.getMiddleCategory(categoryList[0]);

  if (categoryList.length > 1) {
    category.middle = category.middle.filter(
      item => item.code === categoryList[1],
    );
    await category.getSubCategory(categoryList[1]);
  }
  if (categoryList.length > 2) {
    category.sub = category.sub.filter(item => item.code === categoryList[2]);
  }

  const headerTitle = document.querySelector('.header__title .title');
  switch (categoryList.length) {
    case 0:
      headerTitle.textContent = '전체';
      break;
    case 1:
      headerTitle.textContent = category.main[0].desc || category.main[0].value;
      break;
    case 2:
      headerTitle.textContent =
        category.middle[0].desc || category.middle[0].value;
      break;
    default:
      headerTitle.textContent = category.sub[0].desc || category.sub[0].value;
  }
}

// 카테고리 목록 출력
function renderList() {
  const url = new URL(window.location.href);
  const baseURI = url.origin + url.pathname;

  const categoryListNode = document.querySelector('ul.categories');
  const sidebar__categoryListNode = document.querySelector(
    'ul.sidebar__categories',
  );
  let codes = [];

  switch (categoryList.length) {
    case 0:
      codes = category.main;
      break;
    case 1:
      codes = category.middle;
      break;
    case 2:
      codes = category.sub;
      break;
    default:
      codes = category.sub;
  }

  codes.forEach(code => {
    let queryStr = '';
    switch (categoryList.length) {
      case 0:
        queryStr = code.code;
        break;
      case 1:
        queryStr = `${categoryParam}-${code.code}`;
        break;
      case 2:
      default:
        queryStr = `${categoryList[0]}-${categoryList[1]}-${code.code}`;
    }
    categoryListNode.innerHTML += `
      <li class="categories__item">
        <a href="${baseURI}?category=${queryStr}">
          ${code.desc || code.value}
        </a>
      </li>
    `;
    sidebar__categoryListNode.innerHTML += `
      <li class="sidebar__category">
        <a href="${baseURI}?category=${queryStr}">
          ${code.desc || code.value}
        </a>
      </li>
    `;
  });
}

// breadcrumbs__list 출력
function renderBreadcrumbs() {
  const breadcrumbsListNode = document.querySelector('.breadcrumbs__list');

  categoryList.forEach((code, index) => {
    const queryStr = categoryList.slice(0, index + 1).join('-');
    const textContent = category.getBreadcrumbs(index)[0];

    const categoryNode = document.createElement('div');
    categoryNode.classList.add('breadcrumbs__item');
    categoryNode.innerHTML = `
      <a href="?category=${queryStr}">
        ${textContent.desc || textContent.value}
      </a>
    `;
    breadcrumbsListNode.appendChild(categoryNode);
  });
}

// 초기 실행
document.addEventListener('DOMContentLoaded', async () => {
  await setCategory();
  renderList();
  renderBreadcrumbs();
});
