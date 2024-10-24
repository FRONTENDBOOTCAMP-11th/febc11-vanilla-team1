//✨메뉴패널 구현*/
// 요소 선택
const menuIcon = document.getElementById('menu-icon');
const menuSidebar = document.getElementById('menu-sidebar');
const closeBtn = document.querySelector('.close-btn');
const navLinks = document.querySelector('.nav-links'); // 기존 내비게이션 링크들
const sidebarLinks = document.getElementById('sidebar-links'); // 사이드바 내 링크를 추가할 곳

// 메뉴 아이콘 클릭 시 메뉴 탭이 나타나는 기능
menuIcon.addEventListener('click', () => {
  menuSidebar.classList.add('active');
});

// X 닫기 버튼 클릭 시 메뉴 탭이 사라지는 기능
closeBtn.addEventListener('click', () => {
  menuSidebar.classList.remove('active');
});

// nav-links의 내용을 복사해서 사이드바에 넣는 함수
function populateSidebar() {
  sidebarLinks.innerHTML = navLinks.innerHTML; // nav-links의 내용을 그대로 복사
}

// 페이지가 로드될 때 사이드바에 nav-links 내용 추가
window.addEventListener('DOMContentLoaded', populateSidebar);
