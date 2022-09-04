const {
  addComment, addPost, deletePost, likePost, unlikePost,
} = require('./posts');

const {
  homePage, profilePage, signIn, signUp,
} = require('./users');

module.exports = {
  addComment,
  addPost,
  deletePost,
  likePost,
  unlikePost,
  homePage,
  profilePage,
  signIn,
  signUp,
};
