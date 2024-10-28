async function getHeader() {
  const res = await fetch('/src/components/header/header.html');
  if (!res.ok) {
    throw new Error('Failed to load header component');
  }
  return res.text();
}
async function renderHeader() {
  const html = await getHeader();
  document.getElementById('header-wrap').innerHTML = html;

  //✨메뉴패널 구현*/
  // 요소 선택
  const menuIcon = document.getElementById('menu-icon');
  const menuSidebar = document.getElementById('menu-sidebar');
  const closeBtn = document.querySelector('.close-btn');

  // 메뉴 아이콘 클릭 시 메뉴 탭이 나타나는 기능
  menuIcon.addEventListener('click', () => {
    menuSidebar.classList.add('active');
  });

  // X 닫기 버튼 클릭 시 메뉴 탭이 사라지는 기능
  closeBtn.addEventListener('click', () => {
    menuSidebar.classList.remove('active');
  });
}

// 페이지가 로드될 때 사이드바에 nav-links 내용 추가
window.addEventListener('DOMContentLoaded', async () => {
  await renderHeader();
});
