'use strict';
import axios from 'axios';

// 필터 토글
function filterToggle(e) {
  e.preventDefault();

  const asideNode = document.querySelector('.sidebar');
  const toggleTextNode = document.querySelector('.filter-toggle span');
  asideNode.classList.toggle('active');
  toggleTextNode.textContent = toggleTextNode.textContent.includes('숨기기')
    ? '필터 표시'
    : '필터 숨기기';
}
document
  .querySelector('button.filter-toggle')
  .addEventListener('click', filterToggle);

// 필터 모바일 토글
function filterMobileToggle(e) {
  e.preventDefault();

  const sidebarNode = document.querySelector('.sidebar-mobile-wrapper');
  sidebarNode.classList.toggle('active');
}
document
  .querySelector('.subheading.is_mobile button.filter-toggle')
  .addEventListener('click', filterMobileToggle);
document
  .querySelector('.sidebar-mobile-wrapper button.close-btn')
  .addEventListener('click', filterMobileToggle);

// 정렬 드롭다운
function sortMenuDropdown(e) {
  e.preventDefault();

  const dropdownNode = document.querySelector('.dropdown__options-list');
  dropdownNode.classList.toggle('active');
  const buttonIcon = document.querySelector('button.sort-toggle img');
  buttonIcon.src = buttonIcon.src.includes('up')
    ? '../../assets/icons/button24px/down.svg'
    : '../../assets/icons/button24px/up.svg';
}
document
  .querySelector('button.sort-toggle')
  .addEventListener('click', sortMenuDropdown);

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
