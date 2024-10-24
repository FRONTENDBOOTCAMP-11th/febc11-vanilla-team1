// footer
const footerDrop = document.querySelectorAll('.footer-drop');

footerDrop.forEach(el => {
  console.log(el);

  el.addEventListener('click', e => {
    e.preventDefault();
    const footerTab = el.parentElement;

    footerTab.setAttribute(
      'aria-expanded',
      footerTab.getAttribute('aria-expanded') === 'true' ? 'false' : 'true',
    );
  });
});
