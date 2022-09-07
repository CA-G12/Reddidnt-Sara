const express = require('express');
const {
  homePage, profilePage, signIn, signUp, signOut,
} = require('../controllers');

const addAuth = require('../middleware/addauth');
const authenticate = require('../middleware/authentication');

const router = express.Router();

router.post('/users/sign-up', signUp);
router.post('/users/sign-in', signIn);
router.get('/users/sign-out', signOut);
router.get('/users/homepage', addAuth, homePage);
router.get('/users/profile', authenticate, profilePage);

module.exports = router;
