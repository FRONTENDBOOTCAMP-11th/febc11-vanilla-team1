// footer
const footerContainer = document.querySelector('.drop-container');
const footerContainerOrder = document.querySelector('.drop-container-order');
const footerContainerAbout = document.querySelector('.drop-container-about');

const footerUp = document.querySelector('.up-icon');
const footerDown = document.querySelector('.drop-icon');

const dropOrder = document.querySelector('.drop-icon-order');
const upOrder = document.querySelector('.up-icon-order');

const dropAbout = document.querySelector('.drop-icon-about');
const upAbout = document.querySelector('.up-icon-about');

footerDown.addEventListener('click', function () {
  footerContainer.style.display = 'block';
  footerUp.style.display = 'block';
  footerDown.style.display = 'none';
});

footerUp.addEventListener('click', function () {
  footerContainer.style.display = 'none';
  footerUp.style.display = 'none';
  footerDown.style.display = 'block';
});

dropOrder.addEventListener('click', function () {
  footerContainerOrder.style.display = 'block';
  upOrder.style.display = 'block';
  dropOrder.style.display = 'none';
});

upOrder.addEventListener('click', function () {
  footerContainerOrder.style.display = 'none';
  upOrder.style.display = 'none';
  dropOrder.style.display = 'block';
});

dropAbout.addEventListener('click', function () {
  footerContainerAbout.style.display = 'block';
  upAbout.style.display = 'block';
  dropAbout.style.display = 'none';
});

upAbout.addEventListener('click', function () {
  footerContainerAbout.style.display = 'none';
  upAbout.style.display = 'none';
  dropAbout.style.display = 'block';
});

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



//📌셀렉터 탭 구현
// 현재 선택된 탭
let currentTab = null;

function toggleView(showMap) {
  if (window.innerWidth <= 768) {
    // 앱 화면일 때만 toggle 기능 작동
    if (showMap) {
      document.querySelector('.map').style.display = 'block';
      document.querySelector('.card-container').style.display = 'none';
    } else {
      document.querySelector('.map').style.display = 'none';
      document.querySelector('.card-container').style.display = 'block';
    }
  } else {
    // 웹 화면일 때는 모두 보임
    document.querySelector('.map').style.display = 'block';
    document.querySelector('.card-container').style.display = 'block';
  }
}

function setActiveTab(tab) {
  // 이전 선택된 탭의 스타일을 초기화
  if (currentTab) {
    currentTab.style.fontWeight = 'normal'; // 초기화: normal
  }

  // 현재 선택된 탭 설정
  currentTab = tab;
  currentTab.style.fontWeight = 'bold'; // 클릭된 탭 스타일 변경
}

// 초기 화면 크기에 맞게 설정
window.addEventListener('load', function() {
  toggleView(true); // 처음에는 Map을 보이게 설정
  setActiveTab(document.querySelector('.map-tap')); // 처음 클릭된 탭 설정
});

// Map 탭 클릭 시
document.querySelector('.map-tap').addEventListener('click', function(e) {
  e.preventDefault();
  toggleView(true);
  setActiveTab(this); // 현재 클릭된 탭 설정
});

// List 탭 클릭 시
document.querySelector('.list-tap').addEventListener('click', function(e) {
  e.preventDefault();
  toggleView(false);
  setActiveTab(this); // 현재 클릭된 탭 설정
});

// 화면 크기 변경 시 웹 화면으로 돌아가면 둘 다 보이도록 설정
window.addEventListener('resize', function() {
  toggleView(true); // 크기 변경 시 다시 확인하여 둘 다 보이게 함
});