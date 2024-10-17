const inputFirstName = document.querySelector('#inputFirstName');
const inputLastName = document.querySelector('#inputLastName');
const inputPassword = document.querySelector('#inputPassword');
const inputCalendar = document.querySelector('#inputCalendar');
const signUpBtn = document.querySelector('.signUp-btn');
const loginTxtFirst = document.querySelector('.first');
const loginTxtSecond = document.querySelector('.second');

const regFirstName = /^[가-힣a-zA-Z]{1,15}$/;
const regLastName = /^[가-힣a-zA-Z]{1,15}$/;
const regPw = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
const regEight = /^.{8,}$/;
const regMin = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

signUpBtn.addEventListener('click', function () {
  const userPw = inputPassword.value;

  if (regFirstName.test(inputFirstName.value) && regLastName.test(inputLastName.value) && (regPw.test(userPw))) {
    loginTxtFirst.innerHTML = '<p style="color: var(--color-secondary)">X 최소 8자 이상 *</p>'
    loginTxtSecond.innerHTML = '<p style="color: var(--color-secondary)">X 알파벳 대문자 및 소문자 조합, 최소 1개 이상의 숫자 *</p>'
  } else if (!regEight.test(userPw)) {
    loginTxtFirst.innerHTML = '<p style="color: red">X 최소 8자 이상 *</p>'
  } else if (!regMin.test(userPw)) {
    loginTxtSecond.innerHTML = '<p style="color: red">X 알파벳 대문자 및 소문자 조합, 최소 1개 이상의 숫자 *</p>'
  }
})
