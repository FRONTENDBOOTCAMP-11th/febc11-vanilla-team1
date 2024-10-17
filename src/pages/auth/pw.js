'use strict'

const passwordInput = document.querySelector('#authInput');
const toggleOpen = document.querySelector('#toggleOpen');
const toggleClose = document.querySelector('#toggleClose');
const prevBtn = document.querySelector('#prevBtn');

toggleClose.addEventListener('click', function () {
  passwordInput.type = 'text';
  toggleClose.style.display = 'none';
  toggleOpen.style.display = 'block';
});

toggleOpen.addEventListener('click', function () {
  passwordInput.type = 'password';
  toggleClose.style.display = 'block';
  toggleOpen.style.display = 'none';
});

prevBtn.addEventListener('click', function (e) {
  e.preventDefault();
  window.location.href = 'login.html';
})
