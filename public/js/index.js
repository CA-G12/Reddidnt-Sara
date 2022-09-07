const formsSection = document.querySelector('.forms');
const sectionClose = document.querySelector('.form .fa-xmark');

sectionClose.addEventListener('click', () => {
  formsSection.style.display = 'none';
});

/// to open forms when the buttons in header are clicked
const signInForm = document.querySelector('.form .sign-in');
const signUpForm = document.querySelector('.form .sign-up');
const openSignIn = document.querySelector('header .log-in button:nth-child(1)');
const openSignUp = document.querySelector('header .log-in button:nth-child(2)');

const displaySignIn = () => {
  formsSection.style.display = 'flex';
  signInForm.style.display = 'block';
  signUpForm.style.display = 'none';
};

const displaySignUp = () => {
  formsSection.style.display = 'flex';
  signInForm.style.display = 'none';
  signUpForm.style.display = 'block';
};

/// to switch between two forms
openSignIn.addEventListener('click', displaySignIn);
openSignUp.addEventListener('click', displaySignUp);

const switchSignIn = document.querySelector('.form .sign-in p a');
const switchSignUp = document.querySelector('.form .sign-up p a');

switchSignIn.addEventListener('click', displaySignUp);
switchSignUp.addEventListener('click', displaySignIn);

// to display the user's name and image when logged in

const logButtons = document.querySelector('header .log-in');
const userInfo = document.querySelector('header .user-info');

const fetchHomapageData = () =>{
  fetch('/users/homepage')
    .then((res) => res.json())
    .then((res) => {
        console.log(res);
      if (res.user) {
        userInfo.style.display = 'flex';
        logButtons.style.display = 'none';
        userInfo.children[0].src = res.user.user_img;
        userInfo.children[1].textContent = res.user.name;
      }
    });
};


fetchHomapageData();

