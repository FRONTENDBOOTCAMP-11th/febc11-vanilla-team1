'use strict'
import axios from 'axios';

const authInput = document.querySelector('#emailInput');
const authBtn = document.querySelector('#loginBtn');
const emailRegex = /^[A-Za-z0-9]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
const regText = document.querySelector('.reg-Text');


authInput.addEventListener('input', function () {
  const userEmail = authInput.value.trim();
  if (userEmail === '') {
    authInput.style.borderColor = 'red';
    regText.textContent = '필수';
  } else if (emailRegex.test(userEmail)) {
    authInput.style.borderColor = 'black';
    regText.textContent = '';
  } else {
    authInput.style.borderColor = 'red';
    regText.textContent = '잘못된 이메일 주소입니다.';
  }
});

async function getEmail(userEmail) {
  try {

    const response = await axios.get('https://11.fesp.shop/users/email', {
      params: {
        email: userEmail,
      },
    });

    const accessToken = response.data.accessToken;
    const refreshToken = response.data.refreshToken;

    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    console.log('토큰 저장 완료:', { accessToken, refreshToken });

    if (response.data.ok === 0 && response.data.message === "이미 등록된 이메일입니다.") {
      sessionStorage.setItem('email', userEmail);
      window.location.href = 'pw.html';
    } else {
      sessionStorage.setItem('email', userEmail);
      window.location.href = 'check.html';
    }
  } catch (error) {
    if (error.response && error.response.status === 409) {
      // 409 Conflict 에러 처리
      console.log('이메일이 이미 등록되어 있습니다.');
      sessionStorage.setItem('email', userEmail);
      window.location.href = 'pw.html'; // 비밀번호 입력 페이지로 이동
    } else {
      console.error('이메일 확인 중 오류', error);
    }
  }
}

authBtn.addEventListener('click', function (e) {
  e.preventDefault();
  const userEmail = authInput.value.trim();
  if (userEmail === '') {
    authInput.style.borderColor = 'red';
    regText.textContent = '필수';
  } else if (emailRegex.test(userEmail)) {
    authInput.style.borderColor = 'black';
    regText.textContent = '';
  } else {

    authInput.style.borderColor = 'red';
    regText.textContent = '잘못된 이메일 주소입니다.';
  }

  sessionStorage.setItem('email', userEmail);
  getEmail(userEmail);
});