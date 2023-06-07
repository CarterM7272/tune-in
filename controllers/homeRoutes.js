const router = require('express').Router();
const path = require('path');
const withAuth = require('../middleware/auth');


const { User } = require('../models');

// Use withAuth middleware to prevent access to route
router.get('/profile', async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      raw: true,
      nest: true,
    });

    res.render('profile', {
      ...userData,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// localhost:3001/home
router.get('/home', async (req, res) => {
  try {
    res.render('home', {
      logged_in: Boolean(req.session.logged_in)
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/home');
    return;
  }

  res.render('login');
});

router.get('/register', (req, res) => {

  if (req.session.logged_in) {
    res.redirect('/home');
    return;
  }

  res.render('register');
});

// localhost:3001/
router.get('/', (req, res) => {
  return res.render('welcome');
});

module.exports = router;