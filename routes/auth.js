const express  = require('express');
const settings = require("../settings");
const authRouter  = express.Router();



module.exports = function (User) {

  authRouter.get('/', (req, res) => {
    if (req.session.user_id) {
      // If the user is logged in, render the app
      User.find(req.session.user_id) // Get user info from DB
      .then((user) => {
        res.render('index', {
          errors: req.flash('errors'),
          info: req.flash('info'),
          user: user
        })
      })
      .catch(() => {
        res.render('index', {
          errors: req.flash('errors'),
          info: req.flash('info')
        });
      })
    } else {
      // If the user is not logged in, render the login/register page
      res.render('index', {
        errors: req.flash('errors'),
        info: req.flash('info')
      });
    }
  });

  // Update profile
  authRouter.post('/profile', (req, res) => {
    // We'll update what we need to. More details in lib/user.js
    User.update(req.session.user_id, req.body.email, req.body.password)
    .then(() => {
      // Indicate to the user that the update was successful
      req.flash('info', 'updated your profile');
      res.redirect('/');
    }).catch((err) => {
      // In the even that an error occurred at any point during the promise
      // chain, add the error message to the flash errors and redirect.
      req.flash('errors', err.message);
      res.redirect('/');
    });
  });


  authRouter.get('/logout', (req, res) => {
    req.session = undefined;
    res.redirect('/');
  });


  authRouter.post('/login', (req, res) => {
    User.authenticate(req.body.email, req.body.password)
    .then((user) => {
      // If email and password match, we assign the id to the session
      req.session.user_id = user.id;
      res.redirect('/');
    }).catch((err) => {
      // In the even that an error occurred at any point during the promise
      // chain, add the error message to the flash errors and redirect.
      req.flash('errors', err.message);
      res.redirect('/');
    });
  });

  // Test endpoint, might need to be removed
  authRouter.get('/register', (req, res) => {
    res.render('register');
  });

  authRouter.post('/register', (req, res) => {
    if (!req.body.email || !req.body.password) {
      // If the registration form was submitted without a value for email or
      // password, then set an error message and redirect.
      req.flash('errors', 'email and password are required');
      res.redirect('/register');
      // IMPORTANT: always return after sending a response, whether it's a
      // redirect, render, send, end, json, or whatever.
      return;
    }
    console.log(User);
    User.add(req.body.email, req.body.password)
    .then(() => {
      // This callback will be called after the promise returned by the last
      // call to .then has resolved. That happens after the user is inserted
      // into the database.
      req.flash('info', 'account successfully created');
      res.redirect('/home');
    }).catch((err) => {
      // In the even that an error occurred at any point during the promise
      // chain, add the error message to the flash errors and redirect.
      req.flash('errors', err.message);
      res.redirect('/register');
    });
  });

  return authRouter;
}