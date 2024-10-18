'use strict'

const passwordInput = document.querySelector('#authInput');
const toggleOpen = document.querySelector('#toggleOpen');
const toggleClose = document.querySelector('#toggleClose');
const prevBtn = document.querySelector('#prevBtn');
const loginBtn = document.querySelector('#loginBtn');
const authEmail = document.querySelector('.auth-email');
const regPw = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

document.addEventListener('DOMContentLoaded', function () {
  const usersEmail = sessionStorage.getItem('email');
  const decodedEmail = decodeURIComponent(usersEmail);

  authEmail.innerHTML = `${decodedEmail}`;

  if (!usersEmail) {
    window.location.href = 'login.html';
  }
});

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
  sessionStorage.removeItem('email');
  window.location.href = 'login.html';
});

// loginBtn.addEventListener('click', function(e) {
//   e.preventDefault();
//   if (regPw) {
    
//   }
// })


