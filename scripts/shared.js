import { getTotalQuantity } from '../data/cart.js';

//update HTML cart quantity in all places it may appear:
export function updateCartQuantity() {
  const cartQuantity = getTotalQuantity();
  document.querySelectorAll('.js-cart-quantity').forEach((cartQuant) => {
    cartQuant.innerText = cartQuantity;
  });
}

export function renderSignInModal() {
  const signinModalHTML = '';
}

export function searchInBarEL() {
  document.querySelector('.js-search-button').addEventListener('click', () => {
    const searchBarInput = document.querySelector('.js-search-bar').value.toLowerCase();
    window.location.href = `index.html?search=${searchBarInput}`;
  });
}
