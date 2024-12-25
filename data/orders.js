export const orders = JSON.parse(localStorage.getItem('orders')) || [];

/* Following is the 'order' object structure as retrieved from the server:

{
     id: "c23d74be-a139-4623-8315-2bb205e0fa9e",
      orderTime: "2024-10-17T08:34:53.402Z",
      products: [
            { productId: '3ebe75dc-64d2-4137-8860-1f5a963e534b', quantity: 1, estimatedDeliveryTime: '2024-10-20T08:34:53.402Z', variation: null },
            { productId: '54e0eccd-8f36-462b-b68a-8182611d9add', quantity: 1, estimatedDeliveryTime: '2024-10-18T08:34:53.402Z', variation: null },
            { productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d', quantity: 2, estimatedDeliveryTime: '2024-10-24T08:34:53.402Z', variation: null }
          ],
      totalCostCents: 10619 
}

*/
export function addOrder(order) {
  orders.unshift(order);
  saveToStorage();
}

export function getOrder(orderId) {
  return orders.find((order) => order.id === orderId);
}

//returns object from order's products array
export function getItemFromOrder(order, productId) {
  let matchingItem;

  order.products.forEach((product) => {
    if (product.productId === productId) {
      matchingItem = product;
    }
  });
  return matchingItem;
}

export function formateDateStr(isoTime) {
  const orderDate = new Date(isoTime);
  return `${orderDate.toLocaleString('default', { month: 'long' })} ${orderDate.getDate()}`;
}

function saveToStorage() {
  localStorage.setItem('orders', JSON.stringify(orders));
}
