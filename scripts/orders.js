import { addToCart, getTotalQuantity } from '../data/cart.js';
import { orders, formateDateStr } from '../data/orders.js';
import { loadProducts, getProduct } from '../data/products.js';
import { renderHeader } from './header.js';
import formatCurrency from './utils/money.js';
import { searchInBarEL, updateCartQuantity } from './shared.js';

renderHeader();

await loadProducts();

function renderOrdersPage() {
  let ordersHTML = '';

  orders.forEach((order) => {
    ordersHTML += `
         <div class="order-container">
            <div class="order-header">
              <div class="order-header-left-section">
                <div class="order-date">
                  <div class="order-header-label">Order Placed:</div>
                  <div>${formateDateStr(order.orderTime)}</div>
                </div>
                <div class="order-total">
                  <div class="order-header-label">Total:</div>
                  <div>$${formatCurrency(order.totalCostCents)}</div>
                </div>
              </div>
  
              <div class="order-header-right-section">
                <div class="order-header-label">Order ID:</div>
                <div>${order.id}</div>
              </div>
            </div>
          
            <div class="order-details-grid">
                ${renderOrderContentHTML(order)}
            </div>
          </div>
    `;
  });

  const ordersGridElm = document.querySelector('.js-orders-grid');
  ordersGridElm.innerHTML = ordersHTML || `<p class="empty-items-msg">You have no orders to display</p>`;

  document.querySelectorAll('.js-buy-again-button').forEach((buyAgainBtn) => {
    buyAgainBtn.addEventListener('click', () => {
      addToCart(buyAgainBtn.dataset.productId);
      updateCartQuantity();
      //window.location.href = 'checkout.html';
    });
  });

  //This call for update the cart icon quantity when refreshing the page
  updateCartQuantity();

  //adding Event-Listener for searching product in searchBar
  searchInBarEL();
}

renderOrdersPage();

function renderOrderContentHTML(order) {
  console.log(order);

  const orderProducts = order.products;
  let orderContentHtml = '';
  //console.log(orderProducts);
  orderProducts.forEach((orderProduct) => {
    const productDetails = getProduct(orderProduct.productId);
    orderContentHtml += `
      <div class="product-image-container">
                <img src=${productDetails.image} />
              </div>
  
              <div class="product-details">
                <div class="product-name">${productDetails.name}</div>
                <div class="product-delivery-date">Arriving on: ${formateDateStr(orderProduct.estimatedDeliveryTime)}</div>
                <div class="product-quantity">Quantity: ${orderProduct.quantity}</div>
                <button class="js-buy-again-button buy-again-button button-primary"     data-product-id="${orderProduct.productId}">
                  <img class="buy-again-icon" src="images/icons/buy-again.png" />
                  <span class="buy-again-message">Buy it again</span>
                </button>
              </div>
  
              <div class="product-actions">
                <a href="tracking.html?orderId=${order.id}&productId=${orderProduct.productId}">
                  <button class="track-package-button button-secondary">Track package</button>
                </a>
              </div>
    `;
  });

  return orderContentHtml;
}
