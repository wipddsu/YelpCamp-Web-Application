const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const User = require('../models/user');
const passport = require('passport');
const { storeReturnTo } = require('../middleware');
const user = require('../controllers/user');

router.get('/register', user.renderRegister);

router.post('/register', catchAsync(user.createUser));

router.get('/login', storeReturnTo, user.renderLogin);

router.post(
  '/login',
  storeReturnTo,
  passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }),
  user.userLogin
);

router.get('/logout', user.userLogout);

module.exports = router;
