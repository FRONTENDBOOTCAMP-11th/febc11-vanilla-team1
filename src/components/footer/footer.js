async function getFooter() {
  const res = await fetch('/src/components/footer/footer.html');
  if (!res.ok) {
    throw new Error('Failed to load footer component');
  }
  return res.text();
}

async function renderFooter() {
  const html = await getFooter();

  document.getElementById('footer-wrap').innerHTML = html;

  // footer
  const footerDrop = document.querySelectorAll('.footer-drop');

  footerDrop.forEach(el => {
    el.addEventListener('click', e => {
      e.preventDefault();
      const footerTab = el.parentElement;

      footerTab.setAttribute(
        'aria-expanded',
        footerTab.getAttribute('aria-expanded') === 'true' ? 'false' : 'true',
      );
    });
  });
}

window.addEventListener('DOMContentLoaded', async () => {
  await renderFooter();
});
