// 필터 모바일 토글
function filterMobileToggle(e) {
  e.preventDefault();

  const dialogNode = document.querySelector('.dialog');
  dialogNode.classList.toggle('active');
}

// 정렬 드롭다운
function sortingDropdown(e, el) {
  e.preventDefault();
  console.log(el.getAttribute('aria-expanded'));
  el.setAttribute(
    'aria-expanded',
    el.getAttribute('aria-expanded') === 'true' ? 'false' : 'true',
  );

  const buttonIcon = document.querySelector('.header__sorting-dropdown img');
  buttonIcon.src = buttonIcon.src.includes('up')
    ? '/assets/icons/button24px/down.svg'
    : '/assets/icons/button24px/up.svg';
}

function toggleCollapse(el) {
  const collapseContainerNode = el.parentElement;
  const collapseContentNode =
    collapseContainerNode.querySelector('.collapse-content');

  el.querySelector('img').src = el.querySelector('img').src.includes('down')
    ? '/assets/icons/button24px/up.svg'
    : '/assets/icons/button24px/down.svg';
  collapseContentNode.classList.toggle('hidden');
}
document
  .querySelector('.collapse-button')
  .addEventListener('click', (e, el) => toggleCollapse(el));

// components
// script.js
// document.addEventListener('DOMContentLoaded', () => {
//   console.log('DOMContentLoaded');

//   loadComponent('/src/pages/board/components/footer/footer.html', 'footer');
// });

// function loadComponent(url, elementId) {
//   fetch(url)
//     .then(response => {
//       console.log('response:', response);

//       return response.text();
//     })
//     .then(data => {
//       document.getElementById(elementId).innerHTML = data;
//     })
//     .catch(error => console.error('Error loading component:', error));
// }
