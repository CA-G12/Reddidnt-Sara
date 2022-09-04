const {
  addCommentQuery, addPostQuery, deletePostQuery, likePostQuery, unlikePostQuery,
} = require('./posts');

const {
  homePageQuery, profilePageQuery, signInQuery, signUpQuery,
} = require('./users');

module.exports = {
  addCommentQuery,
  addPostQuery,
  deletePostQuery,
  likePostQuery,
  unlikePostQuery,
  homePageQuery,
  profilePageQuery,
  signInQuery,
  signUpQuery,
};
