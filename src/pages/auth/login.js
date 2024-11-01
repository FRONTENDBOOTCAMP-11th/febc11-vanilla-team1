import axios from 'axios';
import api from '../../api';

// LOGIN 부분

// login 관련 요소
const loginSession = document.querySelector('.login-session');
const authInput = document.querySelector('#emailInput');
const authBtn = document.querySelector('#loginEmailBtn');
const emailRegex = /^[A-Za-z0-9]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
const regText = document.querySelector('.reg-Text');
const socialBtn = document.querySelector('#socialBtn');
const authEmail = document.querySelector('.auth-email');

// Password 관련 요소
const passwordSession = document.querySelector('.password-session');
const passwordInput = document.querySelector('#authInput');
const toggleOpen = document.querySelector('#toggleOpen');
const toggleClose = document.querySelector('#toggleClose');
const prevBtn = document.querySelector('#prevBtn');
const loginPasswordBtn = document.querySelector('#loginPasswordBtn');
const alertMessage = document.querySelector('.find-password');
const regTxt = document.querySelector('#regPw');
const editEmail = document.querySelector('.edit-email');
const regContainer = document.querySelector('#regContainer');

window.addEventListener('DOMContentLoaded', () => {
  document
    .querySelectorAll('input[type="email"], textarea')
    .forEach(authInput => {
      authInput.value = ''; // 페이지 로드 시 폼 초기화
    });
});

// LOGIN 부분
function switchLogin() {
  loginSession.style.display = 'block';
  passwordSession.style.display = 'none';
}

function switchPw() {
  loginSession.style.display = 'none';
  passwordSession.style.display = 'block';
}

function checkEmail() {
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
}

// 이메일, 패스워드 띄어쓰기 막기
passwordInput.addEventListener('input', function () {
  this.value = this.value.replace(/\s/g, '');
});

authInput.addEventListener('input', function () {
  this.value = this.value.replace(/\s/g, '');
  checkEmail();
});

authBtn.addEventListener('click', function () {
  checkEmail();
  const userEmail = authInput.value.trim();
  sessionStorage.setItem('email', userEmail);
  authEmail.textContent = userEmail;
  if (emailRegex.test(userEmail)) {
    getEmail(userEmail);
  }
});

async function getEmail(email) {
  try {
    const response = await api('get', 'users/email', { email });
    if (response.data.ok === 1) {
      window.location.href = 'check.html';
      authInput.value = '';
    }
  } catch (error) {
    if (error.response && error.response.status === 409) {
      sessionStorage.setItem('email', email);
      switchPw();
      return;
    } else {
      console.error('오류 발생:', error);
    }
  }
}

socialBtn.addEventListener('click', function () {
  loginWithKakao();
});

const KaApiKey = import.meta.env.VITE_JAVASCRIPT_APP_KAKAO_API_KEY;
Kakao.init(KaApiKey);
Kakao.isInitialized();
console.log(Kakao.isInitialized());

// 카카오 팝업 로그인 함수
function loginWithKakao() {
  Kakao.Auth.login({
    success: function (authObj) {
      Kakao.Auth.setAccessToken(authObj.access_token);
      getInfo();
    },
    fail: function (err) {
      console.error('로그인 실패:', err);
    },
  });
}

// 사용자 정보 요청 함수
function getInfo() {
  Kakao.API.request({
    url: '/v2/user/me',
  })
    .then(function (res) {
      const kakaoEmail = res.kakao_account.email;
      const kakaoName = res.kakao_account.name;
      sessionStorage.setItem('email', kakaoEmail);
      sessionStorage.setItem('name', kakaoName);
      window.location.href = import.meta.env.VITE_REDIRECT_URL;
    })
    .catch(function (error) {
      console.error('사용자 정보 요청 실패:', error);
    });
}

// 카카오 로그아웃 함수
function kakaoLogOut() {
  if (!Kakao.Auth.getAccessToken()) {
    alert('로그인을 먼저 하세요.');
    return;
  }
  Kakao.Auth.logout(function () {
    alert('로그아웃 완료');
    localStorage.clear();
  });
}

// PASSWORD
document.addEventListener('DOMContentLoaded', function () {
  if (!authEmail) {
    switchLogin();
  }
});

editEmail.addEventListener('click', function (e) {
  e.preventDefault();
  switchLogin();
  authInput.value = '';
  sessionStorage.clear();
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
  switchLogin();
  authInput.value = '';
  sessionStorage.clear();
});

function tokenError(error) {
  if (error.response && error.response.status === 401) {
    alert('다시 로그인 해주세요.');
    localStorage.clear();
    switchLogin();
  } else {
    console.log('오류', error);
  }
}

function checkPassword(userPw) {
  if (!userPw) {
    regContainer.style.display = 'block';
    regTxt.innerHTML = `<p>비밀번호를 입력해주세요 *</p>`;
  } else {
    regContainer.style.display = 'block';
    regTxt.innerHTML = `<p>비밀번호가 일치하지 않습니다. *</p>`;
  }
}

// input 초기화
function resetInputs() {
  document.querySelectorAll('input').forEach(input => {
    input.value = '';
  });
}

// 로그인 요청 함수
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
        window.location.href = 'index.html';
        resetInputs();
        sessionStorage.removeItem('email');
      } else {
        console.error('로그인 실패');
        checkPassword(password);
      }
    } else {
      console.error('정보가 응답에 없습니다.');
    }
  } catch (error) {
    if (error.status) {
      const status = error.response.status;
      if (status === 422 || status === 403) {
        checkPassword(password);
      } else if (status === 401) {
        const reToken = await issueToken();
        if (reToken) {
          sessionStorage.setItem('accessToken', reToken);
          return loginUser(email, password);
        } else {
          localStorage.clear();
          tokenError(error);
        }
      }
    }
  }
}

async function issueToken() {
  try {
    const response = await axios.get('https://11.fesp.shop/auth/refresh', {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('refreshToken')}`,
        'Content-Type': 'application/json',
        'client-id': 'vanilla01',
      },
    });
    return response.data.item.accessToken;
  } catch (error) {
    tokenError(error);
  }
}

// loginPasswordBtn 클릭 이벤트 리스너
loginPasswordBtn.addEventListener('click', function (e) {
  e.preventDefault();

  const userEmail = authInput.value.trim();
  const userPw = passwordInput.value.trim();

  if (userEmail && userPw) {
    loginUser(userEmail, userPw);
  }
});
alertMessage.addEventListener('click', function () {
  alert('아직 구현하지 않은 페이지입니다.');
});
