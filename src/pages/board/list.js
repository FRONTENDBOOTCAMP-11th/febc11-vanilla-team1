'use strict';
import axios from 'axios';

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

// 게시글 목록 조회
async function getList() {
  const res = await axios.get('https://11.fesp.shop/posts', {
    params: {
      type: 'test',
    },
  });
  return res.data;
}

// 게시글 출력
async function renderList() {
  const list = getList();
  if (!list) {
    return;
  }

  const { item } = await getList();

  // type Post = {
  //   _id: string;
  //   title: string;
  //   user: {
  //     _id: string;
  //     name: string;
  //   };
  //   content: string;
  //   views: number;
  //   createdAt: string;
  // };
  console.log(item);
}

// renderList();
