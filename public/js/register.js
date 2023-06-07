const signupFormEl = document.querySelector('#signup-form');

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


const signupFormHandler = async (event) => {
  event.preventDefault();
  removeAllErrors();

  const first_name = document.querySelector('#first-name-signup').value.trim();
  const last_name = document.querySelector('#last-name-signup').value.trim();
  const email = document.querySelector('#email-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();

  const bodyObj = {
    first_name,
    last_name,
    email,
    password
  }

  if (!first_name || !last_name || !email || !password) {
    console.log(bodyObj)
    showError(signupFormEl, 'Please fill out all fields.');
    return;
  }

  try {
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify(bodyObj),
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      const res = await response.json();
      console.log(res);
      const errorMsg = res.errors[0].message;
      showError(signupFormEl, errorMsg);
      return;
    }

    document.location.replace('/home');
  } catch (err) {
    console.log(err);
    showError(signupFormEl, "A signup error has ocurred.");
  }
};

signupFormEl.addEventListener('submit', signupFormHandler);
