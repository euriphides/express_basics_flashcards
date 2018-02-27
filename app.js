const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');


const app = express(); // express() returns an express application

app.use(bodyParser.urlencoded({ extended: false}));
app.use(cookieParser());
app.use('/static', express.static('public'));

const friends = [
  {"firstName": "Sebastian", "lastName": "Smith"},
  {"firstName": "Chris", "lastName": "Roberts"},
  {"firstName": "Mike", "lastName": "Davis"},
  {"firstName": "Melanie", "lastName": "Baumgartner"},
  {"firstName": "AJ", "lastName": "Bradshaw"}
];

app.set('view engine', 'pug'); // tells express to use the pug template engine. By default, express will look in "/views" for your code.

const mainRoutes = require('./routes');
const cardRoutes = require('./routes/cards');


app.use(mainRoutes);
app.use('/cards', cardRoutes);

// app.use is called on EVERY request
// app.use((req, res, next) => {
//   console.log("Hello");
//   next(); // if "next" is provided in the arguments, then it must be called to close the execution to move on to the next call
// });
//
// app.use((req, res, next) => {
//   console.log("World");
//   next();
// });

// app.get('/', (req, res) => {
//   res.send('<h1>I love Treehouse</h1>');
// }); // this is the route for a visit without a path - just to the home page

// app.get is only called on a GET request



app.listen(3000, () => {
  console.log('The application is running on localhost:3000!');
}); // 3000 = the port being listened to. Second command is optional.

// a "route" is just like a url - the path being taken to access data
