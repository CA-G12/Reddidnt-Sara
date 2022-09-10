const { addComment, deleteComment, getComments } = require('./comments');

const { likePost, unlikePost } = require('./likes');

const { addPost, deletePost } = require('./posts');

const { signIn, signUp, signOut } = require('./register');

const { homePage, profilePage, updateData } = require('./users');

module.exports = {
  addComment,
  deleteComment,
  getComments,
  addPost,
  deletePost,
  likePost,
  unlikePost,
  homePage,
  profilePage,
  updateData,
  signIn,
  signUp,
  signOut,
};
