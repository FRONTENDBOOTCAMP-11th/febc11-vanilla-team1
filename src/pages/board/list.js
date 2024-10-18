'use strict';
import axios from 'axios';

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
