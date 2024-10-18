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

localStorage.getItem('email');



signUpBtn.addEventListener('click', function (e) {
  e.preventDefault();
  const userPw = inputPassword.value;
  const userName = `${inputFirstName.value + inputLastName.value}`;
  const userBirth = inputCalendar.value;
  const userEmail = sessionStorage.getItem('email', userEmail);

  async function userSign(userPw, userName, userBirth, userEmail) {
    try {
      const accessToken = localStorage.setItem('accessToken');
      const response = await axios.post('https://11.fesp.shop/users/', {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        },
        params: {
          email: userEmail,
          password: userPw,
          name: userName,
          extra: userBirth
        }
      });
      console.log('Server response:', response.data); // 서버 응답 확인
      if (response.data && response.data.exists) {
        console.log('존재');
      }

    } catch (error) {
      console.error('정보가 없는뎁숑?', error);
    }
  };

  if (regFirstName.test(inputFirstName.value) && regLastName.test(inputLastName.value) && (regPw.test(userPw))) {
    loginTxtFirst.innerHTML = `<p style="color: var(--color-secondary)"> 최소 8자 이상</p>`
    loginTxtSecond.innerHTML = '<p style="color: var(--color-secondary)">V 알파벳 대문자 및 소문자 조합, 최소 1개 이상의 숫자 *</p>'
  } else if (!regEight.test(userPw)) {
    loginTxtFirst.innerHTML = '<p style="color: red">X 최소 8자 이상 *</p>'
  } else if (!regMin.test(userPw)) {
    loginTxtSecond.innerHTML = '<p style="color: red">X 알파벳 대문자 및 소문자 조합, 최소 1개 이상의 숫자 *</p>'
  }
  userSign(userEmail, userName, userBirth, userPw);
})


inputPassword.addEventListener('input', function () {
  const userPw = inputPassword.value;

  if (userPw === '') {
    loginTxtFirst.innerHTML = `<p style="color:var(--color-gray-500)">X 최소 8자 이상 * </p>`;
    loginTxtSecond.innerHTML = '<p style="color:var(--color-gray-500)">X 알파벳 대문자 및 소문자 조합, 최소 1개 이상의 숫자 *</p>';

  } else if (!regEight.test(userPw) && regMin.test(userPw)) {
    loginTxtFirst.innerHTML = '<p style="color: red">X 최소 8자 이상 *</p>';
    loginTxtSecond.innerHTML = '<p style="color: var(--color-secondary)">V 알파벳 대문자 및 소문자 조합, 최소 1개 이상의 숫자 *</p>';
  }

  else if (!regEight.test(userPw)) {
    loginTxtFirst.innerHTML = '<p style="color: red">X 최소 8자 이상 *</p>';
    loginTxtSecond.innerHTML = '<p style="color: red">X 알파벳 대문자 및 소문자 조합, 최소 1개 이상의 숫자 *</p>';
  }

  else if (!regMin.test(userPw)) {
    loginTxtFirst.innerHTML = '<p style="color: var(--color-secondary)">V 최소 8자 이상 *</p>';
    loginTxtSecond.innerHTML = '<p style="color: red">X 알파벳 대문자 및 소문자 조합, 최소 1개 이상의 숫자 *</p>';
  } else {
    loginTxtFirst.innerHTML = '<p style="color: var(--color-secondary)">V 최소 8자 이상 *</p>';
    loginTxtSecond.innerHTML = '<p style="color: var(--color-secondary)">V 알파벳 대문자 및 소문자 조합, 최소 1개 이상의 숫자 *</p>';
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