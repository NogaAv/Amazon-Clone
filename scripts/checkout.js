import { renderOrderSummary } from './checkout/orderSummary.js';
import { renderPaymentSummary } from './checkout/paymentSummary.js';
import { cart, getTotalQuantity } from '../data/cart.js';
import { loadProducts } from '../data/products.js';

async function loadPage() {
  //running async loadProducts() and loadCart() concurrently
  await Promise.all([
    loadProducts(),
    //loadCart() //TODO: add this feature
    //loadDeliveryOptions()
  ]);
  renderOrderSummary();
  renderPaymentSummary();
}

loadPage();
