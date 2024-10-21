'use strict'

const checkSocial = document.querySelector('#socialIcon');
const blankSocial = document.querySelector('#socialBlank');
const questionSocial = document.querySelector('#socialQuestion');
const cancelBtn = document.querySelector('#cancel-btn');

checkSocial.addEventListener('click', function () {
  checkSocial.style.display = 'none';
  blankSocial.style.display = 'block';
})

blankSocial.addEventListener('click', function () {
  checkSocial.style.display = 'block';
  blankSocial.style.display = 'none';
})

questionSocial.addEventListener('click', function () {
  alert(`로그인한 계정의 정보가 저장됩니다. 개인정보 보호를 위해 개인 기기에서만 사용해 주세요.`);
})

cancelBtn.addEventListener('click', function () {
  window.location.href = 'login.html';
})

