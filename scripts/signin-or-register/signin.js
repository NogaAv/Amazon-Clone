import { displayErr, hideErr, verifyEmail, renderAlertMsg, removeAlertMsg } from './shared.js';

const signinUser = {
  email: '',
  password: '',
};

function renderEmailSignin() {
  const emailSigningHTML = `
          <div class="js-signin-input form-input-group">
           <label for="email">Email</label>
            <input class="js-email-input" id="email" type="email" name="email" />
            <div class="js-email-err input-err-msg hide-err" data-input-id="email"><i>!</i> Enter a valid email address</div>
           </div>

            <button type="submit" class="js-signin-button button-primary signin-button">Continue</button>
`;
  document.querySelector('.js-input-placeholder').innerHTML = emailSigningHTML;

  const emailInput = document.querySelector('.js-email-input');

  emailInput.focus();

  const continueSigninBtn = document.querySelector('.js-signin-button ');

  continueSigninBtn.addEventListener('click', async (event) => {
    event.preventDefault();
    const emailVal = emailInput.value;
    const emailErrMag = document.querySelector('.js-email-err');
    if (!verifyEmail(emailVal)) {
      displayErr(emailErrMag);
      return;
    } else {
      hideErr(emailErrMag);
      signinUser.email = emailVal;
    }

    /* NOTE: For Demo purpose only, This code section is commented out and emailVerified=true */
    /*
    const response = await fetch('url/signinEmail', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ email: emailVal }),
    });

    const emailVerified = response.json();
    */
    const emailVerified = true;
    if (emailVerified) {
      renderPasswordSignin();
    }
  });
}

function renderPasswordSignin() {
  const passwordHTML = `
   <div class="js-signin-input form-input-group">
            <label for="password">Password</label>
            <input class="js-password-input" id="password" type="password" name="password" />
          </div>

          <button type="submit" class="js-signin-button button-primary signin-button">Sign in</button>
  `;

  document.querySelector('.js-input-placeholder').innerHTML = passwordHTML;
  const passwordInput = document.querySelector('.js-password-input');
  passwordInput.focus();

  const signinBtn = document.querySelector('.js-signin-button ');

  signinBtn.addEventListener('click', async (event) => {
    event.preventDefault();

    const passWordVal = passwordInput.value;

    if (!passWordVal) {
      renderAlertMsg('There was a problem', 'Your password is incorrect');
      return;
    } else {
      removeAlertMsg();
    }

    //TODO: fetch POST to login to server with email+password {email: noga@gmail.com, pwd: '123456'}
    //sever returns response with body:{ roles, accessToken } + headers: refreshToken(as httpOnly cookie)
    /** On logout, server only returns:
    res.sendStatus(204);       - after it clears the refreshToken from DB.
    So the clients only deletes accessToken from localStorage, and go to homePage.
    */
    const responseData = { username: 'Dave', roles: ['User'], accessToken: '123' };
    const userInfo = {
      name: responseData.username,
      roles: responseData.roles,
      token: responseData.accessToken,
    };

    localStorage.setItem('user-info', JSON.stringify(userInfo));

    window.location.href = 'index.html';
  });
}
renderEmailSignin();
