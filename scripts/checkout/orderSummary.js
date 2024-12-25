import { cart, updateQuantity, removeFromCart, updateDeliveryOption, getTotalQuantity } from '../../data/cart.js';
import { deliveryOptions, getDeliveryOption } from '../../data/deliveryOptions.js';
import { getProduct } from '../../data/products.js';
import formatCurrency from '../utils/money.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { renderPaymentSummary } from './paymentSummary.js';
import { updateCartQuantity } from '../shared.js';

export function renderOrderSummary() {
  let cartSummaryHTML = '';

  cart.forEach((cartItem) => {
    const matchingProduct = getProduct(cartItem.productId);
    const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);

    const today = dayjs();
    const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
    const dateString = deliveryDate.format('dddd, MMMM D');

    cartSummaryHTML += `
    <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
            <div class="delivery-date">
              Delivery date: ${dateString}
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src=${matchingProduct.image}>

              <div class="cart-item-details">
                <div class="product-name">
                  ${matchingProduct.name}
                </div>
                <div class="product-price">
                  $${formatCurrency(matchingProduct.priceCents)}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: 
                    <span class="product-quantity-container">
                     <select class="js-select-options-${matchingProduct.id} ">
                      <option ${cartItem.quantity === 1 && `selected`} value="1">1</option>
                      <option ${cartItem.quantity === 2 && `selected`} value="2">2</option>
                      <option ${cartItem.quantity === 3 && `selected`} value="3">3</option>
                      <option ${cartItem.quantity === 4 && `selected`} value="4">4</option>
                      <option ${cartItem.quantity === 5 && `selected`} value="5">5</option>
                      <option ${cartItem.quantity === 6 && `selected`} value="6">6</option>
                      <option ${cartItem.quantity === 7 && `selected`} value="7">7</option>
                      <option ${cartItem.quantity === 8 && `selected`} value="8">8</option>
                      <option ${cartItem.quantity === 9 && `selected`} value="9">9</option>
                      <option ${cartItem.quantity === 10 && `selected`} value="10">10</option>
                    </select>
                  </span>
                  </span>
                  <span class="js-update-quantity-link update-quantity-link link-primary" data-product-id=${cartItem.productId}>
                    Update
                  </span>
                  <span class="js-delete-link-${matchingProduct.productId} js-delete-link delete-quantity-link link-primary" data-product-id=${cartItem.productId}>
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                ${deliveryOptionsHTML(cartItem)}             
              </div>
            </div>
          </div>
    `;
  });

  function deliveryOptionsHTML(cartItem) {
    let html = '';

    deliveryOptions.forEach((deliveryOption) => {
      const today = dayjs();
      const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
      const dateString = deliveryDate.format('dddd, MMMM D');

      const priceString = deliveryOption.priceCents === 0 ? 'FREE' : `$${formatCurrency(deliveryOption.priceCents)} - `;

      const isChecked = cartItem.deliveryOptionId === deliveryOption.id;

      html += `
      <div class="js-delivery-option delivery-option" data-product-id=${cartItem.productId} data-delivery-option-id=${deliveryOption.id}>
                  <input type="radio" ${isChecked && 'checked'}
                    class="delivery-option-input" name="delivery-option-${cartItem.productId}
                    name="delivery-option-1">
                  <div>
                    <div class="delivery-option-date">
                      ${dateString}
                    </div>
                    <div class="delivery-option-price">
                      ${priceString} Shipping
                    </div>
                  </div>
                </div>
      `;
    });
    return html;
  }

  document.querySelector('.return-to-home-link').innerHTML = `${getTotalQuantity()} items`;

  const cartSummaryElm = document.querySelector('.js-order-summary');
  cartSummaryElm.innerHTML = cartSummaryHTML || `<p class="empty-items-msg">Your Cart is Empty</p>`;

  document.querySelectorAll('.js-update-quantity-link').forEach((updateLink) => {
    updateLink.addEventListener('click', () => {
      const productId = updateLink.dataset.productId;
      const newQuantityStr = document.querySelector(`.js-select-options-${productId}`).value;
      console.log(newQuantityStr);
      const newQuant = +newQuantityStr;
      updateQuantity(productId, newQuant);
      renderOrderSummary();
      renderPaymentSummary();
      updateCartQuantity();
    });
  });

  document.querySelectorAll('.js-delete-link').forEach((deleteLink) => {
    deleteLink.addEventListener('click', (event) => {
      const productId = deleteLink.dataset.productId;
      console.log(deleteLink.dataset);
      removeFromCart(productId);

      document.querySelector(`.js-cart-item-container-${productId}`).remove();

      document.querySelector('.return-to-home-link').innerHTML = `${getTotalQuantity()} items`;

      renderPaymentSummary();
    });
  });

  document.querySelectorAll('.js-delivery-option').forEach((deliveryOption) => {
    deliveryOption.addEventListener('click', () => {
      const { productId, deliveryOptionId } = deliveryOption.dataset;
      updateDeliveryOption(productId, deliveryOptionId);

      renderOrderSummary();
      renderPaymentSummary();
    });
  });
}
