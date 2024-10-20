'use strict'
import axios from 'axios';

const passwordInput = document.querySelector('#authInput');
const toggleOpen = document.querySelector('#toggleOpen');
const toggleClose = document.querySelector('#toggleClose');
const prevBtn = document.querySelector('#prevBtn');
const loginBtn = document.querySelector('#loginBtn');
const authEmail = document.querySelector('.auth-email');
const alertMessage = document.querySelector('.find-password');
const regTxt = document.querySelector('#regPw');
const editEmail = document.querySelector('.edit-email');
const regContainer = document.querySelector('#regContainer');

document.addEventListener('DOMContentLoaded', function () {
  const usersEmail = sessionStorage.getItem('email');
  authEmail.textContent = usersEmail;
  if (!usersEmail) {
    window.location.href = 'login.html';
  }
});

editEmail.addEventListener('click', function (e) {
  e.preventDefault();
  sessionStorage.clear();
  localStorage.clear();
  window.location.href = 'login.html';
})

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
  sessionStorage.clear();
  localStorage.clear();
  window.location.href = 'login.html';
});

function validPassword(userPw) {
  if (!userPw) {
    regContainer.style.display = 'block';
    regTxt.innerHTML = `<p>비밀번호가 일치하지 않습니다. *</p>`;
  }
}

async function loginUser(userEmail, userPw) {
  try {
    const response = await axios.post('https://11.fesp.shop/apidocs/users/login', {
      email: userEmail,
      password: userPw,
    });

    const accessToken = response.data.accessToken;
    const refreshToken = response.data.refreshToken;
    if (accessToken && refreshToken) {
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      console.log('토큰 저장 완료:', { accessToken, refreshToken });
      if (response.data.exists) {
        window.location.href = 'main.html';
      }
    } else {
      console.error('토큰을 받지 못했습니다. 로그인 실패');
    }

  } catch (error) {
    console.log('로그인 중 오류 발생', error);
    validPassword();
  }
}
loginBtn.addEventListener('click', function (e) {
  e.preventDefault();
  const userEmail = sessionStorage.getItem('email');
  const userPw = passwordInput.value.trim();

  if (userEmail && userPw) {
    loginUser(userEmail, userPw);
  } else {
    console.error('이메일 또는 비밀번호가 없습니다.');
    validPassword(userPw);
  }
});

alertMessage.addEventListener('click', function () {
  alert('아직 구현하지 않은 페이지입니다.')
})