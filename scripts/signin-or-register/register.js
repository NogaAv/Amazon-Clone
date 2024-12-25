import { hideInstruct, displayInstruct, hideErr, displayErr, verifyEmail } from './shared.js';

const nameInput = document.querySelector('.js-name-input');
const emailInput = document.querySelector('.js-email-input');
const passwordInput = document.querySelector('.js-password-input');
const reEnteredPasswordInput = document.querySelector('.js-re-enter-password-input');

nameInput.focus();

let nameVal, emailVal, passwordVal, reEnteredPasswordVal;
let isNameValid, isEmailValid, isPaswordValid, isRePasswordValid;

const nameErrMsg = document.querySelector('.js-name-err');
const nameInstructMsg = document.querySelector('.js-name-instruct');

const emailErrMsg = document.querySelector('.js-email-err');
const emailInstructMsg = document.querySelector('.js-email-instruct');

const passwordErrMsg = document.querySelector('.js-password-err');
const passwordInstructMsg = document.querySelector('.js-password-instruct');

const reEnterPasswordErrMsg = document.querySelector('.js-re-password-err');

/* Adding EventListeners for 'name': */

nameInput.addEventListener('focus', () => {
  hideErr(nameErrMsg);
  displayInstruct(nameInstructMsg);
});

nameInput.addEventListener('focusout', () => {
  if (!nameVal || typeof nameVal !== 'string' || nameVal.length < 1) {
    displayErr(nameErrMsg);
    hideInstruct(nameInstructMsg);
  } else {
    hideErr(nameErrMsg);
    hideInstruct(nameInstructMsg);
    isNameValid = true;
  }
});

nameInput.addEventListener('input', (event) => {
  nameVal = event.target.value.trim();
  hideErr(nameErrMsg);
  displayInstruct(nameInstructMsg);
});

/* Adding EventListeners for 'email': */
emailInput.addEventListener('focus', () => {
  hideErr(emailErrMsg);
  displayInstruct(emailInstructMsg);
});

emailInput.addEventListener('focusout', () => {
  isEmailValid = verifyEmail(emailInput.value);
  if (!isEmailValid) {
    displayErr(emailErrMsg);
    hideInstruct(emailInstructMsg);
  } else {
    hideErr(emailErrMsg);
    hideInstruct(emailInstructMsg);
  }
});

emailInput.addEventListener('input', (event) => {
  emailVal = event.target.value.trim();
  hideErr(emailErrMsg);
  displayInstruct(emailInstructMsg);
});

/* Adding EventListeners for 'password': */

passwordInput.addEventListener('focus', () => {
  hideErr(passwordErrMsg);
  displayInstruct(passwordInstructMsg);
});

passwordInput.addEventListener('focusout', () => {
  if (!passwordVal || passwordVal.length < 6) {
    displayErr(passwordErrMsg);
    hideInstruct(passwordInstructMsg);
  } else {
    hideErr(passwordErrMsg);
    hideInstruct(passwordInstructMsg);
    isPaswordValid = true;
  }
});

passwordInput.addEventListener('input', (event) => {
  passwordVal = event.target.value.trim();
  hideErr(passwordErrMsg);
  displayInstruct(passwordInstructMsg);
});

/* Adding EventListeners for 're-enter-password': */
reEnteredPasswordInput.addEventListener('focus', () => {
  hideErr(reEnterPasswordErrMsg);
});

reEnteredPasswordInput.addEventListener('input', (event) => {
  reEnteredPasswordVal = event.target.value;
});

reEnteredPasswordInput.addEventListener('focusout', () => {
  if (!reEnteredPasswordVal) {
    reEnterPasswordErrMsg.innerHTML = '<i>!</i> Type your password again';
    displayErr(reEnterPasswordErrMsg);
  } else if (reEnteredPasswordVal !== passwordVal) {
    reEnterPasswordErrMsg.innerHTML = '<i>!</i> Passwords must match';
    displayErr(reEnterPasswordErrMsg);
  } else {
    hideErr(reEnterPasswordErrMsg);
    isRePasswordValid = true;
  }
});

document.querySelector('.js-register-button').addEventListener('click', async (event) => {
  event.preventDefault();
  console.log(isEmailValid);
  if (isNameValid && isEmailValid && isPaswordValid && isRePasswordValid) {
    console.log('submitting form');
    const data = {
      name: nameVal,
      email: emailVal,
      pwd: passwordVal,
    };

    try {
      const response = await fetch(`server-url/users/register`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (response.status !== 201) {
        throw new Error(`Failed to signup username: ${data.name}, email: ${data.email}`);
      }

      const responseData = await response.json();
      //receiving from server:
      //On success = res.status(201).json({ 'success': `New user ${user} created!` });
      //On fail = res.status(500).json({ 'message': err.message });
    } catch (err) {
      console.log(err);
      alert('Something went wrong! Please try again later');
      //TODO: call renderRegisterPage();
      window.location.href = 'index.html';
    }
  } else {
    if (!isNameValid) displayErr(nameErrMsg);
    if (!isEmailValid) displayErr(emailErrMsg);
    if (!isPaswordValid) displayErr(passwordErrMsg);
  }
});
