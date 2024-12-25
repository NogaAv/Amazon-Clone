import { addToCart } from '../data/cart.js';
import { products, loadProducts } from '../data/products.js';
import { renderHeader } from './header.js';
import { updateCartQuantity } from './shared.js';

renderHeader();

await loadProducts();

const url = new URL(window.location.href);
const searchStr = url.searchParams.get('search');
searchStr ? renderProductsGrid(searchProducts(searchStr)) : renderProductsGrid();

export function renderProductsGrid(productsSearchList = products) {
  let productsHTML = '';

  productsSearchList.forEach((product) => {
    productsHTML += `
    <div class="product-container">
            <div class="product-image-container">
              <img class="product-image" src=${product.image} />
            </div>
  
            <div class="product-name limit-text-to-2-lines">
              ${product.name}
            </div>
  
            <div class="product-rating-container">
              <img class="product-rating-stars" src=${product.getStarsUrl()} />
              <div class="product-rating-count link-primary">${product.rating.count}</div>
            </div>
  
            <div class="product-price">$${product.getPrice()}</div>
  
            <div class="product-quantity-container">
              <select class="js-select-options-${product.id} ">
                <option selected value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </select>
            </div>
  
            ${product.extraInfoHTML()}
            <div class="product-spacer"></div>
  
            <div class="js-added-to-cart-${product.id} added-to-cart">
              <img src="images/icons/checkmark.png" />
              Added
            </div>
  
            <button class="js-add-to-cart-button add-to-cart-button button-primary" data-product-id=${product.id}>Add to Cart</button>
          </div>
    `;
  });

  document.querySelector('.js-products-grid').innerHTML = productsHTML;

  document.querySelectorAll('.js-add-to-cart-button').forEach((addBtn) => {
    addBtn.addEventListener('click', (event) => {
      const productId = addBtn.dataset.productId;
      const quantityStr = document.querySelector(`.js-select-options-${productId}`).value;
      const quantity = +quantityStr;
      addToCart(productId, quantity);
      displayAddToCartMsg(productId);
      updateCartQuantity();
    });
  });

  //This call for update the cart icon quantity when refreshing the page
  updateCartQuantity();

  function displayAddToCartMsg(productId) {
    const addedMsgElm = document.querySelector(`.js-added-to-cart-${productId}`);
    addedMsgElm.classList.add('show');
    setTimeout(() => {
      addedMsgElm.classList.remove('show');
    }, 1000);
  }

  document.querySelector('.js-search-button').addEventListener('click', renderProductsBysearch);
  document.querySelector('.js-search-bar').addEventListener('input', renderProductsBysearch);
}

function renderProductsBysearch() {
  const searchBarInput = document.querySelector('.js-search-bar').value;
  const searchResult = searchProducts(searchBarInput);
  renderProductsGrid(searchResult);
}

function searchProducts(input) {
  let searchResult = [];
  input = input.toLowerCase();
  searchResult = products.filter((product) => {
    return product.name.toLowerCase().includes(input) || product.keywords.find((keyword) => keyword.toLowerCase().includes(input));
  });
  return searchResult;
}
