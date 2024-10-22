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

// 소셜로그인

socialBtn.addEventListener('click', function (e) {
  e.preventDefault();
  if (kakaoLogin()) {
    window.location.href = 'complete.html'
  }
})

// logoutBtn.addEventListener('click', function () {
//   kakaoLogout();
// })

const APIKey = '767d2ee7d574933c25acdbe3edd6bc87';
Kakao.init(APIKey);

console.log(Kakao.isInitialized());

function kakaoLogin() {
  Kakao.Auth.login({
    success: function (response) {
      Kakao.API.request({
        url: '/v2/user/me',
        success: function (response) {
        },
        fail: function (error) {
          console.log(error)
        },
      })
    },
    fail: function (error) {
      console.log(error)
    },
  })
}

//카카오로그아웃  
function kakaoLogout() {
  if (Kakao.Auth.getAccessToken()) {
    Kakao.API.request({
      url: '/v1/user/unlink',
      success: function (response) {
        console.log(response)
      },
      fail: function (error) {
        console.log(error)
      },
    })
    Kakao.Auth.setAccessToken(undefined)
  }
}  
