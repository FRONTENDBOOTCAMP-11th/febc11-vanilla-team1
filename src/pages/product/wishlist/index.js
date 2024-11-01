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

//위시리스트에서 장바구니로 추가
function addToCartFromWishlist(productId) {
  const item = wishlist.find(i => i.product?._id === productId);
  if (item && item.product) {
    const existingCartItem = cart.items.find(i => i.product_id === productId);
    if (existingCartItem) {
      existingCartItem.quantity += 1;
    } else {
      cart.items.push({
        _id: item._id,
        user_id: item.user_id,
        product_id: item.product._id,
        quantity: 1,
        size: item.size || '미설정',
        createdAt: item.createdAt,
        updatedAt: item.createdAt,
        product: {
          ...item.product,
          image: {
            path: item.product.image.url,
            name: item.product.image.fileName,
            originalname: item.product.image.orgName,
          },
        },
        shippingFees: '무료 배송',
        deliveryDate: '7월 26일 (금)',
      });
    }
    deleteItem(productId); // 위시리스트에서 삭제
    updateWishlistView();
  }
}
window.addToCartFromWishlist = addToCartFromWishlist;

function initWishlist() {
  const wishlistContainer = document.getElementById('wishlist-items');
  wishlistContainer.innerHTML = ''; // Clear the container before rendering

  wishlist.forEach(item => {
    const itemElement = document.createElement('div');
    itemElement.className = 'wishlist-item';
    itemElement.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <div class="wishlist-item-details">
        <span class="item-name">${item.name}</span>
        <span class="item-option">${item.option}</span>
        <span class="item-price">${item.price} 원</span>
        <img class="wishdelbtn" src="../../../../public/assets/images/wishdelbtn.png" data-id="${item.id}"style="display:none;" />
         <button class="add-to-cart-button">장바구니에 추가</button>

      </div>
    `;

    // Add event listener for delete button
    const deleteButton = itemElement.querySelector('.wishdelbtn');
    deleteButton.addEventListener('click', () => {
      deleteItem(item.id);
    });

    wishlistContainer.appendChild(itemElement);
  });

  // Show or hide the empty message based on the wishlist content
  document.getElementById('empty-wish-message').style.display =
    wishlist.length === 0 ? 'block' : 'none';
}

function deleteItem(id) {
  // Remove item from the wishlist
  wishlist = wishlist.filter(item => item.id !== id);
  updateWishlistView();
}

function updateWishlistView() {
  // Re-render the wishlist to update the UI
  initWishlist();
}

document.querySelector('.wishmodify').addEventListener('click', () => {
  document.querySelector('.wishmodify').style.display = 'none';
  document.querySelector('.wishdelete').style.display = 'inline-block';
  document
    .querySelectorAll('.wishdelbtn')
    .forEach(btn => (btn.style.display = 'block'));
});

document.querySelector('.wishdelete').addEventListener('click', () => {
  document.querySelector('.wishmodify').style.display = 'inline-block';
  document.querySelector('.wishdelete').style.display = 'none';
  document
    .querySelectorAll('.wishdelbtn')
    .forEach(btn => (btn.style.display = 'none'));
});

initWishlist();
