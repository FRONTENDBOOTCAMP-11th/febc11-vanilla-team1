let wishlist = [
  {
    id: 1,
    name: '나이키 줌 보메로 5',
    option: '남성 신발',
    price: 15000,
    image: 'https://via.placeholder.com/150',
  },
  {
    id: 2,
    name: '나이키 줌 보메로 5',
    option: '여성 신발',
    price: 20000,
    image: 'https://via.placeholder.com/150',
  },
];

function initWishlist() {
  const wishlistContainer = document.getElementById('wishlist-items');
  wishlistContainer.innerHTML = ''; // 렌더링 전에 컨테이너를 비움

  wishlist.forEach(item => {
    const itemElement = document.createElement('div');
    itemElement.className = 'wishlist-item';
    itemElement.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <div class="wishlist-item-details">
        <span class="item-name">${item.name}</span>
        <span class="item-option">${item.option}</span>
        <span class="item-price">${item.price} 원</span>
        <img class="wishdelbtn" src="../../../../public/assets/images/wishdelbtn.png" data-id="${item.id}" style="display: none;" />
        <button class="add-to-cart-button">장바구니에 추가</button>
      </div>
    `;

    // 삭제 버튼 이벤트 리스너 추가
    const deleteButton = itemElement.querySelector('.wishdelbtn');
    deleteButton.addEventListener('click', () => {
      deleteItem(item.id);
    });

    wishlistContainer.appendChild(itemElement);
  });

  // 위시리스트가 비었을 때 메시지 표시
  document.getElementById('empty-wish-message').style.display = wishlist.length === 0 ? 'block' : 'none';
}

function deleteItem(id) {
  // 선택한 아이템만 제거
  wishlist = wishlist.filter(item => item.id !== id);

  // 해당 아이템만 삭제된 후에도 모든 삭제 버튼이 유지되도록 초기화
  document.querySelector(`[data-id="${id}"]`).closest('.wishlist-item').remove();

  // 위시리스트가 비었을 때 메시지 표시
  document.getElementById('empty-wish-message').style.display = wishlist.length === 0 ? 'block' : 'none';
}

// "수정" 버튼 클릭 시 모든 삭제 버튼 표시
document.querySelector('.wishmodify').addEventListener('click', () => {
  document.querySelector('.wishmodify').style.display = 'none';
  document.querySelector('.wishdelete').style.display = 'inline-block';
  document.querySelectorAll('.wishdelbtn').forEach(btn => btn.style.display = 'block');
});

// "완료" 버튼 클릭 시 모든 삭제 버튼 숨기기
document.querySelector('.wishdelete').addEventListener('click', () => {
  document.querySelector('.wishmodify').style.display = 'inline-block';
  document.querySelector('.wishdelete').style.display = 'none';
  document.querySelectorAll('.wishdelbtn').forEach(btn => btn.style.display = 'none');
});

// 초기화 함수 실행
initWishlist();
