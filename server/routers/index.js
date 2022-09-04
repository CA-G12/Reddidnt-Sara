const express = require('express');
const postsRouter = require('./posts');
const usersRouter = require('./users');

const router = express.Router();

router.use(postsRouter);
router.use(usersRouter);

module.exports = router;
