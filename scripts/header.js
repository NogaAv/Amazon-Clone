const userLoggedInfo = JSON.parse(localStorage.getItem('user-info'));

export function renderHeader() {
  let headerHTML = '';

  headerHTML += `
       <div class="modal-backdrop"></div>

       <div class="amazon-header">
        <div class="amazon-header-left-section">
          <a href="index.html" class="header-link">
            <img class="amazon-logo" src="images/amazon-logo-white.png" />
            <img class="amazon-mobile-logo" src="images/amazon-mobile-logo-white.png" />
          </a>
        </div>

        <div class="amazon-header-middle-section">
          <input class="js-search-bar search-bar" type="text" placeholder="Search" />

          <button class="js-search-button search-button">
            <img class="search-icon" src="images/icons/search-icon.png" />
          </button>
        </div>

        <div class="amazon-header-right-section">
        
          <span class="sign-in-link header-link">
            <span class="sign-in-text">Hello, ${userLoggedInfo ? userLoggedInfo.name : 'sign in'} </span>
            <span class="account-text">Account & Lists <span class="nav-icon"></span> </span>
            ${userLoggedInfo ? renderLoggedModal() : renderSinginModal()}
          </span> 
        
          <a class="orders-link header-link" href="orders.html">
            <span class="returns-text">Returns</span>
            <span class="orders-text">& Orders</span>
          </a>

          <a class="cart-link header-link" href="checkout.html">
            <img class="cart-icon" src="images/icons/cart-icon.png" />
            <div class="js-cart-quantity cart-quantity"></div>
            <div class="cart-text">Cart</div>
          </a>
        </div>
      </div> 
  `;

  document.querySelector('.amazon-header-container').innerHTML = headerHTML;

  //hovering over sign-in link displays a signin or register modal
  document.querySelector('.sign-in-link').addEventListener('mouseover', () => {
    document.querySelector('.modal-backdrop').classList.add('display-block');
    document.querySelector('.signin-lists-account-container').classList.add('display-block');
  });
  document.querySelector('.sign-in-link').addEventListener('mouseout', () => {
    document.querySelector('.modal-backdrop').classList.remove('display-block');
    document.querySelector('.signin-lists-account-container').classList.remove('display-block');
  });

  //If already loggen-in, hovering over user name displayed modal with signout option
  const signOutElm = document.querySelector('.js-sign-out-link');
  if (signOutElm) {
    document.querySelector('.js-sign-out-link').addEventListener('click', () => {
      //add here: sending logout request to server.
      //server returns 204 status-code.

      localStorage.removeItem('user-info');
      window.location.href = '.index.html';
    });
  }
}

//displays signOut option, when pressed: navigating to signin page
function renderLoggedModal() {
  return `

        <div class="signin-lists-account-container">
          <div class="signin-container">
            <a class="js-sign-out-link signin-link" href="./signin.html">Sign Out</a>
          </div>
        </div>
  `;
}

function renderSinginModal() {
  return `
         <div class="signin-lists-account-container">
          <div class="signin-container">
            <a class="signin-link" href="./signin.html">Sign in</a>
            <span class="register-text">New customer? <a href="./register.html">Start here</a></span>
          </div>
          <div class="lists-account-container">
            <div class="lists-card card">
              <p>Your Lists</p>
              <ul>
                <li><a href="#">Create a List</a></li>
                <li><a href="#">Find a List or Regisrty</a></li>
              </ul>
            </div>
            <div class="account-card card">
              <p>Your Account</p>
              <ul>
                <li><a href="#">Account</a></li>
                <li><a href="#">Orders</a></li>
              </ul>
            </div>
          </div>
        </div>
  `;
}
