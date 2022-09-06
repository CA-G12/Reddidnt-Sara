const { addCommentQuery, deleteCommentQuery } = require('./comments');

const { likePostQuery, unlikePostQuery, checkLikeQuery } = require('./likes');

const { addPostQuery, deletePostQuery } = require('./posts');

const { signInQuery, signUpQuery } = require('./register');

const { homePageQuery, profilePageQuery } = require('./users');

module.exports = {
  addCommentQuery,
  deleteCommentQuery,
  addPostQuery,
  deletePostQuery,
  likePostQuery,
  unlikePostQuery,
  checkLikeQuery,
  homePageQuery,
  profilePageQuery,
  signInQuery,
  signUpQuery,
};
