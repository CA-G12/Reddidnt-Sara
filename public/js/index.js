const formsSection = document.querySelector('.forms');
const sectionClose = document.querySelector('.form .fa-xmark');
let isLogged;
let loggedUser;

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

// adding comments
const writeCom = document.querySelector('.write-comment');
const addCommentBtn = document.querySelector('.write-comment button');
const textarea = document.querySelector('.write-comment textarea');

textarea.addEventListener('input', () => {
  addCommentBtn.disabled = !textarea.value;
});

addCommentBtn.addEventListener('click', (e) => {
  const { id } = e.target;
  const data = { comment: textarea.value };

  fetch(`/post/add-comment/${id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((res) =>{
      textarea.value = ''
      fetchComments(id);
    });
});

/// display comments section

const commentContainer = document.querySelector('.display-comments');
const closeComments = document.querySelector('.display-comments .close');


const handlePost = (user) => {
  const userName = document.querySelector('.user-post .post .user h3');
  const postDate = document.querySelector('.user-post .post .user h4');
  const userImg = document.querySelector('.user-post .post .user img');

  const postTitle = document.querySelector('.user-post .post .content h2');
  const postText = document.querySelector('.user-post .post .content p');
  const postImg = document.querySelector('.user-post .post .content img');

  const likes = document.querySelector('.user-post .post .interactions .likes span');
  const comments = document.querySelector('.user-post .post .interactions .comments span')

  userName.textContent = user.name;
  postDate.textContent = user.date.split('T')[0];
  userImg.src = user.user_img;

  postTitle.textContent = user.title;
  postText.textContent = user.post;

  likes.textContent = `${user.likes} Likes`;
  comments.textContent = `${user.comments} Comments`;

  if (user.post_img) {
    postImg.style.display = 'inline';
    postImg.src = user.post_img;
  } else postImg.style.display = 'none';

  addCommentBtn.id = user.id;
};

closeComments.addEventListener('click', () => {
  commentContainer.style.display = 'none';
});

/// delete a comment

const deleteComment = (e) => {
  const postId = addCommentBtn.id;
  const { id } = e.target.parentElement;
  fetch(`/post/delete-comment/${id}`, {
    method: 'DELETE',
  })
    .then((res) => res.json())
    .then((res) =>{
      alert(res.message);
      fetchComments(postId);
    });
};

// displaying comments
const commentsSection = document.querySelector('.all-comments');

const handleComments = (comments) => {
  if (comments.length) commentsSection.textContent = '';
  else commentsSection.innerHTML = '<p class="message"> No one commented on this post 😭</p>';

  comments.forEach((e) => {
    const comment = document.createElement('div');
    const user = document.createElement('div');

    const userImg = document.createElement('img');
    const userName = document.createElement('h3');
    const deleteBtn = document.createElement('button');

    const content = document.createElement('p');

    comment.classList = 'one-comment';
    comment.id = e.id;

    userName.textContent = e.name;
    userImg.src = e.user_img;
    content.textContent = e.comment;
    deleteBtn.textContent = 'Delete';

    deleteBtn.addEventListener('click', deleteComment)

    user.append(userImg, userName);
    if (loggedUser === e.user_id) comment.append(user, content, deleteBtn);
    else comment.append(user, content);
    commentsSection.appendChild(comment);
  });
};

const fetchComments = (id) => {
  fetch(`/get-comments/${id}`)
    .then((res) => res.json())
    .then((res) => {
      res.post.comments = res.comments.length;
      handlePost(res.post);
      handleComments(res.comments);
    });
};

// to display the user's name and image when logged in

const logButtons = document.querySelector('header .log-in');
const userInfo = document.querySelector('header .user-info');
const postsContainer = document.querySelector('.posts');

const deletePost = (e) => {
  const { id } = e.target.parentElement.parentElement.parentElement;
  fetch(`/post/delete-post/${id}`, {
    method: 'DELETE',
  })
    .then((res) => res.json())
    .then((res) => {
      alert(res.message);
      fetchHomepageData();
    });
};

const likePost = (e) => {
  const { id } = e.target.parentElement.parentElement.parentElement;
  if (!isLogged) formsSection.style.display = 'flex';
  else {
    fetch(`/post/like-post/${id}`)
      .then((res) => res)
      .then((res) => {
        fetchHomepageData();
      });
  }
};

const handleHomePage = (data, id) => {
  postsContainer.textContent = '';
  data.forEach((e) => {
    const post = document.createElement('div');
    const userData = document.createElement('div');
    const content = document.createElement('div');
    const interactions = document.createElement('div');
    const likesCon = document.createElement('div');
    const commentsCon = document.createElement('div');
    const delCont = document.createElement('div');

    const userImg = document.createElement('img');
    let postImg = null;
    if (e.post_img) {
      postImg = document.createElement('img');
      postImg.src = e.post_img;
    }
    const userName = document.createElement('h3');
    const date = document.createElement('h4');
    const postTitle = document.createElement('h2');

    const postContent = document.createElement('p');

    const likesIcon = document.createElement('i');
    const commentsIcon =document.createElement('i');

    const likesNum = document.createElement('span');
    const commentsNum = document.createElement('span');
    const delBtn = document.createElement('button');

    post.id = e.id;
    post.classList = 'post';
    userData.classList = 'user';
    content.classList = 'content';
    interactions.classList = 'interactions';
    likesIcon.classList = 'fa-solid fa-heart';
    commentsIcon.classList = 'fa-solid fa-comment';

    userImg.src = e.user_img;
    userName.textContent = e.name;
    date.textContent = e.date.slice(0, 10);
    postTitle.textContent = e.title;
    postContent.textContent = e.post;
    likesNum.textContent = `${e.likes} Likes`;
    commentsNum.textContent = 'click to see comments';
    delBtn.textContent = 'Delete';

    delBtn.addEventListener('click', deletePost);
    likesIcon.addEventListener('click', likePost);

    if (e.liked_id.includes(loggedUser)) {
      likesIcon.classList.add('liked');
    }

    commentsCon.addEventListener('click', () => {
      commentContainer.style.display = 'block';
      if (!isLogged) writeCom.style.display = 'none';
      fetchComments(e.id);
    });

    postsContainer.appendChild(post);
    post.append(userData, content, interactions);
    userData.append(userImg, userName, date);
    if (postImg) {
      content.append(postTitle, postContent, postImg);
    } else { content.append(postTitle, postContent); }
    likesCon.append(likesIcon, likesNum);
    commentsCon.append(commentsIcon, commentsNum);
    delCont.appendChild(delBtn);

    if (e.user_id === id) interactions.append(likesCon, commentsCon, delCont);
    else interactions.append(likesCon, commentsCon);
  });
};

const fetchHomepageData = () => {
  fetch('/users/homepage')
    .then((res) => res.json())
    .then((res) => {
      isLogged = res.isLogged;
      if (res.user) {
        loggedUser = res.user.id;
        userInfo.style.display = 'flex';
        logButtons.style.display = 'none';
        userInfo.children[0].src = res.user.user_img;
        userInfo.children[1].textContent = res.user.name;
      }
      handleHomePage(res.data, res.user ? res.user.id : res.user);
    });
};

fetchHomepageData();

userInfo.addEventListener('click', () => {
  window.location.href = '/profile';
});
