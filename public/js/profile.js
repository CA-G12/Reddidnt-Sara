const postsContainer = document.querySelector('.posts');
const userInfo = document.querySelector('header .user-info');

const deletePost = (e) => {
  const { id } = e.target.parentElement.parentElement.parentElement;
  fetch(`/post/delete-post/${id}`, {
    method: 'DELETE',
  })
    .then((res) => res.json())
    .then((res) => {
      fetchProfileData();
    });
};

const likePost = (e) => {
  const { id } = e.target.parentElement.parentElement.parentElement;
  fetch(`/post/like-post/${id}`)
    .then((res) => res.json())
    .then((res) => {
      fetchProfileData();
    });
};

const handleProfilePage = (data) => {
  console.log(data);
  if (data.length) postsContainer.textContent = '';
  data.forEach((e, i) => {
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
    date.textContent = e.date.split('T')[0];
    postTitle.textContent = e.title;
    postContent.textContent = e.post;
    likesNum.textContent = `${e.likes} Likes`;
    commentsNum.textContent = `${e.comments} Comments`;
    delBtn.textContent = 'Delete';

    delBtn.addEventListener('click', deletePost);
    likesCon.addEventListener('click', likePost);

    postsContainer.appendChild(post);
    post.append(userData, content, interactions);
    userData.append(userImg, userName, date);
    if (postImg) {
      content.append(postTitle, postContent, postImg);
    } else { content.append(postTitle, postContent); }
    likesCon.append(likesIcon, likesNum);
    commentsCon.append(commentsIcon, commentsNum);
    delCont.appendChild(delBtn);
    interactions.append(likesCon, commentsCon, delCont);
  });
};

const fetchProfileData = () => {
  fetch('/users/profile')
    .then((res) => res.json())
    .then((res) => {
      if (res.status === 500) window.location.href = '../html/serverError.html';
      else {
        userInfo.children[0].src = res.user.user_img;
        userInfo.children[1].textContent = res.user.name;
        handleProfilePage(res.data);
      }
    });
};

fetchProfileData();

const postTitle = document.querySelector('.add .post-title');
const imgUrl = document.querySelector('.add .img-url');
const postText = document.querySelector('.add textarea');
const postBtn = document.querySelector('.add button');

postTitle.addEventListener('input', () => {
  if (postText.value !== '' && postTitle.value !== '') postBtn.disabled = false;
  else postBtn.disabled = true;
});

postText.addEventListener('input', () => {
  if (postTitle.value !== '' && postText.value !== '') postBtn.disabled = false;
  else postBtn.disabled = true;
});

postBtn.addEventListener('click', () => {
  const post = postText.value;
  const title = postTitle.value;
  const img = imgUrl.value || null;

  const data = { title, post, img };

  fetch('/post/add-post', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((res) => {
      // alert(res.message);
      fetchProfileData();
      postText.value = '';
      postTitle.value = '';
      imgUrl.value = '';
    });
});

/// Sign out
const SignOutBtn = document.querySelector('.user .sign-out');

SignOutBtn.addEventListener('click', () => {
  fetch('/users/sign-out')
    .then((res) => res.json())
    .then((res) =>{
      window.location.reload();
    });
});
