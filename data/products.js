import formatCurrency from '../scripts/utils/money.js';
import { backendPath } from '../config/dummy.js';

export let products = [];

export async function loadProducts() {
  try {
    const response = await fetch(`${backendPath}/products`);
    if (!response.ok) {
      throw response;
    }
    const productsList = await response.json();
    products = productsList.map((product) => {
      return product.type === 'clothing' ? new Clothing(product) : new Product(product);
    });
  } catch (error) {
    if (error.status >= 400) {
      console.log('Error. Something went wrong.');
    } else {
      console.log('Network error. Try again later');
    }
  }
}

export function getProduct(productId) {
  let matchingProduct;

  products.forEach((product) => {
    if (product.id === productId) {
      matchingProduct = product;
    }
  });
  return matchingProduct;
}

class Product {
  constructor(productDetails) {
    this.id = productDetails.id;
    this.image = productDetails.image;
    this.name = productDetails.name;
    this.rating = productDetails.rating;
    this.priceCents = productDetails.priceCents;
    this.keywords = productDetails.keywords;
  }

  getStarsUrl() {
    return `images/ratings/rating-${this.rating.stars * 10}.png`;
  }

  getPrice() {
    return formatCurrency(this.priceCents);
  }

  extraInfoHTML() {
    return '';
  }
}

class Clothing extends Product {
  constructor(productDetails) {
    super(productDetails);
    if (productDetails.type === 'clothing') {
      this.sizeChartLink = productDetails.sizeChartLink;
    }
  }

  extraInfoHTML() {
    return `<a href=${this.sizeChartLink} target="_blank">Size chart</a>`;
  }
}
