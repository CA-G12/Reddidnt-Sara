const express = require('express');
const {
homePage, profilePage, signIn, signUp,
} = require('../controllers');

const router = express.Router();

module.exports = router;
