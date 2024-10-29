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
  checkLoginState();
  userOut();
  mobileOut();
});

// 로그인, 소셜로그인 시 헤더 변경
function checkLoginState() {
  const token = sessionStorage.getItem('accessToken');
  const userName = sessionStorage.getItem('name');
  const socialName = sessionStorage.getItem('name');

  const userLoginItems = document.querySelectorAll('.user-login');
  const userOutItems = document.querySelectorAll('.user-out');
  const userNameItems = document.querySelector('.user-name');
  const userSocialName = document.querySelector('.social-name');
  const loginMobile = document.querySelectorAll('.mobile-login');
  const logoutMobile = document.querySelector('.mobile-logout');

  if (token) {
    userLoginItems.forEach(item => (item.style.display = 'none'));
    userOutItems.forEach(item => (item.style.display = 'block'));
    userNameItems.innerHTML = `${userName} 님, 안녕하세요`;
    logoutMobile.style.display = 'block';
  } else if (socialName) {
    userLoginItems.forEach(item => (item.style.display = 'none'));
    userOutItems.forEach(item => (item.style.display = 'block'));
    userSocialName.innerHTML = `${socialName} 님, 안녕하세요`;
    logoutMobile.style.display = 'block';
  } else {
    userLoginItems.forEach(item => (item.style.display = 'block'));
    userOutItems.forEach(item => (item.style.display = 'none'));
    loginMobile.forEach(item => (item.style.display = ' block'));
  }
}

// 로그아웃 시 세션, 로컬 스토리지 삭제
function userOut() {
  const logOut = document.querySelector('.log-out');
  logOut.addEventListener('click', function () {
    sessionStorage.clear();
    localStorage.clear();
  });
}

function mobileOut() {
  const logoutMobile = document.querySelector('.mobile-logout');
  logoutMobile.addEventListener('click', function () {
    sessionStorage.clear();
    localStorage.clear();
  });
}
