'use strict'
import axios from 'axios';

const inputFirstName = document.querySelector('#inputFirstName');
const inputLastName = document.querySelector('#inputLastName');
const inputPassword = document.querySelector('#inputPassword');
const inputCalendar = document.querySelector('#inputCalendar');
const signUpBtn = document.querySelector('.signUp-btn');
const loginTxtFirst = document.querySelector('.first');
const loginTxtSecond = document.querySelector('.second');
const toggleOpen = document.querySelector('#toggleOpen');
const toggleClose = document.querySelector('#toggleClose');

const regFirstName = /^[가-힣a-zA-Z]{1,30}$/;
const regLastName = /^[가-힣a-zA-Z]{1,30}$/;
const regPw = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
const regEight = /^.{8,}$/;
const regMin = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;

function validatePassword(userPw) {
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
  validatePassword(userPw);
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
      }
    });
    const accessToken = response.data.token;
    if (accessToken) {
      localStorage.setItem('accessToken', accessToken);
    }
    if (response.data && response.data.exists) {
      window.location.href = 'pw.html';
    }

  } catch (error) {
    // 오류 정보 출력
    if (error.response) {
      console.error('서버 응답 오류:', error.response.data);  // 서버에서 반환된 오류 메시지 출력
      console.error('상태 코드:', error.response.status);     // HTTP 상태 코드 확인
    } else {
      console.error('정보가 없는뎁숑?', error);                // 네트워크 또는 기타 오류 처리
    }
  }
};

signUpBtn.addEventListener('click', function (e) {
  e.preventDefault();

  const userPw = inputPassword.value;
  const userName = `${inputFirstName.value + inputLastName.value}`;
  const userBirth = inputCalendar.value;
  const userEmail = decodeURIComponent(sessionStorage.getItem('email'));

  if (regFirstName.test(inputFirstName.value) && regLastName.test(inputLastName.value) && regPw.test(userPw)) {
    validatePassword(userPw);  // 비밀번호 유효성 업데이트
    userSign(userPw, userName, userBirth, userEmail);  // 서버로 회원가입 요청

  } else {
    validatePassword(userPw);  // 비밀번호 유효성 오류 메시지 표시
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