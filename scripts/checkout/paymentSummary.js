import { cart, getTotalQuantity, clearCart } from '../../data/cart.js';
import { getProduct } from '../../data/products.js';
import { getDeliveryOption } from '../../data/deliveryOptions.js';
import formatCurrency from '../utils/money.js';
import { addOrder } from '../../data/orders.js';
import { backendPath } from '../../config/dummy.js';

export function renderPaymentSummary() {
  let productsPriceCents = 0;
  let shippingPriceCents = 0;

  cart.forEach((cartItem) => {
    const product = getProduct(cartItem.productId);
    productsPriceCents += product.priceCents * cartItem.quantity;

    const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
    shippingPriceCents += deliveryOption.priceCents;
  });
  const totalBeforTaxCents = productsPriceCents + shippingPriceCents;
  const taxCents = totalBeforTaxCents * 0.1;

  const totalCents = totalBeforTaxCents + taxCents;

  const paymentSummaryHTML = `
            <div class="payment-summary-title">Order Summary</div>

          <div class="payment-summary-row">
            <div>Items (${getTotalQuantity()}):</div>
            <div class="payment-summary-money">$${formatCurrency(productsPriceCents)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${formatCurrency(shippingPriceCents)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${formatCurrency(totalBeforTaxCents)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${formatCurrency(taxCents)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${formatCurrency(totalCents)}</div>
          </div>

          <button class="js-place-order place-order-button button-primary">Place your order</button>
  `;

  document.querySelector('.js-payment-summary').innerHTML = paymentSummaryHTML;

  document.querySelector('.js-place-order').addEventListener('click', async () => {
    //make request to the backend to create the order.
    //send the cart to the backend for creating the order:
    try {
      const response = await fetch(`${backendPath}/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cart: cart,
        }),
      });

      const order = await response.json();

      addOrder(order);
      clearCart();
    } catch (error) {
      console.log('Unexpected Error. Try again later');
      return;
    }

    window.location.href = 'orders.html';
  });
}
