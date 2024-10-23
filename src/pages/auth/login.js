import axios from 'axios';

const authInput = document.querySelector('#emailInput');
const authBtn = document.querySelector('#loginBtn');
const emailRegex = /^[A-Za-z0-9]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
const regText = document.querySelector('.reg-Text');
const socialBtn = document.querySelector('#socialBtn');




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

      headers: {
        'Content-Type': 'application/json',
        'client-id': 'vanilla01',
      }
    });

    if (response.data.ok === 0) {
      sessionStorage.setItem('email', userEmail);
      window.location.href = 'pw.html';
    } else {
      sessionStorage.setItem('email', userEmail);
      window.location.href = 'check.html';
    }
  } catch (error) {
    if (error.status === 409)
      window.location.href = 'pw.html';

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

socialBtn.addEventListener('click', function () {
  loginWithKakao();

})

const KaApiKey = 'c92207c96c9981919cf89ccca1a383c7';
Kakao.init(KaApiKey);
Kakao.isInitialized();
console.log(Kakao.isInitialized());

// 카카오 팝업 로그인 함수
function loginWithKakao() {
  Kakao.Auth.login({
    success: function (authObj) {
      Kakao.Auth.setAccessToken(authObj.access_token);
      getInfo();  // 사용자 정보 요청
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
    success: function (res) {
      console.log('사용자 정보:', res);
      const account_email = res.kakao_account.email;
      const account_name = res.kakao_account.name;
      localStorage.setItem('email', account_email);
      localStorage.setItem('name', account_name);
      window.location.href = 'complete.html'
    },
    fail: function (error) {
      console.error('사용자 정보 요청 실패:', error);
    },
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




