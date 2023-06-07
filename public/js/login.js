const loginFormEl = document.querySelector('#login-form');

const showError = (parentEl, errorText) => {
  const errorPEl = document.createElement('p');
  errorPEl.classList.add('error-element');
  errorPEl.textContent = errorText;
  parentEl.appendChild(errorPEl);
};

const removeAllErrors = () => {
  const allErrors = document.querySelectorAll('.error-element');
  allErrors.forEach((el) => el.remove());
};


const loginFormHandler = async (event) => {
  event.preventDefault();
  removeAllErrors();

  const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if (!email || !password) {
    showError(loginFormEl, "Please provide both an email and password.")
    return;
  }

  const bodyObj = {
    email,
    password
  }

  try {
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify(bodyObj),
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      const res = await response.json();
      console.log(res);
      const errorMsg = res.message;
      showError(loginFormEl, errorMsg);
      return;
    }

    document.location.replace('/home');
  } catch (err) {
    console.log(err);
    showError(loginFormEl, "A login error has ocurred.")
  }
};

loginFormEl.addEventListener('submit', loginFormHandler);
