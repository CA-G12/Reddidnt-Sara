const signUpBtn = document.querySelector('.form .sign-up button');
const signUpMsg = document.querySelector('.form .sign-up .message');

const validation = (email, password, repeat_password) => {
  const emailPattern = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  const passwordPattern = /[A-Za-z0-9]/gi;
  if (!emailPattern.test(email)) return 'please enter a valid email';
  if (!passwordPattern.test(password) || password.length < 5) return 'your password must be at least 5 characters';
  if (password !== repeat_password) return 'passwords don\'t match';
  return true;
};

const displayMessage = (text) => {
  signUpMsg.style.display = 'block';
  signUpMsg.textContent = text;
};

const sendSignUpData = (data) => {
  fetch('/users/sign-up', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.status === 400) displayMessage(res.message);
      else if (res.status === 500) window.location.href = '../html/serverError.html';
      else {
        alert(res.message);
        window.location.reload();
      }
    });
};

signUpBtn.addEventListener('click', () => {
  const name = signUpForm.children[1].value;
  const email = signUpForm.children[2].value;
  const password = signUpForm.children[3].value;
  const repeat_password = signUpForm.children[4].value;

  if (!name || !email || !password || !repeat_password) {
    displayMessage('Please fill in all fields');
  } else {
    const result = validation(email, password, repeat_password);
    if (result !== true) {
      displayMessage(result);
    } else {
      sendSignUpData({
        name, email, password, repeat_password 
      });
    }
  }
});
