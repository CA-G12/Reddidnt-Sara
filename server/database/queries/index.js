const { addCommentQuery, deleteCommentQuery } = require('./comments');

const { likePostQuery, unlikePostQuery } = require('./likes');

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
  homePageQuery,
  profilePageQuery,
  signInQuery,
  signUpQuery,
};
