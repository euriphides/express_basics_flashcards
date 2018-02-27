const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  const name = req.cookies.username;
  if(name){
    res.render('index', {title: "Flash Cards Home", name}); // now we're calling the pug template
  } else {
    res.redirect('/hello') // this middleware is ended by sending a response, and "next" wasn't called in the arguments.
  }
});

router.post('/goodbye', (req, res) => {
  res.clearCookie('username', req.body.username);
  res.redirect('/hello');
});


router.get('/sandbox', (req, res) => {
  res.render('sandbox', {friends, title: "Sandbox Test Page"});
});
// sandbox
// First Name | Last Name - complete
// loop iterations, etc.

router.get('/hello', (req, res) => {
  const name = req.cookies.username;
  if (name){
    res.redirect('/');
  } else {
    res.render('hello', {title: "Flash Cards", name: req.cookies.username});
  }
});

router.post('/hello', (req, res) => {
  res.cookie('username', req.body.username);
  res.redirect('/');
})


module.exports = router;