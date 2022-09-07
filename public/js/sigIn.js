const sigInBtn = document.querySelector('.form .sign-in button');
const signInMsg = document.querySelector('.form .sign-in .message');

const displaySignInMessage = (text) => {
  signInMsg.style.display = 'block';
  signInMsg.textContent = text;
};

const sendSignInData = (data) => {
  fetch('/users/sign-in', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.status === 400) displaySignInMessage(res.message);
      else if (res.status === 500) window.location.href = '../html/serverError.html';
      else {
        alert(res.message);
        window.location.reload();
      }
    })
    .catch((err) => console.log(err));
};

sigInBtn.addEventListener('click', () => {
  const email = signInForm.children[1].value;
  const password = signInForm.children[2].value;

  const data = { email, password };

  sendSignInData(data);
});
