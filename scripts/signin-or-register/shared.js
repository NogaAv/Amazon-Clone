export function displayInstruct(element) {
  element.classList.remove('hide-instruct');
  element.classList.add('display-instruct');
}

export function hideInstruct(element) {
  element.classList.remove('display-instruct');
  element.classList.add('hide-instruct');
}

export function displayErr(element) {
  element.classList.remove('hide-err');
  element.classList.add('display-err');
  const inputId = element.dataset.inputId;
  document.querySelector(`#${inputId}`).classList.add('red-outline');
}

export function hideErr(element) {
  element.classList.remove('display-err');
  element.classList.add('hide-err');
  const inputId = element.dataset.inputId;
  document.querySelector(`#${inputId}`).classList.remove('red-outline');
}

export function verifyEmail(emailVal) {
  return emailVal && typeof emailVal === 'string' && emailVal.includes('@') && emailVal.includes('.');
}

export function renderAlertMsg(title, msg) {
  const alertHTML = `
   <div class="alert-msg-container">
            <span class="icon icon-alert"></span>
            <div class="alert-card">
              <h4>${title}</h4>
              <div class="alert-content">${msg}</div>
            </div>
          </div>
  `;

  document.querySelector('.alert-placeholder').innerHTML = alertHTML;
}

export function removeAlertMsg() {
  document.querySelector('.alert-placeholder').innerHTML = '';
}
