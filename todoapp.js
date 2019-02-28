const express = require('express');
var mongoose = require('mongoose');
//package that can be used to handle JSON requests
const bodyParser = require('body-parser');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);

// initialising express
const app = express();
const port = 8090;
require('dotenv').config();
const todoroute = require('./route/todo.route'); // Imports routes
let db_url = 'mongodb://localhost:27017/tododatabase';

mongoose.connect(db_url, { useNewUrlParser: true });
mongoose.Promise = global.Promise;

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(session({
    secret: 'work hard',
    resave: true,
    saveUninitialized: false,
    store: new MongoStore({
      mongooseConnection: db
    })
  }));

app.use('/todos', todoroute);
app.listen(port, () => {
    console.log('Server is up and running on port numner ' + port);
});