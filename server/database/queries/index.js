const { addCommentQuery, deleteCommentQuery, getCommentsQuery } = require('./comments');

const { likePostQuery, unlikePostQuery, checkLikeQuery } = require('./likes');

const { addPostQuery, deletePostQuery, getOnePostQuery } = require('./posts');

const { signInQuery, signUpQuery } = require('./register');

const { homePageQuery, profilePageQuery, updateDataQuery } = require('./users');

module.exports = {
  addCommentQuery,
  deleteCommentQuery,
  getCommentsQuery,
  addPostQuery,
  deletePostQuery,
  likePostQuery,
  unlikePostQuery,
  checkLikeQuery,
  getOnePostQuery,
  homePageQuery,
  profilePageQuery,
  updateDataQuery,
  signInQuery,
  signUpQuery,
};
