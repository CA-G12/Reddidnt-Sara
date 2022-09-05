const { addComment, deleteComment } = require('./comments');

const { likePost, unlikePost } = require('./likes');

const { addPost, deletePost } = require('./posts');

const { signIn, signUp, signOut } = require('./register');

const { homePage, profilePage } = require('./users');

module.exports = {
  addComment,
  deleteComment,
  addPost,
  deletePost,
  likePost,
  unlikePost,
  homePage,
  profilePage,
  signIn,
  signUp,
  signOut,
};
