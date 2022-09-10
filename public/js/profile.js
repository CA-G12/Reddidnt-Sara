let loggedUser;

// comments

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
  const userImg = document.querySelector('.user-post .post .user h4');

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

/// displaying posts
const postsContainer = document.querySelector('.posts');
const userInfo = document.querySelector('header .user-info');

const deletePost = (e) => {
  const { id } = e.target.parentElement.parentElement.parentElement;
  fetch(`/post/delete-post/${id}`, {
    method: 'DELETE',
  })
    .then((res) => res.json())
    .then((res) => {
      alert(res.message);
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

const handleProfilePage = (data, id) => {
  if (data.length) postsContainer.textContent = '';

  document.querySelector('.user img').src = data[0].user_img;
  document.querySelector('.user h3').textContent = data[0].name;
  document.querySelector('.user h4').textContent = `Joined on ${data[0].user_date.slice(0, 10)}`;

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
    commentsNum.textContent = 'Click to see comments';
    delBtn.textContent = 'Delete';

    delBtn.addEventListener('click', deletePost);
    likesCon.addEventListener('click', likePost);
    commentsCon.addEventListener('click', () => {
      commentContainer.style.display = 'block';
      fetchComments(e.id);
    });

    if (e.liked_id.includes(id)) {
      likesIcon.classList.add('liked');
    }

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
        loggedUser = res.user.id;
        userInfo.children[0].src = res.user.user_img;
        userInfo.children[1].textContent = res.user.name;
        handleProfilePage(res.data, res.user.id);
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
