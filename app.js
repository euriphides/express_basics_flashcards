const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express(); // express() returns an express application
app.use(bodyParser.urlencoded({ extended: false}));
app.use(cookieParser());
const friends = [
  {"firstName": "Sebastian", "lastName": "Smith"},
  {"firstName": "Chris", "lastName": "Roberts"},
  {"firstName": "Mike", "lastName": "Davis"},
  {"firstName": "Melanie", "lastName": "Baumgartner"},
  {"firstName": "AJ", "lastName": "Bradshaw"}
];

const colors = [
  "red",
  "yellow",
  "blue"

];

app.set('view engine', 'pug'); // tells express to use the pug template engine. By default, express will look in "/views" for your code.

// app.get('/', (req, res) => {
//   res.send('<h1>I love Treehouse</h1>');
// }); // this is the route for a visit without a path - just to the home page

app.get('/', (req, res) => {
  const name = req.cookies.username;
  if(name){
    res.render('index', {title: "Flash Cards Home", name}); // now we're calling the pug template
  } else {
    res.redirect('/hello')
  }
});

app.post('/goodbye', (req, res) => {
  res.clearCookie('username', req.body.username);
  res.redirect('/hello');
});

app.get('/cards', (req, res) => {
  res.render('card', { prompt: "Who is buried in Grant's tomb?", colors, hint: "Think about whose tomb it is.", title: "Flash Cards"});
});

app.get('/sandbox', (req, res) => {
  res.render('sandbox', {friends, title: "Sandbox Test Page"});
});
// sandbox
// First Name | Last Name - complete
// loop iterations, etc.

app.get('/hello', (req, res) => {
  const name = req.cookies.username;
  if (name){
    res.redirect('/');
  } else {
    res.render('hello', {title: "Flash Cards", name: req.cookies.username});
  }
});

app.post('/hello', (req, res) => {
  res.cookie('username', req.body.username);
  res.redirect('/');
})

app.listen(3000, () => {
  console.log('The application is running on localhost:3000!');
}); // 3000 = the port being listened to. Second command is optional.

// a "route" is just like a url - the path being taken to access data
