<<<<<<< HEAD
<<<<<<< HEAD
'use strict';
=======
>>>>>>> dev
=======
// LOGIN 부분
>>>>>>> dev
import axios from 'axios';

const loginSession = document.querySelector('.login-session')
const authInput = document.querySelector('#emailInput');
const authBtn = document.querySelector('#loginEmailBtn');
const emailRegex = /^[A-Za-z0-9]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
const regText = document.querySelector('.reg-Text');
const socialBtn = document.querySelector('#socialBtn');

<<<<<<< HEAD
<<<<<<< HEAD
socialBtn.addEventListener('click', function (e) {
  e.preventDefault();
  window.location.href = 'social.html';
});

=======
>>>>>>> dev
authInput.addEventListener('input', function () {
=======
function switchLogin() {
  loginSession.style.display = 'block';
  passwordSession.style.display = 'none';
}

function switchPw() {
  loginSession.style.display = 'none';
  passwordSession.style.display = 'block';
}

function checkEmail() {
>>>>>>> dev
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
};

authInput.addEventListener('input', function () {
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


async function getEmail(userEmail) {
  try {
    const response = await axios.get('https://11.fesp.shop/users/email', {
      params: {
        email: userEmail,
      },

      headers: {
        'Content-Type': 'application/json',
        'client-id': 'vanilla01',
      },
    });
    if (response.data.ok === 1) {
      window.location.href = 'check.html';
    }

  } catch (error) {
<<<<<<< HEAD
<<<<<<< HEAD
    if (error.status === 409) window.location.href = 'pw.html';
=======
    if (error.status === 409) window.location.href = '/src/pages/auth/pw.html';
>>>>>>> dev
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
    sessionStorage.setItem('email', userEmail);
    getEmail(userEmail);
  } else {
    authInput.style.borderColor = 'red';
    regText.textContent = '잘못된 이메일 주소입니다.';
  }
});
<<<<<<< HEAD
=======
=======
    if (error.response && error.response.status === 409) {
      sessionStorage.setItem('email', userEmail);
      switchPw();
      return;
    } else {
      console.error('오류 발생:', error);
    }
  }
}

>>>>>>> dev

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
      console.log('사용자 정보:', res);
      const account_email = res.kakao_account.email;
      const account_name = res.kakao_account.name;
      localStorage.setItem('email', account_email);
      localStorage.setItem('name', account_name);
      window.location.href = 'complete.html';
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
<<<<<<< HEAD
>>>>>>> dev
=======

// PASSWORD
const passwordSession = document.querySelector('.password-session');
const passwordInput = document.querySelector('#authInput');
const toggleOpen = document.querySelector('#toggleOpen');
const toggleClose = document.querySelector('#toggleClose');
const prevBtn = document.querySelector('#prevBtn');
const loginPasswordBtn = document.querySelector('#loginPasswordBtn');
const authEmail = document.querySelector('.auth-email');
const alertMessage = document.querySelector('.find-password');
const regTxt = document.querySelector('#regPw');
const editEmail = document.querySelector('.edit-email');
const regContainer = document.querySelector('#regContainer');


document.addEventListener('DOMContentLoaded', function () {
  if (!authEmail) {
    switchLogin()
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
  switchLogin()
  authInput.value = '';
  sessionStorage.clear();
});

function tokenError(error) {
  if (error.response && error.response.status === 401) {
    alert('다시 로그인 해주세요.');
    localStorage.clear();
    switchLogin()
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

// 로그인 요청 함수
async function loginUser(userEmail, userPw) {
  try {

    const response = await axios.post(
      'https://11.fesp.shop/users/login',

      {
        email: userEmail,
        password: userPw,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'client-id': 'vanilla01',
        },
      },
    );

    if (response.data.item.token) {
      const { accessToken, refreshToken } = response.data.item.token;
      console.log(response.data.item);

      if (accessToken && refreshToken) {
        sessionStorage.setItem('accessToken', accessToken);
        sessionStorage.setItem('refreshToken', refreshToken);
        window.location.href = 'complete.html';
        sessionStorage.removeItem('email');
      } else {
        console.error('로그인 실패');
        checkPassword(userPw);
      }
    } else {
      console.error('정보가 응답에 없습니다.');
    }
  } catch (error) {
    if (error.response.status === 422) {
      checkPassword(userPw)
    } else if (error.response && error.response.status === 401) {
      const reToken = await issueToken();
      if (reToken) {
        sessionStorage.setItem('accessToken', reToken);
        return loginUser(userEmail, userPw);
      } else {
        localStorage.clear();
        tokenError(error);
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
>>>>>>> dev
