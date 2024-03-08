const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const User = require('../models/user');
const passport = require('passport');
const { storeReturnTo } = require('../middleware');
const user = require('../controllers/user');

router
  .route('/register') //
  .get(user.renderRegister)
  .post(catchAsync(user.createUser));

router
  .route('/login')
  .get(storeReturnTo, user.renderLogin)
  .post(
    storeReturnTo,
    passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }),
    user.userLogin
  );

router.get('/logout', user.userLogout);

module.exports = router;
