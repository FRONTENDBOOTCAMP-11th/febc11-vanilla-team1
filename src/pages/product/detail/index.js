'use strict';

import api from '@/api.js';

async function getProducts() {
  const productId = 1;
  // method, url, params = null, data = null 순서로 인자 넘기기
  // get 요청의 경우 data는 비워두면 됩니다.
  const data = await api('get', `products/${productId}`);
  console.log(data);
  
}

// DOMContentLoaded 이벤트가 발생 = document 객체가 완전히 로드되었을 때 이벤트 실행
document.addEventListener('DOMContentLoaded', getProducts);
