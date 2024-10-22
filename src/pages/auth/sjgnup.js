'use strict'
import axios from 'axios';

const inputFirstName = document.querySelector('#inputFirstName');
const inputLastName = document.querySelector('#inputLastName');
const inputPassword = document.querySelector('#inputPassword');
const inputCalendar = document.querySelector('#inputCalendar');
const signUpBtn = document.querySelector('.signUp-btn');
const cancelBtn = document.querySelector('#cancelBtn');
const loginTxtFirst = document.querySelector('.first');
const loginTxtSecond = document.querySelector('.second');
const toggleOpen = document.querySelector('#toggleOpen');
const toggleClose = document.querySelector('#toggleClose');

const regFirstName = /^[가-힣a-zA-Z]{1,30}$/;
const regLastName = /^[가-힣a-zA-Z]{1,30}$/;
const regPw = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
const regEight = /^.{8,}$/;
const regMin = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;


document.addEventListener('DOMContentLoaded', function () {
  const savedEmail = sessionStorage.getItem('email');
  if (!savedEmail) {
    window.location.href = 'login.html';
  }
});

toggleClose.addEventListener('click', function () {
  inputPassword.type = 'text';
  toggleClose.style.display = 'none';
  toggleOpen.style.display = 'block';
});

toggleOpen.addEventListener('click', function () {
  inputPassword.type = 'password';
  toggleClose.style.display = 'block';
  toggleOpen.style.display = 'none';
});

function regPassword(userPw) {
  if (userPw === '') {
    loginTxtFirst.innerHTML = `<p style="color:var(--color-gray-500)">X 최소 8자 이상 *</p>`;
    loginTxtSecond.innerHTML = '<p style="color:var(--color-gray-500)">X 알파벳 대문자 및 소문자 조합, 최소 1개 이상의 숫자 *</p>';
  } else if (!regEight.test(userPw)) {
    loginTxtFirst.innerHTML = '<p style="color: red">X 최소 8자 이상 *</p>';
    loginTxtSecond.innerHTML = '<p style="color: red">X 알파벳 대문자 및 소문자 조합, 최소 1개 이상의 숫자 *</p>';
  } else if (!regMin.test(userPw)) {
    loginTxtFirst.innerHTML = '<p style="color: var(--color-secondary)">V 최소 8자 이상 *</p>';
    loginTxtSecond.innerHTML = '<p style="color: red">X 알파벳 대문자 및 소문자 조합, 최소 1개 이상의 숫자 *</p>';
  } else {
    loginTxtFirst.innerHTML = '<p style="color: var(--color-secondary)">V 최소 8자 이상 *</p>';
    loginTxtSecond.innerHTML = '<p style="color: var(--color-secondary)">V 알파벳 대문자 및 소문자 조합, 최소 1개 이상의 숫자 *</p>';
  }
}

inputPassword.addEventListener('input', function () {
  const userPw = inputPassword.value;
  regPassword(userPw);
});

async function userSign(userPw, userName, userBirth, userEmail) {
  try {
    const response = await axios.post('https://11.fesp.shop/users/', {
      email: userEmail,
      password: userPw,
      name: userName,
      type: 'user',
      extra: {
        userBirth
      },
    });

    if (response.data) {
      loginUser(userEmail, userPw);
    }

  } catch (error) {
    if (error.response) {
      console.error('서버 응답 오류:', error.response.data);
      console.error('상태 코드:', error.response.status);
    } else {
      console.error('정보가 없습니다.', error);
    }
  }
};

async function loginUser(userEmail, userPw) {
  try {
    const response = await axios.post('https://11.fesp.shop/users/login', {
      email: userEmail,
      password: userPw,
    });

    if (response.data.item.token) {
      const { accessToken, refreshToken } = response.data.item.token

      if (accessToken && refreshToken) {
        sessionStorage.setItem('accessToken', accessToken);
        sessionStorage.setItem('refreshToken', refreshToken);
        window.location.href = 'complete.html';
      } else {
        console.error('토큰을 받지 못했습니다. 로그인 실패');
      }
    }
  } catch (error) {
    console.log('로그인 중 오류 발생', error);
  }
}

signUpBtn.addEventListener('click', function (e) {
  e.preventDefault();
  const userPw = inputPassword.value;
  const userName = `${inputFirstName.value + inputLastName.value}`;
  const userBirth = inputCalendar.value;
  const userEmail = sessionStorage.getItem('email');

  if (regFirstName.test(inputFirstName.value) && regLastName.test(inputLastName.value) && regPw.test(userPw)) {
    regPassword(userPw);
    userSign(userPw, userName, userBirth, userEmail);

  } else {
    regPassword(userPw);
  }
});

cancelBtn.addEventListener('click', function () {
  window.location.href = 'login.html'
  sessionStorage.removeItem('email');
});


