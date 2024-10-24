// fetch header component
// fetch('/src/components/header/header.html')
//   .then(res => res.text())
//   .then(html => {
//     document.getElementById('header-wrap').innerHTML = html;
//   })
//   .then(() => {
//     // fetch header component's js
//     fetch('/src/components/header/header.js')
//       .then(res => res.text())
//       .then(js => {
//         const script = document.createElement('script');
//         script.type = 'module';
//         script.innerHTML = js;
//         document.body.appendChild(script);
//       });
//   });
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
// nav-links의 내용을 복사해서 사이드바에 넣는 함수
function populateSidebar() {
  const navLinks = document.querySelector('.nav-links'); // 기존 내비게이션 링크들
  const sidebarLinks = document.getElementById('sidebar-links'); // 사이드바 내 링크를 추가할 곳
  sidebarLinks.innerHTML = navLinks.innerHTML; // nav-links의 내용을 그대로 복사
}
// 페이지가 로드될 때 사이드바에 nav-links 내용 추가
window.addEventListener('DOMContentLoaded', async () => {
  await renderHeader();

  populateSidebar();
});
