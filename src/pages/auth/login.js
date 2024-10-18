'use strict'
import axios from 'axios';

const authInput = document.querySelector('#emailInput');
const authBtn = document.querySelector('#loginBtn');
const emailRegex = /^[A-Za-z0-9]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
const regText = document.querySelector('.reg-Text');

authBtn.disabled = true;

authInput.addEventListener('input', function () {
  const userEmail = authInput.value.trim();
  if (userEmail === '') {
    authBtn.disabled = true;
    authInput.style.borderColor = 'red';
    regText.textContent = '필수';
  } else if (emailRegex.test(userEmail)) {
    authBtn.disabled = false;
    authInput.style.borderColor = 'black';
    regText.textContent = '';
  } else {
    authBtn.disabled = true;
    authInput.style.borderColor = 'red';
    regText.textContent = '잘못된 이메일 주소입니다.';
  }
});

authBtn.addEventListener('click', function (e) {
  e.preventDefault();
  const userEmail = authInput.value.trim();
  const infoEmail = encodeURIComponent(userEmail);

  async function getEmail(userEmail) {
    try {
      const accessToken = localStorage.getItem('accessToken');
      console.log('Access token:', accessToken); // 토큰 확인
      const response = await axios.get('https://11.fesp.shop/users/login', {
        params: {
          email: userEmail,
        },
        headers: {
          'Authorization': `Bearer ${accessToken}`
        },
      });

      console.log('Server response:', response.data); // 서버 응답 확인

      if (response.data && response.data.exists) {
        console.log('존재함');
        window.location.href = 'pw.html';
      } else {
        console.log('존재하지 않음');
        sessionStorage.setItem('email', userEmail);
        window.location.href = 'check.html';
      }
    } catch (error) {
      console.error('이메일 확인 중 오류', error);
    }
  }
  getEmail(infoEmail);
});