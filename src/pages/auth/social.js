const checkSocial = document.querySelector('#socialIcon');
const blankSocial = document.querySelector('#socialBlank');
const questionSocial = document.querySelector('#socialQuestion');
const cancelBtn = document.querySelector('#cancel-btn');

const socialBtn = document.querySelector('.social-btn');
const logoutBtn = document.querySelector('#logoutBtn');

const socialSign = document.querySelector('.social-sign');
const socialFindId = document.querySelector('.social-id-find');
const socialFindPw = document.querySelector('.social-pw-find');


checkSocial.addEventListener('click', function () {
  checkSocial.style.display = 'none';
  blankSocial.style.display = 'block';
})

blankSocial.addEventListener('click', function () {
  checkSocial.style.display = 'block';
  blankSocial.style.display = 'none';
})

questionSocial.addEventListener('click', function () {
  alert(`로그인한 계정의 정보가 저장됩니다. 개인정보 보호를 위해 개인 기기에서만 사용해 주세요.`);
})

cancelBtn.addEventListener('click', function () {
  window.location.href = 'login.html';
})

socialSign.addEventListener('click', function () {
  window.location.href = 'https://accounts.kakao.com/weblogin/create_account/?continue=https%3A%2F%2Fkauth.kakao.com%2Foauth%2Fauthorize%3Fgrant_type%3Dauthorization_code%26scope%3D%26response_type%3Dcode%26redirect_uri%3Dhttps%253A%252F%252Fbrunch.co.kr%252Fcallback%252Fauth%252Fkakao%26state%3DaHR0cHM6Ly9icnVuY2guY28ua3Ivc2lnbmluL2ZpbmlzaD91cmw9JTJG%26client_id%3De0201caea90cafbb237e250f63a519b5%26through_account%3Dtrue&lang=ko#selectVerifyMethod'
})

socialFindId.addEventListener('click', function () {
  window.location.href = 'https://accounts.kakao.com/weblogin/find_account?continue=https%3A%2F%2Fkauth.kakao.com%2Foauth%2Fauthorize%3Fgrant_type%3Dauthorization_code%26scope%3D%26response_type%3Dcode%26redirect_uri%3Dhttps%253A%252F%252Fbrunch.co.kr%252Fcallback%252Fauth%252Fkakao%26state%3DaHR0cHM6Ly9icnVuY2guY28ua3Ivc2lnbmluL2ZpbmlzaD91cmw9JTJG%26client_id%3De0201caea90cafbb237e250f63a519b5%26through_account%3Dtrue&lang=ko'
})

socialFindPw.addEventListener('click', function () {
  window.location.href = 'https://accounts.kakao.com/weblogin/find_password?continue=%2Flogin%3Fcontinue%3Dhttps%253A%252F%252Fkauth.kakao.com%252Foauth%252Fauthorize%253Fgrant_type%253Dauthorization_code%2526scope%253D%2526response_type%253Dcode%2526redirect_uri%253Dhttps%25253A%25252F%25252Fbrunch.co.kr%25252Fcallback%25252Fauth%25252Fkakao%2526state%253DaHR0cHM6Ly9icnVuY2guY28ua3Ivc2lnbmluL2ZpbmlzaD91cmw9JTJG%2526client_id%253De0201caea90cafbb237e250f63a519b5%2526through_account%253Dtrue&lang=ko'
})


Kakao.init('767d2ee7d574933c25acdbe3edd6bc87')

function loginWithKakao() {
  Kakao.Auth.authorize({
    redirectUri: 'https://developers.kakao.com/tool/demo/oauth',
  });
}

function displayToken() {
  var token = getCookie('authorize-access-token');

  if (token) {
    Kakao.Auth.setAccessToken(token);
    Kakao.Auth.getStatusInfo()
      .then(function (res) {
        if (res.status === 'connected') {
          document.getElementById('token-result').innerText
            = 'login success, token: ' + Kakao.Auth.getAccessToken();
        }
      })
      .catch(function (err) {
        Kakao.Auth.setAccessToken(null);
      });
  }
}

function getCookie(name) {
  var parts = document.cookie.split(name + '=');
  if (parts.length === 2) { return parts[1].split(';')[0]; }
}

socialBtn.addEventListener('click', function () {

  loginWithKakao()
})

// logoutBtn.addEventListener('click', function () {
//   kakaoLogout();
// })


// console.log(Kakao.isInitialized());

// function kakaoLogin() {
//   Kakao.Auth.login({
//     success: function (response) {
//       Kakao.API.request({
//         url: '/v2/user/me',
//         success: function (response) {
//           console.log(response)
//         },
//         fail: function (error) {
//           console.log(error)
//         },
//       })
//     },
//     fail: function (error) {
//       console.log(error)
//     },
//   })
// }
// //카카오로그아웃  
// function kakaoLogout() {
//   if (Kakao.Auth.getAccessToken()) {
//     Kakao.API.request({
//       url: '/v1/user/unlink',
//       success: function (response) {
//         console.log(response)
//       },
//       fail: function (error) {
//         console.log(error)
//       },
//     })
//     Kakao.Auth.setAccessToken(undefined)
//   }
// }  