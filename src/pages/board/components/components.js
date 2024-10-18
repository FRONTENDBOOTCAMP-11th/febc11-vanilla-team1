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
