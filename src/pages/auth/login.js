'use strict'
import axios from 'axios';

console.log('login.js loaded successfully');

const authInput = document.querySelector('#authInput');
const authBtn = document.querySelector('#loginBtn');

console.log('login.js is loaded');

authBtn.addEventListener('click', function (e) {
  e.preventDefault();
  console.log('Login button clicked'); // 클릭 시 메시지가 나오는지 확인
  const userEmail = authInput.value;
  const infoEmail = encodeURIComponent(userEmail);

  async function getEmail(userEmail) {
    try {
      const accessToken = localStorage.getItem('accessToken');
      console.log('Access token:', accessToken); // 토큰 확인
      const response = await axios.get('https://11.fesp.shop/users/', {
        params: {
          email: userEmail,
        },
        headers: {
          'Authorization': `Bearer ${accessToken}`
        },
      });
      if (response.data && response.data.exists) {
        console.log('존재함');
        window.location.href = 'main.html';
      } else {
        console.log('존재하지 않음');
        sessionStorage.setItem('email', userEmail);
        window.location.href = 'check.html';
      }
    } catch (error) {
      console.error('이메일 확인 중 오류', error);
    }
  }
  getEmail(infoEmail);
});



// loginBtn.addEventListener('click', function (e) {
//   e.preventDefault();
//   const userEmail = authInput.value;
//   const infoEmail = encodeURIComponent(userEmail);

//   async function authEmail(userEmail) {
//     try {
//       const accessToken = localStorage.getItem('accessToken');
//       const response = await axios.post('https://11.fesp.shop/users/', {
//         headers: {
//           'Authorization': `Bearer ${accessToken}`
//         },
//         params: {
//           email: userEmail
//         }
//       })
//       if (response.data.email === true) {
//         window.location.href = 'main.html';
//       } else {
//         console.log('가입페이지로 이동');
//         localStorage.setItem('userEmail', userEmail);
//         window.location.href = `check.html?email=${infoEmail}}`;
//       }
//     } catch (error) {
//       // 에러 코드
//       console.error('이메일 확인 중 오류', error);
//     }
//   }

//   authEmail(userEmail);
// });