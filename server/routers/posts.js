const express = require('express');
const {
addPost, deletePost, likePost, unlikePost,
} = require('../controllers');

const router = express.Router();

router.get('/test', addPost);

module.exports = router;
