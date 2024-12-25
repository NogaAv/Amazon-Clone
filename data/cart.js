export let cart;

loadFromStorage();

export function loadFromStorage() {
  const loggedUserInfo = JSON.parse(localStorage.getItem('user-info'));
  if (loggedUserInfo) {
    cart = loggedUserInfo.cart || [];
    console.log(cart);
  } else {
    cart = JSON.parse(localStorage.getItem('cart')) || [];
  }
}

export function saveToStorage() {
  const loggedUserInfo = JSON.parse(localStorage.getItem('user-info'));
  if (loggedUserInfo) {
    loggedUserInfo.cart = cart;
    localStorage.setItem('user-info', JSON.stringify(loggedUserInfo));
  } else {
    localStorage.setItem('cart', JSON.stringify(cart));
  }
}

export function addToCart(productId, quantity = 1) {
  let matchingItem;
  cart.forEach((item) => {
    if (item.productId === productId) {
      matchingItem = item;
    }
  });

  if (matchingItem) {
    matchingItem.quantity += quantity;
  } else {
    cart.push({
      productId,
      quantity: quantity,
      deliveryOptionId: '1',
    });
  }

  saveToStorage();
}

export function updateQuantity(productId, newQuantity) {
  cart.forEach((item) => {
    if (item.productId === productId) {
      item.quantity = newQuantity;
      saveToStorage();
      return;
    }
  });
}

export function removeFromCart(productId) {
  cart = cart.filter((item) => item.productId !== productId);
  saveToStorage();
}

export function clearCart() {
  cart = [];
  saveToStorage();
}
export function updateDeliveryOption(productId, deliveryOptionId) {
  const cartItem = cart.find((item) => item.productId === productId);
  cartItem.deliveryOptionId = deliveryOptionId;

  saveToStorage();
}

export function getTotalQuantity() {
  let totalQuantity = 0;
  cart.forEach((cartItem) => (totalQuantity += cartItem.quantity));
  return totalQuantity;
}

export async function fetchUserCart(apiUrl, userToken) {
  try {
    const response = await fetch(`${apiUrl}/cart`, {
      headers: {
        Authorization: userToken,
      },
    });

    if (!response.ok) {
      throw new Error();
    }

    const responseObj = await response.json();
    cart = responseObj.data.cart;
  } catch (err) {
    alert('Something went wrong!');
    window.location.href = 'index.html';
  }
}
