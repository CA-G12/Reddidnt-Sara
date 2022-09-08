const express = require('express');
const {
  addPost, deletePost, likePost, unlikePost, addComment, deleteComment, getComments
} = require('../controllers');

const router = express.Router();

router.post('/post/add-post', addPost);
router.delete('/post/delete-post/:postId', deletePost);

router.post('/post/add-comment/:postId', addComment);
router.delete('/post/delete-comment/:comId', deleteComment);
router.get('/get-comments/:postId', getComments);

router.get('/post/like-post/:postId', likePost);

module.exports = router;
