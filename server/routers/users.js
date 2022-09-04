const express = require('express');
const {
  homePage, profilePage, signIn, signUp,
} = require('../controllers');

const router = express.Router();

router.post('/users/sign-up', signUp);
router.post('/users/sign-in', signIn);
router.get('/users/homepage', homePage);
router.get('/users/profile', profilePage);

module.exports = router;
