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

function tokenError(error) {
  if (error.response && error.response.status === 401) {
    alert('다시 로그인 해주세요.');
    sessionStorage.removeItem('email');
    window.location.href = 'login.html';
  } else {
    console.log('오류', error);
  }
}

// 로그인 요청 함수
async function loginUser(userEmail, userPw) {
  try {
    const response = await axios.post('https://11.fesp.shop/users/login', {
      email: userEmail,
      password: userPw,
    });

    if (response.data.item.token) {
      const { accessToken, refreshToken } = response.data.item.token;

      if (accessToken && refreshToken) {
        sessionStorage.setItem('accessToken', accessToken);
        sessionStorage.setItem('refreshToken', refreshToken);
        window.location.href = 'complete.html';
      } else {
        console.error('로그인 실패');
        checkPassword(userPw);
      }
    } else {
      console.error('정보가 응답에 없습니다.');
    }
  } catch (error) {
    if (error.response && error.response.status === 401) {
      const reToken = await issueToken();
      if (reToken) {
        sessionStorage.setItem('accessToken', reToken);
        return loginUser(userEmail, userPw);
      } else {
        tokenError(error)
      }
    } else {
      tokenError(error)
    }
  }
}

async function issueToken() {
  try {
    const response = await axios.get('https://11.fesp.shop/auth/refresh', {
      headers: {
        'Authorization': `Bearer ${sessionStorage.getItem('refreshToken')}`,
      },
    });
    return response.data.item.accessToken;
  } catch (error) {
    tokenError(error)
  }
}


// loginBtn 클릭 이벤트 리스너
loginBtn.addEventListener('click', function (e) {
  e.preventDefault();
  const userEmail = sessionStorage.getItem('email');
  const userPw = passwordInput.value.trim();

  if (userEmail && userPw) {
    loginUser(userEmail, userPw);
  } else {
    console.error('이메일 또는 비밀번호가 없습니다.');
    checkPassword(userPw);
  }
});

function checkPassword(userPw) {
  if (!userPw) {
    regContainer.style.display = 'block';
    regTxt.innerHTML = `<p>비밀번호를 입력해주세요 *</p>`;
  } else {
    regContainer.style.display = 'block';
    regTxt.innerHTML = `<p>비밀번호가 일치하지 않습니다. *</p>`;
  }
}

alertMessage.addEventListener('click', function () {
  alert('아직 구현하지 않은 페이지입니다.')
})