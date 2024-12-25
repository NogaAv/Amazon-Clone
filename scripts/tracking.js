import { getOrder, getItemFromOrder } from '../data/orders.js';
import { loadProducts, getProduct } from '../data/products.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { getTotalQuantity } from '../data/cart.js';
import { renderHeader } from './header.js';
import { searchInBarEL } from './shared.js';

renderHeader();

await loadProducts();

document.querySelector('.js-cart-quantity').innerHTML = getTotalQuantity();

//adding Event-Listener for searching product in searchBar
searchInBarEL();

renderTrackingPage();

function renderTrackingPage() {
  const url = new URL(window.location.href);

  const orderId = url.searchParams.get('orderId');
  const order = getOrder(orderId);

  const productId = url.searchParams.get('productId');
  const product = getProduct(productId);

  let matchingItem = getItemFromOrder(order, productId);

  const estimatedDeliveryDate = dayjs(matchingItem.estimatedDeliveryTime);
  const dateStr = estimatedDeliveryDate.format('dddd, MMMM D');

  const progressPercent = calculateProgress(order.orderTime, matchingItem);

  const trackingPageHTML = `
    <a class="back-to-orders-link link-primary" href="orders.html"> View all orders </a>
   <div class="delivery-date">Arriving on ${dateStr}</div>

        <div class="product-info">${product.name}</div>

        <div class="product-info">Quantity: ${matchingItem.quantity}</div>

        <img class="product-image" src=${product.image} />

        <div class="progress-labels-container">
          <div class="progress-label ${progressPercent < 50 && 'current-status'}">Preparing</div>
          <div class="progress-label ${progressPercent >= 50 && progressPercent < 100 && 'current-status'}">Shipped</div>
          <div class="progress-label ${progressPercent === 100 && 'current-status'}">Delivered</div>
        </div>

        <div class="progress-bar-container">
          <div class="progress-bar" style="width: ${progressPercent}%"></div>
        </div>
  
  `;

  document.querySelector('.js-order-tracking').innerHTML = trackingPageHTML;
}

function calculateProgress(orderTime, item) {
  const currentDate = new Date();
  const orderTimeDate = new Date(orderTime);
  const estimatedDeliveryTime = new Date(item.estimatedDeliveryTime);
  return ((currentDate - orderTimeDate) / (estimatedDeliveryTime - orderTimeDate)) * 100;
}
