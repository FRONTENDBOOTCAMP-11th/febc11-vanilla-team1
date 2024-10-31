import api from '../../api';

const inputFirstName = document.querySelector('#inputFirstName');
const inputLastName = document.querySelector('#inputLastName');
const inputPassword = document.querySelector('#inputPassword');
const inputCalendar = document.querySelector('#inputCalendar');
const authInput = document.querySelector('#emailInput');

const signUpForm = document.querySelector('#signUpForm');
const cancelBtn = document.querySelector('#cancelBtn');
const loginTxtFirst = document.querySelector('.first');
const loginTxtSecond = document.querySelector('.second');
const toggleOpen = document.querySelector('#toggleOpen');
const toggleClose = document.querySelector('#toggleClose');
const checkbox = document.querySelector('#check');

const regFirstName = /^[가-힣a-zA-Z]{1,30}$/;
const regLastName = /^[가-힣a-zA-Z]{1,30}$/;
const regPw = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
const regEight = /^.{8,}$/;
const regMin = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;

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

// input 초기화
function resetInputs() {
  document.querySelectorAll('input').forEach(input => {
    input.value = '';
  });
}

// 날짜
function setDate() {
  const today = new Date().toISOString().split('T')[0];
  document.querySelector('#inputCalendar').setAttribute('max', today);
}

setDate();

function regPassword(userPw) {
  if (userPw === '') {
    loginTxtFirst.innerHTML = `<p style="color:var(--color-gray-500)">X 최소 8자 이상 *</p>`;
    loginTxtSecond.innerHTML =
      '<p style="color:var(--color-gray-500)">X 알파벳 대문자 및 소문자 조합, 최소 1개 이상의 숫자 *</p>';
  } else if (!regEight.test(userPw)) {
    loginTxtFirst.innerHTML = '<p style="color: red">X 최소 8자 이상 *</p>';
    loginTxtSecond.innerHTML =
      '<p style="color: red">X 알파벳 대문자 및 소문자 조합, 최소 1개 이상의 숫자 *</p>';
  } else if (!regMin.test(userPw)) {
    loginTxtFirst.innerHTML =
      '<p style="color: var(--color-secondary)">V 최소 8자 이상 *</p>';
    loginTxtSecond.innerHTML =
      '<p style="color: red">X 알파벳 대문자 및 소문자 조합, 최소 1개 이상의 숫자 *</p>';
  } else {
    loginTxtFirst.innerHTML =
      '<p style="color: var(--color-secondary)">V 최소 8자 이상 *</p>';
    loginTxtSecond.innerHTML =
      '<p style="color: var(--color-secondary)">V 알파벳 대문자 및 소문자 조합, 최소 1개 이상의 숫자 *</p>';
  }
}

inputPassword.addEventListener('input', function () {
  regPassword(inputPassword.value);
});

async function userSign(password, name, userBirth, email) {
  try {
    const response = await api('post', 'users/', null, {
      email,
      password,
      name,
      type: 'user',
      extra: {
        userBirth,
      },
    });

    if (response.data) {
      loginUser(email, password);
    }
  } catch (error) {
    if (error.response) {
      console.error('서버 응답 오류:', error.response.data);
      console.error('상태 코드:', error.response.status);
    } else {
      console.error('정보가 없습니다.', error);
    }
  }
}

async function loginUser(email, password) {
  try {
    const response = await api('post', 'users/login', null, {
      email,
      password,
    });
    if (response.data.item.token) {
      const { accessToken, refreshToken } = response.data.item.token;
      const userName = response.data.item.name;

      if (accessToken && refreshToken) {
        sessionStorage.setItem('accessToken', accessToken);
        sessionStorage.setItem('refreshToken', refreshToken);
        sessionStorage.setItem('name', userName);
        window.location.href = 'complete.html';
        resetInputs();
        sessionStorage.removeItem('email');
      } else {
        console.error('토큰을 받지 못했습니다. 로그인 실패');
      }
    }
  } catch (error) {
    console.log('로그인 중 오류 발생', error);
  }
}

function signCheck() {
  const checkFirstName = regFirstName.test(inputFirstName.value);
  const checkLastName = regLastName.test(inputLastName.value);
  const checkPassword = regPw.test(inputPassword.value);
  const isCheckboxChecked = checkbox.checked === true;

  return checkFirstName && checkLastName && checkPassword && isCheckboxChecked;
}

signUpForm.addEventListener('submit', function (e) {
  e.preventDefault();

  const userPw = inputPassword.value;
  const userName = `${inputFirstName.value + inputLastName.value}`;
  const userBirth = inputCalendar.value;
  const userEmail = sessionStorage.getItem('email');

  if (signCheck()) {
    regPassword(userPw);
    userSign(userPw, userName, userBirth, userEmail);
  } else {
    regPassword(userPw);
  }
});

cancelBtn.addEventListener('click', function () {
  window.location.href = 'login.html';
  authInput.value = '';
  sessionStorage.removeItem('email');
});
